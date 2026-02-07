import { Variants } from 'framer-motion';

// Spring Configurations
export const springConfigs = {
    smooth: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
        mass: 1,
    },
    bouncy: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
        mass: 0.8,
    },
    slow: {
        type: 'spring' as const,
        stiffness: 50,
        damping: 25,
        mass: 1.2,
    },
};

// Animation Variants
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: springConfigs.smooth,
    },
};

export const slideUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springConfigs.smooth,
    },
};

export const float: Variants = {
    initial: { y: 0 },
    animate: {
        y: [-8, 8, -8],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

export const lift: Variants = {
    initial: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -8,
        transition: springConfigs.smooth,
    },
};

export const blur: Variants = {
    focused: { filter: 'blur(0px)', opacity: 1 },
    unfocused: {
        filter: 'blur(4px)',
        opacity: 0.6,
        transition: springConfigs.smooth,
    },
};

export const glow: Variants = {
    initial: { boxShadow: '0 0 20px rgba(167, 139, 250, 0.3)' },
    hover: {
        boxShadow: '0 0 40px rgba(167, 139, 250, 0.5), 0 0 60px rgba(167, 139, 250, 0.2)',
        transition: springConfigs.smooth,
    },
};

// Stagger Children Utility
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springConfigs.smooth,
    },
};
