<?php

use App\Http\Controllers\Api\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

// auth
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// categories
Route::apiResource('categories', CategoryController::class)
    ->only('index', 'show');

// products
Route::apiResource('products', ProductController::class)
    ->only('index', 'show');


Route::middleware('auth:sanctum')->group(function () {

    // logout
    Route::post('logout', [AuthController::class, 'logout']);

    // user 
    Route::get('user', [AuthController::class, 'user']);

    // orders
    Route::apiResource('orders', OrderController::class)
        ->only('index', 'store', 'show');

    // cart 
    Route::get('cart', [CartController::class, 'index']);
    Route::post('cart/{product}', [CartController::class, 'store']);
    Route::delete('cart/empty', [CartController::class, 'empty']);
    Route::delete('cart/{product}', [CartController::class, 'destroy']);


    //admin
    Route::prefix('admin')->group(function () {
        //products
        Route::apiResource('products', AdminProductController::class)
            ->only('store', 'update', 'destroy');

        //orders
        Route::apiResource('orders', AdminOrderController::class)->only('index');
    });
});
