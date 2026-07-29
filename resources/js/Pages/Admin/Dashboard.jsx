import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { FolderKanban, Wrench, Mail, MailCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function Dashboard({ stats = {}, recent_messages = [] }) {
    const statCards = [
        {
            title: 'Total Proyek',
            value: stats.total_projects || 0,
            icon: FolderKanban,
            color: 'bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white border-gray-200 dark:border-slate-800',
            href: '/admin/projects',
        },
        {
            title: 'Total Skill',
            value: stats.total_skills || 0,
            icon: Wrench,
            color: 'bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white border-gray-200 dark:border-slate-800',
            href: '/admin/skills',
        },
        {
            title: 'Pesan Belum Dibaca',
            value: stats.unread_messages || 0,
            icon: Mail,
            color: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
            href: '/admin/messages',
        },
        {
            title: 'Total Pesan',
            value: stats.total_messages || 0,
            icon: MailCheck,
            color: 'bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white border-gray-200 dark:border-slate-800',
            href: '/admin/messages',
        },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Header Title */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
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
                            Ringkasan data portofolio dan aktivitas pesan masuk secara real-time
                        </p>
                    </div>
                </motion.div>

                {/* Stat Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {statCards.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.08 }}
                                whileHover={{ y: -4, scale: 1.01 }}
                            >
                                <Link href={stat.href}>
                                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-gray-300 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${stat.color}`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <Badge variant="outline" className="text-[10px] rounded-full border-gray-200 dark:border-slate-700">
                                                    Detail <ArrowRight className="w-3 h-3 ml-1 inline" />
                                                </Badge>
                                            </div>
                                            <div className="mt-4">
                                                <div className="font-heading text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
                                                <div className="text-xs font-mono font-medium text-gray-500 dark:text-slate-400 mt-1 uppercase tracking-wider">{stat.title}</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Recent Messages Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 dark:border-slate-800/80 p-6">
                            <div>
                                <CardTitle className="font-heading text-xl font-bold text-gray-900 dark:text-white">Pesan Masuk Terbaru</CardTitle>
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">Pesan dari pengunjung landing page</CardDescription>
                            </div>
                            <Link href="/admin/messages">
                                <Button variant="outline" size="sm" className="text-xs gap-1 rounded-full border-gray-200 dark:border-slate-800">
                                    Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                            </Link>
                        </CardHeader>

                        <CardContent className="p-6">
                            {recent_messages.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 dark:text-slate-500 text-sm font-mono">
                                    Belum ada pesan masuk saat ini.
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                                    {recent_messages.map((msg) => (
                                        <div key={msg.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-sm text-gray-900 dark:text-white">{msg.name}</span>
                                                    <span className="text-xs text-gray-400 dark:text-slate-500">({msg.email})</span>
                                                    {!msg.is_read && (
                                                        <Badge variant="destructive" className="text-[10px] rounded-full">
                                                            Baru
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-1">{msg.message}</p>
                                            </div>
                                            <span className="text-[11px] font-mono text-gray-400 dark:text-slate-500 whitespace-nowrap">
                                                {new Date(msg.created_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </AdminLayout>
    );
}
