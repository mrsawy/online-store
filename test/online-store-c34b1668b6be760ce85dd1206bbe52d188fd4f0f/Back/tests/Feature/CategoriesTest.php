<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoriesTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_categories_successfully(): void
    {
        $categories = Category::factory(3)->create();

        $response = $this->getJson('api/categories');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            ['id', 'name',],
        ]);

        $responseData = $response->json();
        $this->assertCount(3, $responseData);

        foreach ($categories as $index => $category) {
            $this->assertEquals($category->id,
                $responseData[$index]['id']);
            $this->assertEquals($category->name,
                $responseData[$index]['name']);
        }
    }

    public function test_get_products_by_category_id_successfully()
    {
        $category = Category::factory()->create();

        $products = Product::factory(3)->create([
            'category_id' => $category->id,
        ]);

        $response = $this->getJson("api/categories/{$category->id}");

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

        $this->assertCount(3, $responseData);

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
}
