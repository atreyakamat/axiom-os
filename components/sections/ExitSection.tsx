"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { sectionVariants, sectionChildVariants, springs } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";

/* ============================================================
   Page 5 — Presence & Exit
   Calm, centered glass panel with personal philosophy and CTA.
   ============================================================ */

export default function ExitSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section
            ref={ref}
            className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-6"
            style={{ paddingTop: "60px", paddingBottom: "100px" }}
        >
            <motion.div
                className="w-full max-w-[520px] mx-auto text-center"
                variants={sectionVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Central Glass Panel */}
                <motion.div
                    className="rounded-[var(--radius-2xl)] p-10 md:p-14"
                    style={{
                        background: "rgba(15, 17, 21, 0.6)",
                        backdropFilter: "blur(32px) saturate(200%)",
                        WebkitBackdropFilter: "blur(32px) saturate(200%)",
                        border: "1px solid var(--border-subtle)",
                        boxShadow:
                            "0 16px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
                    }}
                    variants={sectionChildVariants}
                >
                    {/* Decorative mark */}
                    <motion.div
                        className="mx-auto mb-8 w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                            background: "rgba(94, 106, 210, 0.12)",
                            border: "1px solid rgba(94, 106, 210, 0.25)",
                        }}
                        variants={sectionChildVariants}
                    >
                        <span className="text-2xl">✦</span>
                    </motion.div>

                    <motion.p
                        className="text-body-main mb-2"
                        style={{ color: "var(--text-tertiary)", fontStyle: "italic" }}
                        variants={sectionChildVariants}
                    >
                        A system built with conviction.
                    </motion.p>

                    <motion.h2
                        className="text-[clamp(20px,3vw,28px)] font-semibold leading-tight mb-6"
                        style={{
                            color: "var(--text-primary)",
                            letterSpacing: "-0.02em",
                        }}
                        variants={sectionChildVariants}
                    >
                        Interfaces should feel
                        <br />
                        calm, intentional,
                        <br />
                        <span style={{ color: "var(--accent-primary)" }}>
                            and deeply human.
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-body-small mb-10 max-w-[360px] mx-auto"
                        style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}
                        variants={sectionChildVariants}
                    >
                        Glass OS exists to showcase how modern digital systems should feel —
                        respectful, refined, and responsive to human presence.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={sectionChildVariants}>
                        <motion.button
                            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-[var(--radius-lg)] text-body-main font-medium transition-all duration-400"
                            style={{
                                background: "var(--accent-primary)",
                                color: "white",
                                boxShadow: "0 0 24px rgba(94,106,210,0.3), 0 4px 16px rgba(0,0,0,0.3)",
                            }}
                            whileHover={{
                                scale: 1.04,
                                boxShadow: "0 0 40px rgba(94,106,210,0.5), 0 8px 24px rgba(0,0,0,0.4)",
                            }}
                            whileTap={{ scale: 0.97 }}
                            transition={springs.fluid}
                        >
                            Get in Touch
                            <ArrowUpRight
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Subtle footer text */}
                <motion.p
                    className="mt-10 text-mono-data"
                    style={{ color: "var(--text-tertiary)" }}
                    variants={sectionChildVariants}
                >
                    Designed & built with restraint. © {new Date().getFullYear()} Glass OS
                </motion.p>
            </motion.div>
        </section>
    );
}
