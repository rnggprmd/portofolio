<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\Skill;
use App\Models\TechStack;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $defaults = [
            'hero_name' => 'Rangga Pramudya',
            'hero_role' => 'Software Engineer',
            'hero_titles' => 'Full-Stack Web Developer, System Information Specialist, Laravel & React Architect',
            'hero_description' => 'Software Engineer specializing in Laravel, React, and modern web architectures.',
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

        $projects = Project::latest()->get();
        $skills = Skill::all();
        $experiences = Experience::orderBy('order', 'asc')->orderBy('id', 'desc')->get();
        $certificates = Certificate::orderBy('order', 'asc')->orderBy('id', 'desc')->get();
        $techStacks = TechStack::orderBy('order', 'asc')->orderBy('id', 'desc')->get();
        
        $dbSettings = SiteSetting::pluck('value', 'key')->all();
        $settings = array_merge($defaults, $dbSettings);

        // Calculate auto dynamic real-time counts from DB with fallback / override capability
        $statsCounts = [
            'projects' => isset($settings['stat_projects']) && $settings['stat_projects'] !== '' ? (int)$settings['stat_projects'] : ($projects->count() > 0 ? $projects->count() : 15),
            'experience' => isset($settings['stat_experience']) && $settings['stat_experience'] !== '' ? (int)$settings['stat_experience'] : ($experiences->count() > 0 ? $experiences->count() : 3),
            'certificates' => isset($settings['stat_certificates']) && $settings['stat_certificates'] !== '' ? (int)$settings['stat_certificates'] : ($certificates->count() > 0 ? $certificates->count() : 10),
            'techStack' => isset($settings['stat_tech_stack']) && $settings['stat_tech_stack'] !== '' ? (int)$settings['stat_tech_stack'] : ($techStacks->count() > 0 ? $techStacks->count() : 12),
        ];

        return Inertia::render('Home', [
            'projects' => $projects,
            'skills' => $skills,
            'experiences' => $experiences,
            'certificates' => $certificates,
            'techStacks' => $techStacks,
            'settings' => $settings,
            'statsCounts' => $statsCounts,
        ]);
    }
}
