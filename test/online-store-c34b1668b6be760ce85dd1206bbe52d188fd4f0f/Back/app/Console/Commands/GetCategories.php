<?php

namespace App\Console\Commands;

use App\Models\Category;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class GetCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'get categories';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $response = Http::get('http://fakestoreapi.com/products');

        $categories = [];
        foreach ($response->json() as  $product) {

            if (!in_array($product['category'], $categories)) {
                $categories[] = $product['category'];
            }
        }

        foreach ($categories as $category) {
            $data[] = ['name' => $category];
        }

        Category::query()->insert($data);
    }
}
