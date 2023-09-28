<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // create admin
        User::factory()->create([
            'name' => 'admin',
            'email' => 'a@a.com',
            'is_admin' => true
        ]);

        // create users
        User::factory(10)->create();

    }
}
