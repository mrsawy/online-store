<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\Api\OrderStoreRequest;
use App\Http\Resources\OrderResource;
use App\Models\Cart;
use App\Models\OrderItem;
use App\Models\Product;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $orders = Order::with('orderItem.product')
            ->where('user_id', $request->user('sanctum')->id)
            ->get();

        return OrderResource::collection($orders);
    }

    public function store(OrderStoreRequest $request): JsonResponse
    {
        $cartCount = $request->user('sanctum')->cart()->count();
        if ($cartCount === 0) {
            return response()->json([
                'message' => 'Cart is empty',
            ], 404);
        }

        $productIds = $request->user('sanctum')
            ->cart()
            ->pluck('product_id')
            ->toArray();

        $products = Product::whereIn('id', $productIds)->get();
        $totalPrice = $products->sum('price');

        $data = $request->safe()->merge([
            'user_id' => $request->user('sanctum')->id,
            'total_price' => $totalPrice,
            'email' => $request->user('sanctum')->email,
        ])->toArray();

        DB::beginTransaction();
        try {
            $order = Order::create($data);

            $orderItems = [];
            foreach ($products as $product) {
                $orderItems[] = [
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                ];
            }
            OrderItem::insert($orderItems);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to store order',
            ], 424);
        }

        // Empty the cart
        Cart::where('user_id', $request->user('sanctum')->id)->delete();

        return response()->json([
            "message" => "Order saved successfully",
        ], 200);
    }

    public function show(Order $order): OrderResource
    {
        return new OrderResource($order);
    }
}
