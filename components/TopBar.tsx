"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { springs } from "@/lib/motion";
import { Wifi, Battery, ChevronDown } from "lucide-react";

export default function TopBar() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })
            );
            setDate(
                now.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                })
            );
        };
        update();
        const interval = setInterval(update, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-[8000] h-[36px] flex items-center justify-between px-5"
            style={{
                background: "rgba(12, 12, 15, 0.7)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...springs.fluid, delay: 0.2 }}
        >
            {/* Left: OS Logo / Menu */}
            <div className="flex items-center gap-4">
                <span
                    className="text-ui-label font-semibold tracking-wide"
                    style={{ color: "var(--text-primary)" }}
                >
                    ✦ Glass OS
                </span>
                <nav className="flex items-center gap-3">
                    {["System", "View", "Window"].map((item) => (
                        <button
                            key={item}
                            className="text-ui-label transition-colors hover:text-white"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Right: Status */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                    <Wifi size={14} />
                    <Battery size={14} />
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className="text-mono-data"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {date}
                    </span>
                    <span
                        className="text-mono-data font-medium"
                        style={{ color: "var(--text-primary)" }}
                    >
                        {time}
                    </span>
                </div>
            </div>
        </motion.header>
    );
}
