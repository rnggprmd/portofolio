import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, Briefcase, Code, FolderCheck, BookOpen, Compass, HeartHandshake, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../../Context/LanguageContext';

function CounterItem({ end, label, icon: Icon }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = end / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [isInView, end]);

    return (
        <motion.div
            ref={ref}
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-gray-400 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-center space-y-1"
        >
            <div className="flex items-center gap-1.5 justify-center">
                <div className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-heading font-extrabold text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white tracking-tight">
                    {count}+
                </span>
            </div>
            <p className="text-[8px] sm:text-[9px] font-mono font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-tight leading-none text-center truncate w-full">
                {label}
            </p>
        </motion.div>
    );
}

export default function AboutSection({ settings = {}, statsCounts = {} }) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('story');
    const [activeInterest, setActiveInterest] = useState(null);

    const tag = settings.about_tag || t.about.tag;
    const title = settings.about_title || t.about.title;
    const name = settings.hero_name || 'Rangga Pramudya';
    const role = settings.hero_role || 'Information Systems & Software Engineer';
    const aboutAvatarUrl = settings.about_avatar_url || '';

    // Real-time Database Counts with fallback
    const projectsCount = statsCounts.projects ?? 15;
    const experienceCount = statsCounts.experience ?? 3;
    const certificatesCount = statsCounts.certificates ?? 10;
    const techStackCount = statsCounts.techStack ?? 12;

    // Dynamic Story Paragraphs Processing
    let paragraphs = [
        settings.about_story_1 || t.about.storyP1,
        settings.about_story_2 || t.about.storyP2,
        settings.about_story_3 || t.about.storyP3,
    ];

    if (settings.about_paragraphs) {
        try {
            const parsed = typeof settings.about_paragraphs === 'string' ? JSON.parse(settings.about_paragraphs) : settings.about_paragraphs;
            if (Array.isArray(parsed) && parsed.length > 0) {
                paragraphs = parsed;
            }
        } catch (e) {
            // Keep default paragraphs
        }
    }

    // Dynamic Philosophy Principles Processing
    const philosophyTitle = settings.about_philosophy_title || t.about.philosophyTitle;

    let principles = [
        settings.about_clean_code || t.about.cleanCode,
        settings.about_human_ui || t.about.humanUi,
        settings.about_continuous_growth || t.about.continuousGrowth,
    ];

    if (settings.about_principles) {
        try {
            const parsed = typeof settings.about_principles === 'string' ? JSON.parse(settings.about_principles) : settings.about_principles;
            if (Array.isArray(parsed) && parsed.length > 0) {
                principles = parsed;
            }
        } catch (e) {
            // Keep default principles
        }
    }

    // Dynamic Focus Skills Processing
    let focusSkills = [
        { name: settings.about_skill1_name || "Full-Stack Development (Laravel & React)", percent: settings.about_skill1_percent || "92" },
        { name: settings.about_skill2_name || "RESTful API & Database Architecture", percent: settings.about_skill2_percent || "88" },
        { name: settings.about_skill3_name || "UI/UX Precision & Responsive Design", percent: settings.about_skill3_percent || "90" },
    ];

    if (settings.about_focus_skills) {
        try {
            const parsed = typeof settings.about_focus_skills === 'string' ? JSON.parse(settings.about_focus_skills) : settings.about_focus_skills;
            if (Array.isArray(parsed) && parsed.length > 0) {
                focusSkills = parsed;
            }
        } catch (e) {
            // Keep default focusSkills
        }
    }

    const rawInterests = settings.about_interests
        ? (typeof settings.about_interests === 'string' ? settings.about_interests.split(',').map(s => s.trim()).filter(Boolean) : settings.about_interests)
        : t.about.interests.map(i => i.label);

    const tabs = [
        { id: 'story', label: t.about.myStory, icon: BookOpen },
        { id: 'philosophy', label: t.about.philosophy, icon: Compass },
        { id: 'focus', label: t.about.focus, icon: HeartHandshake },
    ];

    const tabContent = {
        story: (
            <div className="space-y-3.5 text-gray-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base text-justify">
                {paragraphs.map((para, pIdx) => (
                    <p
                        key={pIdx}
                        className={`text-justify ${
                            pIdx === 0 ? 'font-semibold text-gray-900 dark:text-white text-base sm:text-lg' : ''
                        }`}
                    >
                        {para}
                    </p>
                ))}
            </div>
        ),
        philosophy: (
            <div className="space-y-3 text-gray-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                <p className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                    {philosophyTitle}
                </p>
                <div className="space-y-2.5 pt-2">
                    {principles.map((pr, prIdx) => (
                        <motion.div key={prIdx} whileHover={{ x: 6 }} className="flex items-start gap-2.5 text-sm cursor-pointer">
                            <CheckCircle2 className="w-4 h-4 text-gray-900 dark:text-white shrink-0 mt-0.5" />
                            <span>{pr}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
        focus: (
            <div className="space-y-4 text-gray-600 dark:text-slate-300">
                <p className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                    {t.about.proficiencyTitle}
                </p>

                <div className="space-y-3">
                    {focusSkills.map((sk, skIdx) => (
                        <div key={skIdx} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-gray-900 dark:text-white">{sk.name}</span>
                                <span className="font-mono text-gray-900 dark:text-white font-bold">{sk.percent}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${sk.percent}%` }}
                                    transition={{ duration: 1, ease: 'easeOut', delay: skIdx * 0.15 }}
                                    className="h-full bg-gray-900 dark:bg-white rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    };

    return (
        <section id="about" className="py-24 px-4 sm:px-8 bg-transparent border-y border-gray-200/80 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto space-y-3"
                >
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                        {tag}
                    </span>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
                        {title}
                    </h2>
                </motion.div>

                {/* Main Content Grid (Top Aligned items-start for flush vertical alignment with photo card) */}
                <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Profile Card + 4 Statistics Cards in 1 Single Horizontal Row */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-5 space-y-4"
                    >
                        {/* Profile Photo Card */}
                        <motion.div
                            whileHover={{ rotateY: 6, rotateX: -6, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            className="relative p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-xl transition duration-300 [perspective:1000px]"
                        >
                            <div className="w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden group">
                                {aboutAvatarUrl ? (
                                    <img src={aboutAvatarUrl} alt={name} className="w-full h-full rounded-2xl object-cover" />
                                ) : (
                                    <>
                                        <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                                            <svg className="w-14 h-14 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                        <div className="text-center px-4">
                                            <h3 className="font-heading font-bold text-xl">{name}</h3>
                                            <p className="text-xs font-mono text-gray-400 mt-1">{role}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        {/* 4 Statistics Cards (Auto Dynamic Real-Time DB Counts) */}
                        <div className="grid grid-cols-4 gap-2 pt-1">
                            <CounterItem end={projectsCount} label={t.about.stats.projects} icon={FolderCheck} />
                            <CounterItem end={experienceCount} label={t.about.stats.experience} icon={Briefcase} />
                            <CounterItem end={certificatesCount} label={t.about.stats.certificates} icon={Award} />
                            <CounterItem end={techStackCount} label={t.about.stats.techStack} icon={Code} />
                        </div>
                    </motion.div>

                    {/* Right Column: Interactive Tabs & Personal Story + Personal Hobbies Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-7 space-y-6 pt-1"
                    >
                        {/* Interactive Tab Switcher */}
                        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-slate-800 pb-3">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <motion.button
                                        key={tab.id}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                                                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-200/60 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{tab.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Animated Tab Content */}
                        <div className="min-h-[190px] sm:min-h-[200px] flex flex-col justify-start">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {tabContent[activeTab]}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Personal Hobbies & Interests Card (Under Story on Right Column) */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 space-y-3 shadow-2xs border-t">
                            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5 text-gray-900 dark:text-white" />
                                <span>{t.about.hobbiesTag}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {rawInterests.map((itemLabel, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onMouseEnter={() => setActiveInterest(itemLabel)}
                                        onMouseLeave={() => setActiveInterest(null)}
                                        className="relative group cursor-pointer"
                                    >
                                        <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600 transition inline-block">
                                            {itemLabel}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
