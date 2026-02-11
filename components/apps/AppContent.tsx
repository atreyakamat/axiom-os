"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { sectionChildVariants } from "@/lib/motion";
import {
    Folder,
    FileText,
    Image,
    Code,
    ChevronRight,
    Grid3X3,
    List,
} from "lucide-react";

/* ============================================================
   Window App Content — Finder
   File-system style portfolio view with metadata columns.
   ============================================================ */

const projects = [
    {
        name: "Glass OS Concept",
        kind: "Design System",
        modified: "2026-02-11",
        size: "24.8 MB",
        icon: <Folder size={18} style={{ color: "#4CC9F0" }} />,
    },
    {
        name: "Spatial Resonance",
        kind: "React Application",
        modified: "2026-01-28",
        size: "18.4 MB",
        icon: <Code size={18} style={{ color: "#5E6AD2" }} />,
    },
    {
        name: "Depth Studies",
        kind: "Case Study",
        modified: "2025-12-15",
        size: "6.2 MB",
        icon: <FileText size={18} style={{ color: "#9B8FFF" }} />,
    },
    {
        name: "Motion Library",
        kind: "Design System",
        modified: "2025-11-20",
        size: "12.1 MB",
        icon: <Code size={18} style={{ color: "#22D3EE" }} />,
    },
    {
        name: "Glass Textures",
        kind: "Asset Pack",
        modified: "2025-10-05",
        size: "42.6 MB",
        icon: <Image size={18} style={{ color: "#F472B6" }} />,
    },
];

