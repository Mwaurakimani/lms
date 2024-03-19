<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogInRequest;
use App\Http\Requests\RegisterUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    function create(RegisterUser $request){

        DB::beginTransaction();

        $data = $request->input();

        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'accountType' => $data['accountType'],
            'password' => bcrypt($data['password'])
        ]);

        DB::commit();

        Auth::login($user);
        $token = $user->createToken('AuthToken')->plainTextToken;

        return [
            'success' => true,
            'message' => 'User created successfully',
            'data' => [
                'user' => $user,
                'token' => $token
            ]
        ];
    }

    function login(LogInRequest $request){
        $username = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $username)
            ->first();

        if (!$user || !Auth::attempt(['email' => $user->email, 'password' => $password])) {
            // Authentication failed
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Authentication successful
        $token = $user->createToken('AuthToken')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

    function logout(Request $request){
        Auth::user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
