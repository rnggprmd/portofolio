<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TechStack;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TechStackController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/TechStacks/Index', [
            'techStacks' => TechStack::orderBy('order', 'asc')->orderBy('id', 'desc')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'icon_name' => 'required|string|max:255',
            'proficiency' => 'nullable|string|max:255',
        ]);

        TechStack::create($validated);

        return redirect()->back()->with('success', 'Tech Stack berhasil ditambahkan.');
    }

    public function update(Request $request, TechStack $techStack): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'icon_name' => 'required|string|max:255',
            'proficiency' => 'nullable|string|max:255',
        ]);

        $techStack->update($validated);

        return redirect()->back()->with('success', 'Tech Stack berhasil diperbarui.');
    }

    public function destroy(TechStack $techStack): RedirectResponse
    {
        $techStack->delete();
        return redirect()->back()->with('success', 'Tech Stack berhasil dihapus.');
    }
}
