<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('title', 150);
            $table->string('issuer', 100);
            $table->string('year', 20);
            $table->string('credential_id', 100)->nullable();
            $table->string('badge', 50)->nullable(); // Expert, Professional, Certified
            $table->string('verify_url', 255)->nullable();
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
