<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/login', function() {
    return view('auth.auth');
})->name('login');
Route::view('/register', 'auth.auth');


Route::view('/admin/{path?}', 'Admin.dashboard')->where('path', '.*')->middleware('auth');
Route::view('/{path?}', 'public.home')->where('path', '.*');


//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
