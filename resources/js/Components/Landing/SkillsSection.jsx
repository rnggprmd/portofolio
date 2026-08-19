import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Layout, Cloud, Wrench, Network as NetworkIcon, Globe, Cpu, Terminal, ShieldCheck, Smartphone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../Context/LanguageContext';

const getCategoryIcon = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('front')) return Code2;
    if (cat.includes('back')) return Server;
    if (cat.includes('data')) return Database;
    if (cat.includes('net') || cat.includes('jaringan') || cat.includes('sysadmin')) return NetworkIcon;
    if (cat.includes('ui') || cat.includes('ux') || cat.includes('design')) return Layout;
    if (cat.includes('devops') || cat.includes('cloud')) return Cloud;
    if (cat.includes('sec') || cat.includes('cyber')) return ShieldCheck;
    if (cat.includes('mobile') || cat.includes('app')) return Smartphone;
    if (cat.includes('ai') || cat.includes('ml')) return Cpu;
    return Wrench;
};

function BentoCard({ item, idx, totalItems }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const Icon = getCategoryIcon(item.tag || item.category);

    // Intelligent Bento Column Spanning (Guarantees rows add up to 12 cols with zero empty holes)
    const getColSpan = () => {
        if (totalItems === 1) return 'md:col-span-12';
        if (totalItems === 2) return 'md:col-span-6';
        if (totalItems === 3) return 'md:col-span-4'; // 4 + 4 + 4 = 12 (1 row of 3 cards)
        if (totalItems === 4) {
            return idx === 0 || idx === 3 ? 'md:col-span-8' : 'md:col-span-4';
        }
        if (totalItems === 5) {
            if (idx === 0) return 'md:col-span-8';
            if (idx === 1) return 'md:col-span-4';
            return 'md:col-span-4'; // 4 + 4 + 4 = 12
        }
        return 'md:col-span-4';
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.35 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`${getColSpan()} relative p-6 sm:p-8 rounded-3xl border border-gray-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-gray-400 dark:hover:border-slate-700 hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col justify-between cursor-pointer`}
        >
            {/* Mouse Spotlight Track Glow */}
            {isHovered && (
                <div
                    className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
                    }}
                />
            )}

            <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-gray-900 flex items-center justify-center transition duration-300 shadow-xs"
                        >
                            <Icon className="w-5 h-5 shrink-0" />
                        </motion.div>
                        <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">{item.category}</h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 border border-gray-200/80 dark:border-slate-700">
                        {item.tag}
                    </span>
                </div>

                <div className="space-y-4">
                    {item.skills.map((skill, sIdx) => (
                        <motion.div
                            key={sIdx}
                            whileHover={{ x: 4 }}
                            className="space-y-1.5 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition duration-200"
                        >
                            <div className="font-semibold text-sm text-gray-900 dark:text-slate-200 flex items-center justify-between">
                                <span>{skill.name}</span>
                                <span className="font-mono text-[11px] text-gray-700 dark:text-slate-300 font-bold">{skill.level}</span>
                            </div>
                            
                            {/* Animated Level Bar */}
                            {skill.percentage !== undefined && (
                                <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.percentage}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut', delay: sIdx * 0.1 }}
                                        className="h-full bg-gray-900 dark:bg-white rounded-full"
                                    />
                                </div>
                            )}

                            {skill.desc && (
                                <div className="text-xs text-gray-500 dark:text-slate-400 font-sans leading-relaxed pt-0.5">
                                    {skill.desc}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function SkillsSection({ initialSkills = [] }) {
    const { t } = useLanguage();
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Build Bento items dynamically from Database Skills if available
    const bentoItems = initialSkills.length > 0 ? Object.values(
        initialSkills.reduce((acc, skill) => {
            const cat = skill.category || 'General';
            if (!acc[cat]) {
                acc[cat] = {
                    category: cat,
                    tag: cat,
                    skills: []
                };
            }
            acc[cat].skills.push({
                name: skill.name,
                level: `${skill.percentage}%`,
                percentage: skill.percentage,
                desc: skill.icon || `Kemahiran ${skill.percentage}% dalam ${skill.name}`
            });
            return acc;
        }, {})
    ) : t.skills.cards;

    // Filter categories dynamically
    const categories = ['All', ...new Set(
        bentoItems.map(item => item.tag)
    )];

    const filteredItems = bentoItems.filter(item => {
        if (selectedFilter === 'All') return true;
        return item.tag === selectedFilter;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const handleFilterChange = (cat) => {
        setSelectedFilter(cat);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        const section = document.getElementById('skills');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    };

    return (
        <section id="skills" className="py-24 px-4 sm:px-8 bg-transparent transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto space-y-3"
                >
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                        {t.skills.tag}
                    </span>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
                        {t.skills.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-sans">
                        {t.skills.subtitle}
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => handleFilterChange(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                selectedFilter === cat
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md'
                                    : 'bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-800'
                                }`}
                        >
                            {cat === 'All' ? t.skills.all : cat}
                        </motion.button>
                    ))}
                </div>

                {/* Intelligent Bento Grid with Smooth Page Transitions */}
                <motion.div layout className="grid md:grid-cols-12 gap-6">
                    <AnimatePresence mode="popLayout">
                        {paginatedItems.map((item, idx) => (
                            <BentoCard key={item.category} item={item} idx={idx} totalItems={paginatedItems.length} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Aesthetic Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200/80 dark:border-slate-800">
                        <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">
                            {t.skills.showing}{' '}
                            <span className="font-bold text-gray-900 dark:text-white">
                                {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredItems.length)}
                            </span>{' '}
                            {t.skills.of}{' '}
                            <span className="font-bold text-gray-900 dark:text-white">
                                {filteredItems.length}
                            </span>{' '}
                            {t.skills.skillsCount}
                        </p>

                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: currentPage > 1 ? 1.08 : 1 }}
                                whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                aria-label={t.skills.prevPage}
                                className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-800 transition shadow-2xs cursor-pointer flex items-center justify-center"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </motion.button>

                            <div className="flex items-center gap-1.5">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <motion.button
                                        key={page}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-9 h-9 rounded-2xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer flex items-center justify-center ${
                                            currentPage === page
                                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md scale-105'
                                                : 'bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-400 border border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                    >
                                        {page}
                                    </motion.button>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: currentPage < totalPages ? 1.08 : 1 }}
                                whileTap={{ scale: currentPage < totalPages ? 0.95 : 1 }}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                aria-label={t.skills.nextPage}
                                className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-slate-800 transition shadow-2xs cursor-pointer flex items-center justify-center"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
