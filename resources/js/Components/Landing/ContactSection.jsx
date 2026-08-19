import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Copy, Check, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { useLanguage } from '../../Context/LanguageContext';

export default function ContactSection({ settings = {} }) {
    const { t } = useLanguage();
    const [copiedEmail, setCopiedEmail] = useState(false);

    const contactEmail = settings.contact_email || settings.email || 'rangga.pramudya@example.com';
    const githubUrl = settings.github_url || 'https://github.com/rnggprmd';
    const linkedinUrl = settings.linkedin_url || 'https://linkedin.com';

    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const subjectPresets = [
        "🚀 New Project Inquiry",
        "💼 Full-Time / Contract Role",
        "☕ Tech Consultation / Chat",
        "🤝 Partnership Proposal"
    ];

    const handleCopyEmail = () => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(contactEmail);
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <section id="contact" className="py-24 px-4 sm:px-8 bg-transparent border-y border-gray-200/80 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                        {t.contact.tag}
                    </span>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
                        {t.contact.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-sans">
                        {t.contact.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-12 gap-12 items-start">
                    {/* Left: Contact Info */}
                    <div className="md:col-span-5 space-y-8">
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs space-y-6">
                            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white">{t.contact.infoTitle}</h3>

                            <div className="space-y-4 text-sm text-gray-600 dark:text-slate-300">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-mono font-medium text-gray-400 dark:text-slate-500 uppercase">Email</div>
                                        <div className="flex items-center justify-between gap-2 mt-0.5">
                                            <a href={`mailto:${contactEmail}`} className="font-semibold text-gray-900 dark:text-white hover:underline text-xs sm:text-sm">
                                                {contactEmail}
                                            </a>
                                            <button
                                                type="button"
                                                onClick={handleCopyEmail}
                                                aria-label="Copy email address"
                                                className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                                                title="Copy email"
                                            >
                                                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {copiedEmail && (
                                            <span className="text-[10px] font-mono text-emerald-500 font-bold block mt-1">
                                                ✓ Email copied to clipboard!
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-mono font-medium text-gray-400 dark:text-slate-500 uppercase">{t.contact.location}</div>
                                        <div className="font-semibold text-gray-900 dark:text-white">{t.contact.locationVal}</div>
                                    </div>
                                </div>


                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                                <div className="text-xs font-mono font-medium text-gray-400 dark:text-slate-500 uppercase mb-3">Connect via Social</div>
                                <div className="flex gap-3">
                                    <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="p-3 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white hover:scale-105 transition">
                                        <GithubIcon className="w-4 h-4" />
                                    </a>
                                    <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="p-3 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white hover:scale-105 transition">
                                        <LinkedinIcon className="w-4 h-4" />
                                    </a>
                                    <a href={`mailto:${contactEmail}`} aria-label="Send Email" className="p-3 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white hover:scale-105 transition">
                                        <Mail className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="md:col-span-7">
                        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xl space-y-6">
                            {recentlySuccessful && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-sm flex items-center gap-3"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                    <div>
                                        <div className="font-bold">{t.contact.successTitle}</div>
                                        <div className="text-xs">{t.contact.successDesc}</div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Quick Subject Presets */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 dark:text-slate-300">
                                    <Sparkles className="w-3.5 h-3.5 text-gray-900 dark:text-white" />
                                    <span>{t.contact.quickTopics}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {subjectPresets.map((preset, idx) => (
                                        <motion.button
                                            key={idx}
                                            type="button"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setData('subject', preset)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium border transition cursor-pointer ${
                                                data.subject === preset
                                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                                                    : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700'
                                            }`}
                                        >
                                            {preset}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label htmlFor="contact_name" className="block text-xs font-semibold text-gray-700 dark:text-slate-300">{t.contact.name}</label>
                                        <input
                                            id="contact_name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-gray-900 dark:focus:border-white focus:bg-white dark:focus:bg-slate-950 transition"
                                            placeholder="John Doe"
                                            required
                                        />
                                        {errors.name && <div className="text-rose-500 text-xs mt-1">{errors.name}</div>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="contact_email" className="block text-xs font-semibold text-gray-700 dark:text-slate-300">{t.contact.email}</label>
                                        <input
                                            id="contact_email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-gray-900 dark:focus:border-white focus:bg-white dark:focus:bg-slate-950 transition"
                                            placeholder="john@example.com"
                                            required
                                        />
                                        {errors.email && <div className="text-rose-500 text-xs mt-1">{errors.email}</div>}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="contact_subject" className="block text-xs font-semibold text-gray-700 dark:text-slate-300">{t.contact.subject}</label>
                                    <input
                                        id="contact_subject"
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-gray-900 dark:focus:border-white focus:bg-white dark:focus:bg-slate-950 transition"
                                        placeholder="Project Discussion / Collaboration"
                                    />
                                    {errors.subject && <div className="text-rose-500 text-xs mt-1">{errors.subject}</div>}
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-slate-300">
                                        <label htmlFor="contact_message">{t.contact.message}</label>
                                        <span className="font-mono text-[10px] text-gray-400">{data.message.length} chars</span>
                                    </div>
                                    <textarea
                                        id="contact_message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-gray-900 dark:focus:border-white focus:bg-white dark:focus:bg-slate-950 transition"
                                        placeholder="Tell me about your project goals or questions..."
                                        required
                                    />
                                    {errors.message && <div className="text-rose-500 text-xs mt-1">{errors.message}</div>}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={processing}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-2xl bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold text-sm shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{processing ? t.contact.sending : t.contact.send}</span>
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
