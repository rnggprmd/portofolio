<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin User Account Only
        User::updateOrCreate(
            ['email' => 'admin@portofolio.com'],
            [
                'name' => 'Rangga Pramudya',
                'password' => Hash::make('devByPass'),
            ]
        );
    }
}
