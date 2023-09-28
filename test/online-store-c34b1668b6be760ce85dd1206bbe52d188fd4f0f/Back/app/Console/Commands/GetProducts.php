<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class GetProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'get products';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $response = Http::get('http://fakestoreapi.com/products');

        $products = [];
        foreach ($response->json() as  $product) {

            $data = [
                'title' => $product['title'],
                'price' => $product['price'],
                'description' => $product['description'],
                'category_id' => DB::table('categories')
                    ->where('name', '=', $product['category'])
                    ->first()
                    ->id,
                'image' => $product['image'],
                'rate' => $product['rating']['rate'],
                'rate_count' => $product['rating']['count']
            ];

            $products[] = $data;
        }

        Product::query()->insert($products);
    }
}
