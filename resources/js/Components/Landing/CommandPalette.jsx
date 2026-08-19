import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, Wrench, FolderKanban, Briefcase, Award, Mail, Sun, Moon, Copy, Check, Command } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export default function CommandPalette({ isOpen, setIsOpen, theme, toggleTheme }) {
    const [query, setQuery] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, setIsOpen]);

    const actions = [
        { id: 'home', title: 'Go to Home', icon: Home, section: '#home' },
        { id: 'about', title: 'Go to About Me', icon: User, section: '#about' },
        { id: 'skills', title: 'Go to Skills & Tools', icon: Wrench, section: '#skills' },
        { id: 'projects', title: 'Go to Projects', icon: FolderKanban, section: '#projects' },
        { id: 'experience', title: 'Go to Experience Timeline', icon: Briefcase, section: '#experience' },
        { id: 'certificates', title: 'Go to Certifications', icon: Award, section: '#certificates' },
        { id: 'contact', title: 'Go to Contact Form', icon: Mail, section: '#contact' },
        { id: 'github', title: 'Open GitHub Profile', icon: GithubIcon, link: 'https://github.com' },
        { id: 'linkedin', title: 'Open LinkedIn Profile', icon: LinkedinIcon, link: 'https://linkedin.com' },
        { id: 'theme', title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', icon: theme === 'dark' ? Sun : Moon, handler: toggleTheme },
        { id: 'copy', title: 'Copy Email Address', icon: Copy, handler: () => {
            navigator.clipboard.writeText('rangga.pramudya@example.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }},
        { id: 'admin', title: 'Open Admin Login', icon: Command, link: '/login' },
    ];

    const filteredActions = actions.filter((action) =>
        action.title.toLowerCase().includes(query.toLowerCase())
    );

    const handleActionClick = (action) => {
        if (action.section) {
            const sectionId = action.section.replace('#', '');
            const el = document.getElementById(sectionId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                if (window.history.replaceState) {
                    window.history.replaceState(null, '', window.location.pathname);
                }
            }
            setIsOpen(false);
        } else if (action.handler) {
            action.handler();
        } else if (action.link) {
            if (action.link.startsWith('/')) {
                window.location.href = action.link;
            } else {
                window.open(action.link, '_blank');
            }
            setIsOpen(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden"
                    >
                        {/* Search Input */}
                        <div className="flex items-center px-4 border-b border-gray-200 dark:border-slate-800">
                            <Search className="w-5 h-5 text-gray-400 dark:text-slate-500 mr-3" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type a command or search section... (Press Esc to exit)"
                                className="w-full py-4 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none"
                                autoFocus
                            />
                            <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono font-semibold bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 rounded-md border border-gray-200 dark:border-slate-700">
                                ESC
                            </kbd>
                        </div>

                        {/* Command Items List */}
                        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-slate-800/50">
                            {copied && (
                                <div className="p-3 mb-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between">
                                    <span>✓ Email address copied to clipboard!</span>
                                    <Check className="w-4 h-4" />
                                </div>
                            )}

                            {filteredActions.length === 0 ? (
                                <div className="p-6 text-center text-xs text-gray-400 dark:text-slate-500">
                                    No commands matching "{query}"
                                </div>
                            ) : (
                                filteredActions.map((action) => {
                                    const Icon = action.icon;
                                    return (
                                        <button
                                            key={action.id}
                                            onClick={() => handleActionClick(action)}
                                            className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800/80 transition text-left group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-blue-600 group-hover:text-white transition">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs font-semibold text-gray-800 dark:text-slate-200 group-hover:text-gray-900 dark:group-hover:text-white">
                                                    {action.title}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-mono text-gray-400 dark:text-slate-500">
                                                Jump &rarr;
                                            </span>
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer Info */}
                        <div className="p-3 bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-gray-400 dark:text-slate-500">
                            <span>Navigation Shortcut Palette</span>
                            <div className="flex items-center gap-2">
                                <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-800 text-gray-600 dark:text-slate-300 font-bold">Ctrl + K</kbd>
                                <span>to toggle</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
