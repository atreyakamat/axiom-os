"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { sectionVariants, sectionChildVariants, springs } from "@/lib/motion";
import { Shield, Zap, Focus, Sparkles, Heart } from "lucide-react";

/* ============================================================
   Page 2 — System Philosophy
   Glass panel grid communicating the OS's core values.
   ============================================================ */

const philosophies = [
    {
        title: "Ad-Free by Design",
        description: "No advertisements, no tracking, no compromise. Your attention belongs to you.",
        icon: <Shield size={22} />,
        accent: "rgba(94, 106, 210, 0.15)",
        accentBorder: "rgba(94, 106, 210, 0.3)",
    },
    {
        title: "Zero Bloatware",
        description: "Every component earns its place. Nothing ships unless it serves a clear purpose.",
        icon: <Zap size={22} />,
        accent: "rgba(76, 201, 240, 0.12)",
        accentBorder: "rgba(76, 201, 240, 0.3)",
    },
    {
        title: "Focus-First UI",
        description: "Interfaces that reduce cognitive load. One task at a time, done with clarity.",
        icon: <Focus size={22} />,
        accent: "rgba(155, 143, 255, 0.12)",
        accentBorder: "rgba(155, 143, 255, 0.3)",
    },
    {
        title: "Intentional Defaults",
        description: "Smart defaults that work for 95% of use cases. Override only when you want to.",
        icon: <Sparkles size={22} />,
        accent: "rgba(94, 106, 210, 0.12)",
        accentBorder: "rgba(94, 106, 210, 0.25)",
    },
    {
        title: "Calm Motion",
        description: "Animations that breathe. No snapping, no rushing — motion that communicates focus.",
        icon: <Heart size={22} />,
        accent: "rgba(155, 143, 255, 0.10)",
        accentBorder: "rgba(155, 143, 255, 0.25)",
    },
];

export default function PhilosophySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section
            ref={ref}
            className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-6"
            style={{ paddingTop: "60px", paddingBottom: "100px" }}
        >
            <motion.div
                className="w-full max-w-[900px] mx-auto"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Section Header */}
                <motion.div className="text-center mb-16" variants={sectionChildVariants}>
                    <div
                        className="text-grid-label uppercase tracking-[0.15em] mb-3"
                        style={{ color: "var(--accent-primary)" }}
                    >
                        System Philosophy
                    </div>
                    <h2
                        className="text-heading-h1 text-[clamp(24px,3.5vw,36px)]"
                        style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
                    >
                        Built on principles, not trends.
                    </h2>
                    <p
                        className="text-body-main mt-3 max-w-[480px] mx-auto"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Every design decision traces back to a single question: does this respect the human using it?
                    </p>
                </motion.div>

                {/* Philosophy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {philosophies.map((item, i) => (
                        <motion.div
                            key={item.title}
                            className="group relative rounded-[var(--radius-lg)] p-6 transition-all duration-500 cursor-default"
                            style={{
                                background: "rgba(15, 17, 21, 0.5)",
                                backdropFilter: "blur(16px) saturate(150%)",
                                WebkitBackdropFilter: "blur(16px) saturate(150%)",
                                border: "1px solid var(--border-subtle)",
                            }}
                            variants={sectionChildVariants}
                            whileHover={{
                                y: -4,
                                scale: 1.02,
                                transition: springs.fluid,
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = item.accentBorder;
                                el.style.background = item.accent;
                                el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${item.accent}`;
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = "var(--border-subtle)";
                                el.style.background = "rgba(15, 17, 21, 0.5)";
                                el.style.boxShadow = "none";
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="mb-4 w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center"
                                style={{
                                    background: item.accent,
                                    color: "var(--text-primary)",
                                    border: `1px solid ${item.accentBorder}`,
                                }}
                            >
                                {item.icon}
                            </div>

                            <h3
                                className="text-heading-h3 mb-2"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {item.title}
                            </h3>
                            <p
                                className="text-body-small"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
