# 🚀 Modern Software Engineer Portfolio & CMS Admin Panel

A state-of-the-art, high-performance, full-stack personal portfolio web application built with **Laravel 13**, **React 19**, **Inertia.js**, **Tailwind CSS v4**, and **Framer Motion**. Designed with modern dark/light mode, smooth micro-interactions, bilingual support (EN/ID), interactive command palette ($\text{Ctrl} + \text{K}$), and a full-featured Content Management System (CMS) Admin Dashboard.

---

## ✨ Features & Architectural Highlights

### 🎨 Frontend & Landing Page
- **Interactive Hero & Lanyard Card:** Features live typewriter title rotation, 3D tilt effects, social links, download CV button, and dynamic tech badge overlays.
- **Bento Grid Skills Showcase:** Category-based bento card layout for frontend, backend, database, and devops skills with animated proficiency bars.
- **Project Showcase & Modal Details:** Interactive project cards with dynamic category filtering, external links, and deep-dive modals featuring **Key Features & Highlights**.
- **Career & Experience Timeline:** Professional journey timeline with category tabs, expandable details, and **Key Accomplishments & Outcomes** bullet lists.
- **Infinite Marquee Certificates:** Auto-scrolling certificate carousel with credential verification links and detail modal.
- **Interactive Tech Stack Grid:** Categorized technology icons with hover tooltips and proficiency badges.
- **Real-Time Contact Form:** Directly integrated with backend database storing messages into the Admin Panel Inbox.
- **Bilingual Internationalization (EN / ID):** Instant language switcher context supporting complete English and Indonesian translations.
- **Command Palette ($\text{Ctrl} + \text{K}$):** Quick navigation, section jumping, and theme toggling modal.
- **Buttery-Smooth Animations:** Powered by Framer Motion viewport reveal animations and layout transitions.

### 🛡️ Admin Panel & CMS Capabilities
- **Real-Time Analytics Dashboard:** Stat cards tracking projects, skills, career items, certificates, tech stack icons, and unread messages.
- **Site Identity & Hero Settings:** Manage hero name, roles, descriptions, social media URLs, CV file link, and lanyard badge tags.
- **About & Philosophy Manager:** Dynamic management of story paragraphs, engineering principles, focus skills, and profile photos.
- **Project CMS Manager:** Create, update, and delete portfolio projects with image upload, demo URLs, tech tags, and dynamic **Key Features** lists.
- **Experience CMS Manager:** Manage career entries, roles, period, company, locations, and dynamic **Key Accomplishments** items.
- **Skills & Tech Stack Manager:** Full control over skills percentages, categories, icons, and tech stack badges.
- **Certificates CMS Manager:** Add and update certificates with credential IDs and verification URLs.
- **Messages Inbox:** View, read, and delete incoming contact form messages with unread counters.
- **Security & Profile Settings:** Change admin password, upload custom site logo, and manage account credentials.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Backend Framework** | Laravel 13 | Monolithic MVC API & Business Logic |
| **Frontend Framework** | React 19 | Reactive UI Component System |
| **Glue Layer** | Inertia.js | Monolithic SPA connector (No REST API overhead) |
| **Styling & System** | Tailwind CSS v4 | Utility-first responsive design & dark mode |
| **Animation Engine** | Framer Motion | Dynamic UI micro-interactions & page transitions |
| **Database** | MySQL | Relational data persistence |
| **Icons** | Lucide React | High-contrast vector icon library |

---

## 🗄️ Database Schema & Structure

```
├── users                  # Admin authentication & credentials
├── site_settings          # Key-Value store for global landing page content & settings
├── projects               # Projects data (includes JSON features & tech_stack arrays)
├── experiences            # Work history (includes JSON responsibilities & tech_badges)
├── skills                 # Technical skills, categories & percentages
├── certificates           # Certificates, issuers, credential IDs & verify URLs
├── tech_stacks            # Tech stack icons, categories & proficiency
└── messages               # Contact form submissions & read status
```

---

## 🚀 Installation & Local Setup

### Prerequisites
- PHP $\ge 8.2$
- Composer
- Node.js $\ge 18$ & NPM
- MySQL Database

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rnggprmd/portofolio.git
   cd portofolio
   ```

2. **Install PHP Dependencies:**
   ```bash
   composer install
   ```

3. **Install JavaScript Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   Configure your database credentials in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=portofolio
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Run Migrations & Seeders:**
   ```bash
   php artisan migrate --seed
   ```
   *Default Admin Login Credentials:*
   - **Email:** `admin@portofolio.com`
   - **Password:** `devByPass`

6. **Link Storage Directory:**
   ```bash
   php artisan storage:link
   ```

7. **Start Development Servers:**
   ```bash
   composer dev
   # OR run individually:
   # php artisan serve
   # npm run dev
   ```

8. **Build Production Assets:**
   ```bash
   npm run build
   ```

---

## 🌐 Deployment (InfinityFree / Shared Hosting)

This project has been specifically optimized for zero-SSH shared hosting such as **InfinityFree**:

- **No Symlink Required:** Public filesystem disk root is configured to `public_path('storage')` in [`config/filesystems.php`](file:///c:/laragon/www/portofolio/config/filesystems.php) so uploads work out of the box.
- **Root Routing:** Pre-configured [`.htaccess`](file:///c:/laragon/www/portofolio/.htaccess) routes all root traffic directly into `public/`.
- **SQL Pre-Export:** Pre-seeded database export [`portofolio_infinityfree.sql`](file:///c:/laragon/www/portofolio/portofolio_infinityfree.sql) is included for instant phpMyAdmin import.

For complete step-by-step deployment instructions, see **[`PANDUAN_HOSTING_INFINITYFREE.md`](file:///c:/laragon/www/portofolio/PANDUAN_HOSTING_INFINITYFREE.md)**.

---

## 🔒 Security & Best Practices

- All Admin routes protected under Laravel `auth` middleware.
- CSRF Protection via Inertia.js headers.
- Input validation & sanitize logic across all controller endpoints.
- High-contrast accessible color contrast for light & dark themes.

---

## 👨‍💻 Author

**Rangga Pramudya**  
*Software Engineer & Full-Stack Architect*  
- **GitHub:** [@rnggprmd](https://github.com/rnggprmd)
