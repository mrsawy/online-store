<?php

namespace Tests\Feature;


use App\Models\Cart;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OrdersTest extends TestCase
{
    use  RefreshDatabase;

    public function test_can_not_create_order_with_empty_cart_successfully()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('api/orders', [
            'first_name' => 'test first_name',
            'last_name' => 'test last_name',
            'mobile' => 'test mobile',
            'line1' => 'test line1',
            'line2' => 'test line2',
            'city' => 'test city',
            'province' => 'test province',
            'country' => 'test country',
            'zipcode' => 'test zipcode',
        ]);

        $response->assertStatus(404);
        $response->assertJson([
            'message' => 'Cart is empty',
        ]);
    }

    public function test_create_order_successfully()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $products = Product::factory(3)->create([
            'category_id' => $category->id,
        ]);
        $cartItems = [];
        foreach ($products as $product) {
            $cartItems[] = [
                'user_id' => $user->id,
                'product_id' => $product->id,
            ];
        }
        Cart::insert($cartItems);

        $data = [
            'first_name' => 'test first_name',
            'last_name' => 'test last_name',
            'mobile' => 'test mobile',
            'line1' => 'test line1',
            'line2' => 'test line2',
            'city' => 'test city',
            'province' => 'test province',
            'country' => 'test country',
            'zipcode' => 'test zipcode',
        ];
        $response = $this->actingAs($user)->postJson('api/orders', $data);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Order saved successfully',
        ]);

        // Assert that the order is stored in the database
        $this->assertDatabaseHas('orders', array_merge(
            [
                'user_id' => $user->id,
                'total_price' => $products->sum('price'),
                'email' => $user->email,
            ], $data
        ));

        // Assert that order items are stored in the database
        $order = Order::where('user_id', $user->id)->first();
        $this->assertDatabaseCount('order_items', count($products));
        foreach ($products as $product) {
            $this->assertDatabaseHas('order_items', [
                'order_id' => $order->id,
                'product_id' => $product->id,
            ]);
        }

        // Assert that the user's cart is emptied
        $this->assertDatabaseMissing('carts', [
            'user_id' => $user->id,
        ]);
    }

    public function test_get_all_orders()
    {
        $user = User::factory()->create();
        $data = [
            'user_id' => $user->id,
            'email' => $user->email,
            'total_price' => 122,
            'first_name' => 'test first_name',
            'last_name' => 'test last_name',
            'mobile' => 'test mobile',
            'line1' => 'test line1',
            'line2' => 'test line2',
            'city' => 'test city',
            'province' => 'test province',
            'country' => 'test country',
            'zipcode' => 'test zipcode',
        ];
        $order = Order::query()->create($data);

        $response = $this->actingAs($user)->getJson('api/orders');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            [
                'id',
                'user_id',
                'first_name',
                'last_name',
                'total_price',
                'mobile',
                'email',
                'line1',
                'line2',
                'city',
                'province',
                'country',
                'zipcode',
                'created_at',
                'products',
            ],
        ]);

        $responseData = $response->json();
        $this->assertEquals($order->id, $responseData[0]['id']);
        $this->assertEquals($order->user_id, $responseData[0]['user_id']);
        $this->assertEquals($order->first_name, $responseData[0]['first_name']);
        $this->assertEquals($order->last_name, $responseData[0]['last_name']);
        $this->assertEquals($order->total_price,
            $responseData[0]['total_price']);
        $this->assertEquals($order->mobile, $responseData[0]['mobile']);
        $this->assertEquals($order->email, $responseData[0]['email']);
        $this->assertEquals($order->line1, $responseData[0]['line1']);
        $this->assertEquals($order->line2, $responseData[0]['line2']);
        $this->assertEquals($order->city, $responseData[0]['city']);
        $this->assertEquals($order->province, $responseData[0]['province']);
        $this->assertEquals($order->country, $responseData[0]['country']);
        $this->assertEquals($order->zipcode, $responseData[0]['zipcode']);
    }

    public function test_get_order_by_id()
    {
        $user = User::factory()->create();
        $data = [
            'user_id' => $user->id,
            'email' => $user->email,
            'total_price' => 122,
            'first_name' => 'test first_name',
            'last_name' => 'test last_name',
            'mobile' => 'test mobile',
            'line1' => 'test line1',
            'line2' => 'test line2',
            'city' => 'test city',
            'province' => 'test province',
            'country' => 'test country',
            'zipcode' => 'test zipcode',
        ];
        $order = Order::query()->create($data);

        $response = $this->actingAs($user)->getJson("api/orders/$order->id");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'user_id',
            'first_name',
            'last_name',
            'total_price',
            'mobile',
            'email',
            'line1',
            'line2',
            'city',
            'province',
            'country',
            'zipcode',
            'created_at',
            'products',
        ]);

        $responseData = $response->json();
        $this->assertEquals($order->id, $responseData['id']);
        $this->assertEquals($order->user_id, $responseData['user_id']);
        $this->assertEquals($order->first_name, $responseData['first_name']);
        $this->assertEquals($order->last_name, $responseData['last_name']);
        $this->assertEquals($order->total_price,
            $responseData['total_price']);
        $this->assertEquals($order->mobile, $responseData['mobile']);
        $this->assertEquals($order->email, $responseData['email']);
        $this->assertEquals($order->line1, $responseData['line1']);
        $this->assertEquals($order->line2, $responseData['line2']);
        $this->assertEquals($order->city, $responseData['city']);
        $this->assertEquals($order->province, $responseData['province']);
        $this->assertEquals($order->country, $responseData['country']);
        $this->assertEquals($order->zipcode, $responseData['zipcode']);
    }
}
