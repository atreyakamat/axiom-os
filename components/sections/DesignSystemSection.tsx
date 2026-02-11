"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { sectionVariants, sectionChildVariants, springs } from "@/lib/motion";

/* ============================================================
   Page 4 — Design System & Interaction Language
   Showcases color palette, blur/translucency levels,
   border radius system, and motion timing.
   ============================================================ */

const colorTokens = [
    { name: "bg-void", hex: "#080808", desc: "Desktop base" },
    { name: "surface-base", hex: "#0F1115", desc: "Window background" },
    { name: "surface-elevated", hex: "#16181D", desc: "Modals / dropdowns" },
    { name: "border-subtle", hex: "#22252B", desc: "Inactive borders" },
    { name: "border-luminous", hex: "#3F4451", desc: "Active borders" },
    { name: "accent-primary", hex: "#5E6AD2", desc: "Linear Purple" },
    { name: "accent-cyan", hex: "#4CC9F0", desc: "Secondary accent" },
    { name: "accent-lavender", hex: "#9B8FFF", desc: "Tertiary accent" },
];

const blurLevels = [
    { label: "SM", value: "8px", desc: "Subtle hints" },
    { label: "MD", value: "16px", desc: "Panels" },
    { label: "LG", value: "24px", desc: "Primary glass" },
    { label: "XL", value: "40px", desc: "Premium frosted" },
];

const radiusSystem = [
    { label: "SM", value: "6px" },
    { label: "MD", value: "10px" },
    { label: "LG", value: "14px" },
    { label: "XL", value: "20px" },
    { label: "2XL", value: "28px" },
];

const motionTokens = [
    { name: "Snappy", stiffness: 500, damping: 30, mass: 1, feel: "Instant, precise" },
    { name: "Fluid", stiffness: 300, damping: 30, mass: 1, feel: "Smooth, confident" },
    { name: "Heavy", stiffness: 200, damping: 40, mass: 1.5, feel: "Deliberate, weighty" },
    { name: "Bouncy", stiffness: 400, damping: 15, mass: 1, feel: "Playful, energetic" },
];

