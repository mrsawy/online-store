<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductsTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_products_successfully(): void
    {
        Category::factory(3)->create();
        $products = Product::factory(7)->create([
            'category_id' => rand(1, 3),
        ]);

        $response = $this->getJson('api/products');

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
        $this->assertCount(7, $responseData);

        foreach ($products as $index => $product) {
            $this->assertEquals($product->id, $responseData[$index]['id']);
            $this->assertEquals($product->title,
                $responseData[$index]['title']);
            $this->assertEquals($product->price,
                $responseData[$index]['price']);
            $this->assertEquals($product->description,
                $responseData[$index]['description']);
            $this->assertEquals($product->category->name,
                $responseData[$index]['category']);
            $this->assertEquals($product->image,
                $responseData[$index]['image']);
            $this->assertEquals($product->rate,
                $responseData[$index]['rating']['rate']);
            $this->assertEquals($product->rate_count,
                $responseData[$index]['rating']['count']);
        }
    }

    public function test_get_product_by_id_successfully()
    {
        $category = Category::factory()->create();

        $product = Product::factory()->create([
            'category_id' => $category->id,
        ]);

        $response = $this->getJson("api/categories/{$product->id}");

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

        $this->assertCount(1, $responseData);
        $this->assertEquals($product->id, $responseData[0]['id']);
        $this->assertEquals($product->title,
            $responseData[0]['title']);
        $this->assertEquals($product->price,
            $responseData[0]['price']);
        $this->assertEquals($product->description,
            $responseData[0]['description']);
        $this->assertEquals($product->category->name,
            $responseData[0]['category']);
        $this->assertEquals($product->image,
            $responseData[0]['image']);
        $this->assertEquals($product->rate,
            $responseData[0]['rating']['rate']);
        $this->assertEquals($product->rate_count,
            $responseData[0]['rating']['count']);
    }

}
