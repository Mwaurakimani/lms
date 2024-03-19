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

Route::get('/courses', [\App\Http\Controllers\CourseController::class,'viewAll']);
Route::post('/createCourse', [\App\Http\Controllers\CourseController::class,'create'])->middleware(['auth:sanctum']);
Route::get('/course/{id}', [\App\Http\Controllers\CourseController::class,'viewCourse']);
Route::get('/enroll/{id}', [\App\Http\Controllers\CourseController::class,'enroll'])->middleware(['auth:sanctum']);
Route::get('/courses/enrolled', [\App\Http\Controllers\CourseController::class,'viewEnrolled'])->middleware(['auth:sanctum']);
Route::post('/course/enrole/{User}/{Course}', [\App\Http\Controllers\CourseController::class,'enroll'])->middleware(['auth:sanctum']);
Route::get('/module/{Module}', [\App\Http\Controllers\CourseController::class,'getModule'])->middleware(['auth:sanctum']);


Route::delete('course/{course}',[\App\Http\Controllers\CourseController::class,'delete'])->middleware(['auth:sanctum']);


Route::get('/student/course/{Course}', [\App\Http\Controllers\CourseController::class,'study'])->middleware(['auth:sanctum']);


