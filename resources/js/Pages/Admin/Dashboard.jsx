import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { 
    FolderKanban, 
    Wrench, 
    Mail, 
    Briefcase, 
    Award, 
    Layers, 
    ArrowRight, 
    Sparkles, 
    PlusCircle, 
    Settings, 
    UserCheck, 
    KeyRound, 
    Globe, 
    CheckCircle2, 
    FileText, 
    ExternalLink,
    Code2,
    Activity
} from 'lucide-react';
import { GithubIcon } from '@/Components/Landing/BrandIcons';

export default function Dashboard({ stats = {}, recent_messages = [], recent_projects = [], system_info = {} }) {
    const statCards = [
        {
            title: 'Total Proyek',
            value: stats.total_projects || 0,
            icon: FolderKanban,
            color: 'bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white border-gray-200 dark:border-slate-800',
            href: '/admin/projects',
        },
        {
            title: 'Total Skill',
            value: stats.total_skills || 0,
            icon: Wrench,
            color: 'bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white border-gray-200 dark:border-slate-800',
            href: '/admin/skills',
        },
        {
            title: 'Pengalaman Karir',
            value: stats.total_experiences || 0,
            icon: Briefcase,
            color: 'bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white border-gray-200 dark:border-slate-800',
            href: '/admin/experiences',
        },
        {
            title: 'Sertifikasi',
            value: stats.total_certificates || 0,
            icon: Award,
            color: 'bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white border-gray-200 dark:border-slate-800',
            href: '/admin/certificates',
        },
        {
            title: 'Tech Stack Logos',
            value: stats.total_tech_stacks || 0,
            icon: Layers,
            color: 'bg-gray-100 dark:bg-slate-950 text-gray-900 dark:text-white border-gray-200 dark:border-slate-800',
            href: '/admin/tech-stacks',
        },
        {
            title: 'Pesan Belum Dibaca',
            value: stats.unread_messages || 0,
            icon: Mail,
            color: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
            href: '/admin/messages',
        },
    ];

    const quickActions = [
        {
            name: 'Tambah Proyek Baru',
            desc: 'Upload karya portofolio baru',
            icon: PlusCircle,
            href: '/admin/projects',
            badge: 'Proyek',
        },
        {
            name: 'Edit Hero & Identitas',
            desc: 'Kelola teks hero & lanyard card',
            icon: Settings,
            href: '/admin/settings',
            badge: 'Konfigurasi',
        },
        {
            name: 'Pengaturan Profil & Password',
            desc: 'Ubah password & logo brand',
            icon: KeyRound,
            href: '/admin/profile',
            badge: 'Keamanan',
        },
        {
            name: 'Kelola Tentang Saya',
            desc: 'Update cerita & filosofi koding',
            icon: UserCheck,
            href: '/admin/about',
            badge: 'About',
        },
    ];

    return (
        <AdminLayout>
            <Head title="Dashboard Overview" />

            <div className="space-y-8">
                {/* Header Title */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                                Control Center
                            </span>
                            <Sparkles className="w-3.5 h-3.5 text-gray-900 dark:text-white" />
                        </div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Dashboard Overview
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans">
                            Ringkasan data portofolio, statistik konten, dan akses pintas pengelolaan
                        </p>
                    </div>


                </motion.div>

                {/* 6 Stat Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {statCards.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                whileHover={{ y: -4, scale: 1.02 }}
                            >
                                <Link href={stat.href}>
                                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-gray-300 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between">
                                        <CardContent className="p-4 sm:p-5">
                                            <div className="flex items-center justify-between">
                                                <div className={`w-9 h-9 rounded-2xl border flex items-center justify-center ${stat.color}`}>
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <ArrowRight className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500 opacity-60" />
                                            </div>
                                            <div className="mt-3">
                                                <div className="font-heading text-2xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
                                                <div className="text-[10px] font-mono font-semibold text-gray-500 dark:text-slate-400 mt-0.5 uppercase tracking-wider truncate">{stat.title}</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Quick Actions & System Info Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Quick Actions Shortcuts (7 cols) */}
                    <Card className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800/80 p-6">
                            <CardTitle className="font-heading text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Activity className="w-4 h-4 text-gray-900 dark:text-white" />
                                <span>Akses Pintas Pengelolaan (Quick Actions)</span>
                            </CardTitle>
                            <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                                Tombol navigasi langsung ke fitur utama admin panel
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {quickActions.map((action, idx) => {
                                    const ActionIcon = action.icon;
                                    return (
                                        <motion.div key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <Link href={action.href}>
                                                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-950/60 border border-gray-200/80 dark:border-slate-800 hover:border-gray-400 dark:hover:border-slate-700 transition cursor-pointer flex items-start gap-3 group">
                                                    <div className="w-9 h-9 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shrink-0 shadow-xs group-hover:rotate-6 transition-transform">
                                                        <ActionIcon className="w-4.5 h-4.5" />
                                                    </div>
                                                    <div className="flex-1 overflow-hidden">
                                                        <div className="flex items-center justify-between gap-1">
                                                            <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{action.name}</h4>
                                                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-slate-400 font-semibold">{action.badge}</span>
                                                        </div>
                                                        <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-0.5 truncate">{action.desc}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Info & Status Overview (5 cols) */}
                    <Card className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800/80 p-6">
                            <CardTitle className="font-heading text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-gray-900 dark:text-white" />
                                <span>Status Integrasi System</span>
                            </CardTitle>
                            <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                                Ringkasan konfigurasi & status file sistem
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-3.5">
                            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-950/60 border border-gray-200/80 dark:border-slate-800 text-xs">
                                <div className="flex items-center gap-2.5 font-medium text-gray-700 dark:text-slate-300">
                                    <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    <span>Status File CV PDF</span>
                                </div>
                                {system_info.cv_uploaded ? (
                                    <Badge className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 text-[10px] font-mono">
                                        Terupload
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="text-[10px] font-mono text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800">
                                        Belum Ada File
                                    </Badge>
                                )}
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-950/60 border border-gray-200/80 dark:border-slate-800 text-xs">
                                <div className="flex items-center gap-2.5 font-medium text-gray-700 dark:text-slate-300">
                                    <GithubIcon className="w-4 h-4 text-gray-900 dark:text-white" />
                                    <span>GitHub Username</span>
                                </div>
                                <span className="font-mono font-bold text-gray-900 dark:text-white text-xs">
                                    @{system_info.github_username || 'rnggprmd'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-950/60 border border-gray-200/80 dark:border-slate-800 text-xs">
                                <div className="flex items-center gap-2.5 font-medium text-gray-700 dark:text-slate-300">
                                    <CheckCircle2 className="w-4 h-4 text-gray-900 dark:text-white" />
                                    <span>Technology Stack</span>
                                </div>
                                <span className="font-mono text-[10px] text-gray-600 dark:text-slate-400 font-semibold">
                                    {system_info.framework_stack}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Row: Recent Messages & Recent Projects */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Recent Messages (7 cols) */}
                    <Card className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 dark:border-slate-800/80 p-6">
                            <div>
                                <CardTitle className="font-heading text-base font-bold text-gray-900 dark:text-white">Pesan Masuk Terbaru</CardTitle>
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Pesan dari pengunjung landing page</CardDescription>
                            </div>
                            <Link href="/admin/messages">
                                <Button className="rounded-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold px-4 py-1.5 text-xs gap-1.5 shadow-xs cursor-pointer transition-colors">
                                    <span>Lihat Semua</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                            </Link>
                        </CardHeader>

                        <CardContent className="p-6">
                            {recent_messages.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 dark:text-slate-500 text-xs font-mono">
                                    Belum ada pesan masuk saat ini.
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                                    {recent_messages.map((msg) => (
                                        <div key={msg.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group">
                                            <div className="space-y-0.5 overflow-hidden">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-xs text-gray-900 dark:text-white truncate">{msg.name}</span>
                                                    <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono truncate">({msg.email})</span>
                                                    {!msg.is_read && (
                                                        <Badge variant="destructive" className="text-[9px] px-1.5 py-0 rounded-full shrink-0">
                                                            Baru
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-1">{msg.message}</p>
                                            </div>
                                            <span className="text-[10px] font-mono text-gray-400 dark:text-slate-500 whitespace-nowrap shrink-0">
                                                {new Date(msg.created_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Projects (5 cols) */}
                    <Card className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 dark:border-slate-800/80 p-6">
                            <div>
                                <CardTitle className="font-heading text-base font-bold text-gray-900 dark:text-white">Proyek Portofolio Terbaru</CardTitle>
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Karya yang baru ditambahkan</CardDescription>
                            </div>
                            <Link href="/admin/projects">
                                <Button className="rounded-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold px-4 py-1.5 text-xs gap-1.5 shadow-xs cursor-pointer transition-colors">
                                    <span>Kelola</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                            </Link>
                        </CardHeader>

                        <CardContent className="p-6">
                            {recent_projects.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 dark:text-slate-500 text-xs font-mono">
                                    Belum ada proyek ditambahkan.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recent_projects.map((proj) => (
                                        <div key={proj.id} className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-950/60 border border-gray-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-slate-800 overflow-hidden shrink-0">
                                                    {proj.image ? (
                                                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <FolderKanban className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{proj.title}</h4>
                                                    <span className="text-[10px] text-gray-500 dark:text-slate-400 font-mono truncate block">{proj.category || 'Full Stack'}</span>
                                                </div>
                                            </div>
                                            {proj.is_featured && (
                                                <Badge className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 text-[9px] font-mono shrink-0">
                                                    Featured
                                                </Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
