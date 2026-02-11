"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "@/lib/store";
import { commandPaletteVariants, springs } from "@/lib/motion";
import {
    Search,
    Folder,
    Terminal,
    Layout,
    Palette,
    MessageSquare,
    Settings,
    Moon,
    Copy,
    ArrowRight,
} from "lucide-react";

/* ============================================================
   Command Palette — Raycast-style Cmd+K
   ============================================================ */

interface CommandItem {
    id: string;
    label: string;
    category: string;
    icon: React.ReactNode;
    action: () => void;
}

export default function CommandPalette() {
    const { isCommandPaletteOpen, toggleCommandPalette, openWindow } = useOSStore();
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const commands: CommandItem[] = [
        {
            id: "open-finder",
            label: "Open Finder",
            category: "Apps",
            icon: <Folder size={18} />,
            action: () => {
                openWindow({
                    id: "window-finder",
                    title: "Finder",
                    appId: "finder",
                    isOpen: true,
                    isMinimized: false,
                    isMaximized: false,
                    position: { x: 100, y: 80 },
                    size: { width: 680, height: 460 },
                });
                toggleCommandPalette();
            },
        },
        {
            id: "open-about",
            label: "Open About",
            category: "Apps",
            icon: <Terminal size={18} />,
            action: () => {
                openWindow({
                    id: "window-about",
                    title: "About — Glass OS",
                    appId: "about",
                    isOpen: true,
                    isMinimized: false,
                    isMaximized: false,
                    position: { x: 200, y: 100 },
                    size: { width: 600, height: 420 },
                });
                toggleCommandPalette();
            },
        },
        {
            id: "open-workspace",
            label: "Open Workspace",
            category: "Apps",
            icon: <Layout size={18} />,
            action: () => {
                openWindow({
                    id: "window-workspace",
                    title: "Workspace",
                    appId: "workspace",
                    isOpen: true,
                    isMinimized: false,
                    isMaximized: false,
                    position: { x: 150, y: 60 },
                    size: { width: 750, height: 500 },
                });
                toggleCommandPalette();
            },
        },
        {
            id: "open-design",
            label: "Open Design System",
            category: "Apps",
            icon: <Palette size={18} />,
            action: () => {
                openWindow({
                    id: "window-design",
                    title: "Design System",
                    appId: "design",
                    isOpen: true,
                    isMinimized: false,
                    isMaximized: false,
                    position: { x: 250, y: 90 },
                    size: { width: 640, height: 480 },
                });
                toggleCommandPalette();
            },
        },
        {
            id: "open-messages",
            label: "Open Messages",
            category: "Apps",
            icon: <MessageSquare size={18} />,
            action: () => {
                openWindow({
                    id: "window-messages",
                    title: "Messages",
                    appId: "messages",
                    isOpen: true,
                    isMinimized: false,
                    isMaximized: false,
                    position: { x: 300, y: 120 },
                    size: { width: 500, height: 400 },
                });
                toggleCommandPalette();
            },
        },
        {
            id: "open-settings",
            label: "Open Settings",
            category: "System",
            icon: <Settings size={18} />,
            action: () => {
                openWindow({
                    id: "window-settings",
                    title: "Settings",
                    appId: "settings",
                    isOpen: true,
                    isMinimized: false,
                    isMaximized: false,
                    position: { x: 350, y: 140 },
                    size: { width: 480, height: 380 },
                });
                toggleCommandPalette();
            },
        },
        {
            id: "toggle-theme",
            label: "Toggle Theme",
            category: "System",
            icon: <Moon size={18} />,
            action: () => {
                toggleCommandPalette();
            },
        },
        {
            id: "copy-email",
            label: "Copy Email",
            category: "Actions",
            icon: <Copy size={18} />,
            action: () => {
                navigator.clipboard?.writeText("hello@glassos.dev");
                toggleCommandPalette();
            },
        },
    ];

    const filteredCommands = commands.filter((cmd) =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    );

    // Keyboard shortcut: Cmd+K
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                toggleCommandPalette();
            }
            if (e.key === "Escape" && isCommandPaletteOpen) {
                toggleCommandPalette();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [toggleCommandPalette, isCommandPaletteOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isCommandPaletteOpen) {
            setQuery("");
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isCommandPaletteOpen]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter") {
                e.preventDefault();
                filteredCommands[selectedIndex]?.action();
            }
        },
        [filteredCommands, selectedIndex]
    );

    // Group commands by category
    const grouped = filteredCommands.reduce(
        (acc, cmd) => {
            if (!acc[cmd.category]) acc[cmd.category] = [];
            acc[cmd.category].push(cmd);
            return acc;
        },
        {} as Record<string, CommandItem[]>
    );

    let flatIndex = -1;

    return (
        <AnimatePresence>
            {isCommandPaletteOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-[9500]"
                        style={{ background: "rgba(0, 0, 0, 0.5)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCommandPalette}
                    />

                    {/* Palette */}
                    <motion.div
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[9600] w-full max-w-[560px]"
                        variants={commandPaletteVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div
                            className="rounded-[var(--radius-xl)] overflow-hidden"
                            style={{
                                background: "rgba(15, 17, 21, 0.9)",
                                backdropFilter: "blur(40px) saturate(200%)",
                                WebkitBackdropFilter: "blur(40px) saturate(200%)",
                                border: "1px solid var(--border-luminous)",
                                boxShadow:
                                    "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
                            }}
                            onKeyDown={handleKeyDown}
                        >
                            {/* Search Input */}
                            <div
                                className="flex items-center gap-3 px-5 py-4"
                                style={{ borderBottom: "1px solid var(--border-subtle)" }}
                            >
                                <Search size={20} style={{ color: "var(--text-tertiary)" }} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Type a command or search..."
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setSelectedIndex(0);
                                    }}
                                    className="flex-1 bg-transparent outline-none text-[16px] placeholder:text-[var(--text-tertiary)]"
                                    style={{
                                        color: "var(--text-primary)",
                                        fontFamily: "var(--font-sans)",
                                    }}
                                />
                                <kbd
                                    className="text-ui-label px-1.5 py-0.5 rounded"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        color: "var(--text-tertiary)",
                                        border: "1px solid var(--border-subtle)",
                                        fontSize: "11px",
                                    }}
                                >
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <div className="max-h-[320px] overflow-y-auto py-2">
                                {Object.entries(grouped).map(([category, items]) => (
                                    <div key={category}>
                                        <div
                                            className="px-5 py-1.5 text-grid-label uppercase"
                                            style={{ color: "var(--text-tertiary)" }}
                                        >
                                            {category}
                                        </div>
                                        {items.map((cmd) => {
                                            flatIndex++;
                                            const isSel = flatIndex === selectedIndex;
                                            return (
                                                <button
                                                    key={cmd.id}
                                                    onClick={cmd.action}
                                                    className="w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors"
                                                    style={{
                                                        background: isSel
                                                            ? "rgba(94, 106, 210, 0.12)"
                                                            : "transparent",
                                                        color: isSel
                                                            ? "var(--text-primary)"
                                                            : "var(--text-secondary)",
                                                        borderLeft: isSel
                                                            ? "2px solid var(--accent-primary)"
                                                            : "2px solid transparent",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: isSel
                                                                ? "var(--accent-primary)"
                                                                : "var(--text-tertiary)",
                                                        }}
                                                    >
                                                        {cmd.icon}
                                                    </span>
                                                    <span className="text-body-main flex-1">{cmd.label}</span>
                                                    {isSel && (
                                                        <ArrowRight
                                                            size={14}
                                                            style={{ color: "var(--text-tertiary)" }}
                                                        />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                                {filteredCommands.length === 0 && (
                                    <div
                                        className="px-5 py-8 text-center text-body-small"
                                        style={{ color: "var(--text-tertiary)" }}
                                    >
                                        No results found
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
