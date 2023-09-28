<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $productsIds =
            $request->user()
            ->cart()
            ->pluck('product_id')
            ->toArray();

        $products = Product::query()
            ->whereIn('id', $productsIds)
            ->get();

        return ProductResource::collection($products);
    }

    public function store(Request $request, Product $product): JsonResponse
    {
        if (
            $this->checkProductExists(
                $request->user('sanctum')->id,
                $product->id
            )
        ) {
            return response()->json([
                'message' => 'already in the cart'
            ], 200);
        }

        Cart::query()->create([
            'user_id' => $request->user()->id,
            'product_id' => $product->id
        ]);

        return response()->json([
            'message' => 'added to cart'
        ], 200);
    }

    public function destroy(Request $request, Product $product): JsonResponse
    {
        if (
            !$this->checkProductExists(
                $request->user('sanctum')->id,
                $product->id
            )
        ) {
            return response()->json([
                'message' => 'product not found in cart'
            ], status: 404);
        }

        Cart::query()
            ->where('user_id', $request->user()->id)
            ->where('product_id', $product->id)
            ->delete();

        return response()->json([
            'message' => 'product deleted from cart'
        ], status: 200);
    }

    public function empty(Request $request): JsonResponse
    {
        Cart::query()
            ->where('user_id', $request->user()->id)
            ->delete();

        return response()->json([
            'message' => 'cart is empty now'
        ], status: 200);
    }

    private function checkProductExists(string $userId, string $productId): bool
    {
        return DB::table('carts')
            ->where('user_id', $userId)
            ->where('product_id', $productId)
            ->exists();
    }
}
