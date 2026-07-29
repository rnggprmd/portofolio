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
import { Plus, Pencil, Trash2, X, Layers } from 'lucide-react';

export default function TechStacksIndex({ techStacks = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTech, setEditingTech] = useState(null);

    const { data, setData, reset, processing } = useForm({
        name: '',
        category: 'Frontend',
        icon_name: 'React',
        proficiency: 'Advanced',
    });

    const openCreateModal = () => {
        setEditingTech(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (tech) => {
        setEditingTech(tech);
        setData({
            name: tech.name,
            category: tech.category,
            icon_name: tech.icon_name,
            proficiency: tech.proficiency || 'Advanced',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTech) {
            router.put(`/admin/tech-stacks/${editingTech.id}`, data, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post('/admin/tech-stacks', data, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus Tech Stack ini?')) {
            router.delete(`/admin/tech-stacks/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Tech Stack Logos" />

            <div className="space-y-8">
                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                            Authentic Vector Logos
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Manajemen Tech Stack Logos
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                            Kelola daftar logo brand dan teknologi yang ditampilkan pada seksi Tech Stack
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={openCreateModal} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 gap-1.5 shadow-md">
                            <Plus className="w-4 h-4" />
                            <span>Tambah Tech Stack</span>
                        </Button>
                    </motion.div>
                </div>

                {/* Table Card */}
                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
                            <TableRow>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Teknologi & Nama Icon</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Kategori</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Tingkat Penguasaan</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {techStacks.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500 font-mono text-xs">
                                        Belum ada item tech stack ditambahkan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                techStacks.map((tech) => (
                                    <TableRow key={tech.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition">
                                        <TableCell className="py-4">
                                            <div className="font-heading font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                                                <Layers className="w-4 h-4 text-gray-500" />
                                                <span>{tech.name}</span>
                                            </div>
                                            <div className="text-xs font-mono text-gray-400 dark:text-slate-500 mt-0.5">Icon ID: {tech.icon_name}</div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <Badge variant="outline" className="rounded-full text-[10px] font-mono border-gray-200 dark:border-slate-700">
                                                {tech.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-4 font-mono text-xs font-bold text-gray-800 dark:text-slate-200">
                                            {tech.proficiency}
                                        </TableCell>
                                        <TableCell className="py-4 text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openEditModal(tech)}
                                                className="gap-1 text-xs rounded-full border-gray-200 dark:border-slate-800"
                                            >
                                                <Pencil className="w-3.5 h-3.5" /> Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(tech.id)}
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
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative"
                        >
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                                    {editingTech ? 'Edit Tech Stack' : 'Tambah Tech Stack Baru'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Nama Teknologi</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Laravel 13, React 19"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="category" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Kategori</Label>
                                        <Input
                                            id="category"
                                            type="text"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            placeholder="Backend / Frontend"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="icon_name" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Nama Icon Vektor</Label>
                                        <Input
                                            id="icon_name"
                                            type="text"
                                            value={data.icon_name}
                                            onChange={(e) => setData('icon_name', e.target.value)}
                                            placeholder="Laravel / React / Tailwind"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="proficiency" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tingkat Penguasaan</Label>
                                    <Input
                                        id="proficiency"
                                        type="text"
                                        value={data.proficiency}
                                        onChange={(e) => setData('proficiency', e.target.value)}
                                        placeholder="Advanced / Expert"
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
                                        Simpan Item
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
