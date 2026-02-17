<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tourist_spots', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->longText('history_content');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->string('city')->default('Gingoog City');
            $table->string('province')->default('Misamis Oriental');
            $table->string('category');
            $table->string('thumbnail_image')->nullable();
            $table->string('marker_image')->nullable();
            $table->string('audio_narration')->nullable();
            $table->integer('points_reward')->default(10);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tourist_spots');
    }
};
