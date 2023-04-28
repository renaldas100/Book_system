<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\PictureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Book;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return to_route('books.index');
});

Route::get('/dashboard', function () {
    return to_route('books.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


Route::middleware('isLogin')->group(function () {

Route::get('/users/index',[UserController::class,'index'])->name('users.index');
Route::get('/users/{id}/edit',[UserController::class,'edit'])->name('users.edit');
Route::put('/users/{id}/update',[UserController::class,'update'])->name('users.update');
Route::delete('/users/{id}/destroy',[UserController::class,'destroy'])->name('users.destroy');
Route::get('/users/myProfile',[UserController::class,'myProfile'])->name('users.myProfile');


Route::get('/pictures/{id}/addPicture',[PictureController::class,'addPicture'])->name('pictures.addPicture');
Route::resource("pictures", PictureController::class)->except(['store','destroy']);
Route::post('/pictures/{id}/store', [PictureController::class, 'store'])->name('pictures.store');
Route::delete('/pictures/{id}/destroy', [PictureController::class, 'destroy'])->name('pictures.destroy');


Route::resource('books', BookController::class)->only('index');
Route::resource('books', BookController::class)->except('index');
Route::get("/books/{id}/storeUser", [BookController::class, "storeUser"])->name("books.storeUser");

Route::resource('categories', CategoryController::class);


});
