<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Projects/Index', [
            'projects' => Project::latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'features.*' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'image_url' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpg,jpeg,png,webp,svg|max:5120',
            'tech_stack' => 'nullable|array',
            'demo_url' => 'nullable|string',
            'github_url' => 'nullable|string',
            'is_featured' => 'boolean',
        ]);

        // Filter out empty feature strings
        if (!empty($validated['features'])) {
            $validated['features'] = array_values(array_filter($validated['features'], fn($f) => !empty(trim($f))));
        }

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('projects', 'public');
            $validated['image'] = '/storage/' . $path;
        } elseif (empty($validated['image']) && !empty($validated['image_url'])) {
            $validated['image'] = $validated['image_url'];
        }
        unset($validated['image_url'], $validated['image_file']);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(5);

        Project::create($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Proyek berhasil ditambahkan!');
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'features.*' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'image_url' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpg,jpeg,png,webp,svg|max:5120',
            'tech_stack' => 'nullable|array',
            'demo_url' => 'nullable|string',
            'github_url' => 'nullable|string',
            'is_featured' => 'boolean',
        ]);

        // Filter out empty feature strings
        if (!empty($validated['features'])) {
            $validated['features'] = array_values(array_filter($validated['features'], fn($f) => !empty(trim($f))));
        }

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('projects', 'public');
            $validated['image'] = '/storage/' . $path;
        } elseif (empty($validated['image']) && !empty($validated['image_url'])) {
            $validated['image'] = $validated['image_url'];
        }
        unset($validated['image_url'], $validated['image_file']);

        $project->update($validated);

        return redirect()->route('admin.projects.index')->with('success', 'Proyek berhasil diperbarui!');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Proyek berhasil dihapus!');
    }
}
