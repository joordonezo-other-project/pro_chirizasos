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

Route::post('/getAllInventory', 'App\Http\Controllers\Business\InventoryController@getAllInventory')->name('getAllInventory');
Route::post('/saveQuantityById', 'App\Http\Controllers\Business\InventoryController@saveQuantityById')->name('saveQuantityById');
Route::post('/saveNewQuantity', 'App\Http\Controllers\Business\InventoryController@saveNewQuantity')->name('saveNewQuantity');
Route::post('/searchProductByName', 'App\Http\Controllers\Business\InventoryController@searchProductByName')->name('searchProductByName');

Route::post('/saveNewProduct', 'App\Http\Controllers\Business\ProductionController@saveNewProduct')->name('saveNewProduct');
Route::post('/getAllProductReference', 'App\Http\Controllers\Business\ProductionController@getAllProductReference')->name('getAllProductReference');
Route::post('/saveNewPE', 'App\Http\Controllers\Business\ProductionController@saveNewPE')->name('saveNewPE');
Route::post('/getProductionByMonth', 'App\Http\Controllers\Business\ProductionController@getProductionByMonth')->name('getProductionByMonth');
Route::post('/saveNewPR', 'App\Http\Controllers\Business\ProductionController@saveNewPR')->name('saveNewPR');

Route::post('/getAllProviders', 'App\Http\Controllers\Business\ProviderController@getAllProviders')->name('getAllProviders');
Route::post('/saveEditProvider', 'App\Http\Controllers\Business\ProviderController@saveEditProvider')->name('saveEditProvider');
Route::post('/saveAddProvider', 'App\Http\Controllers\Business\ProviderController@saveAddProvider')->name('saveAddProvider');
Route::post('/changeStatusProviderById', 'App\Http\Controllers\Business\ProviderController@changeStatusProviderById')->name('changeStatusProviderById');

Route::post('/saveEditStock', 'App\Http\Controllers\Business\StockController@saveEditStock')->name('saveEditStock');
Route::post('/getAllStock', 'App\Http\Controllers\Business\StockController@getAllStock')->name('getAllStock');

Route::post('/getStock', 'App\Http\Controllers\Business\OrdersController@getStock')->name('getStock');
Route::post('/saveOrder', 'App\Http\Controllers\Business\OrdersController@saveOrder')->name('saveOrder');
Route::post('/getAllOrders', 'App\Http\Controllers\Business\OrdersController@getAllOrders')->name('getAllOrders');
Route::post('/getOrderDetailsById', 'App\Http\Controllers\Business\OrdersController@getOrderDetailsById')->name('getOrderDetailsById');

Route::post('/generateReport', 'App\Http\Controllers\Business\ReportController@generateReport')->name('generateReport');
