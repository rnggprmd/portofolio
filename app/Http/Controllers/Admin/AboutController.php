<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        $defaultParagraphs = [
            'Saya adalah seorang Software Engineer berlatar belakang Sistem Informasi dengan passion kuat pada pengembangan aplikasi web performan tinggi.',
            'Pengalaman berfokus pada ekosistem Laravel & React, membangun arsitektur clean code, arsitektur database terstruktur, serta antarmuka pengguna yang responsif.',
            'Selalu bersemangat mempelajari teknologi web modern, metodologi arsitektur sistem terbaru, dan menciptakan produk digital yang berdampak nyata.',
        ];

        $defaultPrinciples = [
            'Clean Code & Arsitektur Terstruktur yang Mudah Dideploy',
            'Pengalaman Pengguna (UI/UX) Presisi & Responsif',
            'Pembelajaran Berkelanjutan & Adaptasi Teknologi Terbaru',
        ];

        $defaultFocusSkills = [
            ['name' => 'Full-Stack Development (Laravel & React)', 'percent' => '92'],
            ['name' => 'RESTful API & Database Architecture', 'percent' => '88'],
            ['name' => 'UI/UX Precision & Responsive Design', 'percent' => '90'],
        ];

        $defaults = [
            'about_tag' => 'Latar Belakang & Filosofi',
            'about_title' => 'Tentang Saya & Visi Pengembangan',
            'about_avatar_url' => '',
            'about_paragraphs' => json_encode($defaultParagraphs),
            'about_philosophy_title' => 'Prinsip Utama dalam Membangun Perangkat Lunak:',
            'about_principles' => json_encode($defaultPrinciples),
            'about_focus_skills' => json_encode($defaultFocusSkills),
            'about_skill1_name' => 'Full-Stack Development (Laravel & React)',
            'about_skill1_percent' => '92',
            'about_skill2_name' => 'RESTful API & Database Architecture',
            'about_skill2_percent' => '88',
            'about_skill3_name' => 'UI/UX Precision & Responsive Design',
            'about_skill3_percent' => '90',
            'about_interests' => 'Membaca Dokumentasi & Tech Blogs, Mengembangkan Web Tools Open-Source, Desain Antarmuka & UX Prototyping, Eksplorasi Arsitektur Database',
        ];

        $settings = [];
        foreach ($defaults as $key => $defaultVal) {
            $val = SiteSetting::getByKey($key);
            if (is_null($val) || $val === '') {
                SiteSetting::setKey($key, $defaultVal);
                $settings[$key] = $defaultVal;
            } else {
                $settings[$key] = $val;
            }
        }

        return Inertia::render('Admin/About/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'about_avatar_file' => 'nullable|image|mimes:jpg,jpeg,png,webp,svg|max:5120',
        ]);

        $data = $request->except(['_token', 'about_avatar_file']);

        // Handle dedicated About avatar file upload
        if ($request->hasFile('about_avatar_file')) {
            $path = $request->file('about_avatar_file')->store('about', 'public');
            SiteSetting::setKey('about_avatar_url', '/storage/' . $path);
            unset($data['about_avatar_url']); // Prevent overwriting with form fallback!
        }

        // Process dynamic about_paragraphs array into JSON
        if (isset($data['about_paragraphs'])) {
            $paragraphs = is_array($data['about_paragraphs']) ? array_values(array_filter($data['about_paragraphs'])) : $data['about_paragraphs'];
            $data['about_paragraphs'] = is_array($paragraphs) ? json_encode($paragraphs) : $paragraphs;
        }

        // Process dynamic about_principles array into JSON
        if (isset($data['about_principles'])) {
            $principles = is_array($data['about_principles']) ? array_values(array_filter($data['about_principles'])) : $data['about_principles'];
            $data['about_principles'] = is_array($principles) ? json_encode($principles) : $principles;
        }

        // Process dynamic about_focus_skills array into JSON
        if (isset($data['about_focus_skills'])) {
            $skills = is_array($data['about_focus_skills']) ? array_values(array_filter($data['about_focus_skills'], fn($s) => !empty($s['name']))) : $data['about_focus_skills'];
            $data['about_focus_skills'] = is_array($skills) ? json_encode($skills) : $skills;
        }

        foreach ($data as $key => $value) {
            if ($key === 'about_avatar_url' && empty($value)) {
                $existing = SiteSetting::getByKey('about_avatar_url');
                if (!empty($existing)) {
                    continue;
                }
            }

            SiteSetting::setKey($key, is_array($value) ? json_encode($value) : $value);
        }

        return redirect()->back()->with('success', 'Pengaturan Seksi About berhasil diperbarui.');
    }
}
