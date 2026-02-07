'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface ProximityState {
    focusedIndex: number | null;
    distances: number[];
}

export function useVariableProximity(itemCount: number) {
    const [state, setState] = useState<ProximityState>({
        focusedIndex: null,
        distances: Array(itemCount).fill(1),
    });

    const itemRefs = useRef<(HTMLElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const setItemRef = useCallback((index: number) => (el: HTMLElement | null) => {
        itemRefs.current[index] = el;
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const items = itemRefs.current;
        if (items.length === 0) return;

        const distances: number[] = [];
        let closestIndex = -1;
        let closestDistance = Infinity;

        items.forEach((item, index) => {
            if (!item) {
                distances.push(1);
                return;
            }

            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distance = Math.sqrt(
                Math.pow(e.clientX - centerX, 2) +
                Math.pow(e.clientY - centerY, 2)
            );

            // Normalize distance (0 = on top, 1 = far away)
            const normalizedDistance = Math.min(distance / 400, 1);
            distances.push(normalizedDistance);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        // Only set focused if cursor is close enough (within 300px)
        const focusedIndex = closestDistance < 300 ? closestIndex : null;

        setState({ focusedIndex, distances });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setState({
            focusedIndex: null,
            distances: Array(itemCount).fill(1),
        });
    }, [itemCount]);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [handleMouseMove, handleMouseLeave]);

    // Calculate blur and z-transform values for each item
    const getItemStyle = useCallback((index: number) => {
        const isFocused = state.focusedIndex === index;
        const distance = state.distances[index] ?? 1;

        return {
            blur: isFocused ? 0 : distance * 3,
            scale: isFocused ? 1 : 0.95 + (1 - distance) * 0.05,
            opacity: isFocused ? 1 : 0.7 + (1 - distance) * 0.3,
            zIndex: isFocused ? 10 : 1,
        };
    }, [state]);

    return {
        containerRef,
        setItemRef,
        getItemStyle,
        focusedIndex: state.focusedIndex,
    };
}
