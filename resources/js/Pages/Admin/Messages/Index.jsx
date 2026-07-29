import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Trash2, Mail, Send } from 'lucide-react';

export default function MessagesIndex({ messages = [] }) {
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleSelectMessage = (msg) => {
        setSelectedMessage(msg);
        if (!msg.is_read) {
            router.get(`/admin/messages/${msg.id}`, {}, { preserveState: true });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
            router.delete(`/admin/messages/${id}`, {
                onSuccess: () => setSelectedMessage(null),
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Pesan Masuk" />

            <div className="space-y-8">
                {/* Header Title */}
                <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                        Inbox Komunikasi
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Pesan Masuk
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                        Pesan dari pengunjung melalui form kontak landing page
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* List Pesan */}
                    <Card className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs overflow-hidden">
                        <div className="p-4 bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 font-mono text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                            Daftar Pesan ({messages.length})
                        </div>

                        <div className="divide-y divide-gray-100 dark:divide-slate-800 max-h-[600px] overflow-y-auto">
                            {messages.length === 0 ? (
                                <div className="p-8 text-center text-gray-500 dark:text-slate-500 font-mono text-xs">
                                    Belum ada pesan masuk.
                                </div>
                            ) : (
                                messages.map((msg) => {
                                    const isSelected = selectedMessage?.id === msg.id;
                                    return (
                                        <div
                                            key={msg.id}
                                            onClick={() => handleSelectMessage(msg)}
                                            className={`p-4 cursor-pointer transition ${
                                                isSelected
                                                    ? 'bg-gray-100 dark:bg-slate-800/80 border-l-4 border-gray-900 dark:border-white'
                                                    : 'hover:bg-gray-50 dark:hover:bg-slate-800/40'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                                                    {msg.name}
                                                    {!msg.is_read && (
                                                        <Badge variant="destructive" className="text-[9px] px-1.5 py-0 rounded-full">
                                                            Baru
                                                        </Badge>
                                                    )}
                                                </div>
                                                <span className="text-[10px] font-mono text-gray-400 dark:text-slate-500">
                                                    {new Date(msg.created_at).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-900 dark:text-slate-200 font-medium mt-0.5">{msg.subject || 'Tidak ada subjek'}</div>
                                            <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 mt-1 font-sans">{msg.message}</p>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </Card>

                    {/* Detail Pesan */}
                    <Card className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        {selectedMessage ? (
                            <div className="space-y-6">
                                <div className="flex items-start justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                                    <div>
                                        <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white">{selectedMessage.subject || 'Tidak ada subjek'}</h3>
                                        <div className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                                            Dari: <span className="text-gray-900 dark:text-white font-bold">{selectedMessage.name}</span> ({selectedMessage.email})
                                        </div>
                                        <div className="text-[11px] font-mono text-gray-400 dark:text-slate-500 mt-0.5">
                                            Dikirim pada: {new Date(selectedMessage.created_at).toLocaleString('id-ID')}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(selectedMessage.id)}
                                        title="Hapus Pesan"
                                        className="p-2 rounded-full border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 text-sm text-gray-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap min-h-[200px] font-sans">
                                    {selectedMessage.message}
                                </div>

                                <div className="pt-2">
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || '')}`}
                                    >
                                        <Button size="sm" className="gap-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 font-semibold text-xs shadow-md">
                                            <Send className="w-3.5 h-3.5" /> Balas via Email
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-gray-400 dark:text-slate-500 text-center space-y-2 font-mono">
                                <Mail className="w-10 h-10 text-gray-300 dark:text-slate-700" />
                                <p className="text-xs font-medium">Pilih pesan di sebelah kiri untuk membaca detailnya</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
