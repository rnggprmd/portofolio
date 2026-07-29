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
            whileHover={{ scale: 1.06, y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-gray-400 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                </div>
                <span className="font-heading font-extrabold text-3xl text-gray-900 dark:text-white tracking-tight">
                    {count}+
                </span>
            </div>
            <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
        </motion.div>
    );
}

export default function AboutSection() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('story');
    const [activeInterest, setActiveInterest] = useState(null);

    const tabs = [
        { id: 'story', label: t.about.myStory, icon: BookOpen },
        { id: 'philosophy', label: t.about.philosophy, icon: Compass },
        { id: 'focus', label: t.about.focus, icon: HeartHandshake },
    ];

    const personalInterests = t.about.interests;

    const tabContent = {
        story: (
            <div className="space-y-3 text-gray-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                <p className="font-medium text-gray-900 dark:text-white text-lg">
                    {t.about.storyP1}
                </p>
                <p>
                    {t.about.storyP2}
                </p>
                <p>
                    {t.about.storyP3}
                </p>
            </div>
        ),
        philosophy: (
            <div className="space-y-3 text-gray-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                <p className="font-medium text-gray-900 dark:text-white text-lg">
                    {t.about.philosophyTitle}
                </p>
                <div className="space-y-2.5 pt-2">
                    <motion.div whileHover={{ x: 6 }} className="flex items-start gap-2.5 text-sm cursor-pointer">
                        <CheckCircle2 className="w-4 h-4 text-gray-900 dark:text-white shrink-0 mt-0.5" />
                        <span>{t.about.cleanCode}</span>
                    </motion.div>
                    <motion.div whileHover={{ x: 6 }} className="flex items-start gap-2.5 text-sm cursor-pointer">
                        <CheckCircle2 className="w-4 h-4 text-gray-900 dark:text-white shrink-0 mt-0.5" />
                        <span>{t.about.humanUi}</span>
                    </motion.div>
                    <motion.div whileHover={{ x: 6 }} className="flex items-start gap-2.5 text-sm cursor-pointer">
                        <CheckCircle2 className="w-4 h-4 text-gray-900 dark:text-white shrink-0 mt-0.5" />
                        <span>{t.about.continuousGrowth}</span>
                    </motion.div>
                </div>
            </div>
        ),
        focus: (
            <div className="space-y-4 text-gray-600 dark:text-slate-300">
                <p className="font-medium text-gray-900 dark:text-white text-base">
                    {t.about.proficiencyTitle}
                </p>

                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                            <span className="text-gray-900 dark:text-white">Full-Stack Development (Laravel & React)</span>
                            <span className="font-mono text-gray-900 dark:text-white font-bold">92%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '92%' }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-gray-900 dark:bg-white rounded-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                            <span className="text-gray-900 dark:text-white">RESTful API & Database Architecture</span>
                            <span className="font-mono text-gray-900 dark:text-white font-bold">88%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '88%' }}
                                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                                className="h-full bg-gray-900 dark:bg-white rounded-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                            <span className="text-gray-900 dark:text-white">UI/UX Precision & Responsive Design</span>
                            <span className="font-mono text-gray-900 dark:text-white font-bold">90%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '90%' }}
                                transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                                className="h-full bg-gray-900 dark:bg-white rounded-full"
                            />
                        </div>
                    </div>
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
                        {t.about.tag}
                    </span>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
                        {t.about.title}
                    </h2>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-12 gap-12 items-center">
                    {/* Left: Profile Card with Interactive 3D Parallax Tilt */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-5 space-y-4"
                    >
                        <motion.div
                            whileHover={{ rotateY: 6, rotateX: -6, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            className="relative p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-xl transition duration-300 [perspective:1000px]"
                        >
                            <div className="w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden group">
                                <div className="w-24 h-24 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
                                    <svg className="w-14 h-14 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                                <div className="text-center px-4">
                                    <h3 className="font-heading font-bold text-xl">Rangga Pramudya</h3>
                                    <p className="text-xs font-mono text-gray-400 mt-1">Information Systems & Software Engineer</p>
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-mono text-white">
                                    {t.about.availableForHire}
                                </div>
                            </div>
                        </motion.div>

                        {/* Interactive Personal Interests */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 space-y-2 shadow-2xs">
                            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5 text-gray-900 dark:text-white" />
                                <span>{t.about.hobbiesTag}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {personalInterests.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.06, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onMouseEnter={() => setActiveInterest(item.label)}
                                        onMouseLeave={() => setActiveInterest(null)}
                                        className="relative group cursor-pointer"
                                    >
                                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600 transition inline-block">
                                            {item.label}
                                        </span>

                                        <AnimatePresence>
                                            {activeInterest === item.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute bottom-full left-0 mb-2 w-52 p-2.5 rounded-xl bg-gray-900 dark:bg-slate-800 text-white text-left shadow-xl border border-gray-700 z-30 pointer-events-none"
                                                >
                                                    <p className="text-[10px] font-sans leading-relaxed text-gray-200">
                                                        {item.desc}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Interactive Tabs & Personal Story */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-7 space-y-6"
                    >
                        {/* Interactive Tab Switcher */}
                        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-slate-800 pb-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <motion.button
                                        key={tab.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                                                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-200/60 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        <span>{tab.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Animated Tab Content */}
                        <div className="min-h-[170px]">
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

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-slate-800">
                            <CounterItem end={15} label={t.about.stats.projects} icon={FolderCheck} />
                            <CounterItem end={3} label={t.about.stats.experience} icon={Briefcase} />
                            <CounterItem end={10} label={t.about.stats.certificates} icon={Award} />
                            <CounterItem end={12} label={t.about.stats.techStack} icon={Code} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
