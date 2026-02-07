'use client';

import { motion } from 'framer-motion';

interface AccentGlowProps {
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
}

export default function AccentGlow({
    className = '',
    intensity = 'medium'
}: AccentGlowProps) {
    const intensityClasses = {
        low: 'opacity-20',
        medium: 'opacity-40',
        high: 'opacity-60',
    };

    return (
        <motion.div
            className={`absolute pointer-events-none ${className}`}
            animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            <div
                className={`w-full h-full rounded-full bg-purple-violet blur-3xl ${intensityClasses[intensity]}`}
            />
        </motion.div>
    );
}
