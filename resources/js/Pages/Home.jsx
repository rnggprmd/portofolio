import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
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
    settings = {}
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

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <LanguageProvider>
            <Head title={`${settings.hero_name || 'Rangga Pramudya'} - Software Engineer Portfolio`} />

            <div className="min-h-screen bg-white dark:bg-slate-950 bg-grid-pattern text-gray-900 dark:text-slate-100 font-sans antialiased selection:bg-gray-900 selection:text-white dark:selection:bg-white dark:selection:text-gray-900 transition-colors duration-300">
                {/* Navbar with Theme, Language & Command Palette Triggers */}
                <Navbar
                    theme={theme}
                    toggleTheme={toggleTheme}
                    onOpenCommandPalette={() => setCommandPaletteOpen(true)}
                />

                {/* Main Landing Sections */}
                <main>
                    <HeroSection settings={settings} />
                    <GitHubSection
                        settings={settings}
                        githubUrl={settings.github_url || 'https://github.com/rnggprmd'}
                        githubUsername={settings.github_username || 'rnggprmd'}
                    />
                    <AboutSection settings={settings} />
                    <SkillsSection initialSkills={skills} />
                    <ProjectsSection initialProjects={projects} />
                    <ExperienceSection initialExperiences={experiences} />
                    <CertificatesSection initialCertificates={certificates} />
                    <TechStackSection initialTechStacks={techStacks} />
                    <ContactSection settings={settings} />
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
                />
            </div>
        </LanguageProvider>
    );
}
