<?php

namespace Database\Seeders;

use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\Skill;
use App\Models\TechStack;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Rangga Pramudya',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Site Settings (Hero, Card & Profile)
        $defaultSettings = [
            'hero_name' => 'Rangga Pramudya',
            'hero_role' => 'Senior Software Engineer',
            'hero_titles' => 'Full-Stack Web Developer, System Information Specialist, Laravel & React Architect',
            'hero_description' => 'Software Engineer specializing in Laravel, React, and modern web architectures. Focused on clean code, performance, and user-centered design.',
            'avatar_url' => '',
            'specialty_label' => 'FULL-STACK ARCHITECT',
            'card_tech_tags' => 'Laravel, React, Tailwind',
            'about_story_1' => 'Saya adalah seorang Software Engineer berlatar belakang Sistem Informasi dengan passion kuat pada pengembangan aplikasi web performan tinggi.',
            'about_story_2' => 'Pengalaman berfokus pada ekosistem Laravel & React, membangun arsitektur clean code, arsitektur database terstruktur, serta antarmuka pengguna yang responsif.',
            'contact_email' => 'rangga.pramudya@example.com',
            'contact_location' => 'Indonesia (UTC+7 / WIB)',
            'availability_status' => 'Open for Freelance & Full-Time',
            'github_url' => 'https://github.com',
            'linkedin_url' => 'https://linkedin.com',
            'cv_url' => '#',
        ];

        foreach ($defaultSettings as $key => $val) {
            SiteSetting::setKey($key, $val);
        }

        // 3. Projects Initial Seed
        if (Project::count() === 0) {
            Project::create([
                'title' => 'Enterprise E-Commerce SaaS Platform',
                'category' => 'Full Stack',
                'description' => 'High-scale multi-tenant e-commerce platform built with Laravel 13, React 19, Inertia.js, and Redis caching layer.',
                'tech_stack' => ['Laravel 13', 'React 19', 'Inertia.js', 'Tailwind CSS', 'MySQL'],
                'demo_url' => 'https://example.com',
                'github_url' => 'https://github.com',
                'is_featured' => true,
            ]);
            Project::create([
                'title' => 'AI Integrated Logistics Dashboard',
                'category' => 'Backend',
                'description' => 'Real-time supply chain tracking dashboard with predictive analytics and automated dispatching system.',
                'tech_stack' => ['Laravel', 'React', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
                'demo_url' => 'https://example.com',
                'github_url' => 'https://github.com',
                'is_featured' => true,
            ]);
        }

        // 4. Skills Initial Seed
        if (Skill::count() === 0) {
            Skill::create(['name' => 'Laravel & PHP', 'category' => 'Backend', 'percentage' => 92]);
            Skill::create(['name' => 'React & Next.js', 'category' => 'Frontend', 'percentage' => 90]);
            Skill::create(['name' => 'Tailwind CSS & Framer Motion', 'category' => 'Frontend', 'percentage' => 94]);
            Skill::create(['name' => 'MySQL & PostgreSQL', 'category' => 'Database', 'percentage' => 88]);
        }

        // 5. Experiences Initial Seed
        if (Experience::count() === 0) {
            Experience::create([
                'period' => '2024 — PRESENT',
                'role' => 'Senior Full-Stack Engineer',
                'company' => 'Tech Solutions Agency',
                'type' => 'Career',
                'location' => 'Jakarta / Remote',
                'description' => 'Memimpin pengembangan sistem e-commerce enterprise dan arsitektur microservices berbasis Laravel dan React.',
                'responsibilities' => [
                    'Merancang arsitektur database relasional berskala tinggi',
                    'Mengimplementasikan integrasi payment gateway otomatis',
                    'Mengoptimalkan performa halaman hingga 98+ PageSpeed Score'
                ],
                'tech_badges' => ['Laravel 13', 'React 19', 'Inertia.js', 'Docker', 'PostgreSQL'],
                'order' => 1,
            ]);
            Experience::create([
                'period' => '2022 — 2024',
                'role' => 'Full-Stack Developer',
                'company' => 'Digital Creative Studio',
                'type' => 'Freelance',
                'location' => 'Bandung, Indonesia',
                'description' => 'Membangun aplikasi web kustom untuk klien internasional menggunakan stack Laravel dan Vue/React.',
                'responsibilities' => [
                    'Mengembangkan RESTful APIs untuk aplikasi mobile & web',
                    'Merancang komponen UI reaktif berbasis Tailwind CSS'
                ],
                'tech_badges' => ['Laravel', 'Vue.js', 'MySQL', 'Tailwind CSS'],
                'order' => 2,
            ]);
        }

        // 6. Certificates Initial Seed
        if (Certificate::count() === 0) {
            Certificate::create([
                'title' => 'Laravel Certified Professional Developer',
                'issuer' => 'Laravel LLC',
                'year' => '2025',
                'credential_id' => 'LARAVEL-DEV-8894',
                'badge' => 'Certified',
                'verify_url' => 'https://example.com/verify',
                'description' => 'Sertifikasi keahlian resmi dalam arsitektur Laravel, Eloquent ORM, security, dan pengujian otomatis.',
                'order' => 1,
            ]);
            Certificate::create([
                'title' => 'Meta Advanced React Front-End Developer',
                'issuer' => 'Meta / Coursera',
                'year' => '2024',
                'credential_id' => 'META-REACT-3392',
                'badge' => 'Expert',
                'verify_url' => 'https://example.com/verify',
                'description' => 'Sertifikasi keahlian profesional dalam React Hooks, State Management, dan Arsitektur Komponen.',
                'order' => 2,
            ]);
        }

        // 7. Tech Stacks Initial Seed
        if (TechStack::count() === 0) {
            TechStack::create(['name' => 'Laravel 13', 'category' => 'Backend Framework', 'icon_name' => 'Laravel', 'proficiency' => 'Expert', 'order' => 1]);
            TechStack::create(['name' => 'React 19', 'category' => 'UI Framework', 'icon_name' => 'React', 'proficiency' => 'Expert', 'order' => 2]);
            TechStack::create(['name' => 'Tailwind v4', 'category' => 'Design System', 'icon_name' => 'Tailwind', 'proficiency' => 'Expert', 'order' => 3]);
            TechStack::create(['name' => 'Inertia.js', 'category' => 'Monolith Adapter', 'icon_name' => 'Inertia', 'proficiency' => 'Advanced', 'order' => 4]);
            TechStack::create(['name' => 'PostgreSQL', 'category' => 'Relational Database', 'icon_name' => 'Postgresql', 'proficiency' => 'Advanced', 'order' => 5]);
            TechStack::create(['name' => 'Docker', 'category' => 'Containerization', 'icon_name' => 'Docker', 'proficiency' => 'Intermediate', 'order' => 6]);
        }
    }
}
