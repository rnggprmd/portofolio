<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => Certificate::orderBy('order', 'asc')->orderBy('id', 'desc')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'issuer' => 'required|string|max:100',
            'year' => 'required|string|max:20',
            'credential_id' => 'nullable|string|max:100',
            'badge' => 'nullable|string|max:50',
            'verify_url' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'order' => 'nullable|integer|min:0|max:65535',
        ]);

        Certificate::create($validated);

        return redirect()->back()->with('success', 'Sertifikat berhasil ditambahkan.');
    }

    public function update(Request $request, Certificate $certificate): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'issuer' => 'required|string|max:100',
            'year' => 'required|string|max:20',
            'credential_id' => 'nullable|string|max:100',
            'badge' => 'nullable|string|max:50',
            'verify_url' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'order' => 'nullable|integer|min:0|max:65535',
        ]);

        $certificate->update($validated);

        return redirect()->back()->with('success', 'Sertifikat berhasil diperbarui.');
    }

    public function destroy(Certificate $certificate): RedirectResponse
    {
        $certificate->delete();
        return redirect()->back()->with('success', 'Sertifikat berhasil dihapus.');
    }
}
