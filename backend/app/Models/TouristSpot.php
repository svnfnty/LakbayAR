<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TouristSpot extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'history_content',
        'latitude',
        'longitude',
        'city',
        'province',
        'category',
        'thumbnail_image',
        'marker_image',
        'audio_narration',
        'points_reward',
    ];

    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'points_reward' => 'integer',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function visits()
    {
        return $this->hasMany(Visit::class);
    }

    public function totalVisits(): int
    {
        return $this->visits()->count();
    }
}
