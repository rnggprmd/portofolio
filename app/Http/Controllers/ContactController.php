<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|max:5000',
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'name.max' => 'Nama lengkap maksimal 100 karakter.',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Alamat email maksimal 150 karakter.',
            'subject.max' => 'Subjek maksimal 200 karakter.',
            'message.required' => 'Isi pesan wajib diisi.',
            'message.max' => 'Isi pesan maksimal 5000 karakter.',
        ]);

        Message::create($validated);

        return back()->with('success', 'Pesan Anda berhasil dikirim!');
    }
}
