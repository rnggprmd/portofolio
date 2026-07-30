import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, CheckCircle2, Briefcase } from 'lucide-react';
import { useLanguage } from '../../Context/LanguageContext';

export default function ExperienceSection({ initialExperiences = [] }) {
    const { t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedId, setExpandedId] = useState(1);

    const defaultItems = t.experience.items.map(item => ({
        ...item,
        tech: ['Laravel', 'React', 'Tailwind CSS', 'MySQL', 'Redis'],
    }));

    const displayExperiences = initialExperiences.length > 0
        ? initialExperiences.map(exp => ({
            id: exp.id,
            period: exp.period,
            role: exp.role,
            company: exp.company,
            location: exp.location || 'Remote',
            description: exp.description || '',
            responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities : [exp.description],
            tech: Array.isArray(exp.tech_badges) ? exp.tech_badges : ['Laravel', 'React'],
            type: exp.type || 'Career',
        }))
        : defaultItems;

    const categories = ['All', ...new Set(displayExperiences.map(exp => exp.type || 'Career'))];

    const filteredExperiences = displayExperiences.filter(exp => {
        if (selectedCategory === 'All') return true;
        return exp.type === selectedCategory;
    });

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="experience" className="py-24 px-4 sm:px-8 bg-transparent transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                        {t.experience.tag}
                    </span>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
                        {t.experience.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-sans">
                        {t.experience.subtitle}
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                selectedCategory === cat
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                                    : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            {cat === 'All' ? t.skills.all : cat}
                        </motion.button>
                    ))}
                </div>

                {/* Timeline Accordion List */}
                <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-gray-200 dark:before:bg-slate-800">
                    {filteredExperiences.map((exp) => {
                        const isExpanded = expandedId === exp.id;
                        return (
                            <motion.div
                                key={exp.id}
                                layout
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative pl-12 sm:pl-16"
                            >
                                {/* Timeline Circle Indicator Node */}
                                <div className="absolute left-3.5 sm:left-5 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-gray-900 dark:border-white flex items-center justify-center z-10 shadow-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-white" />
                                </div>

                                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden">
                                    {/* Card Header */}
                                    <div
                                        onClick={() => toggleExpand(exp.id)}
                                        className="p-6 sm:p-7 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-mono text-xs text-gray-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {exp.period}
                                                </span>
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 border border-gray-200 dark:border-slate-700">
                                                    {exp.type}
                                                </span>
                                            </div>

                                            <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2 pt-1">
                                                <Briefcase className="w-4 h-4 text-gray-700 dark:text-slate-300 shrink-0" />
                                                <span>{exp.role}</span>
                                            </h3>

                                            <div className="text-xs font-semibold text-gray-600 dark:text-slate-400 flex items-center gap-2">
                                                <span>{exp.company}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1 font-normal text-gray-500">
                                                    <MapPin className="w-3 h-3" />
                                                    {exp.location}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 self-end sm:self-center">
                                            <span className="text-xs font-semibold font-mono text-gray-500 dark:text-slate-400">
                                                {isExpanded ? t.experience.less : t.experience.more}
                                            </span>
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="p-1.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300"
                                            >
                                                <ChevronDown className="w-4 h-4" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Expanded Body Details */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="border-t border-gray-100 dark:border-slate-800 px-6 py-6 sm:px-7 space-y-4 bg-gray-50/40 dark:bg-slate-950/40"
                                            >
                                                {exp.description && (
                                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                                                        {exp.description}
                                                    </p>
                                                )}

                                                <div className="space-y-2">
                                                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                                                        {t.experience.responsibilities}
                                                    </div>
                                                    <ul className="space-y-2">
                                                        {exp.responsibilities.map((resp, rIdx) => (
                                                            <li key={rIdx} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-slate-300">
                                                                <CheckCircle2 className="w-4 h-4 text-gray-900 dark:text-white shrink-0 mt-0.5" />
                                                                <span className="leading-relaxed">{resp}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="pt-2 flex flex-wrap gap-1.5">
                                                    {exp.tech.map((tItem, tIdx) => (
                                                        <span
                                                            key={tIdx}
                                                            className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-200 border border-gray-200 dark:border-slate-800"
                                                        >
                                                            {tItem}
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
