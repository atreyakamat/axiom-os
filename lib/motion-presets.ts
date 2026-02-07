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

// Micro tilt for cursor-reactive elements (±2°)
export const microTilt: Variants = {
    initial: { rotateX: 0, rotateY: 0 },
    tilt: (custom: { x: number; y: number }) => ({
        rotateX: custom.y * 2,
        rotateY: custom.x * -2,
        transition: { type: 'spring', stiffness: 200, damping: 30 },
    }),
};

// Slow breathing glow effect
export const breathe: Variants = {
    initial: { opacity: 0.3 },
    animate: {
        opacity: [0.3, 0.6, 0.3],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Z-axis focus transition for workspace panels
export const zFocus: Variants = {
    unfocused: {
        z: 0,
        scale: 0.95,
        filter: 'blur(2px)',
        opacity: 0.7,
        transition: springConfigs.slow,
    },
    focused: {
        z: 50,
        scale: 1,
        filter: 'blur(0px)',
        opacity: 1,
        transition: springConfigs.smooth,
    },
};

// Very slow idle floating animation
export const slowFloat: Variants = {
    initial: { y: 0, x: 0 },
    animate: {
        y: [-4, 4, -4],
        x: [-2, 2, -2],
        transition: {
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Magnetic pull effect for interactive elements
export const magneticPull: Variants = {
    initial: { x: 0, y: 0 },
    pull: (custom: { x: number; y: number }) => ({
        x: custom.x * 10,
        y: custom.y * 10,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
    }),
};

// Scale with weight for button press
export const pressWeight: Variants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: springConfigs.smooth,
    },
    tap: {
        scale: 0.97,
        transition: { type: 'spring', stiffness: 400, damping: 15 },
    },
};
