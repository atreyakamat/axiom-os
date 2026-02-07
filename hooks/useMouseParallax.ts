'use client';

import { useEffect, useState } from 'react';

export function useMouseParallax(intensity: number = 20) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * intensity;
            const y = (e.clientY / window.innerHeight - 0.5) * intensity;
            setPosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [intensity]);

    return position;
}
