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
import { Plus, Pencil, Trash2, X, Star, Search, ChevronLeft, ChevronRight, FolderKanban } from 'lucide-react';

export default function ProjectsIndex({ projects = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // Search & Pagination State
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data, setData, reset, processing } = useForm({
        title: '',
        description: '',
        image_url: '',
        demo_url: '',
        github_url: '',
        tech_stack: '',
        is_featured: false,
    });

    const openCreateModal = () => {
        setEditingProject(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (project) => {
        setEditingProject(project);
        setData({
            title: project.title,
            description: project.description,
            image_url: project.image_url || '',
            demo_url: project.demo_url || '',
            github_url: project.github_url || '',
            tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '',
            is_featured: Boolean(project.is_featured),
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...data,
            tech_stack: data.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
        };

        if (editingProject) {
            router.put(`/admin/projects/${editingProject.id}`, payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post('/admin/projects', payload, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
            router.delete(`/admin/projects/${id}`);
        }
    };

    // Search Filtering & Pagination Math
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
    const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <AdminLayout>
            <Head title="Manajemen Proyek" />

            <div className="space-y-8 max-w-6xl mx-auto">
                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                            Seksi 04 // Landing Page
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Manajemen Proyek Showcase
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                            Kelola daftar karya, deskripsi, tech stack, dan link demo proyek Anda
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={openCreateModal} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 gap-1.5 shadow-md cursor-pointer">
                            <Plus className="w-4 h-4" />
                            <span>Tambah Proyek Baru</span>
                        </Button>
                    </motion.div>
                </div>

                {/* Filter Search Bar & Total Counter */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                        <Input
                            type="text"
                            placeholder="Cari nama atau deskripsi proyek..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 rounded-2xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-xs sm:text-sm"
                        />
                    </div>
                    <div className="text-xs font-mono text-gray-500 dark:text-slate-400">
                        Total: <span className="font-bold text-gray-900 dark:text-white">{projects.length}</span> proyek
                    </div>
                </div>

                {/* Modern Responsive Table */}
                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-950/50 text-[11px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6 w-16 text-center">No.</th>
                                    <th className="py-4 px-6">Nama Proyek & Deskripsi</th>
                                    <th className="py-4 px-6">Tech Stack</th>
                                    <th className="py-4 px-6">Status Showcase</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-xs sm:text-sm font-sans">
                                {paginatedProjects.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 px-6 text-center text-gray-500 dark:text-slate-500 font-mono text-xs">
                                            {searchQuery ? `Tidak ada proyek yang cocok dengan kata kunci "${searchQuery}".` : 'Belum ada proyek ditambahkan. Silakan klik "+ Tambah Proyek Baru".'}
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedProjects.map((project, idx) => (
                                        <tr key={project.id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40 transition duration-150 group">
                                            <td className="py-4 px-6 font-mono text-xs font-bold text-gray-400 dark:text-slate-500 text-center">
                                                {(currentPage - 1) * itemsPerPage + idx + 1}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white flex items-center justify-center shrink-0 mt-0.5">
                                                        <FolderKanban className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="font-heading font-bold text-gray-900 dark:text-white text-base">{project.title}</div>
                                                        <div className="text-xs text-gray-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-sans">{project.description}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap gap-1">
                                                    {(Array.isArray(project.tech_stack) ? project.tech_stack : []).map((t, idx) => (
                                                        <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                {project.is_featured ? (
                                                    <Badge variant="outline" className="gap-1 rounded-full border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[10px] font-mono">
                                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Unggulan
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="rounded-full text-[10px] font-mono">Standar</Badge>
                                                )}
                                            </td>

                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => openEditModal(project)}
                                                        title="Edit Proyek"
                                                        className="p-2 rounded-full border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
                                                        title="Hapus Proyek"
                                                        className="p-2 rounded-full border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
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
                            Menampilkan <span className="font-bold text-gray-900 dark:text-white">{filteredProjects.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> sampai <span className="font-bold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredProjects.length)}</span> dari <span className="font-bold text-gray-900 dark:text-white">{filteredProjects.length}</span> proyek
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
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative"
                        >
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                                    {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="title" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Judul Proyek</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="E-Commerce Enterprise Platform"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="description" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Deskripsi Singkat</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Penjelasan singkat mengenai fitur utama dan dampak proyek..."
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm min-h-[80px]"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="demo_url" className="text-xs font-semibold text-gray-700 dark:text-slate-300">URL Demo (Live)</Label>
                                        <Input
                                            id="demo_url"
                                            type="url"
                                            value={data.demo_url}
                                            onChange={(e) => setData('demo_url', e.target.value)}
                                            placeholder="https://example.com"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="github_url" className="text-xs font-semibold text-gray-700 dark:text-slate-300">URL Repository GitHub</Label>
                                        <Input
                                            id="github_url"
                                            type="url"
                                            value={data.github_url}
                                            onChange={(e) => setData('github_url', e.target.value)}
                                            placeholder="https://github.com/..."
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="tech_stack" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tech Stack (Pisahkan dengan Koma)</Label>
                                    <Input
                                        id="tech_stack"
                                        type="text"
                                        value={data.tech_stack}
                                        onChange={(e) => setData('tech_stack', e.target.value)}
                                        placeholder="Laravel, React, PostgreSQL, Tailwind"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="rounded border-gray-300 dark:border-slate-800 text-gray-900 dark:text-white focus:ring-0 cursor-pointer"
                                    />
                                    <Label htmlFor="is_featured" className="text-xs font-semibold text-gray-700 dark:text-slate-300 cursor-pointer">
                                        Tampilkan sebagai Proyek Unggulan di Landing Page
                                    </Label>
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
                                        Simpan Proyek
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
