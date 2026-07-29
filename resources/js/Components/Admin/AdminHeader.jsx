import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, LogOut, User } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { motion } from 'framer-motion';

export default function AdminHeader({ setIsOpen }) {
    const { auth } = usePage().props;
    const userName = auth?.user?.name || 'Rangga Pramudya';
    const userEmail = auth?.user?.email || 'admin@example.com';

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(true)}
                    className="md:hidden text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                >
                    <Menu className="w-5 h-5" />
                </Button>
                <h1 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-slate-400">
                    Selamat datang kembali, <span className="text-gray-900 dark:text-white font-bold">{userName}</span>
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
                    <div className="w-7 h-7 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center font-bold text-xs">
                        <User className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                        <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{userName}</div>
                        <div className="text-[10px] text-gray-500 dark:text-slate-400 font-mono leading-tight">{userEmail}</div>
                    </div>
                </div>

                {/* Red Borderless Logout Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                    >
                        <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                        <span>Logout</span>
                    </Link>
                </motion.div>
            </div>
        </header>
    );
}
