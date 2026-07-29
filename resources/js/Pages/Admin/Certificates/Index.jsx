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
import { Plus, Pencil, Trash2, X, ShieldCheck } from 'lucide-react';

export default function CertificatesIndex({ certificates = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCert, setEditingCert] = useState(null);

    const { data, setData, reset, processing } = useForm({
        title: '',
        issuer: '',
        year: '',
        credential_id: '',
        badge: 'Certified',
        verify_url: '',
        description: '',
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
            badge: cert.badge || 'Certified',
            verify_url: cert.verify_url || '',
            description: cert.description || '',
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

    return (
        <AdminLayout>
            <Head title="Manajemen Sertifikasi" />

            <div className="space-y-8">
                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                            Lisensi & Kredensial
                        </span>
                        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Manajemen Sertifikasi
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                            Kelola lisensi sertifikasi profesional dan kredensial kelulusan Anda
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={openCreateModal} className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 gap-1.5 shadow-md">
                            <Plus className="w-4 h-4" />
                            <span>Tambah Sertifikat</span>
                        </Button>
                    </motion.div>
                </div>

                {/* Table Card */}
                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
                            <TableRow>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Sertifikat & Penerbit</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Credential ID</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white">Level Badge</TableHead>
                                <TableHead className="font-mono text-xs uppercase text-gray-900 dark:text-white text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {certificates.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500 font-mono text-xs">
                                        Belum ada sertifikat ditambahkan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                certificates.map((cert) => (
                                    <TableRow key={cert.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition">
                                        <TableCell className="py-4">
                                            <div className="font-heading font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-gray-700 dark:text-slate-300" />
                                                <span>{cert.title}</span>
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-slate-400 font-medium mt-0.5">{cert.issuer} • {cert.year}</div>
                                        </TableCell>
                                        <TableCell className="py-4 font-mono text-xs font-bold text-gray-800 dark:text-slate-200">
                                            {cert.credential_id || 'N/A'}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <Badge variant="outline" className="rounded-full text-[10px] font-mono border-gray-200 dark:border-slate-700">
                                                {cert.badge || 'Certified'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-4 text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openEditModal(cert)}
                                                className="gap-1 text-xs rounded-full border-gray-200 dark:border-slate-800"
                                            >
                                                <Pencil className="w-3.5 h-3.5" /> Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(cert.id)}
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
                                    {editingCert ? 'Edit Sertifikat' : 'Tambah Sertifikat Baru'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="title" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Nama Sertifikat</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Laravel Certified Developer"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="issuer" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Penerbit Sertifikat</Label>
                                        <Input
                                            id="issuer"
                                            type="text"
                                            value={data.issuer}
                                            onChange={(e) => setData('issuer', e.target.value)}
                                            placeholder="Laravel LLC"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="year" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tahun Lulus</Label>
                                        <Input
                                            id="year"
                                            type="text"
                                            value={data.year}
                                            onChange={(e) => setData('year', e.target.value)}
                                            placeholder="2025"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="credential_id" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Credential ID</Label>
                                        <Input
                                            id="credential_id"
                                            type="text"
                                            value={data.credential_id}
                                            onChange={(e) => setData('credential_id', e.target.value)}
                                            placeholder="LARAVEL-8894"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="badge" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Badge Level</Label>
                                        <Input
                                            id="badge"
                                            type="text"
                                            value={data.badge}
                                            onChange={(e) => setData('badge', e.target.value)}
                                            placeholder="EXPERT / CERTIFIED"
                                            className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="verify_url" className="text-xs font-semibold text-gray-700 dark:text-slate-300">URL Verifikasi Sertifikat</Label>
                                    <Input
                                        id="verify_url"
                                        type="url"
                                        value={data.verify_url}
                                        onChange={(e) => setData('verify_url', e.target.value)}
                                        placeholder="https://..."
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="description" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Deskripsi Singkat</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={3}
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
