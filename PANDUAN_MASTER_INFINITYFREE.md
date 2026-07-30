# 📘 Panduan Master Ultra-Detail: Hosting Portofolio di InfinityFree (Dari Nol s/d Selesai)

Panduan ini disusun **mulai dari nol banget** (pendaftaran akun) sampai aplikasi portofolio Anda **live dan berjalan sempurna** di InfinityFree.

---

## 📌 Ringkasan 3 File Penting yang Sudah Siap di Project Anda:
1. **[`config/filesystems.php`](file:///c:/laragon/www/portofolio/config/filesystems.php):** Upload media disetel langsung ke `public/storage/` (Tanpa perlu symlink `php artisan storage:link`).
2. **[`.htaccess`](file:///c:/laragon/www/portofolio/.htaccess):** Meroute otomatis semua traffic dari `htdocs` ke `public/index.php`.
3. **[`portofolio_infinityfree.sql`](file:///c:/laragon/www/portofolio/portofolio_infinityfree.sql):** Database export lengkap beserta 27 setting default & akun admin.

---

## 📑 TAHAP 1: Pendaftaran Akun & Domain di InfinityFree

1. **Buka Website InfinityFree:**
   - Akses [https://www.infinityfree.com/](https://www.infinityfree.com/) di browser Anda.
2. **Daftar Akun Baru:**
   - Klik tombol **Register Now** atau **Sign Up**.
   - Masukkan **Email**, **Password**, centang persetujuan syarat & ketentuan, lalu klik **Create New Account**.
3. **Verifikasi Email:**
   - Cek kotak masuk email Anda, lalu klik link **Verify Email Address**.
4. **Buat Hosting Account Baru:**
   - Di dashboard InfinityFree (Client Area), klik tombol **Create Account** (berwarna hijau).
   - **Langkah 1 (Domain Name):** Pilih jenis domain:
     - Jika pakai subdomain gratis: pilih **Subdomain**, masukkan nama yang diinginkan (misal: `rangga-portofolio`), lalu pilih ekstensi (misal: `.infinityfreeapp.com`).
     - Jika punya domain sendiri: pilih **Custom Domain**.
   - Klik **Check Availability**.
   - **Langkah 2 (Account Details):**
     - Account Label: Biarkan default atau isi nama project.
     - Account Username & Password: Biarkan terisi otomatis.
   - Klik **Create Account**.
5. **Akun Berhasil Dibuat:**
   - Klik tombol **Open Control Panel** atau **Manage** untuk masuk ke rincian akun Anda.

---

## 📑 TAHAP 2: Membuat Database MySQL

1. Di Dashboard Akun InfinityFree Anda, klik menu **MySQL Databases** (atau masuk ke Control Panel / vPanel → **MySQL Databases**).
2. Di kolom **Create a New Database**:
   - Ketik nama database di kotak teks, misalnya: `portofolio`.
   - Klik tombol **Create Database**.
3. Setelah database berhasil dibuat, lihat daftar database Anda di bawahnya.
4. **CATAT 4 DATA INI** (Simpan di Notepad):
   - **MySQL Hostname** *(contoh: `sql302.infinityfree.com`)*
   - **Database Name** *(contoh: `if0_38123456_portofolio`)*
   - **MySQL Username** *(contoh: `if0_38123456`)*
   - **MySQL Password** *(Password vPanel / hosting Anda)*

---

## 📑 TAHAP 3: Import Database dengan phpMyAdmin

1. Masih di halaman **MySQL Databases**, klik tombol **phpMyAdmin** di samping nama database yang baru Anda buat.
2. Halaman phpMyAdmin akan terbuka di tab baru.
3. Klik nama database Anda di panel kiri phpMyAdmin.
4. Klik tab **Import** di bagian menu atas phpMyAdmin.
5. Di bagian **File to Import**, klik **Choose File** (atau **Browse**).
6. Cari dan pilih file **`portofolio_infinityfree.sql`** yang ada di folder project laptop Anda:
   `c:\laragon\www\portofolio\portofolio_infinityfree.sql`
7. Scroll ke bagian paling bawah, lalu klik tombol **Import** (atau **Go**).
8. Tunggu beberapa detik sampai muncul notifikasi berwarna hijau:  
   *`Import has been successfully finished, xx queries executed.`*

---

## 📑 TAHAP 4: Menyesuaikan File `.env` di Laptop Anda

1. Buka file **`.env`** di folder project komputer Anda (`c:\laragon\www\portofolio\.env`) menggunakan VS Code atau Notepad.
2. Ubah nilai variabel berikut agar sesuai dengan akun InfinityFree Anda:

```env
APP_NAME="Portofolio"
APP_ENV=production
APP_KEY=base64:JqK... (JANGAN UBAH APP_KEY YANG SUDAH ADA)
APP_DEBUG=false
APP_URL=https://rangga-portofolio.infinityfreeapp.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=sql302.infinityfree.com           <-- ISI MYSQL HOSTNAME ANDA
DB_PORT=3306
DB_DATABASE=if0_38123456_portofolio       <-- ISI DATABASE NAME ANDA
DB_USERNAME=if0_38123456                  <-- ISI USERNAME DATABASE ANDA
DB_PASSWORD=password_vpanel_anda          <-- ISI PASSWORD HOSTING ANDA

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=public
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```
3. Tekan **Ctrl + S** untuk menyimpan file `.env`.

---

## 📑 TAHAP 5: Persiapan App FileZilla & Ambil Akun FTP

1. **Download FileZilla:**
   - Jika belum punya, download aplikasi **FileZilla Client** gratis dari [https://filezilla-project.org/](https://filezilla-project.org/).
   - Install dan buka aplikasi FileZilla di laptop Anda.
2. **Dapatkan Detail FTP dari InfinityFree:**
   - Di Client Area InfinityFree akun Anda, cari bagian **FTP Details**.
   - Catat 3 informasi ini:
     - **FTP Hostname** *(contoh: `ftpupload.net`)*
     - **FTP Username** *(contoh: `if0_38123456`)*
     - **FTP Password** *(Password vPanel / Hosting Anda)*
     - **Port:** `21`

---

## 📑 TAHAP 6: Proses Upload File Menggunakan FileZilla

1. **Koneksi ke Server:**
   - Buka FileZilla. Pada baris atas (Quickconnect bar):
     - **Host:** Isikan FTP Hostname *(contoh: `ftpupload.net`)*
     - **Username:** Isikan FTP Username *(contoh: `if0_38123456`)*
     - **Password:** Isikan FTP Password
     - **Port:** `21`
   - Klik **Quickconnect**. Jika muncul peringatan Certificate, klik **OK**.
2. **Masuk ke Folder Server Target:**
   - Di panel sebelah kanan **(Remote Site / Server)**:
     - Buka folder bernama **`htdocs`**.
     - Jika di dalam `htdocs` terdapat file bawaan `index2.html` atau `override.php`, klik kanan lalu **Delete**.
3. **Pilih File di Laptop:**
   - Di panel sebelah kiri **(Local Site / Laptop)**:
     - Masuk ke folder `c:\laragon\www\portofolio`.
4. **Mulai Proses Upload:**
   - Pilih **SEMUA FILE & FOLDER** di dalam `c:\laragon\www\portofolio`, yaitu:
     - Folder: `app`, `bootstrap`, `config`, `database`, `public`, `resources`, `routes`, `storage`, `vendor`
     - File: `.env`, `.htaccess`, `composer.json`, `package.json`, `package-lock.json`
   - Klik kanan pada kumpulan file yang dipilih → Klik **Upload**.
5. **Tunggu Proses Transfer:**
   - FileZilla akan mulai mentransfer file. (Folder `vendor` dan `public/build` berisi banyak file kecil, tunggu sekitar 5 - 15 menit sampai antrean di bagian bawah FileZilla menjadi `0`).

---

## 📑 TAHAP 7: Pengujian & Ganti Password Admin

1. **Akses Landing Page Portofolio:**
   - Buka browser Anda dan ketik URL subdomain Anda:  
     `https://rangga-portofolio.infinityfreeapp.com`
   - Pastikan Landing Page muncul dengan desain dark mode, animasi, serta semua seksi lengkap!
2. **Akses Admin Panel:**
   - Ketik URL login admin:  
     `https://rangga-portofolio.infinityfreeapp.com/login`
   - Masukkan kredensial login default:
     - 📧 **Email:** `admin@portofolio.com`
     - 🔑 **Password:** `devByPass`
   - Klik **Sign In**.
3. **Ganti Password Admin (Sangat Penting):**
   - Setelah masuk ke Dashboard Admin, buka menu **Pengaturan Profil & Password** (atau ikon kunci).
   - Masukkan password baru rahasia Anda.
   - Klik **Simpan / Update Password**.

---

## 🎯 Selesai!

Portofolio Anda kini sudah **Live 100% online di internet**. Setiap perubahan yang Anda buat di Admin Panel (tambah proyek, ubah skill, edit tentang saya, upload gambar) akan langsung ter-update di Landing Page! 🎉
