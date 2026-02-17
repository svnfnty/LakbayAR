<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{
    public function up(): void
    {
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreignId('tourist_spot_id')->constrained('tourist_spots')->onDelete('cascade');
            $table->timestamp('visited_at')->useCurrent();
            $table->integer('points_earned')->default(0);
            $table->timestamps();

            $table->index('user_id');
            $table->index('tourist_spot_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
