<?php

namespace App\Http\Controllers;

use App\Models\TouristSpot;
use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VisitController extends Controller
{
    /**
     * POST /api/spots/{id}/visit
     * Registers visit and awards points
     */
    public function store(Request $request, $id)
    {
        $spot = TouristSpot::findOrFail($id);

        $visit = Visit::create([
            'user_id' => $request->input('user_id', null),
            'tourist_spot_id' => $spot->id,
            'visited_at' => now(),
            'points_earned' => $spot->points_reward,
        ]);

        return response()->json([
            'success' => true,
            'message' => "Visit recorded! You earned {$spot->points_reward} points.",
            'data' => [
                'visit' => $visit,
                'points_earned' => $spot->points_reward,
                'spot_name' => $spot->name,
            ],
        ], 201);
    }

    /**
     * GET /api/leaderboard
     * Returns top visitors with total points
     */
    public function leaderboard()
    {
        $leaders = Visit::select('user_id')
            ->selectRaw('SUM(points_earned) as total_points')
            ->selectRaw('COUNT(*) as total_visits')
            ->whereNotNull('user_id')
            ->groupBy('user_id')
            ->orderByDesc('total_points')
            ->limit(10)
            ->get()
            ->map(function ($entry, $index) {
            return [
            'rank' => $index + 1,
            'user_id' => $entry->user_id,
            'username' => 'Explorer #' . $entry->user_id,
            'total_points' => (int)$entry->total_points,
            'total_visits' => (int)$entry->total_visits,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $leaders,
        ]);
    }
}
