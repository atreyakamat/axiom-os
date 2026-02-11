/* ============================================================
   Glass OS — Motion Theme Constants
   Spring physics system for consistent animation "feel"
   ============================================================ */

export const springs = {
    /** Instant, precise — tooltips, toggles */
    snappy: { type: "spring" as const, stiffness: 500, damping: 30, mass: 1 },
    /** Smooth, confident — window open/close, dock scaling */
    fluid: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
    /** Deliberate, weighty — modals, full-screen transitions */
    heavy: { type: "spring" as const, stiffness: 200, damping: 40, mass: 1.5 },
    /** Playful, energetic — notification badges, bounce effects */
    bouncy: { type: "spring" as const, stiffness: 400, damping: 15, mass: 1 },
};

/** Window open animation sequence */
export const windowOpenVariants = {
    hidden: {
        scale: 0.95,
        opacity: 0,
        y: 20,
    },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
            ...springs.fluid,
            staggerChildren: 0.05,
        },
    },
    exit: {
        scale: 0.95,
        opacity: 0,
        y: 10,
        transition: {
            duration: 0.2,
            ease: [0.2, 0, 0.6, 1] as [number, number, number, number],
        },
    },
};

/** Staggered children for window content */
export const windowChildVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springs.fluid,
    },
};

/** Glass panel hover animation */
export const glassPanelHover = {
    rest: {
        scale: 1,
        y: 0,
        filter: "blur(0px)",
    },
    hover: {
        scale: 1.02,
        y: -4,
        transition: springs.fluid,
    },
    unfocused: {
        scale: 0.98,
        filter: "blur(2px)",
        opacity: 0.7,
        transition: springs.fluid,
    },
};

/** Command palette animation */
export const commandPaletteVariants = {
    hidden: {
        opacity: 0,
        scale: 0.96,
        y: -10,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: springs.snappy,
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        y: -10,
        transition: { duration: 0.15 },
    },
};

/** Section transition variants */
export const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ...springs.fluid,
            staggerChildren: 0.08,
        },
    },
};

export const sectionChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: springs.fluid,
    },
};
