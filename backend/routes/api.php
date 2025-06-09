<?php

use App\Http\Controllers\API\TransaksiController;
use App\Http\Controllers\API\KategoriController;
use App\Http\Controllers\API\SuplayController;
use App\Http\Controllers\API\ProdukController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {

    // Kategori
    Route::apiResource('/kategori', KategoriController::class)->except(['show', 'edit', 'create']);

    // Suplay
    Route::apiResource('/suplay', SuplayController::class)->except(['show', 'edit', 'create']);

    // Produk
    Route::apiResource('/produk', ProdukController::class)->except(['show', 'edit', 'create']);

    Route::apiResource('/user', UserController::class)->except(['index', 'edit', 'create']);

    // Transaksi
    Route::get('/transaksi', [TransaksiController::class, 'index']);
    Route::post('/transaksi', [TransaksiController::class, 'store']);
    Route::delete('/transaksi/{id}', [TransaksiController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/verify-password', [AuthController::class, 'verifyPassword']);

});


// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

