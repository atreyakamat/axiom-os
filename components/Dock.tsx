"use client";

import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useOSStore } from "@/lib/store";
import { springs } from "@/lib/motion";
import {
    Folder,
    MessageSquare,
    Palette,
    Settings,
    Terminal,
    Search,
    Layout,
} from "lucide-react";

/* ============================================================
   Dock App Definitions
   ============================================================ */

interface DockApp {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const dockApps: DockApp[] = [
    { id: "finder", label: "Finder", icon: <Folder size={28} /> },
    { id: "about", label: "About", icon: <Terminal size={28} /> },
    { id: "workspace", label: "Workspace", icon: <Layout size={28} /> },
    { id: "design", label: "Design System", icon: <Palette size={28} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={28} /> },
];

const dockUtils: DockApp[] = [
    { id: "search", label: "Search", icon: <Search size={28} /> },
    { id: "settings", label: "Settings", icon: <Settings size={28} /> },
];

/* ============================================================
   Individual Dock Icon with Fisheye Magnification
   ============================================================ */

const ICON_BASE = 48;
const ICON_MAX = 72;
const INTERACTION_RANGE = 150;

interface DockIconProps {
    app: DockApp;
    mouseX: ReturnType<typeof useMotionValue<number>>;
    onActivate: (id: string) => void;
    isActive: boolean;
}

function DockIcon({ app, mouseX, onActivate, isActive }: DockIconProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = React.useState(false);

    // Calculate distance from cursor to this icon center
    const distance = useTransform(mouseX, (val: number) => {
        if (!ref.current || val === -999) return INTERACTION_RANGE + 1;
        const rect = ref.current.getBoundingClientRect();
        const iconCenter = rect.left + rect.width / 2;
        return Math.abs(val - iconCenter);
    });

    // Sine-wave magnification within interaction range
    const iconSize = useTransform(distance, (d: number) => {
        if (d > INTERACTION_RANGE) return ICON_BASE;
        const scale = Math.cos((d / INTERACTION_RANGE) * (Math.PI / 2));
        return ICON_BASE + (ICON_MAX - ICON_BASE) * scale;
    });

    const springSize = useSpring(iconSize, {
        stiffness: 400,
        damping: 25,
        mass: 0.5,
    });

    return (
        <motion.div
            ref={ref}
            className="relative flex flex-col items-center justify-end"
            style={{ width: springSize, height: springSize }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onActivate(app.id)}
            whileTap={{ scale: 0.85 }}
            transition={springs.snappy}
        >
            {/* Tooltip */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        className="absolute -top-10 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-50"
                        style={{
                            background: "var(--surface-glass-hover)",
                            backdropFilter: "blur(16px)",
                            border: "1px solid var(--border-subtle)",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "var(--text-primary)",
                        }}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.1 }}
                    >
                        {app.label}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Icon Container */}
            <div
                className="w-full h-full flex items-center justify-center rounded-[var(--radius-lg)] transition-colors duration-200"
                style={{
                    background: hovered
                        ? "rgba(94, 106, 210, 0.15)"
                        : "rgba(255, 255, 255, 0.05)",
                    border: hovered
                        ? "1px solid rgba(94, 106, 210, 0.3)"
                        : "1px solid rgba(255, 255, 255, 0.06)",
                    color: hovered ? "var(--accent-primary)" : "var(--text-secondary)",
                    boxShadow: hovered
                        ? "0 0 12px rgba(94, 106, 210, 0.2), inset 0 0 0 1px rgba(255,255,255,0.08)"
                        : "inset 0 0 0 1px rgba(255,255,255,0.03)",
                }}
            >
                {app.icon}
            </div>

            {/* Active Indicator Dot */}
            {isActive && (
                <motion.div
                    className="absolute -bottom-2 w-1 h-1 rounded-full"
                    style={{
                        background: "white",
                        boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.4)",
                    }}
                    layoutId={`dock-active-${app.id}`}
                />
            )}
        </motion.div>
    );
}

/* ============================================================
   Dock Component
   ============================================================ */

export default function Dock() {
    const mouseX = useMotionValue(-999);
    const { windows, openWindow, toggleCommandPalette } = useOSStore();

    const openAppIds = windows.filter((w) => w.isOpen && !w.isMinimized).map((w) => w.appId);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            mouseX.set(e.clientX);
        },
        [mouseX]
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(-999);
    }, [mouseX]);

    const handleActivateApp = useCallback(
        (id: string) => {
            if (id === "search") {
                toggleCommandPalette();
                return;
            }

            const appConfigs: Record<string, { title: string; x: number; y: number; w: number; h: number }> = {
                finder: { title: "Finder", x: 100, y: 80, w: 680, h: 460 },
                about: { title: "About — Glass OS", x: 200, y: 100, w: 600, h: 420 },
                workspace: { title: "Workspace", x: 150, y: 60, w: 750, h: 500 },
                design: { title: "Design System", x: 250, y: 90, w: 640, h: 480 },
                messages: { title: "Messages", x: 300, y: 120, w: 500, h: 400 },
                settings: { title: "Settings", x: 350, y: 140, w: 480, h: 380 },
            };

            const cfg = appConfigs[id] || { title: id, x: 200, y: 100, w: 600, h: 400 };

            openWindow({
                id: `window-${id}`,
                title: cfg.title,
                appId: id,
                isOpen: true,
                isMinimized: false,
                isMaximized: false,
                position: { x: cfg.x, y: cfg.y },
                size: { width: cfg.w, height: cfg.h },
            });
        },
        [openWindow, toggleCommandPalette]
    );

    return (
        <motion.footer
            className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9000] flex items-end gap-1.5 px-3 py-2 rounded-[var(--radius-2xl)]"
            style={{
                background: "rgba(18, 18, 18, 0.6)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid var(--border-subtle)",
                boxShadow:
                    "0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
            role="navigation"
            aria-label="Application Dock"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...springs.heavy, delay: 0.6 }}
        >
            {/* Main Apps */}
            {dockApps.map((app) => (
                <DockIcon
                    key={app.id}
                    app={app}
                    mouseX={mouseX}
                    onActivate={handleActivateApp}
                    isActive={openAppIds.includes(app.id)}
                />
            ))}

            {/* Separator */}
            <div
                className="w-px h-8 mx-1 self-center"
                style={{ background: "var(--border-subtle)" }}
            />

            {/* Utility Apps */}
            {dockUtils.map((app) => (
                <DockIcon
                    key={app.id}
                    app={app}
                    mouseX={mouseX}
                    onActivate={handleActivateApp}
                    isActive={openAppIds.includes(app.id)}
                />
            ))}
        </motion.footer>
    );
}
