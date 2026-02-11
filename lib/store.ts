"use client";

import { create } from "zustand";

/* ============================================================
   Glass OS Window Manager — Zustand Store
   Manages window lifecycle, focus, z-index stacking, and state.
   ============================================================ */

export interface WindowState {
    id: string;
    title: string;
    appId: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    isFocused: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    minSize?: { width: number; height: number };
}

interface OSState {
    /* Window Manager */
    windows: WindowState[];
    windowOrder: string[]; // z-index stacking order — last = topmost
    activeWindowId: string | null;

    /* Command Palette */
    isCommandPaletteOpen: boolean;

    /* Current section (for scroll-based navigation) */
    currentSection: number;

    /* Actions */
    openWindow: (win: Omit<WindowState, "isFocused">) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    restoreWindow: (id: string) => void;
    updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
    updateWindowSize: (id: string, size: { width: number; height: number }) => void;

    toggleCommandPalette: () => void;
    setCurrentSection: (section: number) => void;
}

export const useOSStore = create<OSState>((set, get) => ({
    windows: [],
    windowOrder: [],
    activeWindowId: null,
    isCommandPaletteOpen: false,
    currentSection: 0,

    openWindow: (win) => {
        const state = get();
        const existing = state.windows.find((w) => w.id === win.id);

        if (existing) {
            // If already open, just focus it
            if (existing.isMinimized) {
                set((s) => ({
                    windows: s.windows.map((w) =>
                        w.id === win.id ? { ...w, isMinimized: false, isOpen: true } : w
                    ),
                }));
            }
            get().focusWindow(win.id);
            return;
        }

        set((s) => ({
            windows: [
                ...s.windows.map((w) => ({ ...w, isFocused: false })),
                { ...win, isFocused: true },
            ],
            windowOrder: [...s.windowOrder, win.id],
            activeWindowId: win.id,
        }));
    },

    closeWindow: (id) => {
        set((s) => {
            const newWindows = s.windows.filter((w) => w.id !== id);
            const newOrder = s.windowOrder.filter((wid) => wid !== id);
            const newActive = newOrder.length > 0 ? newOrder[newOrder.length - 1] : null;
            return {
                windows: newWindows.map((w) => ({
                    ...w,
                    isFocused: w.id === newActive,
                })),
                windowOrder: newOrder,
                activeWindowId: newActive,
            };
        });
    },

    focusWindow: (id) => {
        set((s) => {
            const newOrder = [...s.windowOrder.filter((wid) => wid !== id), id];
            return {
                windows: s.windows.map((w) => ({
                    ...w,
                    isFocused: w.id === id,
                })),
                windowOrder: newOrder,
                activeWindowId: id,
            };
        });
    },

    minimizeWindow: (id) => {
        set((s) => {
            const newOrder = s.windowOrder.filter((wid) => wid !== id);
            const newActive = newOrder.length > 0 ? newOrder[newOrder.length - 1] : null;
            return {
                windows: s.windows.map((w) =>
                    w.id === id
                        ? { ...w, isMinimized: true, isFocused: false }
                        : { ...w, isFocused: w.id === newActive }
                ),
                windowOrder: newOrder,
                activeWindowId: newActive,
            };
        });
    },

    maximizeWindow: (id) => {
        set((s) => ({
            windows: s.windows.map((w) =>
                w.id === id ? { ...w, isMaximized: true } : w
            ),
        }));
    },

    restoreWindow: (id) => {
        set((s) => ({
            windows: s.windows.map((w) =>
                w.id === id ? { ...w, isMaximized: false } : w
            ),
        }));
    },

    updateWindowPosition: (id, position) => {
        set((s) => ({
            windows: s.windows.map((w) =>
                w.id === id ? { ...w, position } : w
            ),
        }));
    },

    updateWindowSize: (id, size) => {
        set((s) => ({
            windows: s.windows.map((w) =>
                w.id === id ? { ...w, size } : w
            ),
        }));
    },

    toggleCommandPalette: () => {
        set((s) => ({ isCommandPaletteOpen: !s.isCommandPaletteOpen }));
    },

    setCurrentSection: (section) => {
        set({ currentSection: section });
    },
}));
