"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { sectionVariants, sectionChildVariants, springs } from "@/lib/motion";
import { Eye, Shield, Zap, Palette, Focus } from "lucide-react";

/* ============================================================
   Page 3 — OS Workspace Showcase
   Floating glass panels at varying depths demonstrating
   system-level UI thinking and layout mastery.
   ============================================================ */

const workspacePanels = [
    {
        id: "vision",
        title: "Vision",
        subtitle: "Crystal-clear purpose in every pixel",
        content: "Interfaces should feel inevitable — as if no other arrangement of elements was possible. Vision is the alignment of aesthetics with intention.",
        icon: <Eye size={20} />,
        depth: 0,
        gridArea: "1 / 1 / 3 / 2",
        accent: "#5E6AD2",
    },
    {
        id: "focus",
        title: "Focus",
        subtitle: "One task, done with absolute clarity",
        content: "The system clears the path. Distractions dissolve. What matters sharpens into view.",
        icon: <Focus size={20} />,
        depth: 1,
        gridArea: "1 / 2 / 2 / 3",
        accent: "#4CC9F0",
    },
    {
        id: "privacy",
        title: "Privacy",
        subtitle: "Your data stays yours. Always.",
        content: "Zero telemetry. Zero tracking. Every process runs locally, in your domain, under your control.",
        icon: <Shield size={20} />,
        depth: 2,
        gridArea: "2 / 2 / 3 / 3",
        accent: "#9B8FFF",
    },
    {
        id: "performance",
        title: "Performance",
        subtitle: "60fps at every interaction",
        content: "Hardware-accelerated rendering. Spring physics on the compositor thread. No jank, ever.",
        icon: <Zap size={20} />,
        depth: 1,
        gridArea: "1 / 3 / 2 / 4",
        accent: "#22D3EE",
    },
    {
        id: "design-system",
        title: "Design System",
        subtitle: "Consistency that scales infinitely",
        content: "Every token, every spacing unit, every motion curve is defined once and used everywhere.",
        icon: <Palette size={20} />,
        depth: 0,
        gridArea: "2 / 3 / 3 / 4",
        accent: "#F472B6",
    },
];

export default function WorkspaceSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section
            ref={ref}
            className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-6"
            style={{ paddingTop: "60px", paddingBottom: "100px" }}
        >
            <motion.div
                className="w-full max-w-[1000px] mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Section Header */}
                <motion.div className="text-center mb-16" variants={sectionChildVariants}>
                    <div
                        className="text-grid-label uppercase tracking-[0.15em] mb-3"
                        style={{ color: "var(--accent-secondary)" }}
                    >
                        OS Workspace
                    </div>
                    <h2
                        className="text-heading-h1 text-[clamp(24px,3.5vw,36px)]"
                        style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
                    >
                        Architecture that thinks in layers.
                    </h2>
                    <p
                        className="text-body-main mt-3 max-w-[500px] mx-auto"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Floating surfaces at varying depths. Hover to bring a concept into focus — watch others recede.
                    </p>
                </motion.div>

                {/* Workspace Grid */}
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridTemplateRows: "repeat(2, minmax(200px, auto))",
                    }}
                >
                    {workspacePanels.map((panel) => {
                        const isHovered = hoveredId === panel.id;
                        const isOtherHovered = hoveredId !== null && !isHovered;

                        return (
                            <motion.div
                                key={panel.id}
                                className="relative rounded-[var(--radius-xl)] p-6 cursor-default overflow-hidden"
                                style={{
                                    gridArea: panel.gridArea,
                                    background: isHovered
                                        ? `rgba(15, 17, 21, 0.8)`
                                        : "rgba(15, 17, 21, 0.5)",
                                    backdropFilter: isHovered
                                        ? "blur(32px) saturate(200%)"
                                        : "blur(16px) saturate(150%)",
                                    WebkitBackdropFilter: isHovered
                                        ? "blur(32px) saturate(200%)"
                                        : "blur(16px) saturate(150%)",
                                    border: isHovered
                                        ? `1px solid ${panel.accent}40`
                                        : "1px solid var(--border-subtle)",
                                    boxShadow: isHovered
                                        ? `0 12px 40px rgba(0,0,0,0.4), 0 0 24px ${panel.accent}15`
                                        : "0 4px 16px rgba(0,0,0,0.2)",
                                    transformOrigin: "center",
                                }}
                                variants={sectionChildVariants}
                                animate={{
                                    scale: isHovered ? 1.03 : isOtherHovered ? 0.97 : 1,
                                    opacity: isOtherHovered ? 0.5 : 1,
                                    filter: isOtherHovered ? "blur(2px)" : "blur(0px)",
                                    y: isHovered ? -6 : 0,
                                }}
                                transition={springs.fluid}
                                onMouseEnter={() => setHoveredId(panel.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Accent Glow Orb */}
                                <div
                                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle, ${panel.accent}, transparent 70%)`,
                                        filter: "blur(30px)",
                                    }}
                                />

                                {/* Icon */}
                                <div
                                    className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center mb-4"
                                    style={{
                                        background: `${panel.accent}18`,
                                        color: panel.accent,
                                        border: `1px solid ${panel.accent}30`,
                                    }}
                                >
                                    {panel.icon}
                                </div>

                                <h3
                                    className="text-heading-h3 mb-1"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {panel.title}
                                </h3>
                                <p
                                    className="text-ui-label mb-3"
                                    style={{ color: panel.accent }}
                                >
                                    {panel.subtitle}
                                </p>
                                <p
                                    className="text-body-small"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    {panel.content}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}
