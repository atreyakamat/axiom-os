"use client";

import React, { useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore, type WindowState } from "@/lib/store";
import { windowOpenVariants } from "@/lib/motion";

interface GlassWindowProps {
    window: WindowState;
    children: React.ReactNode;
    zIndex: number;
}

export default function GlassWindow({ window: win, children, zIndex }: GlassWindowProps) {
    const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, restoreWindow, updateWindowPosition } = useOSStore();
    const constraintsRef = useRef<HTMLDivElement | null>(null);
    const dragStartPos = useRef({ x: 0, y: 0 });

    const handlePointerDown = useCallback(() => {
        focusWindow(win.id);
    }, [focusWindow, win.id]);

    const handleClose = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        closeWindow(win.id);
    }, [closeWindow, win.id]);

    const handleMinimize = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        minimizeWindow(win.id);
    }, [minimizeWindow, win.id]);

    const handleMaximize = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (win.isMaximized) {
            restoreWindow(win.id);
        } else {
            maximizeWindow(win.id);
        }
    }, [maximizeWindow, restoreWindow, win.id, win.isMaximized]);

    if (win.isMinimized) return null;

    const windowStyle: React.CSSProperties = win.isMaximized
        ? {
            position: "fixed",
            top: 40,
            left: 0,
            right: 0,
            bottom: 72,
            width: "100%",
            height: "auto",
            zIndex: zIndex + 100,
            borderRadius: 0,
        }
        : {
            position: "absolute",
            left: win.position.x,
            top: win.position.y,
            width: win.size.width,
            height: win.size.height,
            zIndex,
        };

    return (
        <AnimatePresence>
            {win.isOpen && (
                <motion.div
                    key={win.id}
                    role="dialog"
                    aria-labelledby={`window-title-${win.id}`}
                    className="glass-window-root"
                    style={windowStyle}
                    variants={windowOpenVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onPointerDown={handlePointerDown}
                    drag={!win.isMaximized}
                    dragMomentum={true}
                    dragElastic={0.1}
                    dragConstraints={{ top: 40, left: 0, right: globalThis.innerWidth ? globalThis.innerWidth - win.size.width : 800, bottom: globalThis.innerHeight ? globalThis.innerHeight - win.size.height - 72 : 600 }}
                    onDragEnd={(_, info) => {
                        updateWindowPosition(win.id, {
                            x: win.position.x + info.offset.x,
                            y: win.position.y + info.offset.y,
                        });
                    }}
                    whileDrag={{ cursor: "grabbing" }}
                >
                    {/* Window wrapper with glass styling */}
                    <div
                        className={`
              w-full h-full flex flex-col overflow-hidden
              rounded-[var(--radius-xl)]
              ${win.isFocused ? "glass-surface-elevated" : "glass-surface"}
            `}
                        style={{
                            boxShadow: win.isFocused
                                ? "0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px var(--border-luminous), 0 0 12px rgba(94,106,210,0.15)"
                                : "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px var(--border-subtle)",
                            opacity: win.isFocused ? 1 : 0.88,
                            transition: "opacity 0.3s, box-shadow 0.3s",
                        }}
                    >
                        {/* Header / Title Bar */}
                        <div
                            className="flex items-center px-4 h-[40px] shrink-0 cursor-grab active:cursor-grabbing select-none"
                            style={{
                                background: "rgba(22, 24, 29, 0.8)",
                                borderBottom: "1px solid var(--border-subtle)",
                            }}
                        >
                            {/* Traffic Lights */}
                            <div className="flex items-center gap-2 mr-4">
                                <button
                                    onClick={handleClose}
                                    className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all"
                                    aria-label="Close window"
                                    style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.2)" }}
                                />
                                <button
                                    onClick={handleMinimize}
                                    className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:brightness-110 transition-all"
                                    aria-label="Minimize window"
                                    style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.2)" }}
                                />
                                <button
                                    onClick={handleMaximize}
                                    className="w-3 h-3 rounded-full bg-[#28C840] hover:brightness-110 transition-all"
                                    aria-label="Maximize window"
                                    style={{ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.2)" }}
                                />
                            </div>

                            {/* Window Title */}
                            <span
                                id={`window-title-${win.id}`}
                                className="text-body-small flex-1 text-center"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {win.title}
                            </span>

                            {/* Spacer for symmetry */}
                            <div className="w-[60px]" />
                        </div>

                        {/* Window Content */}
                        <div className="flex-1 overflow-auto p-5">
                            {children}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
