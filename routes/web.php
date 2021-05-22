<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataController;
use App\Http\Controllers\Auth;

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

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/myCards', function () {
    return view('myCards');
})->middleware(['auth'])->name('myCards');

Route::get('/tmdb', function () {
    return view('tmdb');
})->middleware(['auth'])->name('tmdb');

require __DIR__.'/auth.php';



Route::get('/datacharacter/{query}', [DataController::class, 'checkCharacter']);
Route::get('/datacharacterMarvelChar/{query}', [DataController::class, 'loguedCheckCaractersMarvelChar']);
Route::get('/datacharacterMarvelComics/{query}', [DataController::class, 'loguedCheckCaractersMarvelComics']);
Route::get('/datacharacterTmdb/{query}', [DataController::class, 'loguedCheckCaractersTmdb']);
Route::get('/getCardsUser', [DataController::class, 'getCardsView']);




Route::post('/datacharacter', [DataController::class, 'postCharacter']);
Route::post('/postSafeQuery', [DataController::class, 'postSearchQuery']);
Route::post('/cardSafeLogin', [DataController::class, 'cardSafeOnLogin']);
Route::post('/deleteCardSafeOnLogin', [DataController::class, 'deleteCardSafeOnLogin']);
Route::post('/deleteCardCheckView', [DataController::class, 'deleteCardCheckView']);
Route::post('/cardCheckView', [DataController::class, 'cardCheckView']);



Route::get('/old', function () {
    return view('old');
});
