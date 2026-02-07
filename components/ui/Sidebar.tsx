'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: '/', label: 'Home', icon: '◆' },
    { href: '/system', label: 'System', icon: '◇' },
    { href: '/showcase', label: 'Showcase', icon: '◈' },
    { href: '/design-system', label: 'Design', icon: '◊' },
    { href: '/about', label: 'About', icon: '○' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed left-0 top-16 bottom-0 w-20 glass-panel-light border-r border-glass-border z-40">
            <nav className="flex flex-col items-center gap-6 py-8">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                className={`
                  relative flex flex-col items-center gap-1.5 px-4 py-3 rounded-lg
                  transition-smooth cursor-pointer group
                  ${isActive ? 'text-purple-violet' : 'text-foreground-muted hover:text-foreground'}
                `}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Icon */}
                                <span className="text-xl">{item.icon}</span>

                                {/* Label */}
                                <span className="text-xs font-medium">{item.label}</span>

                                {/* Active Indicator */}
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-lg purple-glow"
                                        layoutId="activeNav"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}

                                {/* Hover Glow */}
                                {!isActive && (
                                    <div className="absolute inset-0 rounded-lg bg-purple-violet/0 group-hover:bg-purple-violet/10 transition-smooth" />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
