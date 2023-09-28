<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_successfully()
    {
        User::factory()->create([
            'email' => 'test@test.com',
            'password' => Hash::make('12345678'),
        ]);

        $requestData = [
            'email' => 'test@test.com',
            'password' => '12345678',
        ];

        $response = $this->postJson('api/login', $requestData);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
            ],
            'token',
        ]);

        $responseData = $response->json();
        $this->assertArrayHasKey('user', $responseData);
        $this->assertArrayHasKey('token', $responseData);
    }

    public function test_register_successfully()
    {
        $requestData = [
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => '12345678',
            'password_confirmation' => '12345678',
        ];

        $response = $this->postJson('api/register', $requestData);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
            ],
            'token',
        ]);

        $responseData = $response->json();
        $this->assertArrayHasKey('user', $responseData);
        $this->assertArrayHasKey('token', $responseData);
    }

    public function test_logout_successfully()
    {
        $user = User::factory()->create([
            'email' => 'test@test.com',
            'password' => Hash::make('12345678'),
        ]);

        $response = $this->actingAs($user)->postJson('api/logout');

        $response->assertStatus(200);

        $responseData = $response->json();
        $this->assertArrayHasKey('message', $responseData);
    }
}
