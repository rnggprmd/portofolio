import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { UserCheck, BookOpen, Compass, HeartHandshake, Sparkles, Save, CheckCircle2, Image, ExternalLink, Plus, Trash2 } from 'lucide-react';

export default function AboutIndex({ settings = {} }) {
    // Helper to safely parse initial JSON arrays or fallbacks
    const parseInitialArray = (key, fallback) => {
        if (!settings[key]) return fallback;
        try {
            const parsed = typeof settings[key] === 'string' ? JSON.parse(settings[key]) : settings[key];
            return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
        } catch (e) {
            return fallback;
        }
    };

    const initialParagraphs = parseInitialArray('about_paragraphs', [
        settings.about_story_1 || "Saya adalah seorang Software Engineer berlatar belakang Sistem Informasi dengan passion kuat pada pengembangan aplikasi web performan tinggi.",
        settings.about_story_2 || "Pengalaman berfokus pada ekosistem Laravel & React, membangun arsitektur clean code, arsitektur database terstruktur, serta antarmuka pengguna yang responsif.",
        settings.about_story_3 || "Selalu bersemangat mempelajari teknologi web modern, metodologi arsitektur sistem terbaru, dan menciptakan produk digital yang berdampak nyata."
    ]);

    const initialPrinciples = parseInitialArray('about_principles', [
        settings.about_clean_code || "Clean Code & Arsitektur Terstruktur yang Mudah Dideploy",
        settings.about_human_ui || "Pengalaman Pengguna (UI/UX) Presisi & Responsif",
        settings.about_continuous_growth || "Pembelajaran Berkelanjutan & Adaptasi Teknologi Terbaru"
    ]);

    const initialFocusSkills = parseInitialArray('about_focus_skills', [
        { name: settings.about_skill1_name || "Full-Stack Development (Laravel & React)", percent: settings.about_skill1_percent || "92" },
        { name: settings.about_skill2_name || "RESTful API & Database Architecture", percent: settings.about_skill2_percent || "88" },
        { name: settings.about_skill3_name || "UI/UX Precision & Responsive Design", percent: settings.about_skill3_percent || "90" }
    ]);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        about_tag: settings.about_tag || 'DISCOVER MY JOURNEY',
        about_title: settings.about_title || 'Crafting Digital Experiences with Passion & Precision',
        about_avatar_file: null,
        about_avatar_url: settings.about_avatar_url || '',
        about_paragraphs: initialParagraphs,
        about_philosophy_title: settings.about_philosophy_title || 'Membangun Perangkat Lunak Berkelas Dunia Melalui Prinsip:',
        about_principles: initialPrinciples,
        about_focus_skills: initialFocusSkills,
        about_interests: settings.about_interests || 'UI/UX Design, Web Security, Cloud Architecture, Open Source, Machine Learning, Clean Architecture',
    });

    useEffect(() => {
        if (settings.about_avatar_url) {
            setData('about_avatar_url', settings.about_avatar_url);
        }
    }, [settings.about_avatar_url]);

    // Dynamic Paragraph Controls
    const handleParagraphChange = (index, value) => {
        const updated = [...data.about_paragraphs];
        updated[index] = value;
        setData('about_paragraphs', updated);
    };

    const addParagraph = () => {
        setData('about_paragraphs', [...data.about_paragraphs, '']);
    };

    const removeParagraph = (index) => {
        if (data.about_paragraphs.length <= 1) return;
        const updated = data.about_paragraphs.filter((_, idx) => idx !== index);
        setData('about_paragraphs', updated);
    };

    // Dynamic Philosophy Principles Controls
    const handlePrincipleChange = (index, value) => {
        const updated = [...data.about_principles];
        updated[index] = value;
        setData('about_principles', updated);
    };

    const addPrinciple = () => {
        setData('about_principles', [...data.about_principles, '']);
    };

    const removePrinciple = (index) => {
        if (data.about_principles.length <= 1) return;
        const updated = data.about_principles.filter((_, idx) => idx !== index);
        setData('about_principles', updated);
    };

    // Dynamic Focus Skills Controls
    const handleFocusSkillChange = (index, field, value) => {
        const updated = [...data.about_focus_skills];
        updated[index] = { ...updated[index], [field]: value };
        setData('about_focus_skills', updated);
    };

    const addFocusSkill = () => {
        setData('about_focus_skills', [...data.about_focus_skills, { name: '', percent: '85' }]);
    };

    const removeFocusSkill = (index) => {
        if (data.about_focus_skills.length <= 1) return;
        const updated = data.about_focus_skills.filter((_, idx) => idx !== index);
        setData('about_focus_skills', updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/about', {
            forceFormData: true,
            onSuccess: () => {
                setData('about_avatar_file', null);
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan Tentang Saya (About)" />

            <div className="space-y-6">
                {/* Header Title */}
                <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                        Seksi 02 // Landing Page
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Pengaturan Seksi Tentang Saya (About)
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-sans mt-1">
                        Kelola judul seksi, foto khusus About, paragraf cerita dinamis, filosofi dinamis, skill kemahiran dinamis, dan daftar hobi/minat
                    </p>
                </div>

                {recentlySuccessful && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-sm flex items-center gap-3 font-medium"
                    >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Pengaturan Seksi About berhasil diperbarui!</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header Section Config */}
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6">
                            <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <UserCheck className="w-5 h-5 text-gray-900 dark:text-white" />
                                <span>Judul & Tagline Seksi About</span>
                            </CardTitle>
                            <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">Pengaturan teks penanda bagian atas seksi About</CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="about_tag" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tagline Atas (Monospace)</Label>
                                    <Input
                                        id="about_tag"
                                        type="text"
                                        value={data.about_tag}
                                        onChange={(e) => setData('about_tag', e.target.value)}
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="about_title" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Judul Utama Seksi</Label>
                                    <Input
                                        id="about_title"
                                        type="text"
                                        value={data.about_title}
                                        onChange={(e) => setData('about_title', e.target.value)}
                                        className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dedicated About Photo Upload */}
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6">
                            <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Image className="w-5 h-5 text-gray-900 dark:text-white" />
                                <span>Upload Foto Profil Khusus Seksi About</span>
                            </CardTitle>
                            <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">Upload foto profil yang berbeda dari Hero section untuk ditampilkan di kartu About 3D</CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="about_avatar_file" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Pilih Foto Khusus About (Format JPG, PNG, WEBP, Maks. 5 MB)</Label>
                                <Input
                                    id="about_avatar_file"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('about_avatar_file', e.target.files[0])}
                                    className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white dark:file:bg-white dark:file:text-gray-900"
                                />
                                {errors.about_avatar_file && <div className="text-rose-500 text-xs mt-1">{errors.about_avatar_file}</div>}

                                {data.about_avatar_url && (
                                    <div className="mt-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-3">
                                            <img src={data.about_avatar_url} alt="About Card" className="w-12 h-12 rounded-xl object-cover border border-emerald-300 dark:border-emerald-700 shrink-0" />
                                            <div className="font-mono text-emerald-800 dark:text-emerald-300">
                                                <span>Foto About Terupload: <span className="font-bold text-gray-900 dark:text-white">{data.about_avatar_url}</span></span>
                                            </div>
                                        </div>
                                        <a href={data.about_avatar_url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 underline hover:no-underline flex items-center gap-1">
                                            <span>Lihat Foto</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* DYNAMIC STORY PARAGRAPHS CONFIG (With Auto Scroll if > 3 items) */}
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-gray-900 dark:text-white" />
                                    <span>Cerita Latar Belakang (Dinamis - My Story Tab)</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                    Tambah atau hapus jumlah paragraf cerita sesuka Anda secara bebas {data.about_paragraphs.length > 3 && <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">(Mode Scroll Aktif - {data.about_paragraphs.length} Paragraf)</span>}
                                </CardDescription>
                            </div>
                            <Button
                                type="button"
                                onClick={addParagraph}
                                className="rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-semibold text-xs px-4 py-2 border border-gray-300 dark:border-slate-700 gap-1.5 shadow-2xs cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Tambah Paragraf</span>
                            </Button>
                        </CardHeader>

                        <CardContent className={`p-6 space-y-5 ${data.about_paragraphs.length > 3 ? 'max-h-[460px] overflow-y-auto pr-3' : ''}`}>
                            {data.about_paragraphs.map((paragraphText, idx) => (
                                <div key={idx} className="space-y-2 p-4 rounded-2xl bg-gray-50/80 dark:bg-slate-950/60 border border-gray-200/80 dark:border-slate-800 relative group">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor={`paragraph_${idx}`} className="text-xs font-bold font-mono text-gray-700 dark:text-slate-300 flex items-center gap-1.5">
                                            <span>Paragraf {idx + 1}</span>
                                            {idx === 0 && <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">(Teks Tebal / Main Highlight)</span>}
                                        </Label>
                                        {data.about_paragraphs.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeParagraph(idx)}
                                                className="p-2 rounded-full border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                                                title="Hapus Paragraf"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                    <Textarea
                                        id={`paragraph_${idx}`}
                                        value={paragraphText}
                                        onChange={(e) => handleParagraphChange(idx, e.target.value)}
                                        rows={3}
                                        placeholder={`Tuliskan narasi paragraf ${idx + 1}...`}
                                        className="rounded-2xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-sm"
                                        required
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* DYNAMIC PHILOSOPHY PRINCIPLES CONFIG (With Auto Scroll if > 3 items) */}
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Compass className="w-5 h-5 text-gray-900 dark:text-white" />
                                    <span>Filosofi & Prinsip Kerja (Dinamis - Philosophy Tab)</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                    Tambah atau hapus poin-poin prinsip kerja sesuka Anda secara bebas {data.about_principles.length > 3 && <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">(Mode Scroll Aktif - {data.about_principles.length} Prinsip)</span>}
                                </CardDescription>
                            </div>
                            <Button
                                type="button"
                                onClick={addPrinciple}
                                className="rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-semibold text-xs px-4 py-2 border border-gray-300 dark:border-slate-700 gap-1.5 shadow-2xs cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Tambah Prinsip</span>
                            </Button>
                        </CardHeader>

                        <CardContent className={`p-6 space-y-4 ${data.about_principles.length > 3 ? 'max-h-[460px] overflow-y-auto pr-3' : ''}`}>
                            <div className="space-y-1.5 mb-4">
                                <Label htmlFor="about_philosophy_title" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Judul Pengantar Filosofi</Label>
                                <Input
                                    id="about_philosophy_title"
                                    type="text"
                                    value={data.about_philosophy_title}
                                    onChange={(e) => setData('about_philosophy_title', e.target.value)}
                                    className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                {data.about_principles.map((principleText, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="grow space-y-1">
                                            <Label htmlFor={`principle_${idx}`} className="text-xs font-semibold text-gray-700 dark:text-slate-300">Prinsip {idx + 1}</Label>
                                            <Input
                                                id={`principle_${idx}`}
                                                type="text"
                                                value={principleText}
                                                onChange={(e) => handlePrincipleChange(idx, e.target.value)}
                                                placeholder={`Tuliskan poin prinsip ${idx + 1}...`}
                                                className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm"
                                                required
                                            />
                                        </div>
                                        {data.about_principles.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removePrinciple(idx)}
                                                className="mt-5 p-2 rounded-full border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                                                title="Hapus Prinsip"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* DYNAMIC FOCUS SKILLS & PROFICIENCY CONFIG (With Auto Scroll if > 3 items) */}
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <HeartHandshake className="w-5 h-5 text-gray-900 dark:text-white" />
                                    <span>Fokus & Tingkat Kemahiran Skill (Dinamis - Focus Tab)</span>
                                </CardTitle>
                                <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                    Tambah atau hapus baris skill kemahiran sesuka Anda secara bebas {data.about_focus_skills.length > 3 && <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">(Mode Scroll Aktif - {data.about_focus_skills.length} Skill Bar)</span>}
                                </CardDescription>
                            </div>
                            <Button
                                type="button"
                                onClick={addFocusSkill}
                                className="rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-semibold text-xs px-4 py-2 border border-gray-300 dark:border-slate-700 gap-1.5 shadow-2xs cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Tambah Skill Bar</span>
                            </Button>
                        </CardHeader>

                        <CardContent className={`p-6 space-y-4 ${data.about_focus_skills.length > 3 ? 'max-h-[460px] overflow-y-auto pr-3' : ''}`}>
                            <div className="space-y-4">
                                {data.about_focus_skills.map((skillItem, idx) => (
                                    <div key={idx} className="p-4 rounded-2xl bg-gray-50/80 dark:bg-slate-950/60 border border-gray-200/80 dark:border-slate-800 space-y-3 relative group">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-xs font-bold font-mono text-gray-700 dark:text-slate-300">
                                                Skill Bar Item {idx + 1}
                                            </Label>
                                            {data.about_focus_skills.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFocusSkill(idx)}
                                                    className="p-2 rounded-full border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                                                    title="Hapus Skill Bar"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid sm:grid-cols-3 gap-3">
                                            <div className="sm:col-span-2 space-y-1">
                                                <Label htmlFor={`focus_name_${idx}`} className="text-xs font-semibold text-gray-700 dark:text-slate-300">Nama Keahlian</Label>
                                                <Input
                                                    id={`focus_name_${idx}`}
                                                    type="text"
                                                    value={skillItem.name}
                                                    onChange={(e) => handleFocusSkillChange(idx, 'name', e.target.value)}
                                                    placeholder="Full-Stack Development (Laravel & React)"
                                                    className="rounded-2xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-sm"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor={`focus_percent_${idx}`} className="text-xs font-semibold text-gray-700 dark:text-slate-300">Persentase (%)</Label>
                                                <Input
                                                    id={`focus_percent_${idx}`}
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={skillItem.percent}
                                                    onChange={(e) => handleFocusSkillChange(idx, 'percent', e.target.value)}
                                                    placeholder="90"
                                                    className="rounded-2xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-sm font-mono"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Hobbies Config (Converted to Textarea) */}
                    <Card className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs">
                        <CardHeader className="border-b border-gray-100 dark:border-slate-800 p-6">
                            <CardTitle className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-gray-900 dark:text-white" />
                                <span>Hobi & Minat Personal (Tag Badges)</span>
                            </CardTitle>
                            <CardDescription className="text-xs text-gray-500 dark:text-slate-400 mt-1">Daftar hobi/minat yang akan tampil sebagai badge interaktif di kolom sebelah kanan seksi About (pisahkan dengan koma)</CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="about_interests" className="text-xs font-semibold text-gray-700 dark:text-slate-300">Tag Minat (Dipisahkan Koma)</Label>
                                <Textarea
                                    id="about_interests"
                                    rows={3}
                                    value={data.about_interests}
                                    onChange={(e) => setData('about_interests', e.target.value)}
                                    placeholder="Membaca Dokumentasi & Tech Blogs, Mengembangkan Web Tools Open-Source, Desain Antarmuka & UX Prototyping..."
                                    className="rounded-2xl bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-sm leading-relaxed"
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 px-8 py-3 text-sm font-semibold shadow-lg gap-2 cursor-pointer transition-transform"
                            >
                                <Save className="w-4 h-4" />
                                <span>Simpan Pengaturan About</span>
                            </Button>
                        </motion.div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
