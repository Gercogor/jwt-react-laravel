<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckAuthorisationRequest;
use App\Http\Requests\JsonErrorRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return JsonResponse
     */
    public function login(LoginRequest $request)
    {

        $credentials = $request->only('email', 'password');

        $token = auth()->attempt($credentials);

        if (!$token) {
            return response()->json([
                'error' => 'Wrong login or password'
            ], 401);
        }

        $user = Auth::user();

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return JsonResponse
     */
    public function me()
    {
        if (!auth()->check()){
            return response()->json(['error'=>'unauthorized'],401);
        }
        return response()->json(auth()->user());
    }

    /**
     * Register new User.
     *
     * @return JsonResponse
     */
    public function register(RegisterRequest $request)
    {

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $credentials = $request->only('email', 'password');

        $token = auth()->attempt($credentials);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout()
    {
        if (!auth()->check()){
            return response()->json(['error'=>'unauthorized'],401);
        }

        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return JsonResponse
     */
    public function refresh()
    {
        if (!auth()->check()){
            return response()->json(['error'=>'unauthorized'],401);
        }

        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
