# Panduan Lengkap Deploy Portofolio Laravel ke InfinityFree

Panduan ini disusun secara bertahap agar Anda dapat mendeploy aplikasi portofolio ini ke hosting **InfinityFree** dengan sukses tanpa mengalami kendala error atau gambar tidak muncul.

---

## 📌 Pengaturan Khusus yang Sudah Disiapkan
Sebelum memulai, berikut 3 file penting yang sudah dibuat/disesuaikan otomatis untuk kompatibilitas InfinityFree:
1. **[config/filesystems.php](file:///c:/laragon/www/portofolio/config/filesystems.php):** Upload media disetel langsung ke `public/storage/` (Tanpa perlu perintah `php artisan storage:link`).
2. **[.htaccess](file:///c:/laragon/www/portofolio/.htaccess):** Routing otomatis dari folder utama `htdocs/` ke `public/index.php`.
3. **[portofolio_infinityfree.sql](file:///c:/laragon/www/portofolio/portofolio_infinityfree.sql):** File export database lengkap beserta 27 setelan default & akun admin.

---

## 🚀 Tahap 1: Membuat Database di InfinityFree

1. Buka [Control Panel InfinityFree](https://app.infinityfree.com/) dan masuk ke akun Anda.
2. Pilih Akun Hosting / Subdomain Anda (misal: `namamu.infinityfreeapp.com`).
3. Klik menu **MySQL Databases**.
4. Di bagian **Create Database**, masukkan nama database (misal: `portofolio`) lalu klik **Create Database**.
5. Setelah berhasil dibuat, perhatikan dan catat 4 informasi berikut yang muncul di layar:
   - **MySQL Hostname** (contoh: `sql302.infinityfree.com`)
   - **Database Name** (contoh: `if0_38123456_portofolio`)
   - **MySQL Username** (contoh: `if0_38123456`)
   - **MySQL Password** (Password akun vPanel Anda)

---

## 📥 Tahap 2: Import Database via phpMyAdmin

1. Masih di halaman **MySQL Databases**, klik tombol **phpMyAdmin** di sebelah database yang baru Anda buat.
2. Di dalam phpMyAdmin, klik tab **Import** di bagian atas menu.
3. Klik tombol **Choose File / Pilih File**, lalu pilih file **`portofolio_infinityfree.sql`** yang berada di dalam folder project komputer Anda:
   `c:\laragon\www\portofolio\portofolio_infinityfree.sql`
4. Gulir ke bawah dan klik tombol **Import** (atau **Go**).
5. Tunggu hingga muncul pesan hijau sukses (*Import has been successfully finished*).

---

## ⚙️ Tahap 3: Mengedit File `.env` di Komputer

Buka file **`.env`** di folder project komputer Anda (`c:\laragon\www\portofolio\.env`) menggunakan editor text (VS Code / Notepad) dan ubah nilainya menjadi:

```env
APP_NAME="Portofolio"
APP_ENV=production
APP_KEY=base64:JqK... (biarkan nilai APP_KEY yang sudah ada)
APP_DEBUG=false
APP_URL=https://namamu.infinityfreeapp.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=sql302.infinityfree.com           <-- Isikan MySQL Hostname InfinityFree Anda
DB_PORT=3306
DB_DATABASE=if0_38123456_portofolio       <-- Isikan Nama Database InfinityFree Anda
DB_USERNAME=if0_38123456                  <-- Isikan Username Database InfinityFree Anda
DB_PASSWORD=password_vpanel_anda          <-- Isikan Password InfinityFree Anda

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=public
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

---

## 📤 Tahap 4: Upload File Menggunakan FileZilla (FTP)

Karena InfinityFree tidak memiliki Terminal SSH, kita akan meng-upload file project dari laptop ke server menggunakan **FileZilla**:

1. **Download & Buka FileZilla:**
   Jika belum ada, download gratis di [filezilla-project.org](https://filezilla-project.org/).

2. **Dapatkan Detail FTP:**
   - Di Client Area InfinityFree, buka menu **FTP Details**.
   - Catat: **FTP Hostname**, **FTP Username**, dan **FTP Password**.

3. **Koneksikan FileZilla:**
   - Di bagian atas FileZilla, isi:
     - **Host:** FTP Hostname Anda (misal: `ftpupload.net`)
     - **Username:** FTP Username Anda (misal: `if0_38123456`)
     - **Password:** FTP Password Anda
     - **Port:** `21`
   - Klik **Quickconnect**.

4. **Proses Upload:**
   - Di sisi kanan (Server Remote Site), buka folder **`htdocs`**. Hapus file `index2.html` bawaan jika ada.
   - Di sisi kiri (Komputer Anda Local Site), buka folder `c:\laragon\www\portofolio`.
   - Pilih **SEMUA FILE DAN FOLDER** di dalam `c:\laragon\www\portofolio`, termasuk:
     - Folder `app`, `bootstrap`, `config`, `database`, `public`, `resources`, `routes`, `storage`, `vendor`
     - File `.env`, `.htaccess`, `composer.json`, `package.json`
   - Klik kanan → pilih **Upload**.
   - Tunggu hingga proses upload selesai (folder `vendor` dan `public/build` membutuhkan waktu beberapa menit).

---

## 🔑 Tahap 5: Pengujian & Keamanan Pertama Kali

1. **Akses Landing Page:**
   Buka browser dan ketik alamat domain Anda:
   `https://namamu.infinityfreeapp.com`

2. **Login ke Admin Panel:**
   Buka URL:
   `https://namamu.infinityfreeapp.com/login`
   - **Email Default:** `admin@portofolio.com`
   - **Password Default:** `devByPass`

3. **Mengganti Password (WAJIB):**
   Setelah berhasil masuk ke Admin Dashboard:
   - Klik menu **Keamanan & Password** (atau **Profil**).
   - Ubah password default `devByPass` menjadi password rahasia baru Anda.
   - Klik **Simpan**.

---

## 💡 Troubleshooting / Pertanyaan Umum

- **Q: Mengapa gambar yang diupload via Admin Panel tidak muncul?**  
  *A:* Pastikan folder `public/storage` ada di server. Ketika upload file via Admin Panel, file akan otomatis tersimpan langsung ke `public/storage/` karena konfigurasi disk sudah kita ubah ke `public_path('storage')`.

- **Q: Muncul error HTTP 500 saat membuka domain?**  
  *A:* Pastikan file `.env` sudah sesuai (terutama `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`), dan `APP_DEBUG=false`. Pastikan juga file `.htaccess` di root `htdocs` sudah ikut ter-upload.
