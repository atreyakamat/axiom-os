"use client";

import React from "react";

export default function AmbientBackground() {
    return (
        <>
            {/* Ambient color orbs */}
            <div className="ambient-bg" aria-hidden="true">
                <div className="ambient-orb ambient-orb-1" />
                <div className="ambient-orb ambient-orb-2" />
                <div className="ambient-orb ambient-orb-3" />
            </div>

            {/* Noise texture overlay */}
            <div className="noise-overlay" aria-hidden="true" />
        </>
    );
}
