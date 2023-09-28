<?php

namespace App\Policies;

use App\Models\User;
use App\Models\policy;
use Illuminate\Auth\Access\Response;

class OrderPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->is_admin;
    }
}
