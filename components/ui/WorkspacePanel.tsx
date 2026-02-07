'use client';

import { motion } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';

interface WorkspacePanelProps {
    title: string;
    icon: string;
    children: ReactNode;
    style?: {
        blur: number;
        scale: number;
        opacity: number;
        zIndex: number;
    };
    className?: string;
}

const WorkspacePanel = forwardRef<HTMLDivElement, WorkspacePanelProps>(
    ({ title, icon, children, style, className = '' }, ref) => {
        const { blur = 0, scale = 1, opacity = 1, zIndex = 1 } = style || {};

        return (
            <motion.div
                ref={ref}
                className={`relative ${className}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                    opacity,
                    scale,
                    filter: `blur(${blur}px)`,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                    scale: 1.02,
                    z: 20,
                    transition: { type: 'spring', stiffness: 200, damping: 20 },
                }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 25,
                    opacity: { duration: 0.3 },
                    filter: { duration: 0.3 },
                }}
                style={{
                    zIndex,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Glass container */}
                <div className="relative overflow-hidden rounded-xl border border-glass-border bg-glass-light backdrop-blur-lg">
                    {/* Reflective highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                    {/* Header */}
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-glass-border/50">
                        <span className="text-lg">{icon}</span>
                        <h3 className="text-sm font-medium text-foreground">{title}</h3>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        {children}
                    </div>
                </div>

                {/* Hover glow */}
                <motion.div
                    className="absolute -inset-1 rounded-xl bg-purple-violet/0 -z-10"
                    whileHover={{
                        backgroundColor: 'rgba(167, 139, 250, 0.1)',
                        boxShadow: '0 0 30px rgba(167, 139, 250, 0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        );
    }
);

WorkspacePanel.displayName = 'WorkspacePanel';

export default WorkspacePanel;
