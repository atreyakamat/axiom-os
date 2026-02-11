"use client";

import React from "react";
import { useOSStore } from "@/lib/store";
import AmbientBackground from "@/components/AmbientBackground";
import TopBar from "@/components/TopBar";
import Dock from "@/components/Dock";
import CommandPalette from "@/components/CommandPalette";
import GlassWindow from "@/components/GlassWindow";
import BootSection from "@/components/sections/BootSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import WorkspaceSection from "@/components/sections/WorkspaceSection";
import DesignSystemSection from "@/components/sections/DesignSystemSection";
import ExitSection from "@/components/sections/ExitSection";
import {
    FinderContent,
    AboutContent,
    MessagesContent,
    SettingsContent,
} from "@/components/apps/AppContent";

/* ============================================================
   Desktop — The main OS shell combining all layers.
   ============================================================ */

function getWindowContent(appId: string) {
    switch (appId) {
        case "finder":
            return <FinderContent />;
        case "about":
            return <AboutContent />;
        case "messages":
            return <MessagesContent />;
        case "settings":
            return <SettingsContent />;
        case "workspace":
            return (
                <div className="text-body-main" style={{ color: "var(--text-secondary)" }}>
                    <p className="mb-3">The Workspace view demonstrates system-level layout thinking.</p>
                    <p>Floating panels at varying depths create an architectural experience that communicates design maturity. Hover over the panels in the section below to see focus-based depth shifts.</p>
                </div>
            );
        case "design":
            return (
                <div className="text-body-main" style={{ color: "var(--text-secondary)" }}>
                    <p className="mb-3">The Design System ensures consistency and repeatability.</p>
                    <p>Every color, blur level, border radius, and motion curve is defined as a token — used everywhere, overridden nowhere. Scroll down to explore the token showcase.</p>
                </div>
            );
        default:
            return (
                <div className="text-body-small" style={{ color: "var(--text-tertiary)" }}>
                    No content available for this app.
                </div>
            );
    }
}

export default function Desktop() {
    const { windows, windowOrder } = useOSStore();

    return (
        <div className="relative w-full h-[100dvh] overflow-hidden">
            {/* Layer 0: Ambient Background */}
            <AmbientBackground />

            {/* Layer 1: Top Menu Bar */}
            <TopBar />

            {/* Layer 2: Scrollable Sections (the "wallpaper content") */}
            <main
                className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden"
                style={{
                    scrollBehavior: "smooth",
                    scrollSnapType: "y proximity",
                }}
            >
                <div style={{ scrollSnapAlign: "start" }}>
                    <BootSection />
                </div>
                <div style={{ scrollSnapAlign: "start" }}>
                    <PhilosophySection />
                </div>
                <div style={{ scrollSnapAlign: "start" }}>
                    <WorkspaceSection />
                </div>
                <div style={{ scrollSnapAlign: "start" }}>
                    <DesignSystemSection />
                </div>
                <div style={{ scrollSnapAlign: "start" }}>
                    <ExitSection />
                </div>
            </main>

            {/* Layer 3: Floating Windows */}
            {windows
                .filter((w) => w.isOpen)
                .map((win) => {
                    const zIdx = windowOrder.indexOf(win.id) * 10 + 100;
                    return (
                        <GlassWindow key={win.id} window={win} zIndex={zIdx}>
                            {getWindowContent(win.appId)}
                        </GlassWindow>
                    );
                })}

            {/* Layer 4: Command Palette */}
            <CommandPalette />

            {/* Layer 5: Dock */}
            <Dock />
        </div>
    );
}
