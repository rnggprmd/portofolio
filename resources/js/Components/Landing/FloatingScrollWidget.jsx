import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../Context/LanguageContext';

export default function FloatingScrollWidget() {
    const { t } = useLanguage();
    const [isAtHero, setIsAtHero] = useState(true);
    const [isAtFooter, setIsAtFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollPosition = scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // At Hero section (top 200px)
            setIsAtHero(scrollY < 200);

            // Near bottom / Footer section (within 850px of bottom)
            setIsAtFooter(documentHeight - scrollPosition < 850);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToAbout = () => {
        const aboutEl = document.getElementById('about');
        if (aboutEl) {
            aboutEl.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <AnimatePresence mode="wait">
                {isAtFooter ? (
                    <motion.button
                        key="back-to-top"
                        initial={{ opacity: 0, scale: 0.8, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 15 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={scrollToTop}
                        className="px-4 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl border border-gray-800 dark:border-gray-200 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer backdrop-blur-md group"
                        title={t.footer.backToTop}
                    >
                        <span>{t.footer.backToTop}</span>
                        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.button>
                ) : isAtHero ? (
                    <motion.button
                        key="scroll-down"
                        initial={{ opacity: 0, scale: 0.8, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 15 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={scrollToAbout}
                        className="px-4 py-3 rounded-full bg-white/90 dark:bg-slate-900/90 text-gray-900 dark:text-white shadow-xl border border-gray-200 dark:border-slate-800 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer backdrop-blur-md group"
                        title={t.hero.scrollDown}
                    >
                        <span>{t.hero.scrollDown}</span>
                        <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </motion.button>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
