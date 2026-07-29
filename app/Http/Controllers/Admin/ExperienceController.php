<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Experiences/Index', [
            'experiences' => Experience::orderBy('order', 'asc')->orderBy('id', 'desc')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'period' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'responsibilities' => 'nullable|array',
            'tech_badges' => 'nullable|array',
        ]);

        Experience::create($validated);

        return redirect()->back()->with('success', 'Pengalaman berhasil ditambahkan.');
    }

    public function update(Request $request, Experience $experience): RedirectResponse
    {
        $validated = $request->validate([
            'period' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'responsibilities' => 'nullable|array',
            'tech_badges' => 'nullable|array',
        ]);

        $experience->update($validated);

        return redirect()->back()->with('success', 'Pengalaman berhasil diperbarui.');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();
        return redirect()->back()->with('success', 'Pengalaman berhasil dihapus.');
    }
}
