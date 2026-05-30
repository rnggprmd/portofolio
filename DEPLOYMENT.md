# 🚀 Deployment Guide

Panduan deploy portfolio landing page Laravel + Inertia.js + React ke berbagai platform.

---

## 📋 Pre-Deployment Checklist

- [ ] Semua konten sudah di-customize (nama, about, skills, projects)
- [ ] Social media links sudah diupdate
- [ ] Gambar/foto sudah ditambahkan
- [ ] Contact form sudah ditest
- [ ] Build production berhasil (`npm run build`)
- [ ] Database migrations ready
- [ ] Environment variables sudah disiapkan

---

## 🌐 Deployment Options

### Option 1: Shared Hosting (cPanel)

**Requirements:**
- PHP 8.3+
- MySQL database
- Node.js access (untuk build)
- SSH access (recommended)

**Steps:**

1. **Build assets locally:**
```bash
npm run build
```

2. **Upload files via FTP/SFTP:**
- Upload semua file kecuali: `node_modules`, `vendor`, `.env`
- Upload folder `public/build` hasil build

3. **Setup di server:**
```bash
# SSH ke server
composer install --optimize-autoloader --no-dev

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Optimize
php artisan optimize
```

4. **Configure .env:**
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=your_db_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
```

5. **Point domain ke folder `public`**

---

### Option 2: VPS (DigitalOcean, Linode, AWS EC2)

**Requirements:**
- Ubuntu 22.04+ / Debian
- Root/sudo access

**Steps:**

1. **Install dependencies:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP 8.3
sudo apt install php8.3 php8.3-fpm php8.3-mysql php8.3-xml php8.3-mbstring php8.3-curl php8.3-zip -y

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Install MySQL
sudo apt install mysql-server -y

# Install Nginx
sudo apt install nginx -y
```

2. **Clone repository:**
```bash
cd /var/www
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

3. **Setup application:**
```bash
# Install dependencies
composer install --optimize-autoloader --no-dev
npm install
npm run build

# Setup environment
cp .env.example .env
php artisan key:generate

# Setup database
mysql -u root -p
CREATE DATABASE portfolio;
exit;

# Run migrations
php artisan migrate --force

# Set permissions
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio/storage
```

4. **Configure Nginx:**
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/portfolio/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

5. **Setup SSL (Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

---

### Option 3: Laravel Forge (Easiest)

**Steps:**

1. Sign up di [Laravel Forge](https://forge.laravel.com)
2. Connect VPS provider (DigitalOcean, AWS, dll)
3. Create new server
4. Add site dengan domain Anda
5. Connect Git repository
6. Deploy!

**Forge handles:**
- ✅ Server setup
- ✅ PHP, Nginx, MySQL installation
- ✅ SSL certificates
- ✅ Deployment scripts
- ✅ Zero-downtime deployment

---

### Option 4: Vercel (Frontend Only)

**Note:** Vercel tidak support PHP/Laravel backend. Hanya untuk static export atau API mode.

**Alternative:** Deploy Laravel API di VPS, frontend React di Vercel.

---

### Option 5: Railway / Render

**Railway:**
1. Sign up di [Railway](https://railway.app)
2. New Project → Deploy from GitHub
3. Add MySQL database
4. Set environment variables
5. Deploy!

**Render:**
1. Sign up di [Render](https://render.com)
2. New Web Service → Connect repository
3. Build command: `composer install && npm install && npm run build`
4. Start command: `php artisan serve --host=0.0.0.0 --port=$PORT`
5. Add PostgreSQL/MySQL database
6. Deploy!

---

## 🔐 Environment Variables untuk Production

```env
APP_NAME="Your Portfolio"
APP_ENV=production
APP_KEY=base64:... # Generate dengan php artisan key:generate
APP_DEBUG=false
APP_URL=https://yourdomain.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio_prod
DB_USERNAME=portfolio_user
DB_PASSWORD=strong_password_here

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS="hello@yourdomain.com"
MAIL_FROM_NAME="${APP_NAME}"
```

---

## 🔧 Post-Deployment

### 1. Optimize Laravel
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
```

### 2. Setup Queue Worker (Optional)
```bash
# Supervisor config
sudo nano /etc/supervisor/conf.d/portfolio-worker.conf
```

```ini
[program:portfolio-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/portfolio/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/portfolio/storage/logs/worker.log
```

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start portfolio-worker:*
```

### 3. Setup Cron Jobs
```bash
crontab -e
```

```cron
* * * * * cd /var/www/portfolio && php artisan schedule:run >> /dev/null 2>&1
```

### 4. Monitor Logs
```bash
tail -f storage/logs/laravel.log
```

---

## 🔄 Update/Redeploy

### Manual:
```bash
cd /var/www/portfolio
git pull origin main
composer install --optimize-autoloader --no-dev
npm install
npm run build
php artisan migrate --force
php artisan optimize
sudo systemctl restart php8.3-fpm
```

### With Forge:
- Push ke Git
- Click "Deploy" di Forge dashboard
- Done! ✅

---

## 🐛 Troubleshooting

### 500 Internal Server Error
```bash
# Check logs
tail -f storage/logs/laravel.log
tail -f /var/log/nginx/error.log

# Fix permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 755 storage bootstrap/cache
```

### Assets not loading
```bash
# Rebuild assets
npm run build

# Check public/build folder exists
ls -la public/build
```

### Database connection error
```bash
# Test MySQL connection
mysql -u username -p database_name

# Check .env database credentials
cat .env | grep DB_
```

---

## 📊 Performance Optimization

### 1. Enable OPcache
```bash
sudo nano /etc/php/8.3/fpm/php.ini
```

```ini
opcache.enable=1
opcache.memory_consumption=256
opcache.max_accelerated_files=20000
opcache.validate_timestamps=0
```

### 2. Enable Gzip Compression (Nginx)
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### 3. Setup CDN (Optional)
- Cloudflare (Free)
- AWS CloudFront
- DigitalOcean Spaces

---

## 🔒 Security Checklist

- [ ] `APP_DEBUG=false` di production
- [ ] SSL certificate installed (HTTPS)
- [ ] Strong database password
- [ ] `.env` file tidak ter-commit ke Git
- [ ] File permissions correct (755 for folders, 644 for files)
- [ ] Firewall configured (UFW)
- [ ] Regular backups setup
- [ ] Security headers configured

---

## 💾 Backup Strategy

### Database Backup
```bash
# Manual backup
mysqldump -u username -p database_name > backup_$(date +%Y%m%d).sql

# Automated daily backup (cron)
0 2 * * * mysqldump -u username -p'password' database_name > /backups/db_$(date +\%Y\%m\%d).sql
```

### Files Backup
```bash
# Backup storage folder
tar -czf storage_backup_$(date +%Y%m%d).tar.gz storage/

# Full backup
tar -czf portfolio_backup_$(date +%Y%m%d).tar.gz --exclude='node_modules' --exclude='vendor' .
```

---

## 📈 Monitoring

### Tools:
- **Laravel Telescope** (Development)
- **Laravel Horizon** (Queue monitoring)
- **New Relic** (APM)
- **Sentry** (Error tracking)
- **Google Analytics** (Traffic)

---

## 🎉 Success!

Portfolio Anda sudah live! 🚀

**Next Steps:**
1. Test semua functionality
2. Setup monitoring
3. Share link ke social media
4. Update resume dengan link portfolio

---

*Need help? Check Laravel deployment docs: https://laravel.com/docs/deployment*
