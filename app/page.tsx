'use client';

import { motion } from 'framer-motion';
import FloatingWindow from '@/components/ui/FloatingWindow';
import AnimatedBackground from '@/components/AnimatedBackground';
import AccentGlow from '@/components/ui/AccentGlow';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { fadeIn, slideUp } from '@/lib/motion-presets';

export default function Home() {
  const parallax = useMouseParallax(15);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      {/* Accent Glows */}
      <AccentGlow className="top-1/4 left-1/3 w-64 h-64" intensity="high" />
      <AccentGlow className="bottom-1/3 right-1/4 w-80 h-80" intensity="medium" />

      {/* Main Content */}
      <motion.div
        className="relative z-10"
        style={{
          transform: `translate(${parallax.x}px, ${parallax.y}px)`,
        }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <FloatingWindow title="Axiom OS" glow={true}>
          <div className="max-w-2xl text-center space-y-6">
            <motion.h1
              className="text-5xl md:text-6xl font-display font-bold text-foreground"
              variants={slideUp}
            >
              Axiom OS
            </motion.h1>

            <motion.p
              className="text-xl text-foreground-muted leading-relaxed"
              variants={slideUp}
            >
              Designed around clarity, restraint, and intention
            </motion.p>

            <motion.div
              className="pt-4"
              variants={slideUp}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-panel text-sm text-purple-lavender">
                <div className="w-2 h-2 rounded-full bg-purple-violet animate-pulse" />
                <span>System Online</span>
              </div>
            </motion.div>
          </div>
        </FloatingWindow>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-2 text-foreground-muted">
          <span className="text-xs">Explore</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
