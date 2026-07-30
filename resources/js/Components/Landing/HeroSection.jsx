import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, FileText, FolderKanban, Sparkles, UserCheck, Move, RotateCw, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { useLanguage } from '../../Context/LanguageContext';

export default function HeroSection({ settings = {} }) {
    const { t } = useLanguage();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [titleIndex, setTitleIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [hoveredTag, setHoveredTag] = useState(null);
    const [displayedName, setDisplayedName] = useState('');

    const name = settings.hero_name || 'Rangga Pramudya';
    const role = settings.hero_role || 'Software Engineer';
    const description = settings.hero_description || t.hero.description;
    const githubUrl = settings.github_url || 'https://github.com';
    const linkedinUrl = settings.linkedin_url || 'https://linkedin.com';
    const cvUrl = settings.cv_url || '#';
    const avatarUrl = settings.avatar_url || '';
    const specialtyLabel = settings.specialty_label || t.hero.fullstack || 'FULL-STACK';

    const cardTechTags = settings.card_tech_tags
        ? (typeof settings.card_tech_tags === 'string' ? settings.card_tech_tags.split(',').map(s => s.trim()).filter(Boolean) : settings.card_tech_tags)
        : ['Laravel', 'React', 'Tailwind'];

    let rotatingTitles = t.hero.titles;
    if (settings.hero_titles) {
        try {
            const parsed = typeof settings.hero_titles === 'string' ? JSON.parse(settings.hero_titles) : settings.hero_titles;
            if (Array.isArray(parsed) && parsed.length > 0) {
                rotatingTitles = parsed;
            } else if (typeof settings.hero_titles === 'string' && settings.hero_titles.trim()) {
                rotatingTitles = settings.hero_titles.split(',').map(s => s.trim()).filter(Boolean);
            }
        } catch (e) {
            if (typeof settings.hero_titles === 'string' && settings.hero_titles.trim()) {
                rotatingTitles = settings.hero_titles.split(',').map(s => s.trim()).filter(Boolean);
            }
        }
    }

    const techTagDetails = {
        Laravel: "Laravel 13 • Eloquent ORM & Inertia.js Monolith",
        React: "React 19 • Custom Hooks, State & Component Architecture",
        Tailwind: "Tailwind CSS v4 • Utility-First Responsive Design System",
    };

    // Infinite Typewriter Typing & Deleting Loop
    useEffect(() => {
        let timeout;
        let isDeleting = false;
        let charIndex = 0;

        const typeLoop = () => {
            if (!isDeleting) {
                setDisplayedName(name.substring(0, charIndex + 1));
                charIndex++;
                if (charIndex === name.length) {
                    isDeleting = true;
                    timeout = setTimeout(typeLoop, 2800);
                    return;
                }
                timeout = setTimeout(typeLoop, 85);
            } else {
                setDisplayedName(name.substring(0, charIndex - 1));
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    timeout = setTimeout(typeLoop, 600);
                    return;
                }
                timeout = setTimeout(typeLoop, 45);
            }
        };

        typeLoop();

        return () => clearTimeout(timeout);
    }, [name]);

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
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
        }, 3200);
        return () => clearInterval(interval);
    }, [rotatingTitles]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const moveX = (clientX - window.innerWidth / 2) / 35;
            const moveY = (clientY - window.innerHeight / 2) / 35;
            setMousePos({ x: moveX, y: moveY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 pb-12 px-4 sm:px-8 bg-transparent text-gray-900 dark:text-white transition-colors duration-300">
            {/* Ambient Mouse-Tracking Radial Light Glow Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        x: mousePos.x * -1.5,
                        y: mousePos.y * -1.5,
                    }}
                    transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                    className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gray-200/60 to-gray-100/30 dark:from-slate-800/30 dark:to-slate-900/10 blur-3xl opacity-70"
                />
                <motion.div
                    animate={{
                        x: mousePos.x * 1.8,
                        y: mousePos.y * 1.8,
                    }}
                    transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                    className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-gray-200/60 to-gray-100/30 dark:from-slate-800/30 dark:to-slate-900/10 blur-3xl opacity-70"
                />
            </div>

            <div className="max-w-6xl mx-auto w-full relative z-10 grid lg:grid-cols-12 items-center gap-12 my-auto py-4">
                {/* Left Column: Heading, Dynamic Titles, Description, CTA Buttons */}
                <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8">
                    {/* Main Heading with Infinite Typewriter Typing & Deleting Loop */}
                    <div className="space-y-3 sm:space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] text-gray-900 dark:text-white flex items-center justify-center lg:justify-start min-h-[48px] sm:min-h-[72px]"
                        >
                            <span>{displayedName}</span>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
                                className="inline-block w-1.5 sm:w-2.5 h-8 sm:h-12 md:h-14 bg-gray-900 dark:bg-white ml-2 rounded-xs align-middle shrink-0 shadow-xs"
                            />
                        </motion.h1>

                        {/* Rotating Title Switcher */}
                        <div className="h-8 sm:h-10 overflow-hidden flex items-center justify-center lg:justify-start">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={`${titleIndex}-${rotatingTitles[titleIndex % rotatingTitles.length]}`}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -14 }}
                                    transition={{ duration: 0.4 }}
                                    className="font-mono text-sm sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-slate-200 tracking-wide flex items-center gap-2"
                                >
                                    <Sparkles className="w-4 h-4 text-gray-900 dark:text-white inline shrink-0" />
                                    <span>{rotatingTitles[titleIndex % rotatingTitles.length]}</span>
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Short Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-base sm:text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
                    >
                        {description}
                    </motion.p>

                    {/* Interactive Magnetic CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={(e) => scrollToSection(e, 'projects')}
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold text-sm shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer"
                        >
                            <FolderKanban className="w-4 h-4" />
                            <span>{t.hero.viewProjects}</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={(e) => scrollToSection(e, 'contact')}
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gray-100 dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-900 dark:text-slate-200 border border-gray-200 dark:border-slate-800 font-medium text-sm transition-all duration-200 cursor-pointer"
                        >
                            <Mail className="w-4 h-4" />
                            <span>{t.hero.contactMe}</span>
                        </motion.button>

                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            href={cvUrl}
                            target={cvUrl !== '#' ? '_blank' : '_self'}
                            rel="noreferrer"
                            onClick={(e) => { if (cvUrl === '#') { e.preventDefault(); alert('CV download will be available soon!'); } }}
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-slate-900/60 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-300 dark:border-slate-800 font-medium text-sm transition-all duration-200 shadow-2xs cursor-pointer"
                        >
                            <FileText className="w-4 h-4" />
                            <span>{t.hero.downloadCv}</span>
                        </motion.a>
                    </motion.div>

                    {/* Social Media Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex items-center justify-center lg:justify-start gap-6 pt-1 text-gray-500 dark:text-slate-400"
                    >
                        <motion.a whileHover={{ scale: 1.2, rotate: 6 }} whileTap={{ scale: 0.9 }} href={githubUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition cursor-pointer">
                            <GithubIcon className="w-5 h-5" />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, rotate: -6 }} whileTap={{ scale: 0.9 }} href={linkedinUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition cursor-pointer">
                            <LinkedinIcon className="w-5 h-5" />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, rotate: 6 }} whileTap={{ scale: 0.9 }} href={`mailto:${settings.contact_email || 'contact@example.com'}`} className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition cursor-pointer">
                            <Mail className="w-5 h-5" />
                        </motion.a>
                    </motion.div>
                </div>

                {/* Right Column: Interactive 3D Physics Lanyard Pass Card */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center relative select-none">
                    {/* Interactive Tooltip Badges */}
                    <div className="mb-2 flex items-center gap-2 sm:gap-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-[10px] font-mono text-gray-600 dark:text-slate-400">
                            <Move className="w-3 h-3 text-gray-900 dark:text-white" />
                            <span>{t.hero.dragMe}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-[10px] font-mono text-gray-600 dark:text-slate-400">
                            <RotateCw className="w-3 h-3 text-gray-900 dark:text-white" />
                            <span>{t.hero.clickToFlip}</span>
                        </div>
                    </div>

                    {/* Elastic Drag-able & 3D Tilt Container with Gentle Floating & Swaying Animation */}
                    <motion.div
                        drag
                        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        dragElastic={0.45}
                        dragSnapToOrigin={true}
                        whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
                        animate={{
                            y: [0, -10, 0, 8, 0],
                            rotate: [0, 1.8, -1.8, 1, 0],
                        }}
                        transition={{
                            y: {
                                duration: 5,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut'
                            },
                            rotate: {
                                duration: 6,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut'
                            }
                        }}
                        className="relative pt-8 flex flex-col items-center group cursor-pointer touch-none"
                    >
                        {/* Fabric Lanyard Strap */}
                        <div className="absolute top-0 w-4 h-12 bg-gray-900 dark:bg-slate-800 shadow-sm flex items-center justify-center overflow-hidden border-x border-gray-800 dark:border-slate-700">
                            <div className="w-full h-full opacity-20 bg-[linear-gradient(45deg,#fff_25%,transparent_25%,transparent_50%,#fff_50%,#fff_75%,transparent_75%,transparent)] bg-[size:4px_4px]" />
                        </div>

                        {/* Matte Metal Clasp Clip */}
                        <div className="relative z-10 w-7 h-5 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-slate-700 dark:to-slate-800 rounded-sm border border-gray-400 dark:border-slate-600 shadow-xs mb-[-6px] flex items-center justify-center">
                            <div className="w-2.5 h-1 bg-gray-600 dark:bg-slate-500 rounded-xs" />
                        </div>

                        {/* 3D Flip Card Wrapper */}
                        <div
                            onClick={() => setIsFlipped(!isFlipped)}
                            className="relative z-20 w-64 sm:w-72 h-[370px] [perspective:1000px]"
                        >
                            <motion.div
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                                className="w-full h-full relative [transform-style:preserve-3d]"
                            >
                                {/* FRONT SIDE OF CARD WITH GEOMETRIC DOT PATTERN & TECH WATERMARK */}
                                <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-white dark:bg-slate-900 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] border border-gray-200 dark:border-slate-800 shadow-2xl space-y-3 flex flex-col justify-between [backface-visibility:hidden] overflow-hidden">
                                    
                                    {/* Subtle Holographic Reflective Shine Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 dark:via-white/5 to-transparent pointer-events-none -rotate-45 translate-y-[-50%] group-hover:translate-y-[50%] transition-transform duration-1000" />
                                    
                                    {/* Tech Corner Metallic Accents */}
                                    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-gray-400 dark:border-slate-600" />
                                    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-gray-400 dark:border-slate-600" />
                                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-gray-400 dark:border-slate-600" />
                                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-gray-400 dark:border-slate-600" />

                                    {/* Top Decorative Metallic Bar & Centered Slot Opening */}
                                    <div className="relative z-10 flex items-center justify-center border-b border-gray-200/60 dark:border-slate-800 pb-2">
                                        <div className="w-10 h-1.5 rounded-full bg-gray-300 dark:bg-slate-700 border border-gray-400 dark:border-slate-600 shrink-0" />
                                    </div>

                                    {/* Avatar Frame (Dynamic Photo or Fallback Initials) */}
                                    <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-slate-950 dark:to-slate-900 border border-gray-300 dark:border-slate-700 p-1 shadow-md overflow-hidden flex items-center justify-center shrink-0">
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt={name}
                                                className="w-full h-full rounded-xl object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-xl bg-slate-900 flex flex-col items-center justify-center text-white relative">
                                                <svg className="w-12 h-12 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xs uppercase">
                                                    {name.split(' ').map(n => n[0]).join('').slice(0, 2) || 'RP'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Name & Dynamic Role */}
                                    <div className="relative z-10 text-center space-y-0.5">
                                        <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center justify-center gap-1">
                                            <span>{name}</span>
                                            <UserCheck className="w-4 h-4 text-gray-900 dark:text-white inline shrink-0" />
                                        </h3>
                                        <p className="font-mono text-xs text-gray-600 dark:text-slate-400 font-medium">
                                            {role}
                                        </p>
                                    </div>

                                    {/* Subtle Specialty Info */}
                                    <div className="relative z-10 border-t border-gray-200/80 dark:border-slate-800 pt-2 flex items-center justify-between text-[10px] font-mono text-gray-500 dark:text-slate-400">
                                        <span>{t.hero.specialty}</span>
                                        <span className="font-semibold text-gray-900 dark:text-white uppercase tracking-wider">{specialtyLabel}</span>
                                    </div>

                                    {/* Interactive Tech Badges with Tooltips */}
                                    <div className="relative z-10 flex justify-center gap-1.5">
                                        {cardTechTags.map((tag) => (
                                            <span
                                                key={tag}
                                                onMouseEnter={(e) => { e.stopPropagation(); setHoveredTag(tag); }}
                                                onMouseLeave={(e) => { e.stopPropagation(); setHoveredTag(null); }}
                                                className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-white/90 dark:bg-slate-800/90 text-gray-900 dark:text-slate-100 border border-gray-300 dark:border-slate-700 shadow-2xs hover:border-gray-900 dark:hover:border-white transition"
                                            >
                                                {tag}
                                            </span>
                                        ))}

                                        {/* Hover Tooltip */}
                                        <AnimatePresence>
                                            {hoveredTag && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-xl bg-gray-900 dark:bg-slate-800 text-white text-[10px] font-mono text-center shadow-xl border border-gray-700 z-30 pointer-events-none"
                                                >
                                                    {techTagDetails[hoveredTag] || `${hoveredTag} Stack`}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Flip Hint */}
                                    <div className="relative z-10 text-center font-mono text-[9px] text-gray-500 dark:text-slate-400 pt-1 flex items-center justify-center gap-1 font-semibold">
                                        <RotateCw className="w-3 h-3 text-gray-700 dark:text-slate-300" />
                                        <span>{t.hero.clickToFlip} &rarr;</span>
                                    </div>
                                </div>

                                {/* BACK SIDE OF CARD WITH CIRCUIT / GRID PATTERN */}
                                <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-white dark:bg-slate-900 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] border border-gray-200 dark:border-slate-800 shadow-2xl space-y-3 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden">
                                    
                                    {/* Corner Metallic Accents */}
                                    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-gray-400 dark:border-slate-600" />
                                    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-gray-400 dark:border-slate-600" />
                                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-gray-400 dark:border-slate-600" />
                                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-gray-400 dark:border-slate-600" />

                                    {/* Back Header */}
                                    <div className="relative z-10 flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-2">
                                        <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                            <ShieldCheck className="w-3.5 h-3.5 text-gray-900 dark:text-white" />
                                            <span>{t.hero.verifiedPass}</span>
                                        </div>
                                        <span className="font-mono text-[9px] text-gray-500 font-semibold">ID: RP-2026</span>
                                    </div>

                                    {/* Barcode Container */}
                                    <div className="relative z-10 p-3 bg-white/90 dark:bg-slate-950/90 rounded-xl border border-gray-200 dark:border-slate-800 space-y-2 text-center shadow-2xs">
                                        <div className="h-9 bg-gray-900 dark:bg-slate-800 rounded p-1 flex items-center justify-between px-2 text-white">
                                            <div className="h-full w-1 bg-white" />
                                            <div className="h-full w-2 bg-white" />
                                            <div className="h-full w-0.5 bg-white" />
                                            <div className="h-full w-1.5 bg-white" />
                                            <div className="h-full w-1 bg-white" />
                                            <div className="h-full w-2.5 bg-white" />
                                            <div className="h-full w-1 bg-white" />
                                            <div className="h-full w-0.5 bg-white" />
                                            <div className="h-full w-2 bg-white" />
                                            <div className="h-full w-1 bg-white" />
                                        </div>
                                        <div className="font-mono text-[9px] text-gray-600 dark:text-slate-400 font-bold tracking-widest uppercase">
                                            * PASS-{name.split(' ')[0] || 'DEV'}-88942-SE *
                                        </div>
                                    </div>

                                    {/* Social Media Links Header */}
                                    <div className="relative z-10 space-y-2 pt-1">
                                        <div className="font-mono text-[10px] uppercase font-bold text-gray-500 dark:text-slate-400 text-center">
                                            {t.hero.connectSocial}
                                        </div>

                                        <div className="flex items-center justify-center gap-3">
                                            <a
                                                href={githubUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white transition shadow-xs"
                                                title="GitHub Profile"
                                            >
                                                <GithubIcon className="w-4 h-4" />
                                            </a>
                                            <a
                                                href={linkedinUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white transition shadow-xs"
                                                title="LinkedIn Profile"
                                            >
                                                <LinkedinIcon className="w-4 h-4" />
                                            </a>
                                            <a
                                                href={`mailto:${settings.contact_email || 'contact@example.com'}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900 hover:text-white transition shadow-xs"
                                                title="Email Contact"
                                            >
                                                <Mail className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Flip Back Hint */}
                                    <div className="relative z-10 text-center font-mono text-[9px] text-gray-500 dark:text-slate-400 pt-1 flex items-center justify-center gap-1 font-semibold">
                                        <RotateCw className="w-3 h-3 text-gray-700 dark:text-slate-300" />
                                        <span>{t.hero.clickToFlip} &rarr;</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
