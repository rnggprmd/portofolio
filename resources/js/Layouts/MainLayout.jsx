import { Head } from '@inertiajs/react';

export default function MainLayout({ children, title = 'Portfolio' }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                {children}
            </div>
        </>
    );
}
