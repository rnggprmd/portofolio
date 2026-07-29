import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Plus, Pencil, Trash2, X, PlusCircle, Wrench, Search, ChevronLeft, ChevronRight, Code2, Server, Database as DatabaseIcon, Layout, Cloud, Network as NetworkIcon, Globe, Cpu, ShieldCheck, Smartphone } from 'lucide-react';

const getCategoryIcon = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('front')) return Code2;
    if (cat.includes('back')) return Server;
    if (cat.includes('data')) return DatabaseIcon;
    if (cat.includes('net') || cat.includes('jaringan') || cat.includes('sysadmin')) return NetworkIcon;
    if (cat.includes('ui') || cat.includes('ux') || cat.includes('design')) return Layout;
    if (cat.includes('devops') || cat.includes('cloud')) return Cloud;
    if (cat.includes('sec') || cat.includes('cyber')) return ShieldCheck;
    if (cat.includes('mobile') || cat.includes('app')) return Smartphone;
    if (cat.includes('ai') || cat.includes('ml')) return Cpu;
    return Wrench;
};

export default function SkillsIndex({ skills = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [isCustomCategory, setIsCustomCategory] = useState(false);

    // Search & Pagination State
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data, setData, reset, processing } = useForm({
        name: '',
        category: 'Frontend',
        percentage: 80,
        icon: '',
    });

    const openCreateModal = () => {
        setEditingSkill(null);
        setIsCustomCategory(false);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (skill) => {
        setEditingSkill(skill);
        const standardCategories = ['Frontend', 'Backend', 'UI/UX', 'Database', 'DevOps & Tools'];
        const isCustom = !standardCategories.includes(skill.category);
        setIsCustomCategory(isCustom);
        setData({
            name: skill.name,
            category: skill.category,
            percentage: skill.percentage,
            icon: skill.icon || '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSkill) {
            router.put(`/admin/skills/${editingSkill.id}`, data, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post('/admin/skills', data, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus skill ini?')) {
            router.delete(`/admin/skills/${id}`);
        }
    };

    const existingCategories = Array.from(
        new Set(['Frontend', 'Backend', 'UI/UX', 'Database', 'DevOps & Tools', ...skills.map(s => s.category).filter(Boolean)])
    );

    // Search Filtering & Pagination Math
    const filteredSkills = skills.filter(skill =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSkills.length / itemsPerPage) || 1;
    const paginatedSkills = filteredSkills.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <AdminLayout>
            <Head title="Manajemen Skill" />

            <div className="space-y-8 max-w-6xl mx-auto">
                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                            Seksi 03 // Landing Page
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Manajemen Skill & Keahlian
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                            Daftar tabel keahlian teknis, persentase, dan kategori teknologi yang langsung di-render pada Seksi Skill Landing Page
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={openCreateModal} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 gap-1.5 shadow-md cursor-pointer">
                            <Plus className="w-4 h-4" />
                            <span>Tambah Skill Baru</span>
                        </Button>
                    </motion.div>
                </div>

                {/* Filter Search Bar & Total Counter */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                        <Input
                            type="text"
                            placeholder="Cari skill atau kategori..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 rounded-2xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-xs sm:text-sm"
                        />
                    </div>
                    <div className="text-xs font-mono text-gray-500 dark:text-slate-400">
                        Total: <span className="font-bold text-gray-900 dark:text-white">{skills.length}</span> skill
                    </div>
                </div>

                {/* Modern Responsive Table */}
                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-950/50 text-[11px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6 w-16 text-center">No.</th>
                                    <th className="py-4 px-6">Nama Skill</th>
                                    <th className="py-4 px-6">Kategori</th>
                                    <th className="py-4 px-6 text-center">Kemahiran (%)</th>
                                    <th className="py-4 px-6">Catatan Teknis / Deskripsi</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-xs sm:text-sm font-sans">
                                {paginatedSkills.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 px-6 text-center text-gray-500 dark:text-slate-500 font-mono text-xs">
                                            {searchQuery ? `Tidak ada skill yang cocok dengan kata kunci "${searchQuery}".` : 'Belum ada skill yang ditambahkan. Silakan klik "+ Tambah Skill Baru".'}
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedSkills.map((skill, idx) => {
                                        const CatIcon = getCategoryIcon(skill.category);
                                        return (
                                            <tr key={skill.id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40 transition duration-150 group">
                                                <td className="py-4 px-6 font-mono text-xs font-bold text-gray-400 dark:text-slate-500 text-center">
                                                    {(currentPage - 1) * itemsPerPage + idx + 1}
                                                </td>
                                                {/* Nama Skill */}
                                                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white flex items-center justify-center shrink-0">
                                                            <CatIcon className="w-3.5 h-3.5" />
                                                        </div>
                                                        <span>{skill.name}</span>
                                                    </div>
                                                </td>

                                            {/* Kategori Badge */}
                                            <td className="py-4 px-6">
                                                <Badge variant="outline" className="rounded-full text-[10px] font-mono px-3 py-1 bg-gray-100/80 dark:bg-slate-800/80 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700">
                                                    {skill.category}
                                                </Badge>
                                            </td>

                                            {/* Tingkat Kemahiran Bar & % */}
                                            <td className="py-4 px-6 text-center">
                                                <div className="flex flex-col items-center space-y-1 max-w-[120px] mx-auto">
                                                    <span className="font-mono text-xs font-extrabold text-gray-900 dark:text-white">
                                                        {skill.percentage}%
                                                    </span>
                                                    <div className="w-full bg-gray-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                                        <div
                                                            className="bg-gray-900 dark:bg-white h-full rounded-full transition-all duration-500"
                                                            style={{ width: `${skill.percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Catatan Teknis / Deskripsi */}
                                            <td className="py-4 px-6 text-gray-500 dark:text-slate-400 max-w-xs truncate">
                                                {skill.icon || '-'}
                                            </td>

                                            {/* Tombol Aksi Icon Only */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => openEditModal(skill)}
                                                        title="Edit Skill"
                                                        className="p-2 rounded-full border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(skill.id)}
                                                        title="Hapus Skill"
                                                        className="p-2 rounded-full border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                         </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Pagination Controls Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/30 text-xs font-mono text-gray-500 dark:text-slate-400">
                        <div>
                            Menampilkan <span className="font-bold text-gray-900 dark:text-white">{filteredSkills.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> sampai <span className="font-bold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredSkills.length)}</span> dari <span className="font-bold text-gray-900 dark:text-white">{filteredSkills.length}</span> skill
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
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 relative"
                        >
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                                    {editingSkill ? 'Edit Skill' : 'Tambah Skill Baru'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Nama Skill</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="misal: React.js, Laravel, Tailwind CSS, Flutter"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="category" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Kategori Teknologi</Label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsCustomCategory(!isCustomCategory);
                                                if (!isCustomCategory) {
                                                    setData('category', '');
                                                } else {
                                                    setData('category', 'Frontend');
                                                }
                                            }}
                                            className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer font-semibold flex items-center gap-1"
                                        >
                                            <PlusCircle className="w-3 h-3" />
                                            <span>{isCustomCategory ? 'Pilih Kategori Yang Ada' : 'Ketik Kategori Baru'}</span>
                                        </button>
                                    </div>

                                    {isCustomCategory ? (
                                        <Input
                                            type="text"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            placeholder="Tuliskan kategori baru (misal: Mobile App, AI & Data, Cybersecurity)..."
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            required
                                        />
                                    ) : (
                                        <select
                                            id="category"
                                            value={data.category}
                                            onChange={(e) => {
                                                if (e.target.value === '__custom__') {
                                                    setIsCustomCategory(true);
                                                    setData('category', '');
                                                } else {
                                                    setData('category', e.target.value);
                                                }
                                            }}
                                            className="w-full h-10 px-3.5 py-2 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none"
                                        >
                                            {existingCategories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                            <option value="__custom__">+ Ketik Kategori Baru (Custom)...</option>
                                        </select>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-slate-300">
                                        <Label>Tingkat Kemahiran (%)</Label>
                                        <span className="font-mono text-gray-900 dark:text-white font-bold">{data.percentage}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={data.percentage}
                                        onChange={(e) => setData('percentage', e.target.value)}
                                        className="w-full accent-gray-900 dark:accent-white cursor-pointer"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="icon" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Deskripsi Singkat / Catatan Teknis (Opsional)</Label>
                                    <Input
                                        id="icon"
                                        type="text"
                                        value={data.icon}
                                        onChange={(e) => setData('icon', e.target.value)}
                                        placeholder="misal: React 19, Next.js App Router, Redux Toolkit"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setIsModalOpen(false)}
                                        className="rounded-full text-xs cursor-pointer"
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-xs shadow-md cursor-pointer">
                                        Simpan Skill
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
