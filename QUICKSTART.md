# 🚀 Quick Start Guide

## Menjalankan Project

### 1. Start Development Server

```bash
composer dev
```

Atau manual:
```bash
# Terminal 1
php artisan serve

# Terminal 2
npm run dev
```

### 2. Buka Browser

```
http://localhost:8000
```

## ✏️ Edit Konten Portfolio

### Mengubah Nama & Title

Edit `resources/js/Pages/Home.jsx` baris 28-32:

```jsx
<h1 className="text-5xl md:text-7xl font-bold mb-6">
    Hi, I'm <span className="...">Nama Anda</span>
</h1>
<p className="text-xl md:text-2xl text-gray-300 mb-8">
    Full Stack Developer | React Enthusiast | Laravel Expert
</p>
```

### Mengubah About Section

Edit baris 60-70 di `Home.jsx`:

```jsx
<p className="text-lg text-gray-300">
    Tulis deskripsi tentang diri Anda di sini...
</p>
```

### Mengubah Skills

Edit baris 95 di `Home.jsx`:

```jsx
{['React', 'Laravel', 'JavaScript', 'PHP', 'Tailwind CSS', 'MySQL', 'Git', 'Node.js'].map((skill) => (
    // Ganti dengan skills Anda
))}
```

### Mengubah Projects

Edit baris 110-130 di `Home.jsx` untuk menambah/edit project showcase.

### Mengubah Social Media Links

Edit baris 75-85 di `Home.jsx`:

```jsx
<a href="https://github.com/username" className="...">
    {/* GitHub Icon */}
</a>
<a href="https://linkedin.com/in/username" className="...">
    {/* LinkedIn Icon */}
</a>
```

## 🎨 Customization Tips

### Mengubah Warna Theme

Ganti gradient colors di `Home.jsx`:

```jsx
// Background
className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"

// Text gradient
className="bg-gradient-to-r from-blue-400 to-purple-500"

// Ubah blue-400, purple-500 dengan warna pilihan Anda
```

### Menambah Section Baru

```jsx
<section id="new-section" className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
            Section Title
        </h2>
        {/* Content here */}
    </div>
</section>
```

## 📦 Build untuk Production

```bash
npm run build
```

File hasil build ada di `public/build/`

## 🔧 Troubleshooting

### Perubahan tidak muncul?
- Pastikan `npm run dev` sedang berjalan
- Refresh browser dengan Ctrl+F5 (hard refresh)

### Error saat build?
```bash
npm run build
```

### Clear cache Laravel
```bash
php artisan optimize:clear
```

## 📚 File Penting

- `resources/js/Pages/Home.jsx` - Main portfolio page
- `resources/js/app.jsx` - Inertia entry point
- `resources/css/app.css` - Tailwind CSS
- `routes/web.php` - Laravel routes
- `vite.config.js` - Vite configuration

## 🎯 Next Steps

1. ✅ Ganti semua placeholder content
2. ✅ Tambahkan foto/gambar profil
3. ✅ Update social media links
4. ✅ Tambahkan real projects
5. ✅ Implementasi contact form backend
6. ✅ Deploy ke hosting

---

Butuh bantuan? Baca `SETUP.md` untuk dokumentasi lengkap.