export default function DesignSystemSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section
            ref={ref}
            className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-6"
            style={{ paddingTop: "60px", paddingBottom: "100px" }}
        >
            <motion.div
                className="w-full max-w-[960px] mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Section Header */}
                <motion.div className="text-center mb-16" variants={sectionChildVariants}>
                    <div
                        className="text-grid-label uppercase tracking-[0.15em] mb-3"
                        style={{ color: "var(--accent-tertiary)" }}
                    >
                        Design System
                    </div>
                    <h2
                        className="text-heading-h1 text-[clamp(24px,3.5vw,36px)]"
                        style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
                    >
                        Consistency at every scale.
                    </h2>
                    <p
                        className="text-body-main mt-3 max-w-[460px] mx-auto"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Every token is defined once and used everywhere. Quality that&apos;s repeatable, not accidental.
                    </p>
                </motion.div>

                {/* Grid of Design Token Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Color Palette */}
                    <motion.div
                        className="rounded-[var(--radius-xl)] p-6"
                        style={{
                            background: "rgba(15, 17, 21, 0.5)",
                            backdropFilter: "blur(16px) saturate(150%)",
                            WebkitBackdropFilter: "blur(16px) saturate(150%)",
                            border: "1px solid var(--border-subtle)",
                        }}
                        variants={sectionChildVariants}
                    >
                        <h3 className="text-heading-h3 mb-4" style={{ color: "var(--text-primary)" }}>
                            Color Palette
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                            {colorTokens.map((t) => (
                                <motion.div
                                    key={t.name}
                                    className="flex flex-col items-center gap-1.5 cursor-default"
                                    whileHover={{ scale: 1.08, transition: springs.snappy }}
                                >
                                    <div
                                        className="w-full aspect-square rounded-[var(--radius-md)]"
                                        style={{
                                            background: t.hex,
                                            border: "1px solid var(--border-subtle)",
                                            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                                        }}
                                    />
                                    <span className="text-mono-data" style={{ color: "var(--text-tertiary)", fontSize: "10px" }}>
                                        {t.hex}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Blur Levels */}
                    <motion.div
                        className="rounded-[var(--radius-xl)] p-6"
                        style={{
                            background: "rgba(15, 17, 21, 0.5)",
                            backdropFilter: "blur(16px) saturate(150%)",
                            WebkitBackdropFilter: "blur(16px) saturate(150%)",
                            border: "1px solid var(--border-subtle)",
                        }}
                        variants={sectionChildVariants}
                    >
                        <h3 className="text-heading-h3 mb-4" style={{ color: "var(--text-primary)" }}>
                            Blur & Translucency
                        </h3>
                        <div className="space-y-3">
                            {blurLevels.map((b) => (
                                <div key={b.label} className="flex items-center gap-3">
                                    <div
                                        className="w-16 h-10 rounded-[var(--radius-sm)] flex items-center justify-center shrink-0"
                                        style={{
                                            background: "rgba(94, 106, 210, 0.3)",
                                            backdropFilter: `blur(${b.value})`,
                                            WebkitBackdropFilter: `blur(${b.value})`,
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <span className="text-grid-label" style={{ color: "var(--text-primary)" }}>
                                            {b.label}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-mono-data" style={{ color: "var(--text-primary)" }}>
                                            {b.value}
                                        </div>
                                        <div className="text-mono-data" style={{ color: "var(--text-tertiary)", fontSize: "10px" }}>
                                            {b.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Border Radius */}
                    <motion.div
                        className="rounded-[var(--radius-xl)] p-6"
                        style={{
                            background: "rgba(15, 17, 21, 0.5)",
                            backdropFilter: "blur(16px) saturate(150%)",
                            WebkitBackdropFilter: "blur(16px) saturate(150%)",
                            border: "1px solid var(--border-subtle)",
                        }}
                        variants={sectionChildVariants}
                    >
                        <h3 className="text-heading-h3 mb-4" style={{ color: "var(--text-primary)" }}>
                            Border Radius
                        </h3>
                        <div className="flex items-end gap-3 flex-wrap">
                            {radiusSystem.map((r) => (
                                <motion.div
                                    key={r.label}
                                    className="flex flex-col items-center gap-2 cursor-default"
                                    whileHover={{ y: -3, transition: springs.snappy }}
                                >
                                    <div
                                        className="w-14 h-14"
                                        style={{
                                            borderRadius: r.value,
                                            border: "2px solid var(--accent-primary)",
                                            background: "rgba(94, 106, 210, 0.08)",
                                        }}
                                    />
                                    <div className="text-center">
                                        <div className="text-grid-label" style={{ color: "var(--text-secondary)" }}>
                                            {r.label}
                                        </div>
                                        <div className="text-mono-data" style={{ color: "var(--text-tertiary)", fontSize: "10px" }}>
                                            {r.value}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Motion Timing */}
                    <motion.div
                        className="rounded-[var(--radius-xl)] p-6"
                        style={{
                            background: "rgba(15, 17, 21, 0.5)",
                            backdropFilter: "blur(16px) saturate(150%)",
                            WebkitBackdropFilter: "blur(16px) saturate(150%)",
                            border: "1px solid var(--border-subtle)",
                        }}
                        variants={sectionChildVariants}
                    >
                        <h3 className="text-heading-h3 mb-4" style={{ color: "var(--text-primary)" }}>
                            Motion Timing
                        </h3>
                        <div className="space-y-3">
                            {motionTokens.map((m) => (
                                <motion.div
                                    key={m.name}
                                    className="flex items-center gap-3 p-2 rounded-[var(--radius-sm)] cursor-default"
                                    whileHover={{
                                        background: "rgba(255,255,255,0.03)",
                                        transition: { duration: 0.2 },
                                    }}
                                >
                                    {/* Animated dot preview */}
                                    <motion.div
                                        className="w-3 h-3 rounded-full shrink-0"
                                        style={{ background: "var(--accent-primary)" }}
                                        whileHover={{
                                            x: 20,
                                            transition: {
                                                type: "spring",
                                                stiffness: m.stiffness,
                                                damping: m.damping,
                                                mass: m.mass,
                                            },
                                        }}
                                    />
                                    <div className="flex-1">
                                        <div className="text-body-small font-medium" style={{ color: "var(--text-primary)" }}>
                                            {m.name}
                                        </div>
                                        <div className="text-mono-data" style={{ color: "var(--text-tertiary)", fontSize: "10px" }}>
                                            S:{m.stiffness} D:{m.damping} M:{m.mass} — {m.feel}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
