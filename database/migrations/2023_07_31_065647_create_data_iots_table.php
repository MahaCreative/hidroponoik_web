<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data_iots', function (Blueprint $table) {
            $table->id();
            $table->string('dinamo1')->default('off');
            $table->string('dinamo2')->default('off');
            $table->string('data_suhu');
            $table->string('data_ph');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_iots');
    }
};