<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tourist_spot_id',
        'visited_at',
        'points_earned',
    ];

    protected $casts = [
        'visited_at' => 'datetime',
        'points_earned' => 'integer',
    ];

    public function touristSpot()
    {
        return $this->belongsTo(TouristSpot::class);
    }
}
