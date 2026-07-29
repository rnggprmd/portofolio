import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ReactIcon,
    LaravelIcon,
    TailwindIcon,
    InertiaIcon,
    NodeIcon,
    ExpressIcon,
    MysqlIcon,
    PostgresqlIcon,
    DockerIcon,
    GitIcon,
    FigmaIcon
} from './BrandIcons';
import { useLanguage } from '../../Context/LanguageContext';

export default function TechStackSection({ initialTechStacks = [] }) {
    const { t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeTooltip, setActiveTooltip] = useState(null);

    const iconMap = {
        React: ReactIcon,
        Laravel: LaravelIcon,
        Tailwind: TailwindIcon,
        Inertia: InertiaIcon,
        Node: NodeIcon,
        Express: ExpressIcon,
        Mysql: MysqlIcon,
        Postgresql: PostgresqlIcon,
        Docker: DockerIcon,
        Git: GitIcon,
        Figma: FigmaIcon,
    };

    const categories = ['All', 'Frontend', 'Backend', 'Database & Tools'];

    const defaultTechs = [
        { name: 'React 19', category: 'Frontend', Icon: ReactIcon, desc: 'Modern SPA development, Hooks & State' },
        { name: 'Laravel 13', category: 'Backend', Icon: LaravelIcon, desc: 'Robust MVC framework, REST APIs & Eloquent' },
        { name: 'Tailwind CSS v4', category: 'Frontend', Icon: TailwindIcon, desc: 'Utility-first CSS styling & responsive UI' },
        { name: 'Inertia.js', category: 'Frontend', Icon: InertiaIcon, desc: 'Monolithic SPA connector without API complexity' },
        { name: 'Node.js', category: 'Backend', Icon: NodeIcon, desc: 'Asynchronous event-driven JavaScript runtime' },
        { name: 'Express.js', category: 'Backend', Icon: ExpressIcon, desc: 'Fast, unopinionated minimalist web framework' },
        { name: 'MySQL', category: 'Database & Tools', Icon: MysqlIcon, desc: 'Relational database management & query optimization' },
        { name: 'PostgreSQL', category: 'Database & Tools', Icon: PostgresqlIcon, desc: 'Advanced open-source relational database' },
        { name: 'Docker', category: 'Database & Tools', Icon: DockerIcon, desc: 'App containerization & deployment environments' },
        { name: 'Git & GitHub', category: 'Database & Tools', Icon: GitIcon, desc: 'Version control & collaborative code workflows' },
        { name: 'Figma', category: 'Frontend', Icon: FigmaIcon, desc: 'UI/UX design prototyping & design systems' },
    ];

    const displayTechs = initialTechStacks.length > 0
        ? initialTechStacks.map(tItem => ({
            name: tItem.name,
            category: tItem.category || 'Backend',
            Icon: iconMap[tItem.icon_name] || LaravelIcon,
            desc: `${tItem.name} • ${tItem.proficiency || 'Advanced'}`,
        }))
        : defaultTechs;

    const filteredTechs = selectedCategory === 'All'
        ? displayTechs
        : displayTechs.filter(tItem => tItem.category === selectedCategory);

    return (
        <section className="py-20 bg-transparent border-b border-gray-200/80 dark:border-slate-800 transition-colors duration-300 relative overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-10 text-center relative z-10 px-4">
                <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                        {t.techStack.tag}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white">
                        {t.techStack.title}
                    </h3>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                selectedCategory === cat
                                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                                    : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            {cat === 'All' ? t.skills.all : cat}
                        </button>
                    ))}
                </div>

                {/* Tech Logos Grid */}
                <motion.div layout className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto pt-2">
                    <AnimatePresence>
                        {filteredTechs.map((tech) => {
                            const IconComponent = tech.Icon;
                            return (
                                <motion.div
                                    key={tech.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ scale: 1.1, y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    onMouseEnter={() => setActiveTooltip(tech.name)}
                                    onMouseLeave={() => setActiveTooltip(null)}
                                    className="relative flex items-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-gray-400 dark:hover:border-slate-700 transition duration-300 cursor-pointer group"
                                >
                                    <IconComponent className="w-5 h-5 shrink-0" />
                                    <span className="text-xs font-mono font-bold text-gray-800 dark:text-slate-200">
                                        {tech.name}
                                    </span>

                                    {/* Tooltip Popover */}
                                    <AnimatePresence>
                                        {activeTooltip === tech.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 5, scale: 0.9 }}
                                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-48 p-2.5 rounded-xl bg-gray-900 dark:bg-slate-800 text-white text-[11px] font-mono text-center shadow-xl border border-gray-700 z-30 pointer-events-none"
                                            >
                                                <div className="font-bold text-xs">{tech.name}</div>
                                                <div className="text-[10px] text-gray-300 mt-0.5">{tech.desc}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
