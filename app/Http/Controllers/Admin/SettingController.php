<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
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
            'about_story_1' => 'Saya adalah seorang Software Engineer berlatar belakang Sistem Informasi dengan passion kuat pada pengembangan aplikasi web performan tinggi.',
            'about_story_2' => 'Pengalaman berfokus pada ekosistem Laravel & React, membangun arsitektur clean code, arsitektur database terstruktur, serta antarmuka pengguna yang responsif.',
            'contact_email' => 'rangga.pramudya@example.com',
            'github_username' => 'rnggprmd',
            'github_url' => 'https://github.com/rnggprmd',
            'github_commits' => '680+',
            'github_streak' => '24 Days',
            'github_prs' => '45+',
            'github_repos' => '18',
            'linkedin_url' => 'https://linkedin.com',
            'cv_url' => '#',
        ];

        $settings = [];
        foreach ($defaults as $key => $defaultVal) {
            $val = SiteSetting::getByKey($key);
            $settings[$key] = (!is_null($val) && $val !== '') ? $val : $defaultVal;
        }

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'cv_file' => 'nullable|file|mimes:pdf|max:10240',
            'avatar_file' => 'nullable|image|mimes:jpg,jpeg,png,webp,svg|max:5120',
        ]);

        if ($request->hasFile('cv_file')) {
            $path = $request->file('cv_file')->store('cv', 'public');
            SiteSetting::setKey('cv_url', '/storage/' . $path);
        }

        if ($request->hasFile('avatar_file')) {
            $path = $request->file('avatar_file')->store('avatars', 'public');
            SiteSetting::setKey('avatar_url', '/storage/' . $path);
        }

        $data = $request->except(['_token', 'cv_file', 'avatar_file']);

        // Auto sync github_url if username is provided
        if (!empty($data['github_username'])) {
            $username = trim($data['github_username'], '@');
            $data['github_username'] = $username;
            if (empty($data['github_url']) || str_contains($data['github_url'], 'github.com')) {
                $data['github_url'] = 'https://github.com/' . $username;
            }
        }

        foreach ($data as $key => $value) {
            SiteSetting::setKey($key, is_array($value) ? json_encode($value) : $value);
        }

        return redirect()->back()->with('success', 'Pengaturan situs berhasil diperbarui.');
    }
}
