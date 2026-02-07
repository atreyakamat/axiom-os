'use client';

import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/GlassPanel';
import { staggerContainer, staggerItem } from '@/lib/motion-presets';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const colorTokens = [
    { name: 'Purple Violet', value: '#a78bfa', var: '--purple-violet' },
    { name: 'Purple Lavender', value: '#c4b5fd', var: '--purple-lavender' },
    { name: 'Purple Muted', value: '#9d7bca', var: '--purple-muted' },
    { name: 'Foreground', value: '#e4e4e7', var: '--foreground' },
    { name: 'Foreground Muted', value: '#a1a1aa', var: '--foreground-muted' },
    { name: 'Background', value: '#0f0f12', var: '--background' },
];

const blurLevels = [
    { name: 'Small', value: '8px', class: 'backdrop-blur-sm' },
    { name: 'Medium', value: '16px', class: 'backdrop-blur-md' },
    { name: 'Large', value: '24px', class: 'backdrop-blur-lg' },
    { name: 'Extra Large', value: '32px', class: 'backdrop-blur-xl' },
];

const radiusScale = [
    { name: 'Small', value: '0.5rem', size: 'w-16 h-16' },
    { name: 'Medium', value: '0.75rem', size: 'w-20 h-20' },
    { name: 'Large', value: '1.25rem', size: 'w-24 h-24' },
];

const spacingScale = [
    { name: 'XS', value: '0.25rem' },
    { name: 'SM', value: '0.5rem' },
    { name: 'MD', value: '1rem' },
    { name: 'LG', value: '1.5rem' },
    { name: 'XL', value: '2rem' },
    { name: '2XL', value: '3rem' },
];

export default function DesignSystemPage() {
    const { ref, isVisible } = useScrollReveal();

    return (
        <div className="min-h-screen p-8 md:p-16">
            <motion.div
                ref={ref}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={staggerContainer}
                className="max-w-7xl mx-auto space-y-16"
            >
                {/* Header */}
                <motion.div variants={staggerItem} className="text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                        Design System
                    </h1>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                        Consistent tokens. Reusable components. System-level discipline.
                    </p>
                </motion.div>

                {/* Color Palette */}
                <motion.div variants={staggerItem}>
                    <GlassPanel variant="light" className="p-8">
                        <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                            Color Palette
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {colorTokens.map((color) => (
                                <div key={color.name} className="space-y-2">
                                    <div
                                        className="h-20 rounded-lg border border-glass-border"
                                        style={{ backgroundColor: color.value }}
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{color.name}</p>
                                        <p className="text-xs text-foreground-muted font-mono">{color.value}</p>
                                        <p className="text-xs text-purple-lavender font-mono">{color.var}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassPanel>
                </motion.div>

                {/* Blur Levels */}
                <motion.div variants={staggerItem}>
                    <GlassPanel variant="light" className="p-8">
                        <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                            Blur Levels
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {blurLevels.map((blur) => (
                                <div key={blur.name} className="space-y-2">
                                    <div className={`h-24 rounded-lg bg-purple-violet/20 ${blur.class} border border-glass-border flex items-center justify-center`}>
                                        <span className="text-sm font-medium text-foreground">{blur.name}</span>
                                    </div>
                                    <p className="text-xs text-foreground-muted font-mono">{blur.value}</p>
                                </div>
                            ))}
                        </div>
                    </GlassPanel>
                </motion.div>

                {/* Border Radius */}
                <motion.div variants={staggerItem}>
                    <GlassPanel variant="light" className="p-8">
                        <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                            Border Radius Scale
                        </h2>
                        <div className="flex flex-wrap gap-8 items-end">
                            {radiusScale.map((radius) => (
                                <div key={radius.name} className="space-y-2 text-center">
                                    <div
                                        className={`${radius.size} bg-purple-violet/30 border border-purple-violet/50`}
                                        style={{ borderRadius: radius.value }}
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{radius.name}</p>
                                        <p className="text-xs text-foreground-muted font-mono">{radius.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassPanel>
                </motion.div>

                {/* Spacing Scale */}
                <motion.div variants={staggerItem}>
                    <GlassPanel variant="light" className="p-8">
                        <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                            Spacing System
                        </h2>
                        <div className="space-y-3">
                            {spacingScale.map((spacing) => (
                                <div key={spacing.name} className="flex items-center gap-4">
                                    <div className="w-20 text-sm font-medium text-foreground">{spacing.name}</div>
                                    <div
                                        className="h-8 bg-purple-violet/40 rounded"
                                        style={{ width: spacing.value }}
                                    />
                                    <div className="text-xs text-foreground-muted font-mono">{spacing.value}</div>
                                </div>
                            ))}
                        </div>
                    </GlassPanel>
                </motion.div>

                {/* Motion Timing */}
                <motion.div variants={staggerItem}>
                    <GlassPanel variant="light" className="p-8">
                        <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                            Motion Timing
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-foreground">Fast</span>
                                <span className="text-xs text-foreground-muted font-mono">200ms</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-foreground">Medium</span>
                                <span className="text-xs text-foreground-muted font-mono">400ms</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-foreground">Slow</span>
                                <span className="text-xs text-foreground-muted font-mono">600ms</span>
                            </div>
                            <div className="pt-4 border-t border-glass-border">
                                <p className="text-sm text-foreground mb-2">Spring Easing</p>
                                <p className="text-xs text-foreground-muted font-mono">cubic-bezier(0.16, 1, 0.3, 1)</p>
                            </div>
                        </div>
                    </GlassPanel>
                </motion.div>
            </motion.div>
        </div>
    );
}
