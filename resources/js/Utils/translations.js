export const translations = {
    en: {
        nav: {
            home: "Home",
            github: "GitHub",
            about: "About",
            skills: "Skills",
            projects: "Projects",
            experience: "Experience",
            certificates: "Certificates",
            contact: "Contact",
        },
        hero: {
            titles: [
                "Full-Stack Web Developer",
                "System Information Specialist",
                "Laravel & React Architect",
                "UI/UX Craftsmanship Enthusiast"
            ],
            description: "Crafting modern, scalable, and elegant web solutions with a strong passion for Software Engineering, UI/UX precision, and clean architecture.",
            viewProjects: "View Projects",
            contactMe: "Contact Me",
            downloadCv: "Download CV",
            dragMe: "Drag me around",
            clickToFlip: "Click to flip",
            specialty: "SPECIALTY",
            fullstack: "FULL-STACK",
            verifiedPass: "VERIFIED DEV PASS",
            connectSocial: "Connect via Social Media",
            scrollDown: "SCROLL DOWN",
        },
        about: {
            tag: "01 // ABOUT ME",
            title: "Passionate About Crafting Impactful Digital Products",
            myStory: "My Story",
            philosophy: "Engineering Philosophy",
            focus: "Core Proficiency",
            availableForHire: "AVAILABLE FOR HIRE",
            hobbiesTag: "Personal Focus & Hobbies",
            storyP1: "Hi there! I'm Rangga, a Software Engineer dedicated to solving real-world problems through clean code, modern architecture, and intuitive design.",
            storyP2: "With a strong background in Information Systems, I bridge the gap between business objectives and technical execution. My focus is on creating web applications that deliver exceptional user experiences while maintaining technical robustness.",
            storyP3: "I specialize in modern full-stack development using React, Laravel, and Tailwind CSS. Whether working independently or collaboratively, I thrive on learning new technologies and continuously elevating software standards.",
            philosophyTitle: '"Simplicity is the ultimate sophistication." — Software engineering is not just about writing code, but about crafting simple solutions for complex domains.',
            cleanCode: "Clean Code & Architecture: Prioritizing maintainability and modular design patterns.",
            humanUi: "Human-Centered UI: Building fast, accessible interfaces with clear visual hierarchy.",
            continuousGrowth: "Continuous Growth: Embracing modern tools while respecting solid foundational engineering.",
            proficiencyTitle: "Technical Proficiency Breakdown & Mastery Areas:",
            stats: {
                projects: "Projects",
                experience: "Years Exp.",
                certificates: "Certificates",
                techStack: "Tech Stack"
            },
            interests: [
                { label: 'Espresso & Code', desc: 'Fueling architecture sessions with specialty coffee' },
                { label: 'System Design Reading', desc: 'Exploring distributed systems & scalable design' },
                { label: 'Focus Ambient Music', desc: 'Listening to instrumental lo-fi during deep coding' },
                { label: 'F1 & UI Craft', desc: 'Appreciating high-precision engineering in motorsports & digital UI' },
            ]
        },
        skills: {
            tag: "02 // SKILLS & EXPERTISE",
            title: "Core Competencies & Technologies",
            subtitle: "Filter categories below or hover over cards for interactive spotlight tracking",
            all: "All",
            showing: "Showing",
            of: "of",
            skillsCount: "skill groups",
            prevPage: "Previous Page",
            nextPage: "Next Page",
            categories: {
                frontend: "Frontend Development",
                backend: "Backend Development",
                uiux: "UI/UX Design",
                database: "Database & Storage",
                devops: "DevOps, Cloud & Tools"
            },
            cards: [
                {
                    category: "Frontend Development",
                    tag: "Frontend",
                    skills: [
                        { name: "React 19 & Next.js", level: "Advanced", desc: "Component architecture, Hooks, State Management & SPA development" },
                        { name: "Tailwind CSS v4 & CSS3", level: "Expert", desc: "Utility-first styling, Responsive Design & Modern UI components" },
                        { name: "JavaScript (ES6+) & TypeScript", level: "Proficient", desc: "Asynchronous programming, DOM manipulation & Type safety" },
                    ]
                },
                {
                    category: "UI/UX Design",
                    tag: "UI/UX",
                    skills: [
                        { name: "Figma & Prototyping", level: "Advanced", desc: "User flows, High-fidelity mockups, Design Systems & Wireframing" },
                        { name: "Human-Centered Design", level: "Proficient", desc: "Accessibility (a11y), Ergonomic UI & Clean Visual Hierarchy" },
                    ]
                },
                {
                    category: "Backend Development",
                    tag: "Backend",
                    skills: [
                        { name: "Laravel 13 & PHP 8.3", level: "Expert", desc: "MVC, RESTful APIs, Eloquent ORM, Middleware & Inertia.js" },
                        { name: "Node.js & Express", level: "Proficient", desc: "Event-driven servers, API endpoints & Backend integration" },
                    ]
                },
                {
                    category: "Database & Storage",
                    tag: "Database",
                    skills: [
                        { name: "MySQL & PostgreSQL", level: "Advanced", desc: "Relational DB design, Query optimization & Indexing" },
                        { name: "Redis & Caching", level: "Proficient", desc: "Key-value data store, Session management & Queue caching" },
                    ]
                },
                {
                    category: "DevOps, Cloud & Tools",
                    tag: "DevOps",
                    skills: [
                        { name: "Git, Docker & CI/CD", level: "Advanced", desc: "Version control, Containerization & Automated deployments" },
                        { name: "Linux & Web Hosting", level: "Proficient", desc: "VPS setup, Nginx server configuration & Environment management" },
                    ]
                }
            ]
        },
        projects: {
            tag: "03 // FEATURED PROJECTS",
            title: "Showcase of Recent Works",
            subtitle: "Filter by technology or search keywords to inspect project details",
            searchPlaceholder: "Search projects...",
            featured: "FEATURED",
            details: "Details →",
            demo: "Demo",
            code: "Code",
            quickInspect: "Quick Inspect",
            keyFeatures: "Key Features & Highlights",
            techUsed: "Tech Stack Used",
            livePreview: "Live Preview",
            sourceCode: "Source Code",
            showing: "Showing",
            of: "of",
            projectsCount: "projects",
            prevPage: "Previous Page",
            nextPage: "Next Page",
            noProjects: "No projects found matching your criteria",
            resetFilters: "Reset Filter",
            items: [
                {
                    id: 1,
                    title: 'Personal Portfolio & Admin CMS',
                    category: 'Full Stack',
                    description: 'Modern personal portfolio website built with Laravel 13, Inertia.js, React 19, and Tailwind CSS v4 featuring full admin content management.',
                    features: [
                        'Full SPA experience using Inertia.js',
                        'Protected Admin Panel with custom component design',
                        'Dark Mode and Light Mode theme toggle',
                        'Dynamic Project, Skill, & Message CRUD management',
                        'Framer Motion smooth scroll & interactive UI animations'
                    ],
                },
                {
                    id: 2,
                    title: 'E-Commerce Platform & Checkout API',
                    category: 'Full Stack',
                    description: 'Scalable e-commerce web application with real-time product inventory management, Midtrans payment gateway integration, and customer order tracking.',
                    features: [
                        'Midtrans Payment Gateway webhooks & automated order status',
                        'Redis caching for high-speed product catalog queries',
                        'Custom shopping cart state & checkout flow',
                        'Admin dashboard for sales reporting & stock control'
                    ],
                },
                {
                    id: 3,
                    title: 'Smart Task Management Dashboard',
                    category: 'Frontend',
                    description: 'Interactive kanban-style task and project management dashboard featuring drag-and-drop workflow, real-time analytics, and dark/light themes.',
                    features: [
                        'Drag-and-drop Kanban task columns (To Do, In Progress, Done)',
                        'Task priority labels & automated deadline reminders',
                        'Responsive mobile drawer & filter controls',
                        'Persistent browser state'
                    ],
                },
                {
                    id: 4,
                    title: 'RESTful Microservices & Auth API',
                    category: 'Backend',
                    description: 'High-performance JWT authenticated REST API gateway designed for multi-tenant SaaS applications with rate limiting and logging middleware.',
                    features: [
                        'JWT Token authentication & refresh token mechanism',
                        'Rate limiting middleware & API key authorization',
                        'Docker containerization setup with Nginx reverse proxy',
                        'Automated API endpoint unit tests'
                    ],
                }
            ]
        },
        experience: {
            tag: "04 // CAREER & EXPERIENCE",
            title: "Professional Journey & Milestones",
            subtitle: "Filter categories below or click any entry to expand detailed key accomplishments",
            keyAccomplishments: "Key Accomplishments & Outcomes:",
            items: [
                {
                    id: 1,
                    role: 'Full-Stack Developer Intern',
                    company: 'PT. Teknologi Inovasi Indonesia',
                    type: 'Internship',
                    location: 'Jakarta, Indonesia',
                    period: 'Jan 2025 - Present',
                    description: 'Developed scalable internal administrative web tools and client-facing API portals using Laravel 13 and React 19.',
                    achievements: [
                        'Optimized API database query performance by 35% using Eloquent indexing and Redis caching.',
                        'Built responsive dashboard UI modules with custom components and Inertia.js.',
                        'Collaborated in Agile sprint planning and Git version control workflows.'
                    ],
                },
                {
                    id: 2,
                    role: 'Freelance Web Developer',
                    company: 'Self-Employed / Various Clients',
                    type: 'Freelance',
                    location: 'Remote',
                    period: '2023 - Present',
                    description: 'Designed and engineered custom web solutions, e-commerce stores, and landing pages for SMEs and startups.',
                    achievements: [
                        'Successfully delivered 10+ web development projects on schedule with 100% client satisfaction.',
                        'Integrated payment gateways (Midtrans) and automated email notification webhooks.',
                        'Implemented SEO best practices and mobile-first responsive design standards.'
                    ],
                },
                {
                    id: 3,
                    role: 'Lead Developer & Executive Member',
                    company: 'Information Systems Student Association (HIMA SI)',
                    type: 'Organization',
                    location: 'University Campus',
                    period: '2023 - 2024',
                    description: 'Led technical team operations for student association web platform and annual national tech competition portals.',
                    achievements: [
                        'Engineered event registration portal handling over 1,200+ active participant submissions.',
                        'Mentored junior students in web development fundamentals (HTML, CSS, JavaScript, PHP).'
                    ],
                },
                {
                    id: 4,
                    role: '1st Winner - National Web Development Competition',
                    company: 'National Tech Hackathon 2024',
                    type: 'Competition',
                    location: 'National Level',
                    period: '2024',
                    description: 'Awarded 1st Place for building an innovative web application prototype addressing smart municipal waste management.',
                    achievements: [
                        'Designed real-time geolocation tracking interface for waste collection trucks.',
                        'Pitched technical architecture to panel of industry software engineers.'
                    ],
                }
            ]
        },
        certificates: {
            tag: "05 // CERTIFICATIONS",
            title: "Verified Certifications & Credentials",
            subtitle: "Click on any certificate to inspect official credentials and verification details",
            inspect: "Inspect",
            credentialId: "CREDENTIAL ID",
            verifyCertificate: "Verify Certificate",
            close: "Close",
            items: [
                {
                    id: 1,
                    title: 'Laravel Certified Developer',
                    issuer: 'Laravel / Certification Board',
                    year: '2025',
                    badge: 'Official',
                    description: 'Demonstrated expert proficiency in Laravel MVC architecture, Eloquent ORM, RESTful API design, database migrations, and security best practices.',
                },
                {
                    id: 2,
                    title: 'React Advanced Frontend Developer',
                    issuer: 'Meta / Coursera',
                    year: '2024',
                    badge: 'Professional',
                    description: 'Advanced single-page app development using React 19, custom hooks, state management, performance optimization, and component testing.',
                },
                {
                    id: 3,
                    title: 'AWS Certified Cloud Practitioner',
                    issuer: 'Amazon Web Services',
                    year: '2024',
                    badge: 'Cloud',
                    description: 'Foundational cloud computing knowledge including AWS EC2, S3 storage, IAM security, VPC networking, and cloud deployment principles.',
                },
                {
                    id: 4,
                    title: 'Full Stack Web Development Specialization',
                    issuer: 'Dicoding Academy',
                    year: '2024',
                    badge: 'Academy',
                    description: 'Comprehensive full-stack web curriculum covering backend API services, relational databases, responsive frontend UI, and CI/CD pipelines.',
                },
                {
                    id: 5,
                    title: 'Database Management & SQL Expert',
                    issuer: 'Oracle Academy',
                    year: '2023',
                    badge: 'Database',
                    description: 'Expert-level Relational Database Management Systems (RDBMS) design, complex SQL query tuning, indexing, and data modeling.',
                }
            ]
        },
        techStack: {
            tag: "POWERED BY MODERN TECH STACK",
            title: "Technologies & Tools I Craft With",
            categories: {
                all: "All",
                frontend: "Frontend",
                backend: "Backend",
                tools: "Database & Tools"
            }
        },
        contact: {
            tag: "06 // CONTACT & GET IN TOUCH",
            title: "Let's Discuss Your Next Project",
            subtitle: "Have an opportunity, proposal, or question? Send me a message and I'll respond within 24 hours.",
            infoTitle: "Contact Information",
            location: "Location",
            locationVal: "Indonesia (Remote / Hybrid)",
            availability: "Availability",
            availabilityVal: "Open for Freelance & Full-Time",
            quickTopics: "Quick Subject Topics:",
            name: "Your Name *",
            email: "Your Email *",
            subject: "Subject",
            message: "Message *",
            sending: "Sending Message...",
            send: "Send Message",
            successTitle: "Message Delivered!",
            successDesc: "Thank you for reaching out. I'll get back to you shortly.",
        },
        footer: {
            bio: "Software Engineer specializing in Laravel, React, and modern web architectures. Focused on clean code, performance, and user-centered design.",
            quickNav: "Quick Navigation",
            featuredTech: "Core Stack",
            contactHeading: "Get In Touch",
            location: "Indonesia (UTC+7 / WIB)",
            status: "Open for remote opportunities",
            rights: "All rights reserved.",
            backToTop: "Back to top",
            crafted: "Crafted with Laravel 13, React 19 & Tailwind CSS"
        },
        githubStatus: {
            tag: "00 // GITHUB ACTIVITY & STATUS",
            title: "Real-Time Code & GitHub Overview",
            subtitle: "Live activity metrics, open-source repositories, and contribution statistics direct from GitHub",
            overviewTab: "Overview & Metrics",
            reposTab: "Popular Repositories",
            followers: "Followers",
            following: "Following",
            publicRepos: "Public Repos",
            totalStars: "Stars Earned",
            totalForks: "Forks",
            refreshData: "Refresh Live Data",
            updatedNow: "Live Sync Active",
            visitProfile: "View GitHub Profile",
            viewOnGithub: "View on GitHub",
            stars: "Stars",
            forks: "Forks",
            updated: "Updated",
            language: "Primary Language",
            topLanguages: "Top Languages & Tech Distribution",
            contributionStreak: "Contribution Activity",
            loading: "Fetching GitHub metrics...",
            offlineNotice: "Showing profile snapshot",
        }
    },
    id: {
        nav: {
            home: "Beranda",
            github: "GitHub",
            about: "Tentang",
            skills: "Keahlian",
            projects: "Proyek",
            experience: "Pengalaman",
            certificates: "Sertifikasi",
            contact: "Kontak",
        },
        hero: {
            titles: [
                "Pengembang Web Full-Stack",
                "Spesialis Sistem Informasi",
                "Arsitek Laravel & React",
                "Penggemar Presisi UI/UX"
            ],
            description: "Membangun solusi web modern, terukur, dan elegan dengan keahlian mendalam dalam Software Engineering, presisi UI/UX, dan arsitektur kode yang bersih.",
            viewProjects: "Lihat Proyek",
            contactMe: "Hubungi Saya",
            downloadCv: "Unduh CV",
            dragMe: "Tarik kartu",
            clickToFlip: "Klik untuk balik 3D",
            specialty: "SPESIALISASI",
            fullstack: "FULL-STACK",
            verifiedPass: "PASS DEV TERVERIFIKASI",
            connectSocial: "Terhubung via Media Sosial",
            scrollDown: "GULIR KE BAWAH",
        },
        about: {
            tag: "01 // TENTANG SAYA",
            title: "Berdedikasi Membangun Produk Digital Berdampak",
            myStory: "Cerita Saya",
            philosophy: "Filosofi Rekayasa",
            focus: "Keahlian Utama",
            availableForHire: "SIAP BEKERJA",
            hobbiesTag: "Fokus Personal & Hobi",
            storyP1: "Halo! Saya Rangga, seorang Software Engineer yang berdedikasi menyelesaikan masalah dunia nyata melalui kode bersih, arsitektur modern, dan desain intuitif.",
            storyP2: "Dengan latar belakang yang kuat di bidang Sistem Informasi, saya menjembatani kebutuhan bisnis dengan eksekusi teknis. Fokus utama saya adalah menciptakan aplikasi web yang memberikan pengalaman pengguna luar biasa sambil mempertahankan keandalan teknis.",
            storyP3: "Saya berspesialisasi dalam pengembangan full-stack modern menggunakan React, Laravel, dan Tailwind CSS. Baik bekerja secara mandiri maupun kolaboratif, saya berkembang dengan mempelajari teknologi baru dan terus meningkatkan standar perangkat lunak.",
            philosophyTitle: '"Kesederhanaan adalah kecanggihan tertinggi." — Rekayasa perangkat lunak bukan hanya tentang menulis kode, tetapi tentang merancang solusi sederhana untuk domain yang kompleks.',
            cleanCode: "Kode & Arsitektur Bersih: Memprioritaskan kemudahan pemeliharaan dan pola desain modular.",
            humanUi: "UI Berpusat pada Manusia: Membangun antarmuka yang cepat, mudah diakses, dengan hierarki visual yang jelas.",
            continuousGrowth: "Pertumbuhan Berkelanjutan: Memanfaatkan alur kerja modern sambil menghormati fondasi rekayasa yang solid.",
            proficiencyTitle: "Rincian Tingkat Keahlian Teknis & Area Penguasaan:",
            stats: {
                projects: "Proyek",
                experience: "Thn Pengalaman",
                certificates: "Sertifikat",
                techStack: "Tech Stack"
            },
            interests: [
                { label: 'Kopi Espresso & Kode', desc: 'Menemani sesi arsitektur sistem dengan kopi racikan spesial' },
                { label: 'Membaca Desain Sistem', desc: 'Mempelajari sistem terdistribusi & arsitektur terukur' },
                { label: 'Musik Lo-Fi Focus', desc: 'Mendengarkan musik instrumen lo-fi saat penulisan kode mendalam' },
                { label: 'Presisi F1 & Desain UI', desc: 'Mengagumi rekayasa presisi tinggi di balap F1 & antarmuka digital' },
            ]
        },
        skills: {
            tag: "02 // SKILL & KEAHLIAN",
            title: "Kompetensi Utama & Teknologi",
            subtitle: "Saring kategori di bawah ini atau arahkan kursor ke kartu untuk efek spotlight interaktif",
            all: "Semua",
            showing: "Menampilkan",
            of: "dari",
            skillsCount: "kelompok skill",
            prevPage: "Halaman Sebelumnya",
            nextPage: "Halaman Selanjutnya",
            categories: {
                frontend: "Pengembangan Frontend",
                backend: "Pengembangan Backend",
                uiux: "Desain UI/UX",
                database: "Basis Data & Penyimpanan",
                devops: "DevOps, Cloud & Alat"
            },
            cards: [
                {
                    category: "Pengembangan Frontend",
                    tag: "Frontend",
                    skills: [
                        { name: "React 19 & Next.js", level: "Lanjutan", desc: "Arsitektur komponen, Custom Hooks, Manajemen State & Aplikasi SPA" },
                        { name: "Tailwind CSS v4 & CSS3", level: "Ahli", desc: "Styling utility-first, Desain Responsif & Komponen UI Modern" },
                        { name: "JavaScript (ES6+) & TypeScript", level: "Mahir", desc: "Pemrograman Asinkron, Manipulasi DOM & Keamanan Tipe Data" },
                    ]
                },
                {
                    category: "Desain UI/UX",
                    tag: "UI/UX",
                    skills: [
                        { name: "Figma & Prototyping", level: "Lanjutan", desc: "User Flows, Mockup presisi tinggi, Design Systems & Wireframing" },
                        { name: "Desain Berpusat Manusia", level: "Mahir", desc: "Aksesibilitas (a11y), UI Ergonomis & Hierarki Visual Bersih" },
                    ]
                },
                {
                    category: "Pengembangan Backend",
                    tag: "Backend",
                    skills: [
                        { name: "Laravel 13 & PHP 8.3", level: "Ahli", desc: "MVC, RESTful APIs, Eloquent ORM, Middleware & Inertia.js" },
                        { name: "Node.js & Express", level: "Mahir", desc: "Server event-driven, API endpoints & Integrasi Backend" },
                    ]
                },
                {
                    category: "Basis Data & Penyimpanan",
                    tag: "Database",
                    skills: [
                        { name: "MySQL & PostgreSQL", level: "Lanjutan", desc: "Desain DB relasional, Optimasi Query & Indeksasi Data" },
                        { name: "Redis & Caching", level: "Mahir", desc: "Penyimpanan key-value, Manajemen Sesi & Caching Antrean" },
                    ]
                },
                {
                    category: "DevOps, Cloud & Alat",
                    tag: "DevOps",
                    skills: [
                        { name: "Git, Docker & CI/CD", level: "Lanjutan", desc: "Version control, Kontainerisasi aplikasi & Deploy otomatis" },
                        { name: "Linux & Hosting Web", level: "Mahir", desc: "Konfigurasi VPS, Server Nginx & Manajemen Lingkungan Runtime" },
                    ]
                }
            ]
        },
        projects: {
            tag: "03 // PROYEK UNGGULAN",
            title: "Portofolio Karya Terbaru",
            subtitle: "Saring berdasarkan teknologi atau cari kata kunci untuk melihat rincian proyek",
            searchPlaceholder: "Cari proyek...",
            featured: "UNGGULAN",
            details: "Detail →",
            demo: "Demo",
            code: "Kode",
            quickInspect: "Inspeksi Cepat",
            keyFeatures: "Fitur Utama & Sorotan",
            techUsed: "Tech Stack yang Digunakan",
            livePreview: "Pratinjau Langsung",
            sourceCode: "Kode Sumber",
            showing: "Menampilkan",
            of: "dari",
            projectsCount: "proyek",
            prevPage: "Halaman Sebelumnya",
            nextPage: "Halaman Berikutnya",
            noProjects: "Tidak ada proyek yang sesuai dengan pencarian Anda",
            resetFilters: "Reset Filter",
            items: [
                {
                    id: 1,
                    title: 'Portofolio Pribadi & Admin CMS',
                    category: 'Full Stack',
                    description: 'Website portofolio pribadi modern yang dibangun dengan Laravel 13, Inertia.js, React 19, dan Tailwind CSS v4 lengkap dengan manajemen konten admin.',
                    features: [
                        'Pengalaman SPA penuh menggunakan Inertia.js',
                        'Panel Admin Terproteksi dengan komponen kustom',
                        'Fitur ubah mode gelap dan terang',
                        'Manajemen CRUD Proyek, Keahlian, & Pesan dinamis',
                        'Animasi scroll halus & UI interaktif dengan Framer Motion'
                    ],
                },
                {
                    id: 2,
                    title: 'Platform E-Commerce & API Pembayaran',
                    category: 'Full Stack',
                    description: 'Aplikasi web e-commerce terukur dengan manajemen stok produk real-time, integrasi gateway pembayaran Midtrans, dan pelacakan pesanan.',
                    features: [
                        'Webhook Midtrans Payment Gateway & status pesanan otomatis',
                        'Caching Redis untuk performa pencarian katalog produk yang cepat',
                        'Alur keranjang belanja & checkout kustom',
                        'Dashboard admin untuk laporan penjualan & kontrol stok'
                    ],
                },
                {
                    id: 3,
                    title: 'Dashboard Manajemen Tugas Pintar',
                    category: 'Frontend',
                    description: 'Dashboard manajemen tugas interaktif bergaya Kanban dengan alur drag-and-drop, analitik real-time, serta mode gelap/terang.',
                    features: [
                        'Kolom tugas Kanban drag-and-drop (To Do, In Progress, Done)',
                        'Label prioritas tugas & pengingat tenggat waktu otomatis',
                        'Kontrol filter & menu seluler yang responsif',
                        'Penyimpanan status browser yang konsisten'
                    ],
                },
                {
                    id: 4,
                    title: 'Microservices RESTful & API Otentikasi',
                    category: 'Backend',
                    description: 'Gateway API REST dengan otentikasi JWT berkinerja tinggi yang dirancang untuk aplikasi SaaS multi-tenant dengan middleware rate-limiting.',
                    features: [
                        'Otentikasi token JWT & mekanisme pembaruan token',
                        'Middleware pembatasan laju (rate limiting) & otorisasi kunci API',
                        'Pengaturan kontainerisasi Docker dengan reverse proxy Nginx',
                        'Pengujian unit otomatis untuk setiap endpoint API'
                    ],
                }
            ]
        },
        experience: {
            tag: "04 // KARIR & PENGALAMAN",
            title: "Perjalanan Profesional & Pencapaian",
            subtitle: "Saring kategori di bawah ini atau klik entri untuk melihat rincian pencapaian utama",
            keyAccomplishments: "Pencapaian Utama & Hasil:",
            items: [
                {
                    id: 1,
                    role: 'Intern Full-Stack Developer',
                    company: 'PT. Teknologi Inovasi Indonesia',
                    type: 'Internship',
                    location: 'Jakarta, Indonesia',
                    period: 'Jan 2025 - Sekarang',
                    description: 'Mengembangkan alat web administratif internal dan portal API publik yang terukur menggunakan Laravel 13 dan React 19.',
                    achievements: [
                        'Mengoptimalkan performa query basis data API hingga 35% menggunakan indeksasi Eloquent dan caching Redis.',
                        'Membangun modul UI dashboard responsif dengan komponen kustom dan Inertia.js.',
                        'Berkolaborasi dalam alur kerja Agile sprint planning dan kontrol versi Git.'
                    ],
                },
                {
                    id: 2,
                    role: 'Pengembang Web Freelance',
                    company: 'Mandiri / Berbagai Klien',
                    type: 'Freelance',
                    location: 'Remote',
                    period: '2023 - Sekarang',
                    description: 'Merancang dan membangun solusi web kustom, toko e-commerce, dan landing page untuk UMKM dan startup.',
                    achievements: [
                        'Berhasil menyelesaikan 10+ proyek pengembangan web tepat waktu dengan tingkat kepuasan klien 100%.',
                        'Mengintegrasikan payment gateway (Midtrans) dan webhook notifikasi email otomatis.',
                        'Menerapkan praktik terbaik SEO dan standar desain responsif mobile-first.'
                    ],
                },
                {
                    id: 3,
                    role: 'Ketua Tim Developer & Pengurus',
                    company: 'Himpunan Mahasiswa Sistem Informasi (HIMA SI)',
                    type: 'Organization',
                    location: 'Kampus Universitas',
                    period: '2023 - 2024',
                    description: 'Memimpin operasional tim teknis untuk platform web himpunan dan portal kompetisi teknologi tingkat nasional.',
                    achievements: [
                        'Mengembangkan portal pendaftaran acara yang menangani lebih dari 1.200+ peserta aktif.',
                        'Mentransfer ilmu pengembangan web dasar (HTML, CSS, JavaScript, PHP) kepada mahasiswa tingkat pertama.'
                    ],
                },
                {
                    id: 4,
                    role: 'Juara 1 - Lomba Pengembangan Web Nasional',
                    company: 'National Tech Hackathon 2024',
                    type: 'Competition',
                    location: 'Tingkat Nasional',
                    period: '2024',
                    description: 'Meraih Juara 1 dalam membangun prototipe aplikasi web inovatif untuk pengelolaan sampah perkotaan pintar.',
                    achievements: [
                        'Merancang antarmuka pelacakan geolokasi real-time untuk armada truk pengangkut sampah.',
                        'Mempresentasikan arsitektur teknis di hadapan dewan juri ahli software engineer.'
                    ],
                }
            ]
        },
        certificates: {
            tag: "05 // SERTIFIKASI RESMI",
            title: "Sertifikasi Terverifikasi & Kredensial",
            subtitle: "Klik pada sertifikat mana saja untuk menginspeksi kredensial resmi dan rincian verifikasi",
            inspect: "Inspeksi",
            credentialId: "ID KREDENSIAL",
            verifyCertificate: "Verifikasi Sertifikat",
            close: "Tutup",
            items: [
                {
                    id: 1,
                    title: 'Laravel Certified Developer',
                    issuer: 'Laravel / Certification Board',
                    year: '2025',
                    badge: 'Resmi',
                    description: 'Membuktikan keahlian mendalam dalam arsitektur Laravel MVC, Eloquent ORM, desain API RESTful, migrasi basis data, dan praktik keamanan.',
                },
                {
                    id: 2,
                    title: 'React Advanced Frontend Developer',
                    issuer: 'Meta / Coursera',
                    year: '2024',
                    badge: 'Profesional',
                    description: 'Pengembangan aplikasi single-page tingkat lanjut menggunakan React 19, custom hooks, manajemen state, optimasi performa, dan pengujian komponen.',
                },
                {
                    id: 3,
                    title: 'AWS Certified Cloud Practitioner',
                    issuer: 'Amazon Web Services',
                    year: '2024',
                    badge: 'Cloud',
                    description: 'Pengetahuan dasar komputasi awan termasuk AWS EC2, penyimpanan S3, keamanan IAM, jaringan VPC, dan prinsip eksekusi cloud.',
                },
                {
                    id: 4,
                    title: 'Full Stack Web Development Specialization',
                    issuer: 'Dicoding Academy',
                    year: '2024',
                    badge: 'Akademi',
                    description: 'Kurikulum web full-stack komprehensif mencakup layanan API backend, basis data relasional, UI frontend responsif, dan alur CI/CD.',
                },
                {
                    id: 5,
                    title: 'Database Management & SQL Expert',
                    issuer: 'Oracle Academy',
                    year: '2023',
                    badge: 'Basis Data',
                    description: 'Desain Sistem Manajemen Basis Data Relasional (RDBMS) tingkat ahli, optimasi query SQL kompleks, indeksasi, dan pemodelan data.',
                }
            ]
        },
        techStack: {
            tag: "DITOPANG OLEH TECH STACK MODERN",
            title: "Teknologi & Alat yang Saya Gunakan",
            categories: {
                all: "Semua",
                frontend: "Frontend",
                backend: "Backend",
                tools: "Basis Data & Alat"
            }
        },
        contact: {
            tag: "06 // HUBUNGI SAYA",
            title: "Mari Diskusikan Proyek Anda Berikutnya",
            subtitle: "Punya peluang, penawaran proyek, atau pertanyaan? Kirimkan pesan dan saya akan membalas dalam 24 jam.",
            infoTitle: "Informasi Kontak",
            location: "Lokasi",
            locationVal: "Indonesia (Remote / Hybrid)",
            availability: "Ketersediaan",
            availabilityVal: "Tersedia untuk Freelance & Full-Time",
            quickTopics: "Pilihan Subjek Cepat:",
            name: "Nama Anda *",
            email: "Email Anda *",
            subject: "Subjek",
            message: "Pesan *",
            sending: "Mengirim Pesan...",
            send: "Kirim Pesan",
            successTitle: "Pesan Terkirim!",
            successDesc: "Terima kasih telah menghubungi. Saya akan segera membalas pesan Anda.",
        },
        footer: {
            bio: "Software Engineer spesialis Laravel, React, dan arsitektur web modern. Berfokus pada kode bersih, performa, dan desain berpusat pada pengguna.",
            quickNav: "Navigasi Cepat",
            featuredTech: "Tech Stack Utama",
            contactHeading: "Kontak & Lokasi",
            location: "Indonesia (UTC+7 / WIB)",
            status: "Tersedia untuk proyek remote",
            rights: "Hak cipta dilindungi undang-undang.",
            backToTop: "Kembali ke atas",
            crafted: "Dibuat menggunakan Laravel 13, React 19 & Tailwind CSS"
        },
        githubStatus: {
            tag: "00 // STATISTIK & AKTIVITAS GITHUB",
            title: "Aktivitas Kode & Ringkasan GitHub",
            subtitle: "Metrik aktivitas real-time, repositori sumber terbuka, dan statistik kontribusi langsung dari GitHub",
            overviewTab: "Ringkasan & Metrik",
            reposTab: "Repositori Populer",
            followers: "Pengikut",
            following: "Mengikuti",
            publicRepos: "Repo Publik",
            totalStars: "Total Bintang",
            totalForks: "Total Fork",
            refreshData: "Muat Ulang Data",
            updatedNow: "Sinkronisasi Aktif",
            visitProfile: "Lihat Profil GitHub",
            viewOnGithub: "Buka di GitHub",
            stars: "Bintang",
            forks: "Fork",
            updated: "Diperbarui",
            language: "Bahasa Utama",
            topLanguages: "Distribusi Bahasa & Teknologi",
            contributionStreak: "Aktivitas Kontribusi",
            loading: "Mengambil data GitHub...",
            offlineNotice: "Menampilkan data ringkasan tersimpan",
        }
    }
};
