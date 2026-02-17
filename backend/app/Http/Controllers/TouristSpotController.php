<?php

namespace App\Http\Controllers;

use App\Models\TouristSpot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TouristSpotController extends Controller
{
    /**
     * GET /api/spots
     * Returns all tourist spots in Gingoog City
     */
    public function index()
    {
        $spots = TouristSpot::withCount('visits')
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $spots,
        ]);
    }

    /**
     * GET /api/spots/nearby?lat={latitude}&lng={longitude}
     * Returns nearby Gingoog City spots sorted by distance (Haversine)
     */
    public function nearby(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        $lat = $request->input('lat');
        $lng = $request->input('lng');

        $spots = TouristSpot::select('*')
            ->selectRaw(
            '( 6371 * acos( cos( radians(?) ) 
                * cos( radians( latitude ) ) 
                * cos( radians( longitude ) - radians(?) ) 
                + sin( radians(?) ) 
                * sin( radians( latitude ) ) ) ) AS distance',
        [$lat, $lng, $lat]
        )
            ->withCount('visits')
            ->orderBy('distance')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $spots,
        ]);
    }

    /**
     * GET /api/spots/{slug}
     * Returns single spot details
     */
    public function show(TouristSpot $spot)
    {
        $spot->loadCount('visits');

        return response()->json([
            'success' => true,
            'data' => $spot,
        ]);
    }
}
