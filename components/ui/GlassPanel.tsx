'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { lift } from '@/lib/motion-presets';

interface GlassPanelProps {
    children: ReactNode;
    variant?: 'light' | 'dark' | 'default';
    blur?: 'sm' | 'md' | 'lg';
    glow?: boolean;
    className?: string;
    hoverable?: boolean;
}

export default function GlassPanel({
    children,
    variant = 'default',
    blur = 'md',
    glow = false,
    className = '',
    hoverable = true,
}: GlassPanelProps) {
    const baseClasses = 'relative overflow-hidden';

    const variantClasses = {
        default: 'glass-panel',
        light: 'glass-panel-light',
        dark: 'glass-panel-dark',
    };

    const glowClass = glow ? 'purple-glow' : '';

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${glowClass} ${className}`;

    if (!hoverable) {
        return <div className={combinedClasses}>{children}</div>;
    }

    return (
        <motion.div
            className={combinedClasses}
            variants={lift}
            initial="initial"
            whileHover="hover"
        >
            {children}
        </motion.div>
    );
}
