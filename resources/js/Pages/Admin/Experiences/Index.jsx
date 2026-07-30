import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Plus, Pencil, Trash2, X, Briefcase, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ExperiencesIndex({ experiences = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState(null);
    const [isCustomCategory, setIsCustomCategory] = useState(false);

    // Search & Pagination State
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const defaultPresets = [
        { value: 'Career', label: 'Career (Pekerjaan Utama)' },
        { value: 'Internship', label: 'Internship (Magang)' },
        { value: 'Freelance', label: 'Freelance (Proyek Bebas)' },
        { value: 'Organization', label: 'Organization (Organisasi)' },
        { value: 'Volunteering', label: 'Volunteering (Sukarelawan)' },
        { value: 'Education', label: 'Education (Pendidikan)' },
    ];

    const existingCategories = Array.from(
        new Set([
            ...defaultPresets.map(p => p.value),
            ...experiences.map(e => e.type).filter(Boolean)
        ])
    );

    const { data, setData, reset, processing } = useForm({
        period: '',
        role: '',
        company: '',
        type: 'Career',
        location: '',
        description: '',
        responsibilities: '',
        tech_badges: '',
        order: 0,
    });

    const openCreateModal = () => {
        setEditingExp(null);
        setIsCustomCategory(false);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (exp) => {
        setEditingExp(exp);
        const expType = exp.type || 'Career';
        const isPreset = defaultPresets.some(p => p.value === expType);
        setIsCustomCategory(!isPreset && expType !== '');
        setData({
            period: exp.period,
            role: exp.role,
            company: exp.company,
            type: expType,
            location: exp.location || '',
            description: exp.description || '',
            responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : '',
            tech_badges: Array.isArray(exp.tech_badges) ? exp.tech_badges.join(', ') : '',
            order: exp.order || 0,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...data,
            responsibilities: data.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
            tech_badges: data.tech_badges.split(',').map((s) => s.trim()).filter(Boolean),
        };

        if (editingExp) {
            router.put(`/admin/experiences/${editingExp.id}`, payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post('/admin/experiences', payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengalaman kerja ini?')) {
            router.delete(`/admin/experiences/${id}`);
        }
    };

    // Search Filtering & Pagination Math
    const filteredExperiences = experiences.filter(exp =>
        exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (exp.description && exp.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredExperiences.length / itemsPerPage) || 1;
    const paginatedExperiences = filteredExperiences.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <AdminLayout>
            <Head title="Manajemen Pengalaman & Karir" />

            <div className="space-y-6">
                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                            Seksi 05 // Landing Page
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Manajemen Pengalaman & Karir
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                            Kelola riwayat pekerjaan, magang, organisasi, proyek freelance, dan aktivitas karir Anda
                        </p>
                    </div>

                    <Button
                        onClick={openCreateModal}
                        className="rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-xs px-5 py-2.5 shadow-lg hover:bg-gray-800 dark:hover:bg-slate-100 transition cursor-pointer self-start sm:self-auto flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Tambah Pengalaman Baru
                    </Button>
                </div>

                {/* Filter Search Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                        <Input
                            placeholder="Cari posisi atau perusahaan..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 rounded-2xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-xs sm:text-sm"
                        />
                    </div>
                    <div className="text-xs font-mono text-gray-500 dark:text-slate-400">
                        Total: <span className="font-bold text-gray-900 dark:text-white">{experiences.length}</span> pengalaman
                    </div>
                </div>

                {/* Modern Responsive Table */}
                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-950/50 text-[11px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6 w-16 text-center">No.</th>
                                    <th className="py-4 px-6">Posisi & Perusahaan</th>
                                    <th className="py-4 px-6">Kategori</th>
                                    <th className="py-4 px-6">Periode</th>
                                    <th className="py-4 px-6">Tech Badges</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-xs sm:text-sm font-sans">
                                {paginatedExperiences.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 px-6 text-center text-gray-500 dark:text-slate-500 font-mono text-xs">
                                            {searchQuery ? `Tidak ada pengalaman yang cocok dengan kata kunci "${searchQuery}".` : 'Belum ada pengalaman kerja ditambahkan. Silakan klik "+ Tambah Pengalaman".'}
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedExperiences.map((exp, idx) => (
                                        <tr key={exp.id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40 transition duration-150 group">
                                            <td className="py-4 px-6 font-mono text-xs font-bold text-gray-400 dark:text-slate-500 text-center">
                                                {(currentPage - 1) * itemsPerPage + idx + 1}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <div className="font-heading font-bold text-gray-900 dark:text-white text-base">{exp.role}</div>
                                                    <div className="text-xs text-gray-500 dark:text-slate-400 font-medium mt-0.5">{exp.company} — {exp.location || 'Remote'}</div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <Badge variant="outline" className="rounded-full text-[10px] font-mono px-3 py-1 bg-gray-100/80 dark:bg-slate-800/80 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700">
                                                    {exp.type || 'Career'}
                                                </Badge>
                                            </td>

                                            <td className="py-4 px-6">
                                                <Badge variant="outline" className="rounded-full text-[10px] font-mono px-3 py-1 bg-gray-100/80 dark:bg-slate-800/80 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700">
                                                    {exp.period}
                                                </Badge>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap gap-1">
                                                    {(Array.isArray(exp.tech_badges) ? exp.tech_badges : []).map((t, idx) => (
                                                        <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>

                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <motion.button
                                                        whileHover={{ scale: 1.15 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => openEditModal(exp)}
                                                        title="Edit Pengalaman"
                                                        className="p-2 rounded-full border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.15 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleDelete(exp.id)}
                                                        title="Hapus Pengalaman"
                                                        className="p-2 rounded-full border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Pagination Controls Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/30 text-xs font-mono text-gray-500 dark:text-slate-400">
                        <div>
                            Menampilkan <span className="font-bold text-gray-900 dark:text-white">{filteredExperiences.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> sampai <span className="font-bold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredExperiences.length)}</span> dari <span className="font-bold text-gray-900 dark:text-white">{filteredExperiences.length}</span> pengalaman
                        </div>

                        {totalPages > 1 && (
                            <div className="flex items-center gap-1.5">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-7 h-7 rounded-lg border font-mono font-bold text-xs transition cursor-pointer ${
                                            currentPage === page
                                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-xs'
                                                : 'border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
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
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
                        >
                            {/* Pinned Modal Header */}
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 px-6 py-5 shrink-0 bg-white dark:bg-slate-900">
                                <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                                    {editingExp ? 'Edit Pengalaman' : 'Tambah Pengalaman Baru'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form Container with Internal Scroll Body */}
                            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="role" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Posisi / Jabatan</Label>
                                            <Input
                                                id="role"
                                                type="text"
                                                value={data.role}
                                                onChange={(e) => setData('role', e.target.value)}
                                                placeholder="Senior Full Stack Engineer / Ketua Himpunan"
                                                className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="company" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Perusahaan / Organisasi</Label>
                                            <Input
                                                id="company"
                                                type="text"
                                                value={data.company}
                                                onChange={(e) => setData('company', e.target.value)}
                                                placeholder="Tech Corp / HIMA SI"
                                                className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="type" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Kategori</Label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsCustomCategory(!isCustomCategory);
                                                        if (!isCustomCategory) setData('type', '');
                                                        else setData('type', 'Career');
                                                    }}
                                                    className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                                                >
                                                    {isCustomCategory ? '← Pilih Preset' : '+ Baru (Custom)'}
                                                </button>
                                            </div>

                                            {isCustomCategory ? (
                                                <Input
                                                    id="type"
                                                    type="text"
                                                    value={data.type}
                                                    onChange={(e) => setData('type', e.target.value)}
                                                    placeholder="Ketik kategori kustom (e.g. Bootcamp)..."
                                                    className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-xs sm:text-sm"
                                                    required
                                                />
                                            ) : (
                                                <select
                                                    id="type"
                                                    value={data.type}
                                                    onChange={(e) => setData('type', e.target.value)}
                                                    className="w-full h-10 px-3 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-xs sm:text-sm text-gray-900 dark:text-slate-200 focus:outline-none"
                                                >
                                                    {existingCategories.map((cat) => {
                                                        const preset = defaultPresets.find(p => p.value === cat);
                                                        return (
                                                            <option key={cat} value={cat}>
                                                                {preset ? preset.label : cat}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            )}
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="period" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Periode Kerja</Label>
                                            <Input
                                                id="period"
                                                type="text"
                                                value={data.period}
                                                onChange={(e) => setData('period', e.target.value)}
                                                placeholder="2023 - Sekarang"
                                                className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="location" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Lokasi / Tipe</Label>
                                            <Input
                                                id="location"
                                                type="text"
                                                value={data.location}
                                                onChange={(e) => setData('location', e.target.value)}
                                                placeholder="Jakarta (Hybrid)"
                                                className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="description" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Ringkasan Peran</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Penjelasan singkat mengenai peran dan pencapaian utama..."
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm min-h-[70px]"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="responsibilities" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tanggung Jawab (1 Poin Per Baris)</Label>
                                        <Textarea
                                            id="responsibilities"
                                            value={data.responsibilities}
                                            onChange={(e) => setData('responsibilities', e.target.value)}
                                            placeholder="Mengembangkan arsitektur RESTful API&#10;Memimpin tim frontend dalam migrasi React 19"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm min-h-[90px]"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="tech_badges" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tech Badges (Pisahkan dengan Koma)</Label>
                                        <Input
                                            id="tech_badges"
                                            type="text"
                                            value={data.tech_badges}
                                            onChange={(e) => setData('tech_badges', e.target.value)}
                                            placeholder="Laravel, React, PostgreSQL, Docker"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Pinned Modal Footer */}
                                <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50/80 dark:bg-slate-950/80 border-t border-gray-100 dark:border-slate-800 shrink-0">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setIsModalOpen(false)}
                                        className="rounded-full text-xs cursor-pointer"
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-xs shadow-md cursor-pointer">
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
