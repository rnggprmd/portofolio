import React, { useState } from 'react';
import AdminSidebar from '../Components/Admin/AdminSidebar';
import AdminHeader from '../Components/Admin/AdminHeader';

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 font-sans antialiased bg-grid-pattern transition-colors duration-300">
            {/* Sidebar Component */}
            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content Wrapper */}
            <div className="md:pl-64 flex flex-col min-h-screen">
                {/* Top Header */}
                <AdminHeader setIsOpen={setSidebarOpen} />

                {/* Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    {children}
                </main>

                {/* Footer */}
                <footer className="py-4 px-6 text-center text-xs text-gray-500 dark:text-slate-500 border-t border-gray-200 dark:border-slate-800 font-mono">
                    &copy; {new Date().getFullYear()} Rangga Pramudya — Admin Control Center
                </footer>
            </div>
        </div>
    );
}
