# 📘 Panduan Deployment InfinityFree: portofoliorangga.page.gd

> ⚠️ **KEAMANAN:** Jangan upload file ini ke server! Tambahkan ke `.gitignore`.

Dokumen ini sudah disesuaikan untuk deployment InfinityFree.
- **Domain:** `https://portofoliorangga.page.gd`
- **Username:** `if0_42692600`
- **FTP Password:** `KgQFk4NxTg`

---

## 📌 Status File yang Sudah Siap di Project Anda:
1. **Frontend Assets:** Sudah di-build (`npm run build` sukses).
2. **Vendor:** Sudah teroptimasi (`composer install --optimize-autoloader --no-dev`).
3. **[`config/filesystems.php`](file:///c:/laragon/www/portofolio/config/filesystems.php):** Disetel ke `public_path('storage')` (upload admin otomatis bisa diakses tanpa symlink).
4. **[`.htaccess`](file:///c:/laragon/www/portofolio/.htaccess):** Meroute traffic dari `htdocs` ke `public/index.php`.
5. **[`portofolio_infinityfree.sql`](file:///c:/laragon/www/portofolio/portofolio_infinityfree.sql):** Database export siap diimport via phpMyAdmin.

---

## 📑 LANGKAH 1: Buat Database & Import SQL (2 Menit)

1. Buka [InfinityFree Control Panel](https://app.infinityfree.com/) dan pilih akun Anda (`if0_42692600`).
2. Klik menu **MySQL Databases** di vPanel / Control Panel.
3. Di kolom **Create Database**, masukkan nama: `portofolio` → Klik **Create Database**.
4. Setelah dibuat, **catat MySQL Hostname** yang muncul di halaman tersebut (contoh: `sql302.infinityfree.com` atau `sql204.infinityfree.com`). Nama database lengkap Anda adalah: `if0_42692600_portofolio`.
5. Klik tombol **phpMyAdmin** di samping nama database tersebut.
6. Di phpMyAdmin:
   - Klik tab **Import** (di bagian atas).
   - Klik **Choose File** → Pilih file **`portofolio_infinityfree.sql`** di folder project Anda (`c:\laragon\www\portofolio\portofolio_infinityfree.sql`).
   - Scroll ke bawah → Klik tombol **Import / Go**.
   - Tunggu hingga muncul notifikasi sukses berwarna hijau.

---

## 📑 LANGKAH 2: Sesuaikan File `.env` di Laptop

Buka file **`.env`** di folder project komputer Anda (`c:\laragon\www\portofolio\.env`) dan ganti konfigurasinya dengan:

```env
APP_NAME="Portofolio Rangga"
APP_ENV=production
APP_KEY=base64:gww02KvJhQJZpviahDcrYITiIOXKwHmCkk9AyZgzZ5A=
APP_DEBUG=false
APP_URL=https://portofoliorangga.page.gd

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=sql204.infinityfree.com
DB_PORT=3306
DB_DATABASE=if0_42692600_portofolio
DB_USERNAME=if0_42692600
DB_PASSWORD=KgQFk4NxTg

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=public
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```
> *(Ganti `sqlxxx.infinityfree.com` dengan MySQL Hostname yang Anda dapatkan di Langkah 1).*
*Simpan file `.env` (Ctrl + S).*

---

## 📑 LANGKAH 3: Upload Semua File via FileZilla (FTP)

1. Buka aplikasi **FileZilla** di laptop Anda.
2. Di baris paling atas (Quickconnect):
   - **Host:** `ftpupload.net`
   - **Username:** `if0_42692600`
   - **Password:** `KgQFk4NxTg`
   - **Port:** `21`
   - Klik **Quickconnect**.
3. **Di panel kanan (Server):** Buka folder **`htdocs`**. Hapus file `index2.html` jika ada.
4. **Di panel kiri (Laptop):** Buka folder `c:\laragon\www\portofolio`.
5. Pilih **SEMUA FILE DAN FOLDER** di dalam `c:\laragon\www\portofolio` KECUALI folder `node_modules` dan `.git`.
6. Klik kanan → **Upload**.
7. Tunggu hingga semua file selesai ditransfer.

---

## 📑 LANGKAH 4: Buka Website & Login Admin

1. Buka Landing Page di browser:  
   👉 **`https://portofoliorangga.page.gd`**

2. Masuk ke Admin Panel:  
   👉 **`https://portofoliorangga.page.gd/login`**
   - 📧 **Email:** `admin@portofolio.com`
   - 🔑 **Password:** *(Default dari database SQL)*

3. **Ubah Password Admin:**  
   Masuk ke **Pengaturan Profil & Password** di Admin Panel, lalu ganti dengan password rahasia pribadi Anda.

---

Selesai! Portofolio Anda kini sudah **100% Live** di `https://portofoliorangga.page.gd`! 🎉
