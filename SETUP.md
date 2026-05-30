# Portfolio Landing Page - Laravel + Inertia.js + React

Portfolio landing page modern yang dibangun dengan Laravel 13, Inertia.js, dan React.

## 🚀 Tech Stack

- **Backend**: Laravel 13.12
- **Frontend**: React 18 + Inertia.js
- **Styling**: Tailwind CSS 4.0
- **Build Tool**: Vite 8
- **Database**: MySQL

## 📦 Instalasi

Semua dependencies sudah terinstall. Jika perlu install ulang:

```bash
composer install
npm install
```

## 🔧 Konfigurasi

File `.env` sudah dikonfigurasi dengan:
- Database: MySQL (portofolio)
- APP_KEY sudah di-generate
- Migrations sudah dijalankan

## 🎨 Development

### Menjalankan Development Server

**Opsi 1: Menggunakan composer script (Recommended)**
```bash
composer dev
```
Ini akan menjalankan:
- PHP development server (http://localhost:8000)
- Queue listener
- Log viewer (Pail)
- Vite dev server (Hot Module Replacement)

**Opsi 2: Manual**
```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev
```

Buka browser: `http://localhost:8000`

## 🏗️ Build untuk Production

```bash
npm run build
```

## 📁 Struktur File React

```
resources/
├── js/
│   ├── app.jsx              # Entry point Inertia
│   ├── bootstrap.js         # Axios setup
│   └── Pages/
│       └── Home.jsx         # Portfolio landing page
├── css/
│   └── app.css             # Tailwind CSS
└── views/
    └── app.blade.php       # Root template Inertia
```

## 🎯 Fitur Landing Page

### Sections yang sudah dibuat:
1. **Navigation** - Fixed navbar dengan smooth scroll
2. **Hero Section** - Intro dengan CTA buttons
3. **About Section** - Profil dan social media links
4. **Skills Section** - Grid teknologi yang dikuasai
5. **Projects Section** - Portfolio projects showcase
6. **Contact Section** - Contact form
7. **Footer** - Copyright info

### Styling:
- ✅ Responsive design (mobile-friendly)
- ✅ Dark theme dengan gradient
- ✅ Hover animations
- ✅ Smooth transitions
- ✅ Modern glassmorphism effects

## ✏️ Customization

### Mengubah Konten

Edit file `resources/js/Pages/Home.jsx`:

```jsx
// Ubah nama dan title
<h1>Hi, I'm <span>Your Name</span></h1>
<p>Full Stack Developer | React Enthusiast</p>

// Ubah skills
{['React', 'Laravel', 'JavaScript', ...].map((skill) => (...))}

// Tambah/edit projects
{[1, 2, 3].map((project) => (...))}
```

### Menambah Page Baru

1. Buat component baru di `resources/js/Pages/`:
```jsx
// resources/js/Pages/About.jsx
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <>
            <Head title="About" />
            <div>About Page Content</div>
        </>
    );
}
```

2. Tambah route di `routes/web.php`:
```php
Route::get('/about', function () {
    return Inertia::render('About');
});
```

### Styling dengan Tailwind

Tailwind CSS 4.0 sudah aktif. Gunakan utility classes:
```jsx
<div className="bg-blue-500 hover:bg-blue-600 rounded-lg p-4">
    Content
</div>
```

## 🔗 Inertia.js Links

Untuk navigasi antar halaman, gunakan Inertia Link:
```jsx
import { Link } from '@inertiajs/react';

<Link href="/about">About</Link>
```

## 📝 Tips Development

1. **Hot Module Replacement**: Perubahan React akan auto-reload
2. **Tailwind JIT**: Classes baru akan auto-compile
3. **React DevTools**: Install extension untuk debugging
4. **Inertia DevTools**: Tersedia di browser console

## 🐛 Troubleshooting

### Build Error
```bash
npm run build
```
Jika error, coba:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Cache Issues
```bash
php artisan optimize:clear
```

## 📚 Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## 🎉 Next Steps

1. Ganti placeholder content dengan data asli Anda
2. Tambahkan gambar/foto profil
3. Implementasi contact form functionality
4. Tambahkan animasi dengan Framer Motion (optional)
5. Setup SEO meta tags
6. Deploy ke hosting

---

Built with ❤️ using Laravel + Inertia.js + React
