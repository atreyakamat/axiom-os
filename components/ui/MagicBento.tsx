'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useCallback, ReactNode } from 'react';

interface MagicBentoTileProps {
    children: ReactNode;
    className?: string;
}

function MagicBentoTile({ children, className = '' }: MagicBentoTileProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center
        const distX = (e.clientX - centerX) / rect.width;
        const distY = (e.clientY - centerY) / rect.height;

        // Magnetic pull (max 8px)
        x.set(distX * 8);
        y.set(distY * 8);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <motion.div
            ref={ref}
            className={`relative group ${className}`}
            style={{
                x: springX,
                y: springY,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            {/* Glass container */}
            <div className="relative h-full overflow-hidden rounded-xl border border-glass-border bg-glass-light backdrop-blur-lg transition-all duration-300 group-hover:border-purple-violet/30 group-hover:bg-glass-highlight">
                {/* Reflective gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative h-full p-5">
                    {children}
                </div>

                {/* Focus glow */}
                <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                        boxShadow: '0 0 30px rgba(167, 139, 250, 0.15)',
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
}

interface MagicBentoProps {
    items: {
        id: string;
        title: string;
        icon?: string;
        description?: string;
        span?: 'sm' | 'md' | 'lg';
    }[];
    className?: string;
}

export default function MagicBento({ items, className = '' }: MagicBentoProps) {
    const getSpanClass = (span?: string) => {
        switch (span) {
            case 'lg':
                return 'md:col-span-2 md:row-span-2';
            case 'md':
                return 'md:col-span-2';
            default:
                return '';
        }
    };

    return (
        <motion.div
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
        >
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    className={getSpanClass(item.span)}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { type: 'spring', stiffness: 100, damping: 20 },
                        },
                    }}
                >
                    <MagicBentoTile className="h-full min-h-[120px]">
                        <div className="flex flex-col h-full">
                            {item.icon && (
                                <span className="text-2xl mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                    {item.icon}
                                </span>
                            )}
                            <h3 className="text-sm font-medium text-foreground mb-2 group-hover:text-purple-lavender transition-colors">
                                {item.title}
                            </h3>
                            {item.description && (
                                <p className="text-xs text-foreground-muted leading-relaxed mt-auto">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    </MagicBentoTile>
                </motion.div>
            ))}
        </motion.div>
    );
}
