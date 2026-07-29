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
import { Plus, Pencil, Trash2, Star, X } from 'lucide-react';

export default function ProjectsIndex({ projects = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const { data, setData, reset, processing } = useForm({
        title: '',
        description: '',
        image: '',
        tech_stack: '',
        demo_url: '',
        github_url: '',
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
            image: project.image || '',
            tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : project.tech_stack || '',
            demo_url: project.demo_url || '',
            github_url: project.github_url || '',
            is_featured: project.is_featured,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedData = {
            ...data,
            tech_stack: typeof data.tech_stack === 'string'
                ? data.tech_stack.split(',').map(s => s.trim()).filter(Boolean)
                : data.tech_stack,
        };

        if (editingProject) {
            router.put(`/admin/projects/${editingProject.id}`, formattedData, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post('/admin/projects', formattedData, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
            router.delete(`/admin/projects/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Proyek" />

            <div className="space-y-8">
                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                            Portofolio
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Manajemen Proyek
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                            Kelola daftar karya dan proyek utama Anda
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={openCreateModal} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 gap-1.5 shadow-md">
                            <Plus className="w-4 h-4" />
                            <span>Tambah Proyek</span>
                        </Button>
                    </motion.div>
                </div>

                {/* Table Card */}
                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
                            <TableRow>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Proyek</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Tech Stack</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Status</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {projects.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500 font-mono text-xs">
                                        Belum ada proyek ditambahkan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                projects.map((project) => (
                                    <TableRow key={project.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition">
                                        <TableCell className="py-4">
                                            <div className="font-heading font-bold text-gray-900 dark:text-white text-base">{project.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-sans">{project.description}</div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {(Array.isArray(project.tech_stack) ? project.tech_stack : []).map((t, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            {project.is_featured ? (
                                                <Badge variant="outline" className="gap-1 rounded-full border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[10px] font-mono">
                                                    <Star className="w-3 h-3 fill-amber-400" /> Unggulan
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" className="rounded-full text-[10px] font-mono">Standar</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-4 text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openEditModal(project)}
                                                className="gap-1 text-xs rounded-full border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800"
                                            >
                                                <Pencil className="w-3.5 h-3.5" /> Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(project.id)}
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
                                    {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
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
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="description" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Deskripsi</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={3}
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="tech_stack" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tech Stack (pisahkan dengan koma)</Label>
                                    <Input
                                        id="tech_stack"
                                        type="text"
                                        value={data.tech_stack}
                                        onChange={(e) => setData('tech_stack', e.target.value)}
                                        placeholder="React, Laravel, Tailwind CSS"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="demo_url" className="text-xs font-semibold text-gray-700 dark:text-slate-300">URL Demo</Label>
                                        <Input
                                            id="demo_url"
                                            type="url"
                                            value={data.demo_url}
                                            onChange={(e) => setData('demo_url', e.target.value)}
                                            placeholder="https://..."
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="github_url" className="text-xs font-semibold text-gray-700 dark:text-slate-300">URL GitHub</Label>
                                        <Input
                                            id="github_url"
                                            type="url"
                                            value={data.github_url}
                                            onChange={(e) => setData('github_url', e.target.value)}
                                            placeholder="https://..."
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        />
                                    </div>
                                </div>

                                <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-slate-300 cursor-pointer pt-2">
                                    <input
                                        type="checkbox"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="rounded bg-gray-100 dark:bg-slate-950 border-gray-300 dark:border-slate-800 text-gray-900 dark:text-white"
                                    />
                                    Tampilkan sebagai Proyek Unggulan
                                </label>

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
