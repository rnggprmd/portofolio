import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Layout, Cloud } from 'lucide-react';
import { useLanguage } from '../../Context/LanguageContext';

function BentoCard({ item, idx }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const icons = {
        'Frontend': Code2,
        'UI/UX': Layout,
        'Backend': Server,
        'Database': Database,
        'DevOps': Cloud,
    };

    const Icon = icons[item.tag] || Code2;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`${item.tag === 'Frontend' ? 'md:col-span-8' : 'md:col-span-4'} relative p-6 sm:p-8 rounded-3xl border border-gray-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-gray-400 dark:hover:border-slate-700 hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col justify-between cursor-pointer`}
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
                            className="space-y-1 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition duration-200"
                        >
                            <div className="font-semibold text-sm text-gray-900 dark:text-slate-200 flex items-center justify-between">
                                <span>{skill.name}</span>
                                <span className="font-mono text-[11px] text-gray-700 dark:text-slate-300 font-bold">{skill.level}</span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-slate-400 font-sans leading-relaxed">
                                {skill.desc}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function SkillsSection() {
    const { t } = useLanguage();
    const [selectedFilter, setSelectedFilter] = useState('All');

    const categories = ['All', 'Frontend', 'Backend', 'UI/UX', 'Database', 'DevOps'];

    const bentoItems = t.skills.cards;

    const filteredItems = bentoItems.filter(item => {
        if (selectedFilter === 'All') return true;
        return item.tag === selectedFilter;
    });

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
                            onClick={() => setSelectedFilter(cat)}
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

                {/* Bento Grid */}
                <motion.div layout className="grid md:grid-cols-12 gap-6">
                    <AnimatePresence>
                        {filteredItems.map((item, idx) => (
                            <BentoCard key={item.category} item={item} idx={idx} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
