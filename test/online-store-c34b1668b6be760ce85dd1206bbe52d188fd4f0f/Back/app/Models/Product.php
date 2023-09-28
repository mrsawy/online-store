<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'description',
        'price',
        'image',
        'rate',
        'rate_count'
    ];

    protected function imagePath(): Attribute
    {

        if (Str::startsWith($this->image, 'https')) {
            return Attribute::make(
                get: fn ($value) => $this->image,
            );
        }

        return Attribute::make(
            get: fn () => \Illuminate\Support\Facades\URL::to("storage/products/{$this->image}"),
        );
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItem(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }
}
