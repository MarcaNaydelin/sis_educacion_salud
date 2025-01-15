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
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('address');
            $table->enum('zone', ['zona norte', 'zona sur']);
            $table->string('district');
            $table->json('location');
            $table->enum('type', ['Fiscal', 'Convenio', 'Tecnico']);
            $table->enum('shift', ['Turno mañana', 'Turno tarde', 'Turno nocturno']);
            $table->boolean('status');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};
