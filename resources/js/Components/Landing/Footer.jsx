import React from 'react';
import { Code2, Mail, MapPin, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon, ReactIcon, LaravelIcon, TailwindIcon, InertiaIcon, DockerIcon, PostgresqlIcon } from './BrandIcons';
import { useLanguage } from '../../Context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const techBadges = [
        { name: 'Laravel 13', Icon: LaravelIcon },
        { name: 'React 19', Icon: ReactIcon },
        { name: 'Tailwind v4', Icon: TailwindIcon },
        { name: 'Inertia.js', Icon: InertiaIcon },
        { name: 'PostgreSQL', Icon: PostgresqlIcon },
        { name: 'Docker', Icon: DockerIcon },
    ];

    return (
        <footer className="relative z-10 bg-gray-900 dark:bg-slate-950 text-white border-t border-gray-800 dark:border-slate-900 transition-colors duration-300 pt-16 pb-12 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* 4-Column Upper Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-gray-800/80 dark:border-slate-900">
                    {/* Column 1: Brand & Personal Tagline (4 cols) */}
                    <div className="md:col-span-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white text-gray-900 flex items-center justify-center font-bold text-lg shadow-sm">
                                <Code2 className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="font-heading font-bold text-lg text-white block leading-none">
                                    Rangga Pramudya
                                </span>
                                <span className="font-mono text-xs text-gray-400">
                                    Software Engineer
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm">
                            {t.footer.bio}
                        </p>

                        {/* Social Buttons */}
                        <div className="flex items-center gap-3 pt-1">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 rounded-xl bg-gray-800/80 border border-gray-700/80 text-gray-300 hover:bg-white hover:text-gray-900 transition shadow-2xs"
                                title="GitHub"
                            >
                                <GithubIcon className="w-4 h-4" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 rounded-xl bg-gray-800/80 border border-gray-700/80 text-gray-300 hover:bg-white hover:text-gray-900 transition shadow-2xs"
                                title="LinkedIn"
                            >
                                <LinkedinIcon className="w-4 h-4" />
                            </a>
                            <a
                                href="mailto:rangga.pramudya@example.com"
                                className="p-2.5 rounded-xl bg-gray-800/80 border border-gray-700/80 text-gray-300 hover:bg-white hover:text-gray-900 transition shadow-2xs"
                                title="Email"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Navigation Links (3 cols) */}
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                            {t.footer.quickNav}
                        </h4>
                        <ul className="space-y-2 text-xs font-medium text-gray-400">
                            <li><a href="#home" className="hover:text-white transition">{t.nav.home}</a></li>
                            <li><a href="#about" className="hover:text-white transition">{t.nav.about}</a></li>
                            <li><a href="#skills" className="hover:text-white transition">{t.nav.skills}</a></li>
                            <li><a href="#projects" className="hover:text-white transition">{t.nav.projects}</a></li>
                            <li><a href="#experience" className="hover:text-white transition">{t.nav.experience}</a></li>
                            <li><a href="#certificates" className="hover:text-white transition">{t.nav.certificates}</a></li>
                            <li><a href="#contact" className="hover:text-white transition">{t.nav.contact}</a></li>
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
                        © {currentYear} Rangga Pramudya. {t.footer.rights}
                    </div>

                    <div className="flex items-center gap-4">
                        <span>{t.footer.crafted}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
