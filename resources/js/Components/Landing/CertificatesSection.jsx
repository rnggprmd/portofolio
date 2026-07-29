import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '../../Context/LanguageContext';

export default function CertificatesSection({ initialCertificates = [] }) {
    const { t } = useLanguage();
    const [selectedCert, setSelectedCert] = useState(null);

    const defaultItems = t.certificates.items.map(item => ({
        ...item,
        credential_id: `CRED-${item.id}00`,
        verify_url: 'https://example.com/verify',
    }));

    const displayCertificates = initialCertificates.length > 0
        ? initialCertificates.map(c => ({
            id: c.id,
            title: c.title,
            issuer: c.issuer,
            year: c.year,
            badge: c.badge || 'Certified',
            credential_id: c.credential_id || 'N/A',
            verify_url: c.verify_url || 'https://example.com/verify',
            description: c.description || '',
        }))
        : defaultItems;

    const marqueeItems = [...displayCertificates, ...displayCertificates];

    return (
        <section id="certificates" className="py-24 px-4 sm:px-8 bg-transparent border-y border-gray-200/80 dark:border-slate-800 overflow-hidden transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-semibold">
                        {t.certificates.tag}
                    </span>
                    <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white tracking-tight">
                        {t.certificates.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-sans">
                        {t.certificates.subtitle}
                    </p>
                </div>

                {/* Infinite Marquee Container */}
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <div className="animate-marquee gap-6 py-4">
                        {marqueeItems.map((cert, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedCert(cert)}
                                className="w-80 sm:w-96 shrink-0 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-gray-300 dark:hover:border-slate-700 hover:-translate-y-1 transition duration-300 space-y-4 cursor-pointer group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-gray-900 flex items-center justify-center transition duration-300">
                                        <ShieldCheck className="w-5 h-5 shrink-0" />
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200/80 dark:border-slate-700">
                                        {cert.year}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white line-clamp-1">
                                        {cert.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">{cert.issuer}</p>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-800 text-xs font-semibold">
                                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-700 dark:text-slate-300 font-mono font-medium">
                                        <Award className="w-4 h-4 text-gray-900 dark:text-slate-200" />
                                        {cert.badge}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-gray-900 dark:text-white group-hover:underline font-bold">
                                        {t.certificates.inspect} <ExternalLink className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interactive Certificate Lightbox Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shrink-0 shadow-sm">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 uppercase">
                                        {selectedCert.badge} CERTIFICATE
                                    </span>
                                    <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mt-0.5">
                                        {selectedCert.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-3 text-xs text-gray-600 dark:text-slate-300">
                                <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 flex items-center justify-between font-mono">
                                    <span className="text-gray-400">{t.certificates.credentialId}</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{selectedCert.credential_id}</span>
                                </div>

                                {selectedCert.description && (
                                    <p className="leading-relaxed text-sm">
                                        {selectedCert.description}
                                    </p>
                                )}

                                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800 text-xs font-semibold">
                                    <span className="text-gray-500">Issuer: {selectedCert.issuer}</span>
                                    <span className="text-gray-500">Year: {selectedCert.year}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                                <button
                                    onClick={() => setSelectedCert(null)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                >
                                    {t.certificates.close}
                                </button>
                                <a
                                    href={selectedCert.verify_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold hover:bg-black dark:hover:bg-gray-100 shadow-md transition flex items-center gap-1.5"
                                >
                                    <span>{t.certificates.verifyCertificate}</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
