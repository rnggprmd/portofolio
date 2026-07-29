<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_projects' => Project::count(),
                'total_skills' => Skill::count(),
                'unread_messages' => Message::where('is_read', false)->count(),
                'total_messages' => Message::count(),
            ],
            'recent_messages' => Message::latest()->take(5)->get(),
        ]);
    }
}
