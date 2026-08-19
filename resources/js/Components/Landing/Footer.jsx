import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Mail, MapPin, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon, ReactIcon, LaravelIcon, TailwindIcon, InertiaIcon, DockerIcon, PostgresqlIcon } from './BrandIcons';
import { useLanguage } from '../../Context/LanguageContext';

export default function Footer({ settings = {} }) {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const heroName = settings.hero_name || 'Rangga Pramudya';
    const heroRole = settings.hero_role || 'Software Engineer';
    const contactEmail = settings.contact_email || settings.email || 'rangga.pramudya@example.com';
    const githubUrl = settings.github_url || 'https://github.com/rnggprmd';
    const linkedinUrl = settings.linkedin_url || 'https://linkedin.com';

    const techBadges = [
        { name: 'Laravel 13', Icon: LaravelIcon },
        { name: 'React 19', Icon: ReactIcon },
        { name: 'Tailwind v4', Icon: TailwindIcon },
        { name: 'Inertia.js', Icon: InertiaIcon },
        { name: 'PostgreSQL', Icon: PostgresqlIcon },
        { name: 'Docker', Icon: DockerIcon },
    ];

    const scrollToSection = (e, id) => {
        if (e) e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            if (window.history.replaceState) {
                window.history.replaceState(null, '', window.location.pathname);
            }
        }
    };

    return (
        <footer className="relative z-10 bg-gray-900 dark:bg-slate-950 text-white border-t border-gray-800 dark:border-slate-900 transition-colors duration-300 pt-16 pb-12 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* 4-Column Upper Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-gray-800/80 dark:border-slate-900">
                    {/* Column 1: Brand & Personal Tagline (4 cols) */}
                    <div className="md:col-span-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className="w-10 h-10 rounded-xl bg-white text-gray-900 flex items-center justify-center shadow-sm overflow-hidden p-1">
                                <img 
                                    src={settings.site_logo || "/storage/logo/logo-portofolio.png"} 
                                    alt="Logo" 
                                    className="w-full h-full object-contain rounded-lg"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/storage/logo/logo-portofolio.png";
                                    }}
                                />
                            </motion.div>
                            <span className="font-heading font-bold text-lg text-white">
                                {heroName}
                            </span>
                        </div>

                        <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm">
                            {t.footer.bio}
                        </p>

                        {/* Social Buttons */}
                        <div className="flex items-center gap-3 pt-1">
                            <motion.a
                                whileHover={{ scale: 1.15, rotate: 6 }}
                                whileTap={{ scale: 0.9 }}
                                href={githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 rounded-xl bg-gray-800/80 border border-gray-700/80 text-gray-300 hover:bg-white hover:text-gray-900 transition shadow-2xs"
                                title="GitHub"
                            >
                                <GithubIcon className="w-4 h-4" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.15, rotate: -6 }}
                                whileTap={{ scale: 0.9 }}
                                href={linkedinUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 rounded-xl bg-gray-800/80 border border-gray-700/80 text-gray-300 hover:bg-white hover:text-gray-900 transition shadow-2xs"
                                title="LinkedIn"
                            >
                                <LinkedinIcon className="w-4 h-4" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.15, rotate: 6 }}
                                whileTap={{ scale: 0.9 }}
                                href={`mailto:${contactEmail}`}
                                className="p-2.5 rounded-xl bg-gray-800/80 border border-gray-700/80 text-gray-300 hover:bg-white hover:text-gray-900 transition shadow-2xs"
                                title="Email"
                            >
                                <Mail className="w-4 h-4" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Column 2: Quick Navigation Links (3 cols) */}
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                            {t.footer.quickNav}
                        </h4>
                        <ul className="space-y-2 text-xs font-medium text-gray-400">
                            <li><button onClick={(e) => scrollToSection(e, 'home')} className="hover:text-white transition cursor-pointer text-left">{t.nav.home}</button></li>
                            <li><button onClick={(e) => scrollToSection(e, 'github')} className="hover:text-white transition cursor-pointer text-left">{t.nav.github}</button></li>
                            <li><button onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition cursor-pointer text-left">{t.nav.about}</button></li>
                            <li><button onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-white transition cursor-pointer text-left">{t.nav.skills}</button></li>
                            <li><button onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition cursor-pointer text-left">{t.nav.projects}</button></li>
                            <li><button onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-white transition cursor-pointer text-left">{t.nav.experience}</button></li>
                            <li><button onClick={(e) => scrollToSection(e, 'certificates')} className="hover:text-white transition cursor-pointer text-left">{t.nav.certificates}</button></li>
                            <li><button onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition cursor-pointer text-left">{t.nav.contact}</button></li>
                        </ul>
                    </div>

                    {/* Column 3: Featured Core Stack (3 cols) */}
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                            {t.footer.featuredTech}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {techBadges.map((badge, idx) => {
                                const IconComp = badge.Icon;
                                return (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-800/80 border border-gray-700/80 text-[11px] font-mono font-medium text-gray-300 shadow-2xs"
                                    >
                                        <IconComp className="w-3.5 h-3.5 shrink-0" />
                                        <span>{badge.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 4: Contact & Location (2 cols) */}
                    <div className="md:col-span-2 space-y-3">
                        <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                            {t.footer.contactHeading}
                        </h4>
                        <div className="space-y-2 text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                                <span>{t.footer.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5 text-white shrink-0" />
                                <span>Remote / On-site</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Sub-Footer Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4 font-mono">
                    <div>
                        © {currentYear} {heroName}. {t.footer.rights}
                    </div>
                </div>
            </div>
        </footer>
    );
}
