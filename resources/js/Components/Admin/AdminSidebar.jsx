import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FolderKanban, Wrench, Mail, Globe, X, Code2, Briefcase, Award, Settings, Layers, UserCheck, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSidebar({ isOpen, setIsOpen }) {
    const { url, props } = usePage();
    const siteLogo = props?.site_settings?.site_logo || "/storage/logo/logo-portofolio.png";

    const sections = [
        {
            groupTitle: 'UTAMA',
            items: [
                {
                    tag: 'OVERVIEW DASHBOARD',
                    name: 'Dashboard',
                    href: '/admin/dashboard',
                    icon: LayoutDashboard,
                }
            ]
        },
        {
            groupTitle: 'SEKSI LANDING PAGE',
            items: [
                {
                    tag: 'SEC 01 // HERO SECTION',
                    name: 'Hero & Identitas',
                    href: '/admin/settings',
                    icon: Settings,
                },
                {
                    tag: 'SEC 02 // ABOUT SECTION',
                    name: 'Tentang Saya (About)',
                    href: '/admin/about',
                    icon: UserCheck,
                },
                {
                    tag: 'SEC 03 // SKILLS SECTION',
                    name: 'Skill & Keahlian',
                    href: '/admin/skills',
                    icon: Wrench,
                },
                {
                    tag: 'SEC 04 // PROJECTS SECTION',
                    name: 'Proyek Showcase',
                    href: '/admin/projects',
                    icon: FolderKanban,
                },
                {
                    tag: 'SEC 05 // EXPERIENCE SECTION',
                    name: 'Pengalaman & Karir',
                    href: '/admin/experiences',
                    icon: Briefcase,
                },
                {
                    tag: 'SEC 06 // CERTIFICATES SECTION',
                    name: 'Sertifikasi & Kredensial',
                    href: '/admin/certificates',
                    icon: Award,
                },
                {
                    tag: 'SEC 07 // TECH STACK SECTION',
                    name: 'Tech Stack Logos',
                    href: '/admin/tech-stacks',
                    icon: Layers,
                },
            ]
        },
        {
            groupTitle: 'KOMUNIKASI',
            items: [
                {
                    tag: 'SEC 08 // CONTACT SECTION',
                    name: 'Pesan Masuk',
                    href: '/admin/messages',
                    icon: Mail,
                }
            ]
        }
    ];

    return (
        <>
            {/* Animated Mobile & Desktop Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-xs cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Interactive Sidebar Drawer */}
            <aside
                className={cn(
                    'fixed top-0 left-0 z-50 h-screen w-64 bg-white/95 dark:bg-slate-900/95 border-r border-gray-200 dark:border-slate-800 text-gray-900 dark:text-slate-100 backdrop-blur-md transition-all duration-300 ease-in-out flex flex-col justify-between shadow-2xl lg:shadow-none',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-slate-800 shrink-0">
                        <Link href="/admin/dashboard" className="flex items-center gap-2.5 font-heading font-bold text-base text-gray-900 dark:text-white group">
                            <div className="w-8 h-8 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow-xs group-hover:rotate-6 transition-transform overflow-hidden p-1">
                                <img 
                                    src={siteLogo} 
                                    alt="Logo" 
                                    className="w-full h-full object-contain rounded-lg"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/storage/logo/logo-portofolio.png";
                                    }}
                                />
                            </div>
                            <span className="tracking-tight">Admin Center</span>
                        </Link>
                        <motion.button
                            whileHover={{ rotate: 90, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden text-gray-500 hover:text-gray-900 dark:hover:text-white p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
                            title="Tutup Sidebar"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>
                    </div>

                    {/* Grouped Navigation with Tags Above Menu Buttons */}
                    <nav className="p-4 space-y-6 overflow-y-auto flex-1">
                        {sections.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-3">
                                <div className="px-2 text-[10px] font-mono font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b border-gray-100 dark:border-slate-800/80 pb-1">
                                    {group.groupTitle}
                                </div>

                                <div className="space-y-2">
                                    {group.items.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = url.startsWith(item.href);
                                        return (
                                            <div key={item.name} className="space-y-1">
                                                {/* Section Tag Tagline ABOVE Menu Button */}
                                                <div className="px-3 text-[9px] font-mono font-bold text-gray-400 dark:text-slate-500 tracking-wider">
                                                    {item.tag}
                                                </div>

                                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            'flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-xs transition-all duration-200',
                                                            isActive
                                                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-xs'
                                                                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                                                        )}
                                                    >
                                                        <Icon className="w-4 h-4 shrink-0" />
                                                        <span className="truncate">{item.name}</span>
                                                    </Link>
                                                </motion.div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>


                </div>
            </aside>
        </>
    );
}
