<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function store(StoreProductRequest $request): JsonResponse
    {
        $this->authorize('create', Product::class);

        $validated = $request->validated();

        if ($request->safe()->has('image')) {
            $validated['image'] = $this->saveImage($request->file('image'));
        }

        $product = Product::create($validated);

        return response()->json([
            'message' => 'product added successfully',
            'product' => new ProductResource($product)
        ]);
    }

    public function update(StoreProductRequest $request, Product $product): JsonResponse
    {
        $this->authorize('update', $product);

        $validated = $request->validated();

        if ($request->safe()->has('image')) {
            if ($product->image) {
                Storage::delete("public/products/{$product->image}");
            }

            $validated['image'] = $this->saveImage($request->file('image'));
        }


        $product->update($validated);

        return response()->json([
            'message' => 'product updated successfully',
            'product' => new ProductResource($product)
        ]);
    }

    public function destroy(Product $product): JsonResponse
    {
        $this->authorize('update', $product);

        $product->delete();

        if ($product->image) {
            Storage::delete("public/products/{$product->image}");
        }

        return response()->json([
            'message' => 'product deleted successfully'
        ]);
    }

    private function saveImage(object $request): string
    {
        $request->store('products', 'public');

        return $request->hashName();
    }
}
