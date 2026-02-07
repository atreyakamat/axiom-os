'use client';

import { motion } from 'framer-motion';
import MagicBento from '@/components/ui/MagicBento';

const principles = [
    {
        id: 'adfree',
        title: 'Ad-free',
        icon: '◆',
        description: 'No distractions. No interruptions. Just your content.',
        span: 'md' as const,
    },
    {
        id: 'nobloat',
        title: 'No Bloat',
        icon: '◇',
        description: 'Every feature earns its place. Nothing extra.',
    },
    {
        id: 'intentional',
        title: 'Intentional Defaults',
        icon: '◈',
        description: 'Settings that make sense. Privacy by default.',
    },
    {
        id: 'calm',
        title: 'Calm Motion',
        icon: '◊',
        description: 'Animations that guide, never distract.',
        span: 'md' as const,
    },
    {
        id: 'focus',
        title: 'Focus-first UI',
        icon: '○',
        description: 'Interfaces that fade away, leaving only your work.',
    },
];

export default function PrinciplesSection() {
    return (
        <section
            id="principles"
            className="relative py-32 px-8"
        >
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-violet/5 to-transparent pointer-events-none" />

            {/* Section header */}
            <motion.div
                className="text-center mb-16 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                    System Principles
                </h2>
                <p className="text-foreground-muted max-w-md mx-auto">
                    Values we build upon. Hover to explore.
                </p>
            </motion.div>

            {/* Bento grid */}
            <div className="max-w-4xl mx-auto relative z-10">
                <MagicBento items={principles} />
            </div>
        </section>
    );
}
