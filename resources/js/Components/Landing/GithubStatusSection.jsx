import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GitFork,
    Star,
    Users,
    UserCheck,
    BookOpen,
    ExternalLink,
    RotateCw,
    Code,
    Sparkles,
    CheckCircle2,
    Activity,
    Layers,
    MapPin,
    Building2,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { useLanguage } from '../../Context/LanguageContext';

export default function GithubStatusSection({ settings = {}, theme = 'dark' }) {
    const { t } = useLanguage();
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Extract github username from settings or fallback
    const rawGithubUrl = settings.github_url || 'https://github.com/rnggprmd';
    const username = (() => {
        try {
            const pathSegments = new URL(rawGithubUrl).pathname.split('/').filter(Boolean);
            return pathSegments[0] || 'rnggprmd';
        } catch (e) {
            return 'rnggprmd';
        }
    })();

    // Fallback profile data in case API rate limit is exceeded or offline
    const fallbackProfile = {
        login: username,
        name: settings.hero_name || 'Rangga Pramudya',
        avatar_url: `https://github.com/${username}.png`,
        html_url: rawGithubUrl,
        bio: settings.hero_description || 'Software Engineer & Full-Stack Architect',
        location: 'Indonesia',
        company: 'Available for Hire / Open Source',
        public_repos: 18,
        followers: 42,
        following: 28,
        created_at: '2022-01-15T00:00:00Z',
    };

    // Fallback repos data
    const fallbackRepos = [
        {
            id: 1,
            name: 'laravel-inertia-portfolio',
            description: 'Modern developer portfolio & full admin panel built with Laravel 13, Inertia.js, React 19, and Tailwind CSS v4.',
            html_url: `${rawGithubUrl}/laravel-inertia-portfolio`,
            stargazers_count: 14,
            forks_count: 5,
            language: 'PHP',
            updated_at: new Date().toISOString(),
        },
        {
            id: 2,
            name: 'react-ui-design-system',
            description: 'A modular, high-performance UI component library with dark mode, framer-motion animations, and glassmorphic aesthetic.',
            html_url: `${rawGithubUrl}/react-ui-design-system`,
            stargazers_count: 9,
            forks_count: 3,
            language: 'JavaScript',
            updated_at: new Date().toISOString(),
        },
        {
            id: 3,
            name: 'ecommerce-checkout-api',
            description: 'Scalable RESTful e-commerce API gateway with Midtrans Payment Webhooks, Redis caching, and JWT auth.',
            html_url: `${rawGithubUrl}/ecommerce-checkout-api`,
            stargazers_count: 12,
            forks_count: 4,
            language: 'PHP',
            updated_at: new Date().toISOString(),
        },
        {
            id: 4,
            name: 'smart-kanban-dashboard',
            description: 'Interactive real-time Kanban task management board with drag-and-drop workflow and persistent state.',
            html_url: `${rawGithubUrl}/smart-kanban-dashboard`,
            stargazers_count: 8,
            forks_count: 2,
            language: 'TypeScript',
            updated_at: new Date().toISOString(),
        }
    ];

    const fetchGithubData = async (manualRefresh = false) => {
        if (manualRefresh) setIsRefreshing(true);
        try {
            const [profileRes, reposRes] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
            ]);

            if (profileRes.ok) {
                const profileData = await profileRes.json();
                setProfile(profileData);
            } else {
                setProfile(fallbackProfile);
            }

            if (reposRes.ok) {
                const reposData = await reposRes.json();
                if (Array.isArray(reposData) && reposData.length > 0) {
                    setRepos(reposData);
                } else {
                    setRepos(fallbackRepos);
                }
            } else {
                setRepos(fallbackRepos);
            }
        } catch (err) {
            console.warn('GitHub API fetch failed, using snapshot fallback:', err);
            setProfile(fallbackProfile);
            setRepos(fallbackRepos);
        } finally {
            setLoading(false);
            if (manualRefresh) {
                setTimeout(() => setIsRefreshing(false), 500);
            }
        }
    };

    useEffect(() => {
        fetchGithubData();
    }, [username]);

    const activeProfile = profile || fallbackProfile;
    const activeRepos = repos.length > 0 ? repos : fallbackRepos;

    // Language color mapping
    const languageColors = {
        PHP: 'bg-indigo-500',
        JavaScript: 'bg-amber-400',
        TypeScript: 'bg-blue-500',
        HTML: 'bg-orange-500',
        CSS: 'bg-purple-500',
        Vue: 'bg-emerald-500',
        Python: 'bg-yellow-500',
        Blade: 'bg-rose-500'
    };

    // Calculate aggregated metrics
    const totalStars = activeRepos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
    const totalForks = activeRepos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);

    // Language breakdown calculation
    const languageCounts = activeRepos.reduce((acc, repo) => {
        if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
    }, {});
    const totalLangRepos = Object.values(languageCounts).reduce((a, b) => a + b, 0) || 1;

    return (
        <section id="github" className="relative py-20 px-4 sm:px-8 bg-gray-50/60 dark:bg-slate-900/40 border-y border-gray-200/60 dark:border-slate-800/60 transition-colors duration-300 overflow-hidden">
            {/* Background Ambient Lights */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gray-200/40 dark:bg-slate-800/20 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gray-300/30 dark:bg-slate-700/10 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto space-y-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/80 dark:border-slate-800/80 pb-8">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-200/70 dark:bg-slate-800/80 border border-gray-300/50 dark:border-slate-700/50 font-mono text-xs font-semibold text-gray-800 dark:text-slate-300">
                            <GithubIcon className="w-4 h-4 text-gray-900 dark:text-white" />
                            <span>{t.githubStatus.tag}</span>
                        </div>
                        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
                            {t.githubStatus.title}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400 max-w-2xl">
                            {t.githubStatus.subtitle}
                        </p>
                    </div>

                    {/* Refresh & Profile CTA Actions */}
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => fetchGithubData(true)}
                            disabled={isRefreshing}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700/80 text-xs font-mono font-medium transition cursor-pointer shadow-2xs"
                        >
                            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-gray-900 dark:text-white' : ''}`} />
                            <span>{t.githubStatus.refreshData}</span>
                        </motion.button>

                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={activeProfile.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 font-semibold text-xs transition shadow-sm"
                        >
                            <GithubIcon className="w-4 h-4" />
                            <span>{t.githubStatus.visitProfile}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                        </motion.a>
                    </div>
                </div>

                {/* Key Metrics Quick Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white flex items-center justify-center shrink-0">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="block font-mono text-2xl font-bold text-gray-900 dark:text-white">
                                {loading ? '...' : activeProfile.public_repos}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                                {t.githubStatus.publicRepos}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -4 }}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4"
                    >
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                            <Star className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="block font-mono text-2xl font-bold text-gray-900 dark:text-white">
                                {loading ? '...' : totalStars}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                                {t.githubStatus.totalStars}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -4 }}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4"
                    >
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                            <GitFork className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="block font-mono text-2xl font-bold text-gray-900 dark:text-white">
                                {loading ? '...' : totalForks}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                                {t.githubStatus.totalForks}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -4 }}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4"
                    >
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="block font-mono text-2xl font-bold text-gray-900 dark:text-white">
                                {loading ? '...' : activeProfile.followers}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">
                                {t.githubStatus.followers}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Tab Switcher Controls */}
                <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-slate-800/60">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                                activeTab === 'overview'
                                    ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
                                    : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            {t.githubStatus.overviewTab}
                        </button>
                        <button
                            onClick={() => setActiveTab('repos')}
                            className={`px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                                activeTab === 'repos'
                                    ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
                                    : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            {t.githubStatus.reposTab} ({activeRepos.length})
                        </button>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-gray-400 dark:text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{t.githubStatus.updatedNow}</span>
                    </div>
                </div>

                {/* TAB 1: OVERVIEW & TECH DISTRIBUTION */}
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid lg:grid-cols-12 gap-8 items-start"
                    >
                        {/* Profile Details Card */}
                        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-md space-y-6">
                            <div className="flex items-center gap-4">
                                <img
                                    src={activeProfile.avatar_url}
                                    alt={activeProfile.name}
                                    className="w-16 h-16 rounded-2xl border-2 border-gray-200 dark:border-slate-700 shadow-sm object-cover"
                                />
                                <div>
                                    <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white flex items-center gap-1.5">
                                        <span>{activeProfile.name || activeProfile.login}</span>
                                    </h3>
                                    <a
                                        href={activeProfile.html_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-mono text-xs text-gray-500 dark:text-slate-400 hover:underline"
                                    >
                                        @{activeProfile.login}
                                    </a>
                                </div>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                                {activeProfile.bio}
                            </p>

                            <div className="space-y-2.5 pt-2 border-t border-gray-100 dark:border-slate-800 text-xs font-mono text-gray-500 dark:text-slate-400">
                                {activeProfile.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span>{activeProfile.location}</span>
                                    </div>
                                )}
                                {activeProfile.company && (
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-gray-400" />
                                        <span>{activeProfile.company}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span>Joined GitHub {activeProfile.created_at ? new Date(activeProfile.created_at).getFullYear() : 2024}</span>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center justify-between text-xs font-mono text-gray-600 dark:text-slate-300 bg-gray-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-200/60 dark:border-slate-700/60">
                                <span>Following {activeProfile.following}</span>
                                <span>•</span>
                                <span>{activeProfile.followers} Followers</span>
                                <span>•</span>
                                <span>{activeProfile.public_repos} Repos</span>
                            </div>
                        </div>

                        {/* Right: Languages Breakdown & Visual GitHub Stats */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Language Tech Distribution */}
                            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-md space-y-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                                        <Code className="w-4 h-4 text-gray-900 dark:text-white" />
                                        <span>{t.githubStatus.topLanguages}</span>
                                    </h3>
                                    <span className="font-mono text-xs text-gray-400">Public Repos Analysis</span>
                                </div>

                                {/* Stacked Progress Bar */}
                                <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-slate-800 flex overflow-hidden gap-0.5 p-0.5">
                                    {Object.entries(languageCounts).map(([lang, count]) => {
                                        const percent = Math.round((count / totalLangRepos) * 100);
                                        return (
                                            <div
                                                key={lang}
                                                style={{ width: `${percent}%` }}
                                                className={`h-full rounded-xs transition-all ${languageColors[lang] || 'bg-gray-400'}`}
                                                title={`${lang}: ${percent}%`}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Legend Pills */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                    {Object.entries(languageCounts).map(([lang, count]) => {
                                        const percent = Math.round((count / totalLangRepos) * 100);
                                        return (
                                            <div key={lang} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-slate-800/40 border border-gray-200/50 dark:border-slate-700/50">
                                                <span className={`w-2.5 h-2.5 rounded-full ${languageColors[lang] || 'bg-gray-400'}`} />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold text-gray-900 dark:text-white">{lang}</span>
                                                    <span className="font-mono text-[10px] text-gray-500 dark:text-slate-400">{percent}%</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* GitHub Readme Stats Embedded Cards */}
                            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-md space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-gray-900 dark:text-white" />
                                        <span>{t.githubStatus.contributionStreak}</span>
                                    </h3>
                                    <span className="font-mono text-xs text-gray-400">Live Snapshot</span>
                                </div>

                                {/* GitHub Activity Graph Widget / Card */}
                                <div className="w-full rounded-2xl bg-gray-50 dark:bg-slate-950 p-4 border border-gray-200/60 dark:border-slate-800 flex flex-col items-center justify-center overflow-x-auto">
                                    <img
                                        src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme === 'dark' ? 'dark' : 'default'}&hide_border=true&bg_color=00000000`}
                                        alt="GitHub Stats"
                                        className="max-w-full h-auto rounded"
                                        onError={(e) => {
                                            // Fallback text if vercel API blocked or offline
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <div className="mt-3 text-center text-xs font-mono text-gray-500 dark:text-slate-400">
                                        GitHub Profile: <a href={activeProfile.html_url} target="_blank" rel="noreferrer" className="text-gray-900 dark:text-white underline font-semibold">github.com/{username}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* TAB 2: REPOSITORIES GRID */}
                {activeTab === 'repos' && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {activeRepos.map((repo, idx) => (
                            <motion.div
                                key={repo.id || idx}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
                            >
                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2 font-heading font-bold text-base text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-slate-300 transition">
                                            <BookOpen className="w-4 h-4 text-gray-500 shrink-0" />
                                            <span className="truncate">{repo.name}</span>
                                        </div>
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                                            title="View on GitHub"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>

                                    <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                        {repo.description || 'No description provided for this public repository.'}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-gray-500 dark:text-slate-400">
                                    {repo.language ? (
                                        <div className="flex items-center gap-1.5">
                                            <span className={`w-2.5 h-2.5 rounded-full ${languageColors[repo.language] || 'bg-gray-400'}`} />
                                            <span>{repo.language}</span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">Code</span>
                                    )}

                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1 text-gray-700 dark:text-slate-300">
                                            <Star className="w-3.5 h-3.5 text-amber-500" />
                                            <span>{repo.stargazers_count || 0}</span>
                                        </span>
                                        <span className="flex items-center gap-1 text-gray-700 dark:text-slate-300">
                                            <GitFork className="w-3.5 h-3.5 text-blue-500" />
                                            <span>{repo.forks_count || 0}</span>
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
