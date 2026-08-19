<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('period', 60);
            $table->string('role', 100);
            $table->string('company', 100);
            $table->string('type', 50)->nullable()->default('Career');
            $table->string('location', 100)->nullable();
            $table->text('description')->nullable();
            $table->json('responsibilities')->nullable();
            $table->json('tech_badges')->nullable();
            $table->unsignedSmallInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
