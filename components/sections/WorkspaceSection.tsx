'use client';

import { motion } from 'framer-motion';
import WorkspacePanel from '@/components/ui/WorkspacePanel';
import { useVariableProximity } from '@/hooks/useVariableProximity';
import { staggerContainer, staggerItem } from '@/lib/motion-presets';

const panels = [
    {
        id: 'vision',
        title: 'Vision',
        icon: '◆',
        content: 'Clarity in every pixel. Design that speaks through silence.',
        position: { top: '5%', left: '5%' },
    },
    {
        id: 'focus',
        title: 'Focus',
        icon: '◇',
        content: 'Attention as a resource. Interfaces that respect your time.',
        position: { top: '10%', right: '10%' },
    },
    {
        id: 'privacy',
        title: 'Privacy',
        icon: '◈',
        content: 'Your data stays yours. No tracking, no compromise.',
        position: { top: '45%', left: '15%' },
    },
    {
        id: 'performance',
        title: 'Performance',
        icon: '◊',
        content: 'Speed without sacrifice. Every interaction optimized.',
        position: { top: '50%', right: '5%' },
    },
    {
        id: 'design',
        title: 'Design System',
        icon: '○',
        content: 'Consistency at scale. Components that compose beautifully.',
        position: { bottom: '10%', left: '35%' },
    },
];

export default function WorkspaceSection() {
    const { containerRef, setItemRef, getItemStyle } = useVariableProximity(panels.length);

    return (
        <section
            id="workspace"
            className="relative min-h-screen py-32 px-8"
        >
            {/* Section header */}
            <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                    Living Workspace
                </h2>
                <p className="text-foreground-muted max-w-md mx-auto">
                    Panels that respond to your presence. Hover to focus.
                </p>
            </motion.div>

            {/* Floating panels container */}
            <motion.div
                ref={containerRef}
                className="relative max-w-6xl mx-auto h-[600px] md:h-[700px]"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {panels.map((panel, index) => {
                    const style = getItemStyle(index);

                    return (
                        <motion.div
                            key={panel.id}
                            className="absolute w-64 md:w-72"
                            style={{
                                ...panel.position,
                            }}
                            variants={staggerItem}
                        >
                            <WorkspacePanel
                                ref={setItemRef(index)}
                                title={panel.title}
                                icon={panel.icon}
                                style={style}
                            >
                                <p className="text-sm text-foreground-muted leading-relaxed">
                                    {panel.content}
                                </p>
                            </WorkspacePanel>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
