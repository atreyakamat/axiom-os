"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { sectionVariants, sectionChildVariants, springs } from "@/lib/motion";

/* ============================================================
   Page 1 — Boot / Entry
   Central floating glass window with parallax cursor tracking.
   ============================================================ */

export default function BootSection() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseX.set((e.clientX - centerX) * 0.015);
            mouseY.set((e.clientY - centerY) * 0.015);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[100dvh] flex items-center justify-center"
            style={{ paddingTop: "36px", paddingBottom: "80px" }}
        >
            <motion.div
                className="relative w-full max-w-[680px] mx-auto px-6"
                style={{ x: springX, y: springY }}
                variants={sectionVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
            >
                {/* Central Glass Window */}
                <motion.div
                    className="rounded-[var(--radius-xl)] overflow-hidden"
                    style={{
                        background: "rgba(15, 17, 21, 0.7)",
                        backdropFilter: "blur(32px) saturate(200%)",
                        WebkitBackdropFilter: "blur(32px) saturate(200%)",
                        border: "1px solid var(--border-luminous)",
                        boxShadow:
                            "0 16px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), 0 0 40px rgba(94,106,210,0.08)",
                    }}
                    variants={sectionChildVariants}
                >
                    {/* Window Header */}
                    <div
                        className="flex items-center px-4 h-[40px]"
                        style={{
                            background: "rgba(22, 24, 29, 0.8)",
                            borderBottom: "1px solid var(--border-subtle)",
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.2)" }} />
                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.2)" }} />
                            <div className="w-3 h-3 rounded-full bg-[#28C840]" style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.2)" }} />
                        </div>
                        <span
                            className="text-body-small flex-1 text-center"
                            style={{ color: "var(--text-tertiary)" }}
                        >
                            Welcome.rtf
                        </span>
                        <div className="w-[52px]" />
                    </div>

                    {/* Hero Content */}
                    <div className="px-10 py-14">
                        <motion.div variants={sectionChildVariants}>
                            <div
                                className="text-grid-label uppercase tracking-[0.15em] mb-4"
                                style={{ color: "var(--accent-primary)" }}
                            >
                                Glass OS v1.0
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-[clamp(32px,5vw,52px)] font-semibold leading-[1.1] tracking-tight mb-6"
                            style={{
                                color: "var(--text-primary)",
                                letterSpacing: "-0.03em",
                            }}
                            variants={sectionChildVariants}
                        >
                            Spatial
                            <br />
                            <span
                                style={{
                                    background: "linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Resonance.
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-body-main max-w-[440px] mb-10"
                            style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}
                            variants={sectionChildVariants}
                        >
                            An operating system that breathes. Depth, clarity, and silence
                            engineered for the next generation of thought.
                        </motion.p>

                        <motion.div className="flex gap-3" variants={sectionChildVariants}>
                            <button
                                className="px-6 py-2.5 rounded-[var(--radius-md)] text-body-small font-medium transition-all duration-300"
                                style={{
                                    background: "var(--accent-primary)",
                                    color: "white",
                                    boxShadow: "0 0 20px rgba(94,106,210,0.3)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = "0 0 30px rgba(94,106,210,0.5)";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "0 0 20px rgba(94,106,210,0.3)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                Initialize System
                            </button>
                            <button
                                className="px-6 py-2.5 rounded-[var(--radius-md)] text-body-small font-medium transition-all duration-300"
                                style={{
                                    background: "rgba(255,255,255,0.05)",
                                    color: "var(--text-secondary)",
                                    border: "1px solid var(--border-subtle)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "var(--border-luminous)";
                                    e.currentTarget.style.color = "var(--text-primary)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                                    e.currentTarget.style.color = "var(--text-secondary)";
                                }}
                            >
                                View Principles
                            </button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Feature Mini-Cards */}
                <motion.div
                    className="grid grid-cols-2 gap-3 mt-5"
                    variants={sectionChildVariants}
                >
                    {[
                        { title: "Refractive Engine", desc: "Real-time layered blur synthesis", icon: "◈" },
                        { title: "Z-Axis Layout", desc: "Spatial hierarchy for deep focus", icon: "◇" },
                    ].map((card) => (
                        <motion.div
                            key={card.title}
                            className="rounded-[var(--radius-lg)] px-5 py-4 transition-all duration-300 cursor-default"
                            style={{
                                background: "rgba(15, 17, 21, 0.5)",
                                backdropFilter: "blur(16px) saturate(150%)",
                                WebkitBackdropFilter: "blur(16px) saturate(150%)",
                                border: "1px solid var(--border-subtle)",
                            }}
                            whileHover={{
                                borderColor: "rgba(94,106,210,0.3)",
                                y: -2,
                                transition: springs.fluid,
                            }}
                        >
                            <div className="text-xl mb-2" style={{ color: "var(--accent-primary)" }}>
                                {card.icon}
                            </div>
                            <div className="text-heading-h3 mb-1" style={{ color: "var(--text-primary)" }}>
                                {card.title}
                            </div>
                            <div className="text-body-small" style={{ color: "var(--text-tertiary)" }}>
                                {card.desc}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
