import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Portfolio" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                {/* Navigation */}
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
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section id="home" className="pt-32 pb-20 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                            Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Your Name</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8">
                            Full Stack Developer | React Enthusiast | Laravel Expert
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="#contact" className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition transform hover:scale-105">
                                Get In Touch
                            </a>
                            <a href="#projects" className="px-8 py-3 border border-gray-600 hover:border-blue-400 rounded-lg font-semibold transition">
                                View Projects
                            </a>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 px-4 bg-gray-800/50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-6xl">👨‍💻</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-lg text-gray-300">
                                    I'm a passionate full-stack developer with expertise in building modern web applications. 
                                    I love creating elegant solutions to complex problems.
                                </p>
                                <p className="text-lg text-gray-300">
                                    With experience in React, Laravel, and modern web technologies, I bring ideas to life 
                                    through clean code and intuitive user interfaces.
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </a>
                                    <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                    </a>
                                    <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {['React', 'Laravel', 'JavaScript', 'PHP', 'Tailwind CSS', 'MySQL', 'Git', 'Node.js'].map((skill) => (
                                <div key={skill} className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition transform hover:scale-105">
                                    <div className="text-4xl mb-2">⚡</div>
                                    <h3 className="font-semibold">{skill}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-20 px-4 bg-gray-800/50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((project) => (
                                <div key={project} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition">
                                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-6xl">🚀</span>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">Project {project}</h3>
                                        <p className="text-gray-400 mb-4">
                                            A brief description of this amazing project and the technologies used to build it.
                                        </p>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">React</span>
                                            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Laravel</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Have a project in mind? Let's work together to create something amazing!
                        </p>
                        <form className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
                            />
                            <input 
                                type="email" 
                                placeholder="Your Email" 
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
                            />
                            <textarea 
                                placeholder="Your Message" 
                                rows="5"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
                            ></textarea>
                            <button 
                                type="submit"
                                className="w-full px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition transform hover:scale-105"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 px-4 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto text-center text-gray-400">
                        <p>&copy; 2024 Your Name. Built with Laravel + Inertia.js + React</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
