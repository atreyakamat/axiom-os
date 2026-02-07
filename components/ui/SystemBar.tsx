'use client';

import { useEffect, useState } from 'react';

export default function SystemBar() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 glass-panel-light border-b border-glass-border">
            <div className="flex items-center justify-between px-6 py-3">
                {/* Left: Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-md bg-purple-violet/20 border border-purple-violet/40 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-sm bg-purple-violet" />
                    </div>
                    <span className="text-sm font-display font-semibold text-foreground">Axiom OS</span>
                </div>

                {/* Right: System Indicators */}
                <div className="flex items-center gap-4 text-sm text-foreground-muted">
                    {/* WiFi */}
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                    </div>

                    {/* Battery */}
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-7.5A2.25 2.25 0 0018.75 6h-15A2.25 2.25 0 001.5 8.25v7.5A2.25 2.25 0 003.75 18z" />
                        </svg>
                        <span>87%</span>
                    </div>

                    {/* Time */}
                    <div className="font-mono">{time}</div>
                </div>
            </div>
        </div>
    );
}
