'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

const navItems = [
    { href: '#hero', label: 'Home' },
    { href: '#workspace', label: 'System' },
    { href: '#principles', label: 'Principles' },
    { href: '#cta', label: 'Connect' },
];

export default function GlassNavbar() {
    const { scrollY } = useScroll();
    const navRef = useRef<HTMLElement>(null);

    // Mouse position for proximity effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring for parallax
    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    // Scroll-based blur increase
    const blurAmount = useTransform(scrollY, [0, 200], [16, 32]);
    const bgOpacity = useTransform(scrollY, [0, 200], [0.05, 0.12]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!navRef.current) return;
            const rect = navRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from navbar center
            const distX = (e.clientX - centerX) / window.innerWidth;
            const distY = (e.clientY - centerY) / window.innerHeight;

            // Tiny parallax effect (max 4px)
            mouseX.set(distX * 4);
            mouseY.set(distY * 4);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            ref={navRef}
            className="fixed top-6 left-1/2 z-50"
            style={{
                x: springX,
                y: springY,
                translateX: '-50%',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                className="flex items-center gap-1 px-2 py-2 rounded-full border border-glass-border"
                style={{
                    backdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`),
                    WebkitBackdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`),
                    backgroundColor: useTransform(bgOpacity, (v) => `rgba(255, 255, 255, ${v})`),
                    boxShadow: '0 0 30px rgba(167, 139, 250, 0.1), inset 0 0 20px rgba(196, 181, 253, 0.05)',
                }}
            >
                {navItems.map((item) => (
                    <motion.button
                        key={item.href}
                        onClick={() => scrollToSection(item.href)}
                        className="relative px-4 py-2 text-sm font-medium text-foreground-muted rounded-full transition-colors hover:text-foreground group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Hover background */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-purple-violet/0 group-hover:bg-purple-violet/10"
                            layoutId="navHover"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />

                        {/* Purple accent line on hover */}
                        <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-purple-violet rounded-full group-hover:w-4"
                            transition={{ duration: 0.3 }}
                        />

                        <span className="relative z-10">{item.label}</span>
                    </motion.button>
                ))}
            </motion.div>
        </motion.nav>
    );
}
