<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Message;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\Skill;
use App\Models\TechStack;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $cvUrl = SiteSetting::getByKey('cv_url', '#');
        $siteLogo = SiteSetting::getByKey('site_logo', '/storage/logo/logo%20portofolio.png');
        $githubUsername = SiteSetting::getByKey('github_username', 'rnggprmd');

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_projects' => Project::count(),
                'total_skills' => Skill::count(),
                'total_experiences' => Experience::count(),
                'total_certificates' => Certificate::count(),
                'total_tech_stacks' => TechStack::count(),
                'unread_messages' => Message::where('is_read', false)->count(),
                'total_messages' => Message::count(),
            ],
            'recent_messages' => Message::latest()->take(5)->get(),
            'recent_projects' => Project::latest()->take(4)->get(),
            'system_info' => [
                'cv_uploaded' => !empty($cvUrl) && $cvUrl !== '#',
                'site_logo' => $siteLogo,
                'github_username' => $githubUsername,
                'framework_stack' => 'Laravel 13 + React 19 + Inertia.js',
            ],
        ]);
    }
}
