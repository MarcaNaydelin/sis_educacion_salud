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
        Schema::create('hospitals', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('director')->unique();
            $table->string('address');
            $table->enum('zone', ['zona norte', 'zona sur']);
            $table->string('district');
            $table->json('location');
            $table->enum('level', ['Primer nivel', 'Segundo nivel', 'Tercer nivel']);
            $table->json('shifts');
            $table->boolean('status');
            $table->json('phone_numbers');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospitals');
    }
};
