<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the profile edit form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Admin/Profile/Edit', [
            'user' => [
                'name' => $request->user()->name,
                'email' => $request->user()->email,
            ],
            'site_logo' => SiteSetting::getByKey('site_logo', '/storage/logo/logo%20portofolio.png'),
        ]);
    }

    /**
     * Update the user's profile information and site logo.
     */
    public function updateProfile(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'logo_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,svg,ico', 'max:5120'],
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Alamat email sudah digunakan oleh pengguna lain.',
            'logo_file.image' => 'File logo harus berupa gambar.',
            'logo_file.max' => 'Ukuran logo maksimal 5 MB.',
        ]);

        $user->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);
        $user->save();

        if ($request->hasFile('logo_file')) {
            $path = $request->file('logo_file')->store('logo', 'public');
            SiteSetting::setKey('site_logo', '/storage/' . $path);
        }

        return redirect()->back()->with('success', 'Informasi profil & logo berhasil diperbarui.');
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ], [
            'current_password.required' => 'Password saat ini wajib diisi.',
            'current_password.current_password' => 'Password saat ini yang Anda masukkan salah.',
            'password.required' => 'Password baru wajib diisi.',
            'password.min' => 'Password baru minimal harus 8 karakter.',
            'password.confirmed' => 'Konfirmasi password baru tidak cocok.',
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->back()->with('success', 'Password akun berhasil diperbarui.');
    }
}
