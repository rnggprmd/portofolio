# Product Requirements Document (PRD)

## Personal Portfolio Website

**Version:** 1.0
**Status:** Draft
**Platform:** Web (Responsive)
**Frontend:** React 19 + Vite + Tailwind CSS v4

---

# 1. Project Overview

## Project Name

Personal Portfolio Website

## Project Description

Website portfolio pribadi yang dirancang untuk menampilkan identitas profesional, pengalaman, keahlian, dan project seorang praktisi di bidang Sistem Informasi dan Software Engineering.

Landing page menjadi fokus utama pada tahap pertama pengembangan dengan tujuan membangun personal branding yang kuat melalui tampilan modern, bersih, elegan, serta pengalaman pengguna yang interaktif.

Website tidak hanya berfungsi sebagai media perkenalan, tetapi juga sebagai representasi kemampuan dalam membangun digital product yang memiliki kualitas desain dan implementasi yang baik.

---

# 2. Objectives

## Business Objectives

* Membangun personal branding profesional.
* Menampilkan kemampuan teknis dan pengalaman secara menarik.
* Menjadi media promosi kepada recruiter maupun client.
* Meningkatkan kredibilitas melalui showcase project.

## User Objectives

Pengunjung dapat dengan mudah:

* Mengenal profil pemilik portfolio.
* Mengetahui bidang keahlian.
* Melihat project terbaik.
* Melihat pengalaman dan sertifikasi.
* Menghubungi pemilik portfolio.

---

# 3. Target Audience

### Primary

* HR Recruiter
* Technical Recruiter
* Software Engineer
* Startup Founder
* Project Manager

### Secondary

* Freelancer Client
* Mahasiswa
* Dosen
* Komunitas IT

---

# 4. Technology Stack

## Core

* React 19
* Vite
* Tailwind CSS v4

## Libraries

* Framer Motion
* GSAP
* Lenis Smooth Scroll
* Lucide React
* React Router DOM (future)

---

# 5. Design Principles

Landing page harus memiliki karakter sebagai berikut:

* Professional
* Minimalist
* Elegant
* Modern
* Clean
* Interactive
* Premium
* Human-centered

Desain mengutamakan keseimbangan antara estetika dan keterbacaan dengan penggunaan ruang kosong (whitespace) yang cukup sehingga informasi mudah dipahami.

---

# 6. Visual Identity

## Theme

Light Theme

## Color Palette

| Token          | Hex     |
| -------------- | ------- |
| Background     | #FFFFFF |
| Surface        | #F8F9FA |
| Section        | #F3F4F6 |
| Card           | #FFFFFF |
| Border         | #E5E7EB |
| Heading        | #111827 |
| Body Text      | #4B5563 |
| Secondary Text | #6B7280 |
| Muted Text     | #9CA3AF |
| Footer         | #111827 |

### Accent Color

Landing page menggunakan aksen warna seminimal mungkin.

Aksen hanya digunakan pada:

* Hover state
* CTA Button
* Link aktif
* Scroll indicator
* Focus state

Default accent:

