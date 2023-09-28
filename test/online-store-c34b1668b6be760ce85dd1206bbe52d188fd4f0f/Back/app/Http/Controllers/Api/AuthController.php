<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        if (!Auth::attempt($request->validated())) {
            return response()->json([
                'message' => 'auth failed',
            ], 401);
        }

        $user = User::query()
            ->where('email', '=', $request->validated('email'))
            ->first();

        return response()->json([
            'user' => new UserResource($user),
            'token' => $user->createToken('api-token')->plainTextToken,

        ], 200);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $credentials = $request->safe()->merge([
            'password' => Hash::make($request->validated('password')),
        ])->toArray();

        $user = User::query()->create($credentials);

        return response()->json([
            'user' => new UserResource($user),
            'token' => $user->createToken('api-token')->plainTextToken,
        ], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user('sanctum')->tokens()->delete();

        return response()->json([
            'message' => 'user logged out successfully',
        ], 200);
    }

    public function user(Request $request): UserResource
    {
        return new UserResource($request->user('sanctum'));
    }
}
