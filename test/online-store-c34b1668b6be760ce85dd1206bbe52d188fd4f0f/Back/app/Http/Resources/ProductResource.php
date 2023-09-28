<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'price' => $this->price,
            'description' => $this->description,
            'category' => $this->category->name,
            'image' => $this->image_path,
            'rating' => [
                'rate' => $this->rate,
                'count' => $this->rate_count
            ]
        ];
    }
}