export function FinderContent() {
    const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

    return (
        <div>
            {/* Toolbar */}
            <div
                className="flex items-center justify-between mb-4 pb-3"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
                <div className="flex items-center gap-1 text-mono-data" style={{ color: "var(--text-tertiary)" }}>
                    <span>~/projects</span>
                    <ChevronRight size={12} />
                    <span style={{ color: "var(--text-secondary)" }}>web</span>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => setViewMode("list")}
                        className="p-1.5 rounded"
                        style={{
                            background: viewMode === "list" ? "rgba(255,255,255,0.06)" : "transparent",
                            color: viewMode === "list" ? "var(--text-primary)" : "var(--text-tertiary)",
                        }}
                    >
                        <List size={14} />
                    </button>
                    <button
                        onClick={() => setViewMode("grid")}
                        className="p-1.5 rounded"
                        style={{
                            background: viewMode === "grid" ? "rgba(255,255,255,0.06)" : "transparent",
                            color: viewMode === "grid" ? "var(--text-primary)" : "var(--text-tertiary)",
                        }}
                    >
                        <Grid3X3 size={14} />
                    </button>
                </div>
            </div>

            {viewMode === "list" ? (
                <div>
                    {/* Column Headers */}
                    <div
                        className="grid gap-3 px-3 py-1.5 text-grid-label uppercase"
                        style={{
                            gridTemplateColumns: "minmax(0, 2fr) 1fr 1fr 80px",
                            color: "var(--text-tertiary)",
                            borderBottom: "1px solid var(--border-subtle)",
                        }}
                    >
                        <span>Name</span>
                        <span>Kind</span>
                        <span>Modified</span>
                        <span>Size</span>
                    </div>

                    {/* Rows */}
                    {projects.map((proj, i) => (
                        <div
                            key={proj.name}
                            className="grid gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] cursor-default transition-colors"
                            style={{
                                gridTemplateColumns: "minmax(0, 2fr) 1fr 1fr 80px",
                                background:
                                    selectedIndex === i
                                        ? "rgba(94, 106, 210, 0.12)"
                                        : "transparent",
                                borderLeft:
                                    selectedIndex === i
                                        ? "2px solid var(--accent-primary)"
                                        : "2px solid transparent",
                            }}
                            onClick={() => setSelectedIndex(i)}
                        >
                            <span className="flex items-center gap-2 text-body-small" style={{ color: "var(--text-primary)" }}>
                                {proj.icon}
                                {proj.name}
                            </span>
                            <span className="text-body-small" style={{ color: "var(--text-secondary)" }}>
                                {proj.kind}
                            </span>
                            <span className="text-mono-data" style={{ color: "var(--text-tertiary)" }}>
                                {proj.modified}
                            </span>
                            <span className="text-mono-data" style={{ color: "var(--text-tertiary)" }}>
                                {proj.size}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-3">
                    {projects.map((proj, i) => (
                        <div
                            key={proj.name}
                            className="flex flex-col items-center gap-2 p-4 rounded-[var(--radius-md)] cursor-default transition-colors"
                            style={{
                                background:
                                    selectedIndex === i
                                        ? "rgba(94, 106, 210, 0.12)"
                                        : "rgba(255,255,255,0.02)",
                                border:
                                    selectedIndex === i
                                        ? "1px solid rgba(94, 106, 210, 0.3)"
                                        : "1px solid transparent",
                            }}
                            onClick={() => setSelectedIndex(i)}
                        >
                            <div
                                className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid var(--border-subtle)",
                                }}
                            >
                                {proj.icon}
                            </div>
                            <span className="text-grid-label text-center" style={{ color: "var(--text-primary)" }}>
                                {proj.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ============================================================
   Window App Content — About (Terminal/Markdown Viewer)
   ============================================================ */

export function AboutContent() {
    return (
        <div
            className="font-mono text-[13px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
        >
            <div className="mb-4">
                <span style={{ color: "var(--accent-primary)" }}>$</span>{" "}
                <span style={{ color: "var(--text-primary)" }}>cat about.md</span>
            </div>
            <div className="space-y-3">
                <p>
                    <span style={{ color: "var(--accent-tertiary)" }}># </span>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                        Glass OS — Design Statement
                    </span>
                </p>
                <p>
                    Glass OS is a visual statement about how modern digital systems should feel:
                    calm, intentional, respectful, and refined.
                </p>
                <p>
                    It exists to showcase not just how interfaces look, but how they{" "}
                    <span style={{ color: "var(--accent-primary)" }}>behave</span>,{" "}
                    <span style={{ color: "var(--accent-secondary)" }}>breathe</span>, and{" "}
                    <span style={{ color: "var(--accent-tertiary)" }}>respond</span> to human
                    presence.
                </p>
                <p>
                    <span style={{ color: "var(--accent-tertiary)" }}>## </span>
                    <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                        Principles
                    </span>
                </p>
                <ul className="space-y-1 pl-4">
                    <li>→ Deep glassmorphism. Not surface-level.</li>
                    <li>→ Spring physics. Not easing.</li>
                    <li>→ Spatial hierarchy. Not flat.</li>
                    <li>→ Calm confidence. Not flashiness.</li>
                </ul>
                <p className="pt-2" style={{ color: "var(--text-tertiary)" }}>
                    <span style={{ color: "var(--accent-primary)" }}>$</span> █
                </p>
            </div>
        </div>
    );
}

/* ============================================================
   Window App Content — Messages (Contact Form)
   ============================================================ */

export function MessagesContent() {
    return (
        <div className="space-y-4">
            <div
                className="flex items-center gap-3 pb-3"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-grid-label"
                    style={{
                        background: "rgba(94, 106, 210, 0.2)",
                        color: "var(--accent-primary)",
                    }}
                >
                    ✦
                </div>
                <div>
                    <div className="text-body-small font-medium" style={{ color: "var(--text-primary)" }}>
                        Glass OS Team
                    </div>
                    <div className="text-mono-data" style={{ color: "var(--text-tertiary)" }}>
                        hello@glassos.dev
                    </div>
                </div>
            </div>

            {/* Conversation bubbles */}
            <div className="space-y-3">
                <div
                    className="rounded-[var(--radius-lg)] rounded-tl-sm px-4 py-3 max-w-[80%]"
                    style={{
                        background: "rgba(94, 106, 210, 0.12)",
                        border: "1px solid rgba(94, 106, 210, 0.2)",
                    }}
                >
                    <p className="text-body-small" style={{ color: "var(--text-primary)" }}>
                        Welcome to Glass OS. We believe interfaces should be felt, not just seen.
                    </p>
                    <span className="text-mono-data block mt-1" style={{ color: "var(--text-tertiary)", fontSize: "10px" }}>
                        09:30 AM
                    </span>
                </div>
            </div>

            {/* Input */}
            <div className="pt-2">
                <div
                    className="flex items-center gap-2 px-4 py-3 rounded-[var(--radius-lg)]"
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid var(--border-subtle)",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent outline-none text-body-small"
                        style={{ color: "var(--text-primary)" }}
                    />
                    <button
                        className="px-3 py-1 rounded-[var(--radius-md)] text-grid-label font-medium"
                        style={{
                            background: "var(--accent-primary)",
                            color: "white",
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   Window App Content — Settings
   ============================================================ */

export function SettingsContent() {
    return (
        <div className="space-y-5">
            {/* Appearance */}
            <div>
                <h4 className="text-heading-h3 mb-3" style={{ color: "var(--text-primary)" }}>
                    Appearance
                </h4>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-body-small" style={{ color: "var(--text-secondary)" }}>
                            Theme
                        </span>
                        <div
                            className="px-3 py-1 rounded-[var(--radius-md)] text-grid-label"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid var(--border-subtle)",
                                color: "var(--text-secondary)",
                            }}
                        >
                            System Dark
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-body-small" style={{ color: "var(--text-secondary)" }}>
                            Glass Blur
                        </span>
                        <div
                            className="w-10 h-5 rounded-full relative cursor-pointer"
                            style={{ background: "var(--accent-primary)" }}
                        >
                            <div
                                className="w-4 h-4 rounded-full absolute top-0.5 right-0.5"
                                style={{ background: "white" }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-body-small" style={{ color: "var(--text-secondary)" }}>
                            Reduce Motion
                        </span>
                        <div
                            className="w-10 h-5 rounded-full relative cursor-pointer"
                            style={{ background: "var(--border-luminous)" }}
                        >
                            <div
                                className="w-4 h-4 rounded-full absolute top-0.5 left-0.5"
                                style={{ background: "var(--text-secondary)" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Wallpaper */}
            <div>
                <h4 className="text-heading-h3 mb-3" style={{ color: "var(--text-primary)" }}>
                    Wallpaper
                </h4>
                <div className="grid grid-cols-4 gap-2">
                    {[
                        { name: "Deep Space", color: "#080808" },
                        { name: "Nebula", color: "#0F1115" },
                        { name: "Midnight", color: "#0A0E1A" },
                        { name: "Void", color: "#050505" },
                    ].map((w) => (
                        <div
                            key={w.name}
                            className="aspect-[4/3] rounded-[var(--radius-md)] cursor-pointer hover:ring-2 hover:ring-[var(--accent-primary)] transition-all"
                            style={{
                                background: w.color,
                                border: "1px solid var(--border-subtle)",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* System Info */}
            <div
                className="pt-4"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
            >
                <div className="text-mono-data space-y-1" style={{ color: "var(--text-tertiary)" }}>
                    <p>Glass OS v1.0.0</p>
                    <p>Build: 2026.02.11</p>
                    <p>Kernel: Spatial-UI/1.0</p>
                </div>
            </div>
        </div>
    );
}
