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

require __DIR__.'/auth.php';



Route::get('/datacharacter/{query}', [DataController::class, 'checkCharacter']);
Route::get('/datacharacterMarvelChar/{query}', [DataController::class, 'loguedCheckCaractersMarvelChar']);
Route::get('/datacharacterMarvelComics/{query}', [DataController::class, 'loguedCheckCaractersMarvelComics']);
Route::get('/datacharacterTmdb/{query}', [DataController::class, 'loguedCheckCaractersTmdb']);


Route::post('/datacharacter', [DataController::class, 'postCharacter']);
Route::post('/cardSafeLogin', [DataController::class, 'cardSafeOnLogin']);
