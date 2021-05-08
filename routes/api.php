<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Gallery;
use App\Http\Resources\GalleryResource;
use App\Http\Resources\Photo;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/add-painting', 'App\Http\Controllers\GalleryController@getCategories');

// Gallery
Route::get('/gallery', 'App\Http\Controllers\GalleryController@index');
Route::get('/gallery/{id}', 'App\Http\Controllers\GalleryController@show');

// Photos
Route::get('/photos', 'App\Http\Controllers\PhotoController@index');
Route::get('/photos/{id}', 'App\Http\Controllers\PhotoController@show');

//Intro and about page
Route::get('/about-me', 'App\Http\Controllers\AboutMeController@index');
Route::get('/intro', 'App\Http\Controllers\IntroController@index');

Route::post('/contact','App\Http\Controllers\ContactController@store');

Route::group(['middleware' => ['auth:sanctum']], function() {
    
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/gallery', 'App\Http\Controllers\GalleryController@store');
    Route::post('/gallery/{gallery}/update', 'App\Http\Controllers\GalleryController@update');
    Route::post('/gallery/{gallery}/delete', 'App\Http\Controllers\GalleryController@destroy');
    
    Route::post('/photos/{photo}/update', 'App\Http\Controllers\PhotoController@update');
    Route::post('/photos', 'App\Http\Controllers\PhotoController@store');
    Route::post('/photos/{photo}/delete', 'App\Http\Controllers\PhotoController@destroy');
    
    Route::get('/messages', 'App\Http\Controllers\ContactController@index');
    Route::post('/intro', 'App\Http\Controllers\IntroController@update');
    Route::post('/about-me', 'App\Http\Controllers\AboutMeController@update');
});