* Black (#111827)

---

# 7. Typography

## Heading

Space Grotesk

## Body

Inter

## Monospace

JetBrains Mono

---

# 8. User Experience Goals

Landing page harus mampu memberikan kesan profesional dalam waktu kurang dari 10 detik.

Prioritas pengalaman pengguna:

1. Mengenal siapa pemilik portfolio.
2. Mengetahui bidang keahlian.
3. Melihat project.
4. Mengetahui pengalaman.
5. Menghubungi pemilik.

---

# 9. Landing Page Structure

## 1. Hero Section

### Purpose

Memberikan first impression.

### Components

* Greeting
* Full Name
* Professional Title
* Short Description
* CTA Button
* Social Media Links
* Scroll Indicator

### CTA

* View Projects
* Download CV
* Contact Me

### Animation

* Text Reveal
* Fade Up
* Floating Background Shape
* Mouse Parallax
* Smooth Scroll

---

## 2. About Me

### Components

* Profile Photo
* Short Biography
* Personal Story
* Statistics

### Statistics

* Projects
* Experience
* Certificates
* Technologies

Animation:

* Counter Animation
* Fade Up
* Card Hover

---

## 3. Skills

### Layout

Bento Grid

### Categories

* Frontend
* Backend
* Database
* UI/UX
* Tools
* Cloud

Setiap card menampilkan:

* Icon
* Skill
* Description

Animation:

* Hover Lift
* Glow Border
* Scale Effect

---

## 4. Featured Projects

### Components

* Filter Tabs
* Project Card
* Thumbnail
* Description
* Tech Stack
* Live Demo
* GitHub

Animation:

* Image Zoom
* Card Elevation
* Fade In

---

## 5. Experience

Timeline Layout

Content:

* Internship
* Freelance
* Organization
* Competition

Animation:

* Scroll Reveal
* Timeline Progress

---

## 6. Certificates

Horizontal Slider

Content:

* Certificate Preview
* Title
* Issuer
* Year

Animation:

* Infinite Marquee
* Hover Preview

---

## 7. Tech Stack

Logo Marquee

Examples:

* React
* Laravel
* Tailwind CSS
* Node.js
* Express
* MySQL
* PostgreSQL
* Docker
* Git
* Figma

---

## 8. Contact

Components:

* Contact Information
* Social Media
* Contact Form

Fields:

* Name
* Email
* Message

CTA:

Send Message

Animation:

* Button Hover
* Ripple Effect
* Success State

---

## 9. Footer

Content:

* Logo
* Navigation
* Copyright
* Social Links

---

# 10. Navigation

Floating Navbar

Menu:

* Home
* About
* Skills
* Projects
* Experience
* Contact

Behavior:

* Sticky Navigation
* Background Blur
* Active Section Highlight
* Smooth Scroll

---

# 11. Animation Guidelines

Animasi harus halus dan mendukung pengalaman pengguna.

Required animation:

* Smooth Scroll
* Fade Up
* Fade Left
* Fade Right
* Scale In
* Stagger Animation
* Counter Animation
* Hover Lift
* Card Shadow Transition
* Text Reveal
* Infinite Logo Marquee
* Scroll Progress Indicator
* Button Ripple
* Image Zoom
* Section Transition

Animasi tidak boleh mengganggu performa ataupun mengurangi keterbacaan.

---

# 12. Responsive Design

Website harus optimal pada:

* Mobile
* Tablet
* Laptop
* Desktop
* Ultrawide

Requirement:

* Tidak ada horizontal scrolling.
* Responsive typography.
* Responsive spacing.
* Responsive grid layout.

---

# 13. Accessibility

* Semantic HTML
* Keyboard Navigation
* Focus Indicator
* Alt Text
* Proper Heading Structure
* Sufficient Color Contrast

---

# 14. Performance

Target Lighthouse Score:

| Category       | Target |
| -------------- | ------ |
| Performance    | ≥ 95   |
| Accessibility  | ≥ 95   |
| Best Practices | ≥ 95   |
| SEO            | ≥ 95   |

---

# 15. Folder Structure

```text
src/
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   ├── sections/
│   ├── ui/
│   └── animation/
├── data/
├── hooks/
├── pages/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

---

# 16. Main Components

## Layout

* Navbar
* Footer
* Container
* Section

## Hero

* HeroContent
* HeroImage
* CTAButtons
* SocialLinks
* ScrollIndicator

## About

* ProfileCard
* CounterCard

## Skills

* SkillCard
* BentoGrid

## Projects

* ProjectCard
* FilterTabs

## Experience

* Timeline
* TimelineItem

## Certificates

* CertificateCard
* InfiniteSlider

## Contact

* ContactInfo
* ContactForm

---

# 17. Future Roadmap

Tahap berikutnya setelah landing page selesai:

* Detail Project Page
* Blog / Articles
* Dashboard Admin
* CMS Integration
* GitHub API
* Email Integration
* Dark Mode
* Multi-language
* Resume Page
* SEO Enhancement

---

# 18. Success Criteria

Landing page dinyatakan berhasil apabila:

* Mampu memberikan first impression yang profesional.
* Menampilkan informasi secara jelas dan mudah dipahami.
* Memiliki navigasi yang sederhana dan intuitif.
* Menawarkan animasi yang halus tanpa mengganggu pengalaman pengguna.
* Responsif pada seluruh ukuran layar.
* Mencapai target Lighthouse minimal 95 pada seluruh kategori.
