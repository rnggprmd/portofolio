import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/Components/ui/card';
import { Code2, ArrowLeft } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Login Admin" />
            <div className="min-h-screen bg-white dark:bg-slate-950 bg-grid-pattern flex items-center justify-center p-4 text-gray-900 dark:text-white transition-colors duration-300 relative">
                {/* Back to Home button */}
                <Link
                    href="/"
                    className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-xs font-mono font-bold text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition shadow-2xs"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Landing Page</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md"
                >
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                        <CardHeader className="text-center pb-6 border-b border-gray-100 dark:border-slate-800">
                            <div className="w-12 h-12 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center mx-auto mb-3 shadow-md overflow-hidden p-1.5">
                                <img 
                                    src="/storage/logo/logo portofolio.png" 
                                    alt="Logo" 
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                            <CardTitle className="font-heading font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">
                                Login Admin Panel
                            </CardTitle>
                            <CardDescription className="mt-1 text-xs text-gray-500 dark:text-slate-400 font-sans">
                                Masuk untuk mengelola data portofolio Rangga Pramudya
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 sm:p-8 space-y-4">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="admin@example.com"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                    {errors.email && <div className="text-rose-500 text-xs mt-1">{errors.email}</div>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="password" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                    {errors.password && <div className="text-rose-500 text-xs mt-1">{errors.password}</div>}
                                </div>

                                <div className="flex items-center justify-between text-xs pt-1">
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-slate-400">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="rounded bg-gray-100 dark:bg-slate-950 border-gray-300 dark:border-slate-800 text-gray-900 dark:text-white"
                                        />
                                        Ingat saya
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full mt-2 py-3 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm shadow-md hover:bg-black dark:hover:bg-gray-100 transition cursor-pointer"
                                    size="lg"
                                >
                                    {processing ? 'Memproses...' : 'Masuk ke Dashboard'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </>
    );
}
