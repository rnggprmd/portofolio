import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { UserCheck, KeyRound, CheckCircle2, Save, Image, ExternalLink } from 'lucide-react';

export default function ProfileEdit({ user, site_logo }) {
    // Form 1: Account Information & Brand Logo Form
    const profileForm = useForm({
        _method: 'PUT',
        name: user.name || '',
        email: user.email || '',
        site_logo: site_logo || '/storage/logo/logo-portofolio.png',
        logo_file: null,
    });

    useEffect(() => {
        if (site_logo) {
            profileForm.setData('site_logo', site_logo);
        }
    }, [site_logo]);

    // Form 2: Password Change Form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.post('/admin/profile', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                profileForm.setData('logo_file', null);
            },
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put('/admin/profile/password', {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan Profil & Keamanan" />

            <div className="space-y-6 max-w-4xl">
                {/* Header Title */}
                <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                        Akun & Akses
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Pengaturan Profil & Keamanan
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                        Kelola data identitas akun Administrator, logo utama brand/proyek, dan perbarui kata sandi secara berkala.
                    </p>
                </div>

                {/* Section 1: Account Information & Brand Logo */}
                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                    <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6">
                        <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-gray-900 dark:text-white" />
                            <span>Informasi Akun Admin & Logo Brand</span>
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                            Perbarui nama lengkap, alamat email utama login, serta logo utama situs portofolio.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6">
                        {profileForm.recentlySuccessful && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-sm flex items-center gap-3 font-medium"
                            >
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <span>Informasi profil & logo berhasil diperbarui!</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleProfileSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="text-xs font-semibold text-gray-700 dark:text-slate-300">
                                        Nama Lengkap Administrator
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={profileForm.data.name}
                                        onChange={(e) => profileForm.setData('name', e.target.value)}
                                        placeholder="Rangga Pramudya"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                    {profileForm.errors.name && (
                                        <div className="text-rose-500 text-xs mt-1 font-medium">{profileForm.errors.name}</div>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-xs font-semibold text-gray-700 dark:text-slate-300">
                                        Alamat Email Login
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profileForm.data.email}
                                        onChange={(e) => profileForm.setData('email', e.target.value)}
                                        placeholder="admin@example.com"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm font-mono"
                                        required
                                    />
                                    {profileForm.errors.email && (
                                        <div className="text-rose-500 text-xs mt-1 font-medium">{profileForm.errors.email}</div>
                                    )}
                                </div>
                            </div>

                            {/* Site Brand Logo Upload */}
                            <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <Image className="w-4 h-4 text-gray-700 dark:text-slate-300" />
                                    <Label htmlFor="logo_file" className="text-xs font-semibold text-gray-700 dark:text-slate-300">
                                        Upload Logo Project / Brand (PNG, JPG, SVG, WEBP, Maks 5 MB)
                                    </Label>
                                </div>
                                <Input
                                    id="logo_file"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => profileForm.setData('logo_file', e.target.files[0])}
                                    className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white dark:file:bg-white dark:file:text-gray-900"
                                />
                                {profileForm.errors.logo_file && (
                                    <div className="text-rose-500 text-xs mt-1 font-medium">{profileForm.errors.logo_file}</div>
                                )}

                                {profileForm.data.site_logo && (
                                    <div className="mt-2 p-3.5 rounded-2xl bg-gray-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center p-1 overflow-hidden shrink-0 shadow-xs">
                                                <img src={profileForm.data.site_logo} alt="Logo Brand" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="font-mono text-gray-700 dark:text-slate-300">
                                                <span>Logo Aktif: <span className="font-bold text-gray-900 dark:text-white">{profileForm.data.site_logo}</span></span>
                                            </div>
                                        </div>
                                        <a href={profileForm.data.site_logo} target="_blank" rel="noreferrer" className="text-xs font-semibold text-gray-900 dark:text-white underline hover:no-underline flex items-center gap-1">
                                            <span>Lihat Logo</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="rounded-2xl bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold px-6 text-xs transition cursor-pointer flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{profileForm.processing ? 'Menyimpan...' : 'Simpan Profil & Logo'}</span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Section 2: Password & Security */}
                <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                    <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6">
                        <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <KeyRound className="w-5 h-5 text-gray-900 dark:text-white" />
                            <span>Perbarui Kata Sandi (Password)</span>
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                            Pastikan menggunakan password kombinasi yang kuat (minimal 8 karakter).
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6">
                        {passwordForm.recentlySuccessful && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-sm flex items-center gap-3 font-medium"
                            >
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                <span>Password berhasil diperbarui!</span>
                            </motion.div>
                        )}

                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="current_password" className="text-xs font-semibold text-gray-700 dark:text-slate-300">
                                    Password Saat Ini
                                </Label>
                                <Input
                                    id="current_password"
                                    type="password"
                                    value={passwordForm.data.current_password}
                                    onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                    placeholder="••••••••"
                                    className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    required
                                />
                                {passwordForm.errors.current_password && (
                                    <div className="text-rose-500 text-xs mt-1 font-medium">{passwordForm.errors.current_password}</div>
                                )}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="password" className="text-xs font-semibold text-gray-700 dark:text-slate-300">
                                        Password Baru
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                    {passwordForm.errors.password && (
                                        <div className="text-rose-500 text-xs mt-1 font-medium">{passwordForm.errors.password}</div>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="password_confirmation" className="text-xs font-semibold text-gray-700 dark:text-slate-300">
                                        Konfirmasi Password Baru
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={passwordForm.data.password_confirmation}
                                        onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                        placeholder="••••••••"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                    {passwordForm.errors.password_confirmation && (
                                        <div className="text-rose-500 text-xs mt-1 font-medium">{passwordForm.errors.password_confirmation}</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="rounded-2xl bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold px-6 text-xs transition cursor-pointer flex items-center gap-2"
                                >
                                    <KeyRound className="w-4 h-4" />
                                    <span>{passwordForm.processing ? 'Memproses...' : 'Perbarui Password'}</span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
