'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function FloatingPlane({ position, size, opacity, blur }: {
    position: [number, number, number];
    size: [number, number];
    opacity: number;
    blur: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Very subtle floating movement
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.1;
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <planeGeometry args={size} />
            <meshBasicMaterial
                color="#1a1625"
                transparent
                opacity={opacity}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function ScrollCamera() {
    const { camera } = useThree();
    const scrollY = useRef(0);

    useFrame(() => {
        // Get scroll position from window
        if (typeof window !== 'undefined') {
            const section = document.getElementById('spatial');
            if (section) {
                const rect = section.getBoundingClientRect();
                const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
                scrollY.current = progress;
            }
        }

        // Subtle camera drift based on scroll
        camera.position.z = 5 - scrollY.current * 0.5;
        camera.position.y = scrollY.current * 0.3;
    });

    return null;
}

function Scene() {
    const planes = useMemo(() => [
        { position: [-2, 0, -3] as [number, number, number], size: [1.5, 2] as [number, number], opacity: 0.15, blur: 3 },
        { position: [2, 0.5, -2] as [number, number, number], size: [1.2, 1.8] as [number, number], opacity: 0.2, blur: 2 },
        { position: [0, -0.3, -1] as [number, number, number], size: [1.8, 1.4] as [number, number], opacity: 0.3, blur: 1 },
        { position: [-1.5, 0.8, -4] as [number, number, number], size: [1, 1.5] as [number, number], opacity: 0.1, blur: 4 },
        { position: [1.5, -0.5, -2.5] as [number, number, number], size: [1.3, 1.6] as [number, number], opacity: 0.18, blur: 2 },
    ], []);

    return (
        <>
            <ScrollCamera />
            <ambientLight intensity={0.5} />
            <fog attach="fog" args={['#0f0f12', 2, 8]} />

            {planes.map((plane, i) => (
                <FloatingPlane key={i} {...plane} />
            ))}
        </>
    );
}

export default function SpatialDepth() {
    return (
        <section
            id="spatial"
            className="relative h-[60vh] overflow-hidden"
        >
            {/* 3D Canvas */}
            <div className="absolute inset-0">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    style={{ background: 'transparent' }}
                >
                    <Scene />
                </Canvas>
            </div>

            {/* Overlay text */}
            <motion.div
                className="relative z-10 h-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="text-center">
                    <p className="text-foreground-muted text-sm font-medium tracking-widest uppercase mb-2">
                        Spatial Interface
                    </p>
                    <h3 className="text-2xl md:text-3xl font-display text-foreground/80">
                        Design in depth
                    </h3>
                </div>
            </motion.div>

            {/* Gradient overlays for blending */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
}
