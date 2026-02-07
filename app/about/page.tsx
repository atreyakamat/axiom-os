'use client';

import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import { fadeIn, slideUp } from '@/lib/motion-presets';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="max-w-2xl w-full"
            >
                <GlassPanel variant="light" glow={true} className="p-12 text-center">
                    <motion.div variants={slideUp} className="space-y-8">
                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                            About Axiom OS
                        </h1>

                        {/* Philosophy */}
                        <div className="space-y-4">
                            <p className="text-lg text-foreground-muted leading-relaxed">
                                Designed by someone who understands restraint.
                            </p>
                            <p className="text-foreground-muted leading-relaxed">
                                This is not a functional operating system. It's a visual product narrative—a showcase
                                of system-level UI thinking, calm UX, and consistent design architecture.
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="w-24 h-px bg-purple-violet/30 mx-auto" />

                        {/* CTA */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button className="group relative px-8 py-4 rounded-lg glass-panel-light border border-purple-violet/30 overflow-hidden transition-smooth">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-purple-violet/0 group-hover:bg-purple-violet/10 transition-smooth" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 purple-glow transition-slow" />

                                {/* Text */}
                                <span className="relative text-foreground font-medium">
                                    Get in Touch
                                </span>
                            </button>
                        </motion.div>

                        {/* Footer Note */}
                        <motion.p
                            className="text-sm text-foreground-muted/60"
                            variants={slideUp}
                        >
                            Every section feels like it belongs to the same OS.
                            <br />
                            Not different pages. Different workspaces.
                        </motion.p>
                    </motion.div>
                </GlassPanel>
            </motion.div>
        </div>
    );
}
