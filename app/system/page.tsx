'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlassPanel from '@/components/ui/GlassPanel';
import { staggerContainer, staggerItem, blur } from '@/lib/motion-presets';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const principles = [
    {
        title: 'Ad-free by design',
        description: 'No advertisements. No tracking. No distractions. Just pure focus on what matters.',
        icon: '🚫',
    },
    {
        title: 'Zero bloatware',
        description: 'Every component serves a purpose. Nothing pre-installed that you don\'t need.',
        icon: '✨',
    },
    {
        title: 'Focus-first UI',
        description: 'Interface designed to enhance concentration, not fragment attention.',
        icon: '🎯',
    },
    {
        title: 'Intentional defaults',
        description: 'Thoughtful configurations that respect your workflow and preferences.',
        icon: '⚡',
    },
    {
        title: 'Calm motion',
        description: 'Animations that guide, not distract. Every transition has purpose.',
        icon: '🌊',
    },
    {
        title: 'Visual clarity',
        description: 'Clear hierarchy. Consistent patterns. Design that communicates.',
        icon: '👁️',
    },
];

export default function SystemPage() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { ref, isVisible } = useScrollReveal();

    return (
        <div className="min-h-screen p-8 md:p-16">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={staggerContainer}
                className="max-w-7xl mx-auto"
            >
                {/* Header */}
                <motion.div variants={staggerItem} className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                        System Principles
                    </h1>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                        An operating system designed purely around clarity, restraint, and intention
                    </p>
                </motion.div>

                {/* Principles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {principles.map((principle, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                        >
                            <motion.div
                                variants={blur}
                                animate={hoveredIndex !== null && hoveredIndex !== index ? "unfocused" : "focused"}
                            >
                                <GlassPanel
                                    variant="light"
                                    glow={hoveredIndex === index}
                                    className="p-8 h-full"
                                >
                                    <div className="space-y-4">
                                        <div className="text-4xl">{principle.icon}</div>
                                        <h3 className="text-xl font-display font-semibold text-foreground">
                                            {principle.title}
                                        </h3>
                                        <p className="text-foreground-muted leading-relaxed">
                                            {principle.description}
                                        </p>
                                    </div>
                                </GlassPanel>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
