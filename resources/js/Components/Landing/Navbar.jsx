import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, X, Code2, Sun, Moon, Command, Globe } from 'lucide-react';
import { useLanguage } from '../../Context/LanguageContext';

export default function Navbar({ theme, toggleTheme, onOpenCommandPalette, settings = {} }) {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { lang, toggleLanguage, t } = useLanguage();
    const heroName = settings.hero_name || 'Rangga Pramudya';

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const navItems = [
        { id: 'home', label: t.nav.home },
        { id: 'github', label: t.nav.github },
        { id: 'about', label: t.nav.about },
        { id: 'skills', label: t.nav.skills },
        { id: 'projects', label: t.nav.projects },
        { id: 'experience', label: t.nav.experience },
        { id: 'contact', label: t.nav.contact },
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

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            // 1. If near top of page (less than 120px), force active section to 'home'
            if (currentScrollY < 120) {
                setActiveSection('home');
                return;
            }

            // 2. Check current visible section using getBoundingClientRect
            const sectionIds = ['contact', 'experience', 'projects', 'skills', 'about', 'github', 'home'];
            
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // If section is in the active viewport zone
                    if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 120) {
                        setActiveSection(id);
                        return;
                    }
                }
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800/80 shadow-xs py-3'
                    : 'bg-transparent py-4'
            }`}
        >
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gray-900 dark:bg-white origin-left z-50 shadow-xs"
                style={{ scaleX }}
            />

            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Brand Logo with Interactive Spring Hover */}
                <motion.button
                    type="button"
                    onClick={(e) => scrollToSection(e, 'home')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2.5 group cursor-pointer text-left bg-transparent border-0 p-0"
                >
                    <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform duration-300 overflow-hidden p-1">
                        <img 
                            src={settings.site_logo || "/storage/logo/logo-portofolio.png"} 
                            alt="Logo" 
                            className="w-full h-full object-contain rounded-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/storage/logo/logo-portofolio.png";
                            }}
                        />
                    </div>
                    <span className="font-heading font-bold text-gray-900 dark:text-white text-base tracking-tight">
                        {heroName}
                    </span>
                </motion.button>

                {/* Floating Navigation Bar */}
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50"
                >
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <motion.button
                                key={item.id}
                                onClick={(e) => scrollToSection(e, item.id)}
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.94 }}
                                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                                    isActive
                                        ? 'text-gray-900 dark:text-white font-semibold'
                                        : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-2xs -z-10"
                                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                                    />
                                )}
                                {item.label}
                            </motion.button>
                        );
                    })}
                </motion.nav>

                {/* Right Utilities: Language Switcher, Command Palette & Theme Toggle */}
                <div className="flex items-center gap-2">
                    {/* EN / ID Language Switcher Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92, rotate: 12 }}
                        onClick={toggleLanguage}
                        className="px-3.5 py-2 rounded-full bg-gray-100/90 dark:bg-slate-800/90 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white text-xs font-mono font-bold transition duration-200 flex items-center gap-1.5 border border-gray-200 dark:border-slate-700 shadow-2xs cursor-pointer"
                        title="Switch Language (EN / ID)"
                    >
                        <Globe className="w-3.5 h-3.5 text-gray-700 dark:text-slate-300" />
                        <span>{lang === 'en' ? 'EN' : 'ID'}</span>
                    </motion.button>

                    {/* Command Palette Trigger Button */}
                    <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={onOpenCommandPalette}
                        className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gray-100/90 dark:bg-slate-800/90 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs font-mono transition duration-200 border border-gray-200 dark:border-slate-700 cursor-pointer"
                        title="Search / Command Palette (Ctrl+K)"
                    >
                        <Command className="w-3.5 h-3.5" />
                        <span>Ctrl+K</span>
                    </motion.button>

                    {/* Theme Toggle Button */}
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9, rotate: -15 }}
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full bg-gray-100/90 dark:bg-slate-800/90 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white transition duration-200 border border-gray-200 dark:border-slate-700 cursor-pointer"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                    </motion.button>

                    {/* Mobile Menu Toggle Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2.5 rounded-full bg-gray-100/90 dark:bg-slate-800/90 text-gray-900 dark:text-white transition cursor-pointer"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="md:hidden mt-3 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-gray-200 dark:border-slate-800 shadow-xl space-y-3"
                >
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={(e) => {
                                    setMobileMenuOpen(false);
                                    scrollToSection(e, item.id);
                                }}
                                className="px-4 py-2 text-left rounded-xl text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </header>
    );
}
