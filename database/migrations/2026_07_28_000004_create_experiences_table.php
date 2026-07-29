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
            $table->string('period');
            $table->string('role');
            $table->string('company');
            $table->string('type')->nullable()->default('Career');
            $table->string('location')->nullable();
            $table->text('description')->nullable();
            $table->json('responsibilities')->nullable();
            $table->json('tech_badges')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
