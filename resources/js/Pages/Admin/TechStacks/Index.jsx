import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { Plus, Pencil, Trash2, X, Layers, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import TechIcon from '@/Components/Landing/TechIcon';
import {
    ReactIcon,
    LaravelIcon,
    TailwindIcon,
    InertiaIcon,
    NodeIcon,
    ExpressIcon,
    MysqlIcon,
    PostgresqlIcon,
    DockerIcon,
    GitIcon,
    FigmaIcon,
    CiscoIcon,
    PythonIcon,
    JavaIcon,
    PhpIcon,
    AwsIcon,
    VueIcon,
    AngularIcon,
    TypescriptIcon,
    JavascriptIcon,
    NextjsIcon,
    FlutterIcon,
    RedisIcon,
    MongodbIcon,
    LinuxIcon,
    NginxIcon,
    VercelIcon
} from '@/Components/Landing/BrandIcons';

const iconMap = {
    React: ReactIcon, react: ReactIcon,
    Laravel: LaravelIcon, laravel: LaravelIcon,
    Tailwind: TailwindIcon, tailwind: TailwindIcon, 'tailwind css': TailwindIcon,
    Inertia: InertiaIcon, inertia: InertiaIcon, 'inertia.js': InertiaIcon,
    Node: NodeIcon, node: NodeIcon, 'node.js': NodeIcon,
    Express: ExpressIcon, express: ExpressIcon, 'express.js': ExpressIcon,
    Mysql: MysqlIcon, mysql: MysqlIcon,
    Postgresql: PostgresqlIcon, postgresql: PostgresqlIcon, postgres: PostgresqlIcon,
    Docker: DockerIcon, docker: DockerIcon,
    Git: GitIcon, git: GitIcon,
    Figma: FigmaIcon, figma: FigmaIcon,
    Cisco: CiscoIcon, cisco: CiscoIcon,
    Python: PythonIcon, python: PythonIcon,
    Java: JavaIcon, java: JavaIcon,
    Php: PhpIcon, php: PhpIcon,
    Aws: AwsIcon, aws: AwsIcon,
    Vue: VueIcon, vue: VueIcon, 'vue.js': VueIcon,
    Angular: AngularIcon, angular: AngularIcon,
    Typescript: TypescriptIcon, typescript: TypescriptIcon, ts: TypescriptIcon,
    Javascript: JavascriptIcon, javascript: JavascriptIcon, js: JavascriptIcon,
    Nextjs: NextjsIcon, nextjs: NextjsIcon, 'next.js': NextjsIcon,
    Flutter: FlutterIcon, flutter: FlutterIcon,
    Redis: RedisIcon, redis: RedisIcon,
    Mongodb: MongodbIcon, mongodb: MongodbIcon, mongo: MongodbIcon,
    Linux: LinuxIcon, linux: LinuxIcon,
    Nginx: NginxIcon, nginx: NginxIcon,
    Vercel: VercelIcon, vercel: VercelIcon,
};

export default function TechStacksIndex({ techStacks = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTech, setEditingTech] = useState(null);
    const [isCustomCategory, setIsCustomCategory] = useState(false);

    const defaultCategories = ['Frontend', 'Backend', 'Database', 'DevOps & Tools', 'Design', 'Other'];
    const databaseCategories = [...new Set(techStacks.map(t => t.category).filter(Boolean))];
    const existingCategories = Array.from(new Set([...defaultCategories, ...databaseCategories]));

    // Search & Pagination State
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data, setData, reset, processing } = useForm({
        name: '',
        icon_name: '',
        category: 'Frontend',
        proficiency: 'Advanced',
        order: 0,
    });

    const openCreateModal = () => {
        setEditingTech(null);
        setIsCustomCategory(false);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (tech) => {
        setEditingTech(tech);
        setIsCustomCategory(!existingCategories.includes(tech.category));
        setData({
            name: tech.name,
            icon_name: tech.icon_name,
            category: tech.category,
            proficiency: tech.proficiency || 'Advanced',
            order: tech.order || 0,
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
        if (confirm('Apakah Anda yakin ingin menghapus item tech stack ini?')) {
            router.delete(`/admin/tech-stacks/${id}`);
        }
    };

    // Search Filtering & Pagination Math
    const filteredTechStacks = techStacks.filter(tech =>
        (tech.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tech.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTechStacks.length / itemsPerPage) || 1;
    const paginatedTechStacks = filteredTechStacks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <AdminLayout>
            <Head title="Manajemen Tech Stack" />

            <div className="space-y-8 max-w-6xl mx-auto">
                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                            Seksi 07 // Landing Page
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Manajemen Tech Stack Logos
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                            Kelola logo teknologi, ikon ekosistem, dan tingkat penguasaan alat pengembang Anda
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={openCreateModal} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 gap-1.5 shadow-md cursor-pointer">
                            <Plus className="w-4 h-4" />
                            <span>Tambah Tech Stack</span>
                        </Button>
                    </motion.div>
                </div>

                {/* Filter Search Bar & Total Counter */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                        <Input
                            type="text"
                            placeholder="Cari teknologi atau kategori..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 rounded-2xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-xs sm:text-sm"
                        />
                    </div>
                    <div className="text-xs font-mono text-gray-500 dark:text-slate-400">
                        Total: <span className="font-bold text-gray-900 dark:text-white">{techStacks.length}</span> tech stack
                    </div>
                </div>

                {/* Modern Responsive Table */}
                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-950/50 text-[11px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6 w-16 text-center">No.</th>
                                    <th className="py-4 px-6">Teknologi & Nama Icon</th>
                                    <th className="py-4 px-6">Kategori</th>
                                    <th className="py-4 px-6">Tingkat Penguasaan</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-xs sm:text-sm font-sans">
                                {paginatedTechStacks.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 px-6 text-center text-gray-500 dark:text-slate-500 font-mono text-xs">
                                            {searchQuery ? `Tidak ada tech stack yang cocok dengan kata kunci "${searchQuery}".` : 'Belum ada item tech stack ditambahkan. Silakan klik "+ Tambah Tech Stack".'}
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedTechStacks.map((tech, idx) => (
                                        <tr key={tech.id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40 transition duration-150 group">
                                            <td className="py-4 px-6 font-mono text-xs font-bold text-gray-400 dark:text-slate-500 text-center">
                                                {(currentPage - 1) * itemsPerPage + idx + 1}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white flex items-center justify-center shrink-0 border border-gray-200/60 dark:border-slate-700/60 p-1.5 overflow-hidden">
                                                        <TechIcon iconName={tech.icon_name} name={tech.name} className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="font-heading font-bold text-gray-900 dark:text-white text-base">{tech.name}</div>
                                                        <div className="text-xs font-mono text-gray-400 dark:text-slate-500 mt-0.5">Icon ID: {tech.icon_name}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <Badge variant="outline" className="rounded-full text-[10px] font-mono px-3 py-1 bg-gray-100/80 dark:bg-slate-800/80 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700">
                                                    {tech.category}
                                                </Badge>
                                            </td>

                                            <td className="py-4 px-6 font-mono text-xs font-bold text-gray-800 dark:text-slate-200">
                                                {tech.proficiency}
                                            </td>

                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <motion.button
                                                        whileHover={{ scale: 1.15 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => openEditModal(tech)}
                                                        title="Edit Tech Stack"
                                                        aria-label="Edit Tech Stack"
                                                        className="p-2 rounded-full border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.15 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleDelete(tech.id)}
                                                        title="Hapus Tech Stack"
                                                        aria-label="Hapus Tech Stack"
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
                            Menampilkan <span className="font-bold text-gray-900 dark:text-white">{filteredTechStacks.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> sampai <span className="font-bold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredTechStacks.length)}</span> dari <span className="font-bold text-gray-900 dark:text-white">{filteredTechStacks.length}</span> tech stack
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
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-md w-full shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
                        >
                            {/* Pinned Modal Header */}
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 px-6 py-5 shrink-0 bg-white dark:bg-slate-900">
                                <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                                    {editingTech ? 'Edit Tech Stack' : 'Tambah Tech Stack Baru'}
                                </h3>
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)} 
                                    aria-label="Tutup modal"
                                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form Container with Internal Scroll Body */}
                            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="name" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Nama Teknologi</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Laravel, React, Docker, Tailwind CSS"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="icon_name" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Icon Name / Identifier</Label>
                                        <Input
                                            id="icon_name"
                                            type="text"
                                            value={data.icon_name}
                                            onChange={(e) => setData('icon_name', e.target.value)}
                                            placeholder="laravel, react, docker, tailwind"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm font-mono"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="category" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Kategori</Label>
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
                                                    className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer font-semibold"
                                                >
                                                    {isCustomCategory ? 'Pilih Opsi' : '+ Baru (Custom)'}
                                                </button>
                                            </div>

                                            {isCustomCategory ? (
                                                <Input
                                                    type="text"
                                                    value={data.category}
                                                    onChange={(e) => setData('category', e.target.value)}
                                                    placeholder="Ketik kategori baru..."
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
                                                    <option value="__custom__">+ Ketik Kategori Baru...</option>
                                                </select>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="proficiency" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Penguasaan</Label>
                                            <select
                                                id="proficiency"
                                                value={data.proficiency}
                                                onChange={(e) => setData('proficiency', e.target.value)}
                                                className="w-full h-10 px-3.5 py-2 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none"
                                            >
                                                <option value="Mastery">Mastery</option>
                                                <option value="Advanced">Advanced</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Beginner">Beginner</option>
                                            </select>
                                        </div>
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
                                        Simpan Tech Stack
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
