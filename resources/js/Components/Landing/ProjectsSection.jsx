import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Eye, X, CheckCircle2, Search, Image as ImageIcon } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { useLanguage } from '../../Context/LanguageContext';

export default function ProjectsSection({ initialProjects = [] }) {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    const techStacks = {
        1: ['Laravel 13', 'React 19', 'Inertia.js', 'Tailwind CSS', 'MySQL'],
        2: ['Laravel', 'React', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
        3: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
        4: ['Node.js', 'Express', 'MySQL', 'Docker', 'JWT'],
    };

    const projectItems = initialProjects.length > 0
        ? initialProjects.map(p => ({
            ...p,
            tech_stack: Array.isArray(p.tech_stack)
                ? p.tech_stack
                : (typeof p.tech_stack === 'string'
                    ? (p.tech_stack.trim().startsWith('[')
                        ? JSON.parse(p.tech_stack)
                        : p.tech_stack.split(',').map(s => s.trim()).filter(Boolean))
                    : ['Laravel', 'React']),
            category: p.category || 'Full Stack',
            demo_url: p.demo_url || 'https://example.com',
            github_url: p.github_url || 'https://github.com',
            is_featured: Boolean(p.is_featured),
        }))
        : t.projects.items.map(item => ({
            ...item,
            tech_stack: techStacks[item.id] || ['React', 'Laravel', 'Tailwind CSS'],
            demo_url: 'https://example.com',
            github_url: 'https://github.com',
            is_featured: item.id <= 2,
        }));

    const categories = ['All', ...new Set(projectItems.map(p => p.category || 'Full Stack'))];

    const filteredProjects = projectItems.filter(p => {
        const matchesCategory = activeFilter === 'All'
            ? true
            : p.category === activeFilter || (Array.isArray(p.tech_stack) && p.tech_stack.some(tItem => tItem.toLowerCase().includes(activeFilter.toLowerCase())));
        const matchesSearch = searchQuery === ''
            ? true
            : p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section id="projects" className="relative py-24 px-4 sm:px-8 bg-transparent border-y border-gray-200/80 dark:border-slate-800 transition-colors duration-300 overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-12 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                        {t.projects.tag}
                    </span>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
                        {t.projects.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-sans">
                        {t.projects.subtitle}
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                    activeFilter === cat
                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                                        : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                {cat === 'All' ? t.skills.all : cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-gray-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.projects.searchPlaceholder}
                            className="w-full pl-9 pr-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-900 dark:focus:border-white transition shadow-xs"
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div layout className="grid md:grid-cols-2 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl hover:border-gray-300 dark:hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                            >
                                {/* Thumbnail Container */}
                                <div
                                    onClick={() => setSelectedProject(project)}
                                    className="relative w-full h-56 sm:h-64 bg-gray-100 dark:bg-slate-950 overflow-hidden flex items-center justify-center border-b border-gray-100 dark:border-slate-800 cursor-pointer"
                                >
                                    {project.image_url ? (
                                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center text-white p-6 text-center">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-white/20 transition duration-300 shadow-inner">
                                                <ImageIcon className="w-6 h-6 text-white/80 group-hover:text-white transition" />
                                            </div>
                                            <span className="font-heading font-bold text-base sm:text-lg text-white/90 group-hover:text-white transition">{project.title}</span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gray-900/40 dark:bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition">
                                            <Eye className="w-4 h-4" /> {t.projects.quickInspect}
                                        </span>
                                    </div>

                                    {project.is_featured && (
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-mono font-bold text-gray-900 dark:text-slate-200 border border-gray-200 dark:border-slate-800 shadow-xs">
                                            {t.projects.featured}
                                        </div>
                                    )}
                                </div>

                                {/* Content Details */}
                                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <h3
                                            onClick={() => setSelectedProject(project)}
                                            className="font-heading font-bold text-xl text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white flex items-center justify-between cursor-pointer"
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 leading-relaxed font-sans line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        {/* Tech Badges */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {(Array.isArray(project.tech_stack) ? project.tech_stack : []).map((tItem, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700"
                                                >
                                                    {tItem}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800 text-xs font-semibold">
                                            <button
                                                onClick={() => setSelectedProject(project)}
                                                className="text-gray-900 dark:text-white hover:underline flex items-center gap-1 font-bold cursor-pointer"
                                            >
                                                {t.projects.details}
                                            </button>

                                            <div className="flex items-center gap-3">
                                                {project.demo_url && (
                                                    <a
                                                        href={project.demo_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 text-gray-900 dark:text-white hover:underline"
                                                    >
                                                        <span>{t.projects.demo}</span>
                                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                                {project.github_url && (
                                                    <a
                                                        href={project.github_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                                                    >
                                                        <GithubIcon className="w-3.5 h-3.5" />
                                                        <span>{t.projects.code}</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Interactive Detail Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative"
                    >
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div>
                            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-300">
                                {selectedProject.category || 'Full Stack'}
                            </span>
                            <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mt-2">
                                {selectedProject.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed">
                                {selectedProject.description}
                            </p>
                        </div>

                        {selectedProject.features && (
                            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-slate-800">
                                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-slate-500">
                                    {t.projects.keyFeatures}
                                </h4>
                                <ul className="space-y-2">
                                    {selectedProject.features.map((feat, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-slate-300">
                                            <CheckCircle2 className="w-4 h-4 text-gray-900 dark:text-white shrink-0 mt-0.5" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-slate-800">
                            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 dark:text-slate-500">
                                {t.projects.techUsed}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(selectedProject.tech_stack) ? selectedProject.tech_stack : []).map((tItem, idx) => (
                                    <span key={idx} className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 border border-gray-200 dark:border-slate-700">
                                        {tItem}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                            {selectedProject.github_url && (
                                <a
                                    href={selectedProject.github_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
                                >
                                    <GithubIcon className="w-4 h-4" /> {t.projects.sourceCode}
                                </a>
                            )}
                            {selectedProject.demo_url && (
                                <a
                                    href={selectedProject.demo_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold hover:bg-black dark:hover:bg-gray-100 shadow-md transition flex items-center gap-1.5"
                                >
                                    <span>{t.projects.livePreview}</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
