'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, useEffect } from 'react';
import { slowFloat, breathe } from '@/lib/motion-presets';

interface OSWindowProps {
    title?: string;
    children: ReactNode;
    className?: string;
}

export default function OSWindow({
    title = 'AXIOM OS',
    children,
    className = '',
}: OSWindowProps) {
    const windowRef = useRef<HTMLDivElement>(null);

    // Mouse position for micro-tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for natural movement
    const springConfig = { stiffness: 150, damping: 30 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!windowRef.current) return;

            const rect = windowRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Normalize to -0.5 to 0.5
            const x = (e.clientX - centerX) / window.innerWidth;
            const y = (e.clientY - centerY) / window.innerHeight;

            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={windowRef}
            className={`relative ${className}`}
            variants={slowFloat}
            initial="initial"
            animate="animate"
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
        >
            {/* Purple edge glow */}
            <motion.div
                className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-purple-violet/30 via-transparent to-purple-lavender/20"
                variants={breathe}
                initial="initial"
                animate="animate"
                style={{
                    filter: 'blur(8px)',
                }}
            />

            {/* Main window container */}
            <div className="relative overflow-hidden rounded-2xl border border-glass-highlight bg-glass-light backdrop-blur-xl">
                {/* OS-style top bar */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-glass-border/50">
                    <div className="flex items-center gap-3">
                        {/* Window controls */}
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-foreground-muted/30 hover:bg-red-400/60 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-foreground-muted/30 hover:bg-yellow-400/60 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-foreground-muted/30 hover:bg-green-400/60 transition-colors" />
                        </div>

                        {/* Title */}
                        <span className="text-sm font-medium text-foreground-muted">{title}</span>
                    </div>

                    {/* System status glyphs */}
                    <div className="flex items-center gap-3 text-foreground-muted/60">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-violet animate-pulse" />
                            <span className="text-xs">Active</span>
                        </div>
                        <span className="text-xs font-mono">v1.0</span>
                    </div>
                </div>

                {/* Content area */}
                <div className="p-8 md:p-12">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
