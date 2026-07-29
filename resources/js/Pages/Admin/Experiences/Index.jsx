import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/Components/ui/table';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Plus, Pencil, Trash2, X, Briefcase } from 'lucide-react';

export default function ExperiencesIndex({ experiences = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);

    const { data, setData, reset, processing } = useForm({
        period: '',
        role: '',
        company: '',
        location: '',
        description: '',
        responsibilities: '',
        tech_badges: '',
    });

    const openCreateModal = () => {
        setEditingExperience(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (exp) => {
        setEditingExperience(exp);
        setData({
            period: exp.period,
            role: exp.role,
            company: exp.company,
            location: exp.location || '',
            description: exp.description || '',
            responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : exp.responsibilities || '',
            tech_badges: Array.isArray(exp.tech_badges) ? exp.tech_badges.join(', ') : exp.tech_badges || '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedData = {
            ...data,
            responsibilities: typeof data.responsibilities === 'string'
                ? data.responsibilities.split('\n').map(s => s.trim()).filter(Boolean)
                : data.responsibilities,
            tech_badges: typeof data.tech_badges === 'string'
                ? data.tech_badges.split(',').map(s => s.trim()).filter(Boolean)
                : data.tech_badges,
        };

        if (editingExperience) {
            router.put(`/admin/experiences/${editingExperience.id}`, formattedData, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post('/admin/experiences', formattedData, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengalaman kerja ini?')) {
            router.delete(`/admin/experiences/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Pengalaman" />

            <div className="space-y-8">
                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                            Karir & Riwayat Kerja
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Manajemen Pengalaman
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                            Kelola riwayat pekerjaan, posisi, dan tanggung jawab karir Anda
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={openCreateModal} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 gap-1.5 shadow-md">
                            <Plus className="w-4 h-4" />
                            <span>Tambah Pengalaman</span>
                        </Button>
                    </motion.div>
                </div>

                {/* Table Card */}
                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
                            <TableRow>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Posisi & Perusahaan</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Periode</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Tech Badges</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {experiences.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500 font-mono text-xs">
                                        Belum ada riwayat pengalaman kerja ditambahkan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                experiences.map((exp) => (
                                    <TableRow key={exp.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition">
                                        <TableCell className="py-4">
                                            <div className="font-heading font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-gray-500" />
                                                <span>{exp.role}</span>
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-slate-400 font-medium mt-0.5">{exp.company} — {exp.location || 'Remote'}</div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <Badge variant="outline" className="rounded-full text-[10px] font-mono border-gray-200 dark:border-slate-700">
                                                {exp.period}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {(Array.isArray(exp.tech_badges) ? exp.tech_badges : []).map((t, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openEditModal(exp)}
                                                className="gap-1 text-xs rounded-full border-gray-200 dark:border-slate-800"
                                            >
                                                <Pencil className="w-3.5 h-3.5" /> Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(exp.id)}
                                                className="gap-1 text-xs rounded-full"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Hapus
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Modal Create / Edit */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative"
                        >
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                                    {editingExperience ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="role" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Posisi / Jabatan</Label>
                                        <Input
                                            id="role"
                                            type="text"
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            placeholder="Senior Full-Stack Engineer"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="company" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Nama Perusahaan</Label>
                                        <Input
                                            id="company"
                                            type="text"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            placeholder="Tech Agency Inc."
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="period" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Periode Kerja</Label>
                                        <Input
                                            id="period"
                                            type="text"
                                            value={data.period}
                                            onChange={(e) => setData('period', e.target.value)}
                                            placeholder="2024 — PRESENT"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="location" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Lokasi</Label>
                                        <Input
                                            id="location"
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="Jakarta / Remote"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="responsibilities" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tanggung Jawab (pisahkan dengan baris baru)</Label>
                                    <Textarea
                                        id="responsibilities"
                                        value={data.responsibilities}
                                        onChange={(e) => setData('responsibilities', e.target.value)}
                                        rows={3}
                                        placeholder="Memimpin arsitektur sistem&#10;Mengoptimalkan performa aplikasi"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="tech_badges" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tech Badges (pisahkan dengan koma)</Label>
                                    <Input
                                        id="tech_badges"
                                        type="text"
                                        value={data.tech_badges}
                                        onChange={(e) => setData('tech_badges', e.target.value)}
                                        placeholder="Laravel 13, React 19, Inertia, Docker"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setIsModalOpen(false)}
                                        className="rounded-full text-xs"
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-xs shadow-md">
                                        Simpan Pengalaman
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}
