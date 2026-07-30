import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, LogOut, User, ChevronDown, Settings, ExternalLink, ShieldCheck, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminHeader({ setIsOpen }) {
    const { auth } = usePage().props;
    const userName = auth?.user?.name || 'Rangga Pramudya';
    const userEmail = auth?.user?.email || 'admin@example.com';
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-100 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 shadow-2xs transition-colors cursor-pointer flex items-center justify-center"
                    title="Toggle Sidebar Menu"
                >
                    <Menu className="w-5 h-5 text-gray-800 dark:text-slate-100" />
                </motion.button>
                <h1 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-slate-400">
                    Selamat datang kembali, <span className="text-gray-900 dark:text-white font-bold">{userName}</span>
                </h1>
            </div>

            {/* Profile Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200/80 dark:bg-slate-900 dark:hover:bg-slate-800/80 border border-gray-200 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer text-left"
                >
                    <div className="w-7 h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold text-xs shrink-0">
                        <User className="w-3.5 h-3.5" />
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{userName}</div>
                        <div className="text-[10px] text-gray-500 dark:text-slate-400 font-mono leading-tight">{userEmail}</div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                    {dropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden py-1.5"
                        >
                            {/* Profile Info Header in Dropdown */}
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/40">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-extrabold text-gray-900 dark:text-white truncate">{userName}</p>
                                        <p className="text-[10px] text-gray-500 dark:text-slate-400 font-mono truncate">{userEmail}</p>
                                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[9px] font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                                            <ShieldCheck className="w-3 h-3" />
                                            <span>Administrator</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Navigation Links */}
                            <div className="py-1">
                                <Link
                                    href="/admin/profile"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <KeyRound className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                                    <span>Pengaturan Profil & Password</span>
                                </Link>
                            </div>

                            <div className="border-t border-gray-100 dark:border-slate-800 my-1" />

                            {/* Logout Action */}
                            <div className="px-1 py-0.5">
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    onClick={() => setDropdownOpen(false)}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer text-left"
                                >
                                    <LogOut className="w-4 h-4 shrink-0" />
                                    <span>Logout Account</span>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
