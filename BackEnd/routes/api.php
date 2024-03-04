<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::post('/register', [UserController::class,'create']);

Route::post('/testAuth', function (){
    return [Auth::user()];
})->middleware(['auth:sanctum']);

Route::post('/login', [UserController::class,'login']);

Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = Auth::user();
    return $user;
});

Route::post('/createCourse', [\App\Http\Controllers\CourseController::class,'create'])->middleware(['auth:sanctum']);
Route::get('/courses', [\App\Http\Controllers\CourseController::class,'viewAll']);
Route::get('/course/{id}', [\App\Http\Controllers\CourseController::class,'viewCourse']);
Route::get('/enroll/{id}', [\App\Http\Controllers\CourseController::class,'enroll'])->middleware(['auth:sanctum']);
Route::get('/courses/enrolled', [\App\Http\Controllers\CourseController::class,'viewEnrolled'])->middleware(['auth:sanctum']);




