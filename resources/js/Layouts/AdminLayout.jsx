import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminSidebar from '../Components/Admin/AdminSidebar';
import AdminHeader from '../Components/Admin/AdminHeader';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }) {
    const { props } = usePage();
    const heroName = props?.site_settings?.hero_name || 'Rangga Pramudya';

    const [sidebarOpen, setSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 1024;
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 font-sans antialiased bg-grid-pattern transition-colors duration-300">
            {/* Sidebar Component */}
            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content Wrapper */}
            <div className={cn(
                "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
                sidebarOpen ? "lg:pl-64" : "lg:pl-0"
            )}>
                {/* Top Header */}
                <AdminHeader setIsOpen={setSidebarOpen} />

                {/* Content Area with Buttery-Smooth Page Transition */}
                <motion.main
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto"
                >
                    {children}
                </motion.main>

                {/* Footer */}
                <footer className="py-4 px-6 text-center text-xs text-gray-500 dark:text-slate-500 border-t border-gray-200 dark:border-slate-800 font-mono">
                    &copy; {new Date().getFullYear()} {heroName} — Admin Control Center
                </footer>
            </div>
        </div>
    );
}
