<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TouristSpotController;
use App\Http\Controllers\VisitController;

/* |-------------------------------------------------------------------------- | API Routes - LakbayAR |-------------------------------------------------------------------------- */

// Tourist Spots
Route::get('/spots', [TouristSpotController::class , 'index']);
Route::get('/spots/nearby', [TouristSpotController::class , 'nearby']);
Route::get('/spots/{spot}', [TouristSpotController::class , 'show']);

// Visits & Gamification
Route::post('/spots/{id}/visit', [VisitController::class , 'store']);
Route::get('/leaderboard', [VisitController::class , 'leaderboard']);
