'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import FloatingWindow from '@/components/ui/FloatingWindow';
import { springConfigs } from '@/lib/motion-presets';

const panels = [
    {
        id: 'vision',
        title: 'Vision',
        content: 'An operating system that removes noise and restores focus. Every pixel serves clarity.',
        color: 'purple-violet',
    },
    {
        id: 'interface',
        title: 'Interface Philosophy',
        content: 'Glassmorphism creates depth. Motion guides attention. Consistency builds trust.',
        color: 'purple-lavender',
    },
    {
        id: 'performance',
        title: 'Performance',
        content: 'Lightweight architecture. Instant response. Smooth 60fps animations throughout.',
        color: 'purple-muted',
    },
    {
        id: 'privacy',
        title: 'Privacy',
        content: 'Your data stays yours. No telemetry. No tracking. Complete transparency.',
        color: 'purple-violet',
    },
    {
        id: 'design',
        title: 'Design System',
        content: 'Consistent tokens. Reusable components. System-level thinking applied everywhere.',
        color: 'purple-lavender',
    },
];

export default function ShowcasePage() {
    const [expandedPanel, setExpandedPanel] = useState<string | null>(null);
    const [backgroundBlur, setBackgroundBlur] = useState(false);

    const handlePanelClick = (id: string) => {
        if (expandedPanel === id) {
            setExpandedPanel(null);
            setBackgroundBlur(false);
        } else {
            setExpandedPanel(id);
            setBackgroundBlur(true);
        }
    };

    return (
        <div className="min-h-screen p-8 md:p-16 relative">
            {/* Background Blur Overlay */}
            <AnimatePresence>
                {backgroundBlur && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 ml-20 mt-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setExpandedPanel(null);
                            setBackgroundBlur(false);
                        }}
                    />
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                        OS Interface Showcase
                    </h1>
                    <p className="text-lg text-foreground-muted">
                        System-level UI thinking. Hover to lift. Click to expand.
                    </p>
                </div>

                {/* Workspace Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                    {panels.map((panel, index) => {
                        const isExpanded = expandedPanel === panel.id;

                        return (
                            <motion.div
                                key={panel.id}
                                layout
                                className={`relative ${isExpanded ? 'z-20' : 'z-0'}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: isExpanded ? 1.05 : 1,
                                }}
                                transition={springConfigs.smooth}
                                style={{
                                    gridColumn: isExpanded ? 'span 2' : 'span 1',
                                }}
                            >
                                <motion.div
                                    whileHover={!isExpanded ? {
                                        scale: 1.02,
                                        y: -8,
                                        boxShadow: '0 20px 40px rgba(167, 139, 250, 0.3)',
                                    } : {}}
                                    onClick={() => handlePanelClick(panel.id)}
                                    className="cursor-pointer"
                                >
                                    <FloatingWindow
                                        title={panel.title}
                                        glow={isExpanded}
                                    >
                                        <div className="space-y-4">
                                            <p className="text-foreground-muted leading-relaxed">
                                                {panel.content}
                                            </p>

                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="pt-4 border-t border-glass-border"
                                                >
                                                    <p className="text-sm text-foreground-muted">
                                                        This panel demonstrates elastic expansion with smooth spring-based animations.
                                                        Click again to collapse.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </div>
                                    </FloatingWindow>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Instructions */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p className="text-sm text-foreground-muted">
                        Each panel floats independently. Background blurs on focus. Exit with elastic ease-back.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
