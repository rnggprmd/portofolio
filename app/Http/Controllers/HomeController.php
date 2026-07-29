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
        $projects = Project::latest()->get();
        $skills = Skill::all();
        $experiences = Experience::orderBy('order', 'asc')->orderBy('id', 'desc')->get();
        $certificates = Certificate::orderBy('order', 'asc')->orderBy('id', 'desc')->get();
        $techStacks = TechStack::orderBy('order', 'asc')->orderBy('id', 'desc')->get();
        $settings = SiteSetting::pluck('value', 'key')->all();

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
