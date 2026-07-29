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

        return Inertia::render('Home', [
            'projects' => $projects,
            'skills' => $skills,
            'experiences' => $experiences,
            'certificates' => $certificates,
            'techStacks' => $techStacks,
            'settings' => $settings,
        ]);
    }
}
