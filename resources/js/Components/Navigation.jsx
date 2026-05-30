export default function Navigation() {
    return (
        <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Portfolio
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a href="#home" className="hover:text-blue-400 transition">Home</a>
                        <a href="#about" className="hover:text-blue-400 transition">About</a>
                        <a href="#skills" className="hover:text-blue-400 transition">Skills</a>
                        <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
                        <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
                    </div>
                    {/* Mobile menu button */}
                    <button className="md:hidden text-gray-300 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
