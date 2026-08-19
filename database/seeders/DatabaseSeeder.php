<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User Account
        User::updateOrCreate(
            ['email' => 'admin@portofolio.com'],
            [
                'name' => 'Rangga Pramudya',
                'password' => Hash::make('devByPass'),
            ]
        );

        // 2. Default Site Settings
        $defaultSettings = [
            'hero_name' => 'Rangga Pramudya',
            'hero_role' => 'Senior Software Engineer',
            'hero_titles' => 'Full-Stack Web Developer, System Information Specialist, Laravel & React Architect',
            'hero_description' => 'Software Engineer specializing in Laravel, React, and modern web architectures. Focused on clean code, performance, and user-centered design.',
            'avatar_url' => '',
            'specialty_label' => 'FULL-STACK ARCHITECT',
            'card_tech_tags' => 'Laravel, React, Tailwind',
            'contact_email' => 'rangga.pramudya@example.com',
            'github_username' => 'rnggprmd',
            'github_url' => 'https://github.com/rnggprmd',
            'linkedin_url' => 'https://linkedin.com',
            'cv_url' => '#',
            'site_logo' => '/storage/logo/logo%20portofolio.png',
        ];

        foreach ($defaultSettings as $key => $val) {
            SiteSetting::setKey($key, $val);
        }
    }
}
