<?php

use App\Http\Controllers\API\QuotesController;
use Illuminate\Support\Facades\Route;

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

Route::prefix('quotes')->name('quote.')->group(function () {
    Route::get('/', [QuotesController::class, 'index'])->name('index');
    Route::post('/{quote}/answers/check', [QuotesController::class, 'checkAnswer'])->name('is_correct');
});
