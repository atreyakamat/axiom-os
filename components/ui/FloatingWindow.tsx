'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import GlassPanel from './GlassPanel';
import { float } from '@/lib/motion-presets';

interface FloatingWindowProps {
    title: string;
    children: ReactNode;
    className?: string;
    glow?: boolean;
}

export default function FloatingWindow({
    title,
    children,
    className = '',
    glow = false,
}: FloatingWindowProps) {
    return (
        <motion.div
            variants={float}
            initial="initial"
            animate="animate"
            className={className}
        >
            <GlassPanel variant="light" glow={glow} hoverable={false}>
                {/* Title Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border">
                    <h3 className="text-sm font-medium text-foreground">{title}</h3>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-foreground-muted/20" />
                        <div className="w-3 h-3 rounded-full bg-foreground-muted/20" />
                        <div className="w-3 h-3 rounded-full bg-foreground-muted/20" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">{children}</div>
            </GlassPanel>
        </motion.div>
    );
}
