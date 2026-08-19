import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { LanguageProvider } from '../Context/LanguageContext';
import Navbar from '../Components/Landing/Navbar';
import HeroSection from '../Components/Landing/HeroSection';
import AboutSection from '../Components/Landing/AboutSection';
import SkillsSection from '../Components/Landing/SkillsSection';
import ProjectsSection from '../Components/Landing/ProjectsSection';
import ExperienceSection from '../Components/Landing/ExperienceSection';
import CertificatesSection from '../Components/Landing/CertificatesSection';
import GitHubSection from '../Components/Landing/GitHubSection';
import TechStackSection from '../Components/Landing/TechStackSection';
import ContactSection from '../Components/Landing/ContactSection';
import Footer from '../Components/Landing/Footer';
import CommandPalette from '../Components/Landing/CommandPalette';
import FloatingScrollWidget from '../Components/Landing/FloatingScrollWidget';

export default function Home({
    projects = [],
    skills = [],
    experiences = [],
    certificates = [],
    techStacks = [],
    settings = {},
    statsCounts = {}
}) {
    const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Automatically clean up any # hash from the browser URL on load while smoothly scrolling to target
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash) {
            const id = window.location.hash.substring(1);
            const el = document.getElementById(id);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' });
                    if (window.history.replaceState) {
                        window.history.replaceState(null, '', window.location.pathname);
                    }
                }, 150);
            }
        }
    }, []);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const sectionAnimation = {
        initial: { opacity: 0, y: 35 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <LanguageProvider>
            <Head title={`${settings.hero_name || 'Rangga Pramudya'} - Portofolio`} />

            <div className="min-h-screen bg-white dark:bg-slate-950 bg-grid-pattern text-gray-900 dark:text-slate-100 font-sans antialiased selection:bg-gray-900 selection:text-white dark:selection:bg-white dark:selection:text-gray-900 transition-colors duration-300">
                {/* Navbar with Theme, Language & Command Palette Triggers */}
                <Navbar
                    theme={theme}
                    toggleTheme={toggleTheme}
                    onOpenCommandPalette={() => setCommandPaletteOpen(true)}
                    settings={settings}
                />

                {/* Main Landing Sections with Buttery-Smooth Viewport Reveal Animations */}
                <main>
                    <HeroSection settings={settings} />

                    <motion.div {...sectionAnimation}>
                        <GitHubSection
                            settings={settings}
                            githubUrl={settings.github_url || 'https://github.com/rnggprmd'}
                            githubUsername={settings.github_username || 'rnggprmd'}
                        />
                    </motion.div>

                    <motion.div {...sectionAnimation}>
                        <AboutSection settings={settings} statsCounts={statsCounts} />
                    </motion.div>

                    <motion.div {...sectionAnimation}>
                        <SkillsSection initialSkills={skills} />
                    </motion.div>

                    <motion.div {...sectionAnimation}>
                        <ProjectsSection initialProjects={projects} />
                    </motion.div>

                    <motion.div {...sectionAnimation}>
                        <ExperienceSection initialExperiences={experiences} />
                    </motion.div>

                    <motion.div {...sectionAnimation}>
                        <CertificatesSection initialCertificates={certificates} />
                    </motion.div>

                    <motion.div {...sectionAnimation}>
                        <TechStackSection initialTechStacks={techStacks} />
                    </motion.div>

                    <motion.div {...sectionAnimation}>
                        <ContactSection settings={settings} />
                    </motion.div>
                </main>

                {/* Footer */}
                <Footer settings={settings} />

                {/* Fixed Floating Scroll Control Widget (Scroll Down <-> Back to Top) */}
                <FloatingScrollWidget />

                {/* Interactive Command Palette Modal (Ctrl + K) */}
                <CommandPalette
                    isOpen={commandPaletteOpen}
                    setIsOpen={setCommandPaletteOpen}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    settings={settings}
                />
            </div>
        </LanguageProvider>
    );
}
