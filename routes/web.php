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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::post('/getAllInventory', 'App\Http\Controllers\HomeController@getAllInventory')->name('getAllInventory');
Route::post('/saveQuantityById', 'App\Http\Controllers\HomeController@saveQuantityById')->name('saveQuantityById');
Route::post('/saveNewQuantity', 'App\Http\Controllers\HomeController@saveNewQuantity')->name('saveNewQuantity');
Route::post('/searchProductByName', 'App\Http\Controllers\HomeController@searchProductByName')->name('searchProductByName');
Route::post('/saveNewProduct', 'App\Http\Controllers\HomeController@saveNewProduct')->name('saveNewProduct');
Route::post('/getAllProductReference', 'App\Http\Controllers\HomeController@getAllProductReference')->name('getAllProductReference');
Route::post('/saveNewPE', 'App\Http\Controllers\HomeController@saveNewPE')->name('saveNewPE');
