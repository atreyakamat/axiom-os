'use client';

import { motion } from 'framer-motion';
import { pressWeight, breathe } from '@/lib/motion-presets';

export default function PresenceCard() {
    return (
        <section
            id="cta"
            className="relative min-h-[80vh] flex items-center justify-center py-32 px-8"
        >
            {/* Background subtle glow */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                variants={breathe}
                initial="initial"
                animate="animate"
            >
                <div className="w-96 h-96 rounded-full bg-purple-violet/5 blur-3xl" />
            </motion.div>

            {/* Main card */}
            <motion.div
                className="relative max-w-lg w-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Glass container */}
                <div className="relative overflow-hidden rounded-2xl border border-glass-border bg-glass-light backdrop-blur-xl p-10 md:p-12 text-center">
                    {/* Reflective highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10">
                        <motion.div
                            className="w-12 h-12 mx-auto mb-6 rounded-xl bg-purple-violet/20 border border-purple-violet/30 flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <div className="w-5 h-5 rounded-md bg-purple-violet" />
                        </motion.div>

                        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                            Ready to experience calm?
                        </h2>

                        <p className="text-foreground-muted leading-relaxed mb-8 max-w-sm mx-auto">
                            An operating system that respects your attention.
                            No noise. No distractions. Just you and your work.
                        </p>

                        {/* CTA Button */}
                        <motion.button
                            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-foreground bg-glass-highlight border border-glass-border overflow-hidden group"
                            variants={pressWeight}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            {/* Hover glow */}
                            <motion.div
                                className="absolute inset-0 bg-purple-violet/0 group-hover:bg-purple-violet/10 transition-colors duration-300"
                            />
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    boxShadow: 'inset 0 0 20px rgba(167, 139, 250, 0.2)',
                                }}
                            />

                            <span className="relative z-10">Get Early Access</span>
                            <svg
                                className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </motion.button>
                    </div>
                </div>

                {/* Edge glow */}
                <motion.div
                    className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-purple-violet/20 via-transparent to-purple-lavender/10 -z-10"
                    variants={breathe}
                    initial="initial"
                    animate="animate"
                    style={{ filter: 'blur(8px)' }}
                />
            </motion.div>
        </section>
    );
}
