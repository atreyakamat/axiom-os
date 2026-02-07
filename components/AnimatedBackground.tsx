'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base Gradient */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, #18181b 0%, #0f0f12 100%)',
                }}
                animate={{
                    background: [
                        'radial-gradient(circle at 50% 50%, #18181b 0%, #0f0f12 100%)',
                        'radial-gradient(circle at 60% 40%, #1a1625 0%, #0f0f12 100%)',
                        'radial-gradient(circle at 40% 60%, #1a1625 0%, #0f0f12 100%)',
                        'radial-gradient(circle at 50% 50%, #18181b 0%, #0f0f12 100%)',
                    ],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Purple Accent Glow */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-violet opacity-10 blur-3xl"
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -50, 100, 0],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-lavender opacity-10 blur-3xl"
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, 50, -100, 0],
                    scale: [1, 0.8, 1.2, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
}
