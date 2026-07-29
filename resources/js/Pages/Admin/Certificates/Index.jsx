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
import { Plus, Pencil, Trash2, X, ShieldCheck, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CertificatesIndex({ certificates = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCert, setEditingCert] = useState(null);

    // Search & Pagination State
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data, setData, reset, processing } = useForm({
        title: '',
        issuer: '',
        year: '',
        credential_id: '',
        credential_url: '',
        badge: 'Certified',
        description: '',
        order: 0,
    });

    const openCreateModal = () => {
        setEditingCert(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (cert) => {
        setEditingCert(cert);
        setData({
            title: cert.title,
            issuer: cert.issuer,
            year: cert.year,
            credential_id: cert.credential_id || '',
            credential_url: cert.credential_url || '',
            badge: cert.badge || 'Certified',
            description: cert.description || '',
            order: cert.order || 0,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCert) {
            router.put(`/admin/certificates/${editingCert.id}`, data, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            router.post('/admin/certificates', data, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus sertifikat ini?')) {
            router.delete(`/admin/certificates/${id}`);
        }
    };

    // Search Filtering & Pagination Math
    const filteredCertificates = certificates.filter(cert =>
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cert.credential_id && cert.credential_id.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage) || 1;
    const paginatedCertificates = filteredCertificates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <AdminLayout>
            <Head title="Manajemen Sertifikat" />

            <div className="space-y-8 max-w-6xl mx-auto">
                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                            Seksi 06 // Landing Page
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Manajemen Sertifikasi & Kredensial
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                            Kelola lisensi sertifikasi profesional dan kredensial kelulusan Anda
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={openCreateModal} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 gap-1.5 shadow-md cursor-pointer">
                            <Plus className="w-4 h-4" />
                            <span>Tambah Sertifikat</span>
                        </Button>
                    </motion.div>
                </div>

                {/* Filter Search Bar & Total Counter */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                        <Input
                            type="text"
                            placeholder="Cari judul atau penerbit sertifikat..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="pl-10 rounded-2xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-xs sm:text-sm"
                        />
                    </div>
                    <div className="text-xs font-mono text-gray-500 dark:text-slate-400">
                        Total: <span className="font-bold text-gray-900 dark:text-white">{certificates.length}</span> sertifikat
                    </div>
                </div>

                {/* Modern Responsive Table */}
                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-950/50 text-[11px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6 w-16 text-center">No.</th>
                                    <th className="py-4 px-6">Sertifikat & Penerbit</th>
                                    <th className="py-4 px-6">Credential ID</th>
                                    <th className="py-4 px-6">Level Badge</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 text-xs sm:text-sm font-sans">
                                {paginatedCertificates.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 px-6 text-center text-gray-500 dark:text-slate-500 font-mono text-xs">
                                            {searchQuery ? `Tidak ada sertifikat yang cocok dengan kata kunci "${searchQuery}".` : 'Belum ada sertifikat ditambahkan. Silakan klik "+ Tambah Sertifikat".'}
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedCertificates.map((cert, idx) => (
                                        <tr key={cert.id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/40 transition duration-150 group">
                                            <td className="py-4 px-6 font-mono text-xs font-bold text-gray-400 dark:text-slate-500 text-center">
                                                {(currentPage - 1) * itemsPerPage + idx + 1}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white flex items-center justify-center shrink-0 mt-0.5">
                                                        <ShieldCheck className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="font-heading font-bold text-gray-900 dark:text-white text-base">{cert.title}</div>
                                                        <div className="text-xs text-gray-500 dark:text-slate-400 font-medium mt-0.5">{cert.issuer} • {cert.year}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6 font-mono text-xs font-bold text-gray-800 dark:text-slate-200">
                                                {cert.credential_id || 'N/A'}
                                            </td>

                                            <td className="py-4 px-6">
                                                <Badge variant="outline" className="rounded-full text-[10px] font-mono px-3 py-1 bg-gray-100/80 dark:bg-slate-800/80 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700">
                                                    {cert.badge || 'Certified'}
                                                </Badge>
                                            </td>

                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => openEditModal(cert)}
                                                        title="Edit Sertifikat"
                                                        className="p-2 rounded-full border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(cert.id)}
                                                        title="Hapus Sertifikat"
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
                            Menampilkan <span className="font-bold text-gray-900 dark:text-white">{filteredCertificates.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> sampai <span className="font-bold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredCertificates.length)}</span> dari <span className="font-bold text-gray-900 dark:text-white">{filteredCertificates.length}</span> sertifikat
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
                                    {editingCert ? 'Edit Sertifikat' : 'Tambah Sertifikat Baru'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="title" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Nama Sertifikat / Pelatihan</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="AWS Certified Solutions Architect"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="issuer" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Penerbit / Institusi</Label>
                                        <Input
                                            id="issuer"
                                            type="text"
                                            value={data.issuer}
                                            onChange={(e) => setData('issuer', e.target.value)}
                                            placeholder="Amazon Web Services"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="year" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tahun Penerbitan</Label>
                                        <Input
                                            id="year"
                                            type="text"
                                            value={data.year}
                                            onChange={(e) => setData('year', e.target.value)}
                                            placeholder="2024"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="credential_id" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Credential ID (Opsional)</Label>
                                        <Input
                                            id="credential_id"
                                            type="text"
                                            value={data.credential_id}
                                            onChange={(e) => setData('credential_id', e.target.value)}
                                            placeholder="AWS-8492048"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="badge" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Badge Label</Label>
                                        <Input
                                            id="badge"
                                            type="text"
                                            value={data.badge}
                                            onChange={(e) => setData('badge', e.target.value)}
                                            placeholder="Certified / Advanced"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="credential_url" className="text-xs font-semibold text-gray-700 dark:text-slate-300">URL Kredensial (Verifikasi Live)</Label>
                                    <Input
                                        id="credential_url"
                                        type="url"
                                        value={data.credential_url}
                                        onChange={(e) => setData('credential_url', e.target.value)}
                                        placeholder="https://credly.com/badges/..."
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="description" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Ringkasan Materi (Opsional)</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Ringkasan kompetensi yang diuji dalam sertifikasi..."
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm min-h-[70px]"
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
                                        Simpan Sertifikat
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
