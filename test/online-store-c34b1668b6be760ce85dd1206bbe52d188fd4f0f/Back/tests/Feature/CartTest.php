<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_cart_items_successfully(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $products = Product::factory(3)->create([
            'category_id' => $category->id
        ]);

        foreach ($products as  $product) {
            $user->cart()->create([
                'product_id' => $product->id
            ]);
        }

        $response = $this->actingAs($user)->getJson('api/cart');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            [
                'id',
                'title',
                'price',
                'description',
                'category',
                'image',
                'rating' => [
                    'rate',
                    'count',
                ],
            ],
        ]);

        $responseData = $response->json();
        foreach ($products as $index => $product) {
            $this->assertEquals($product->id, $responseData[$index]['id']);
            $this->assertEquals(
                $product->title,
                $responseData[$index]['title']
            );
            $this->assertEquals(
                $product->price,
                $responseData[$index]['price']
            );
            $this->assertEquals(
                $product->description,
                $responseData[$index]['description']
            );
            $this->assertEquals(
                $product->category->name,
                $responseData[$index]['category']
            );
            $this->assertEquals(
                $product->image,
                $responseData[$index]['image']
            );
            $this->assertEquals(
                $product->rate,
                $responseData[$index]['rating']['rate']
            );
            $this->assertEquals(
                $product->rate_count,
                $responseData[$index]['rating']['count']
            );
        }

        $this->assertDatabaseCount('carts', $products->count());
    }

    public function test_can_not_add_product_to_cart_if_exists(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $product = Product::factory()->create([
            'category_id' => $category->id
        ]);

        $user->cart()->create([
            'product_id' => $product->id
        ]);

        $response = $this->actingAs($user)->postJson("api/cart/{$product->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'already in the cart'

        ]);

        $this->assertDatabaseCount('carts', 1);
    }

    public function test_add_product_to_cart_successfully(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $product = Product::factory()->create([
            'category_id' => $category->id
        ]);

        $response = $this->actingAs($user)->postJson("api/cart/{$product->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'added to cart'
        ]);

        $this->assertDatabaseCount('carts', 1);
    }

    public function test_can_not_remove_product_from_cart_if_not_exist(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $product = Product::factory()->create([
            'category_id' => $category->id
        ]);

        $response = $this->actingAs($user)->deleteJson("api/cart/{$product->id}");

        $response->assertStatus(404);
        $response->assertJson([
            'message' => 'product not found in cart'
        ]);
    }

    public function test_remove_product_from_cart_successfully(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $product = Product::factory()->create([
            'category_id' => $category->id
        ]);
        $user->cart()->create([
            'product_id' => $product->id
        ]);

        $response = $this->actingAs($user)->deleteJson("api/cart/{$product->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'product deleted from cart'
        ]);

        $this->assertDatabaseCount('carts', 0);
    }

    public function test_empty_the_cart_successfully(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $products = Product::factory(4)->create([
            'category_id' => $category->id
        ]);
        foreach ($products as $product) {
            $user->cart()->create([
                'product_id' => $product->id
            ]);
        }

        $response = $this->actingAs($user)->deleteJson("api/cart/empty");

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'cart is empty now'
        ]);

        $this->assertDatabaseCount('carts', 0);
    }
}
