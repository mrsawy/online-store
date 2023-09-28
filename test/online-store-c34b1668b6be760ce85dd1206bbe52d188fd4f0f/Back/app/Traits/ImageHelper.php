<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait ImageHelper
{
    public function storeImage(Request $request, string $folder): string
    {
        $request->store("public/{$folder}");

        return $request->hashName();
    }

    public function deleteImage(string $image, string $folder): void
    {
        Storage::disk('local')->delete("public/{$folder}/{$image}");
    }
}
