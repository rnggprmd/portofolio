import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function SkillsIndex({ skills = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);

    const { data, setData, reset, processing } = useForm({
        name: '',
        category: 'Frontend',
        percentage: 80,
        icon: '',
    });

    const openCreateModal = () => {
        setEditingSkill(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (skill) => {
        setEditingSkill(skill);
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

    return (
        <AdminLayout>
            <Head title="Manajemen Skill" />

            <div className="space-y-8">
                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                            Keahlian Teknis
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Manajemen Skill & Keahlian
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                            Atur tingkat keahlian dan kategori teknologi yang Anda kuasai
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={openCreateModal} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 gap-1.5 shadow-md">
                            <Plus className="w-4 h-4" />
                            <span>Tambah Skill</span>
                        </Button>
                    </motion.div>
                </div>

                {/* Grid Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {skills.length === 0 ? (
                        <Card className="col-span-full p-8 text-center text-gray-500 dark:text-slate-500 font-mono text-xs rounded-3xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
                            Belum ada skill yang ditambahkan.
                        </Card>
                    ) : (
                        skills.map((skill) => (
                            <motion.div key={skill.id} whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
                                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs hover:shadow-xl transition">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">{skill.name}</h3>
                                                <Badge variant="outline" className="mt-1 rounded-full text-[10px] font-mono border-gray-200 dark:border-slate-700">
                                                    {skill.category}
                                                </Badge>
                                            </div>
                                            <span className="font-mono text-xl font-extrabold text-gray-900 dark:text-white">{skill.percentage}%</span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full bg-gray-100 dark:bg-slate-950 h-2.5 rounded-full overflow-hidden border border-gray-200 dark:border-slate-800">
                                            <div
                                                className="bg-gray-900 dark:bg-white h-full rounded-full transition-all duration-500"
                                                style={{ width: `${skill.percentage}%` }}
                                            />
                                        </div>

                                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-slate-800">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openEditModal(skill)}
                                                className="gap-1 text-xs rounded-full border-gray-200 dark:border-slate-800"
                                            >
                                                <Pencil className="w-3.5 h-3.5" /> Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(skill.id)}
                                                className="gap-1 text-xs rounded-full"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" /> Hapus
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </div>
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
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
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
                                        placeholder="React.js, Laravel, Tailwind CSS"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="category" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Kategori</Label>
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full h-10 px-3.5 py-2 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none"
                                    >
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Database">Database</option>
                                        <option value="DevOps & Tools">DevOps & Tools</option>
                                        <option value="Other">Lainnya</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-slate-300">
                                        <Label>Tingkat Keahlian (%)</Label>
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
