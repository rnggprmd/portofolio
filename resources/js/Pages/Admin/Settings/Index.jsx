import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Save, User, Sparkles, CheckCircle2, CreditCard, FileText, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/Components/Landing/BrandIcons';

export default function SettingsIndex({ settings = {} }) {
    const [avatarPreview, setAvatarPreview] = useState(settings.avatar_url || '');

    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        hero_name: settings.hero_name || 'Rangga Pramudya',
        hero_role: settings.hero_role || 'Software Engineer',
        hero_titles: settings.hero_titles || 'Full-Stack Web Developer, System Information Specialist, Laravel & React Architect',
        hero_description: settings.hero_description || 'Software Engineer specializing in Laravel, React, and modern web architectures.',
        avatar_url: settings.avatar_url || '',
        avatar_file: null,
        specialty_label: settings.specialty_label || 'FULL-STACK ARCHITECT',
        card_tech_tags: settings.card_tech_tags || 'Laravel, React, Tailwind',
        about_story_1: settings.about_story_1 || '',
        about_story_2: settings.about_story_2 || '',
        contact_email: settings.contact_email || 'rangga.pramudya@example.com',
        github_username: settings.github_username || 'rnggprmd',
        github_url: settings.github_url || 'https://github.com/rnggprmd',
        linkedin_url: settings.linkedin_url || 'https://linkedin.com',
        cv_url: settings.cv_url || '#',
        cv_file: null,
    });

    // Instant local preview for selected image file & reactive sync with DB
    useEffect(() => {
        if (data.avatar_file) {
            const objectUrl = URL.createObjectURL(data.avatar_file);
            setAvatarPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setAvatarPreview(settings.avatar_url || '');
        }
    }, [data.avatar_file, settings.avatar_url]);

    // Keep form state in sync when server returns updated file URLs
    useEffect(() => {
        if (settings.cv_url) {
            setData('cv_url', settings.cv_url);
        }
        if (settings.avatar_url) {
            setData('avatar_url', settings.avatar_url);
        }
    }, [settings.cv_url, settings.avatar_url]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            forceFormData: true,
            onSuccess: () => {
                setData('cv_file', null);
                setData('avatar_file', null);
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Hero & Identitas (Pengaturan Profil)" />

            <div className="space-y-6">
                {/* Header Title */}
                <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                        Konfigurasi Global
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Hero & Identitas (Pengaturan Profil)
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                        Kelola seluruh informasi Hero Section, username GitHub, upload CV PDF, foto profil card 3D, kontak, dan tautan sosial media
                    </p>
                </div>

                {recentlySuccessful && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-sm flex items-center gap-3 font-medium"
                    >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Pengaturan Hero & Identitas berhasil diperbarui!</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hero Section Config */}
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6">
                            <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-gray-900 dark:text-white" />
                                <span>Hero Section & Teks Utama</span>
                            </CardTitle>
                            <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">Informasi teks utama di bagian teratas portofolio</CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="hero_name" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Nama Lengkap (Main Heading)</Label>
                                <Input
                                    id="hero_name"
                                    type="text"
                                    value={data.hero_name}
                                    onChange={(e) => setData('hero_name', e.target.value)}
                                    className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="hero_titles" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Judul / Role Berputar (Rotating Titles - pisahkan dengan koma)</Label>
                                <Input
                                    id="hero_titles"
                                    type="text"
                                    value={data.hero_titles}
                                    onChange={(e) => setData('hero_titles', e.target.value)}
                                    placeholder="Full-Stack Web Developer, System Information Specialist, Laravel Architect"
                                    className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="hero_description" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Deskripsi Singkat Hero</Label>
                                <Textarea
                                    id="hero_description"
                                    value={data.hero_description}
                                    onChange={(e) => setData('hero_description', e.target.value)}
                                    rows={3}
                                    className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* CV Upload Section */}
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6">
                            <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-900 dark:text-white" />
                                <span>Upload File CV (PDF)</span>
                            </CardTitle>
                            <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">Upload file PDF CV resmi Anda untuk tombol 'Download CV' di Landing Page</CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="cv_file" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Pilih File CV (Format .PDF, Maks. 10 MB)</Label>
                                <div className="flex items-center gap-3">
                                    <Input
                                        id="cv_file"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => setData('cv_file', e.target.files[0])}
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white dark:file:bg-white dark:file:text-gray-900"
                                    />
                                </div>
                                {errors.cv_file && <div className="text-rose-500 text-xs mt-1">{errors.cv_file}</div>}

                                {data.cv_url && data.cv_url !== '#' && (
                                    <div className="mt-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2 font-mono text-emerald-800 dark:text-emerald-300">
                                            <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                            <span>File CV Terupload: <span className="font-bold text-gray-900 dark:text-white">{data.cv_url}</span></span>
                                        </div>
                                        <a href={data.cv_url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 underline hover:no-underline flex items-center gap-1">
                                            <span>Buka CV</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3D Lanyard Pass Card & Specialty Config */}
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6">
                            <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-gray-900 dark:text-white" />
                                <span>3D Lanyard Pass Card (Foto Profil & Specialty)</span>
                            </CardTitle>
                            <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">Mengatur foto profil, Jabatan Card, label Specialty, dan tag teknologi di Lanyard Card</CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="avatar_file" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Upload Foto Profil / Avatar Card (Format JPG, PNG, WEBP, Maks. 5 MB)</Label>
                                <Input
                                    id="avatar_file"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('avatar_file', e.target.files[0])}
                                    className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white dark:file:bg-white dark:file:text-gray-900"
                                />
                                {errors.avatar_file && <div className="text-rose-500 text-xs mt-1">{errors.avatar_file}</div>}

                                {avatarPreview && (
                                    <div className="mt-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={avatarPreview} 
                                                alt="Avatar Card" 
                                                className="w-10 h-10 rounded-xl object-cover border border-emerald-300 dark:border-emerald-700 shrink-0" 
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                            <div className="font-mono text-emerald-800 dark:text-emerald-300">
                                                <span>Foto Card: <span className="font-bold text-gray-900 dark:text-white">{data.avatar_file ? data.avatar_file.name : (data.avatar_url || 'Terupload')}</span></span>
                                            </div>
                                        </div>
                                        {data.avatar_url && (
                                            <a href={data.avatar_url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 underline hover:no-underline flex items-center gap-1">
                                                <span>Lihat Foto</span>
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="hero_role" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Jabatan di Bawah Nama Card</Label>
                                    <Input
                                        id="hero_role"
                                        type="text"
                                        value={data.hero_role}
                                        onChange={(e) => setData('hero_role', e.target.value)}
                                        placeholder="Software Engineer"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="specialty_label" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Label Specialty Card</Label>
                                    <Input
                                        id="specialty_label"
                                        type="text"
                                        value={data.specialty_label}
                                        onChange={(e) => setData('specialty_label', e.target.value)}
                                        placeholder="FULL-STACK"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="card_tech_tags" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tag Teknologi di Card (pisahkan dengan koma)</Label>
                                <Input
                                    id="card_tech_tags"
                                    type="text"
                                    value={data.card_tech_tags}
                                    onChange={(e) => setData('card_tech_tags', e.target.value)}
                                    placeholder="Laravel, React, Tailwind"
                                    className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social & Contact Config */}
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6">
                            <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <GithubIcon className="w-5 h-5 text-gray-900 dark:text-white" />
                                <span>Integrasi GitHub, Tautan Sosial Media & Email Kontak</span>
                            </CardTitle>
                            <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">Username GitHub Anda akan otomatis mengkalkulasi seluruh Statistik GitHub & Tautan Profil secara live</CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="github_username" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Username GitHub (Misal: rnggprmd)</Label>
                                    <Input
                                        id="github_username"
                                        type="text"
                                        value={data.github_username}
                                        onChange={(e) => {
                                            const uname = e.target.value.replace('@', '');
                                            setData((prev) => ({
                                                ...prev,
                                                github_username: uname,
                                                github_url: uname ? `https://github.com/${uname}` : prev.github_url,
                                            }));
                                        }}
                                        placeholder="rnggprmd"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm font-mono"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="contact_email" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Email Utama Kontak</Label>
                                    <Input
                                        id="contact_email"
                                        type="email"
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="github_url" className="text-xs font-semibold text-gray-700 dark:text-slate-300">URL GitHub (Otomatis)</Label>
                                    <Input
                                        id="github_url"
                                        type="url"
                                        value={data.github_url}
                                        onChange={(e) => setData('github_url', e.target.value)}
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="linkedin_url" className="text-xs font-semibold text-gray-700 dark:text-slate-300">URL LinkedIn</Label>
                                    <Input
                                        id="linkedin_url"
                                        type="url"
                                        value={data.linkedin_url}
                                        onChange={(e) => setData('linkedin_url', e.target.value)}
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 font-semibold px-8 py-3 shadow-md gap-2 cursor-pointer transition-transform"
                            >
                                <Save className="w-4 h-4" />
                                <span>Simpan Perubahan Hero & Identitas</span>
                            </Button>
                        </motion.div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
