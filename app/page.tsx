'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import LiquidChrome from '@/components/LiquidChrome';
import GlassNavbar from '@/components/ui/GlassNavbar';
import OSWindow from '@/components/ui/OSWindow';
import WorkspaceSection from '@/components/sections/WorkspaceSection';
import PrinciplesSection from '@/components/sections/PrinciplesSection';
import PresenceCard from '@/components/ui/PresenceCard';
import { fadeIn, slideUp } from '@/lib/motion-presets';

// Dynamic import for R3F to avoid SSR issues
const SpatialDepth = dynamic(
  () => import('@/components/sections/SpatialDepth'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Global Ambient Background */}
      <LiquidChrome />

      {/* Floating Glass Navbar */}
      <GlassNavbar />

      {/* Section 1: Hero / Boot Zone */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-8"
      >
        {/* Accent glows */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-violet/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-lavender/10 blur-3xl pointer-events-none" />

        {/* Main OS Window */}
        <motion.div
          className="relative z-10 w-full max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <OSWindow title="AXIOM OS">
            <div className="text-center space-y-6">
              <motion.h1
                className="text-5xl md:text-6xl font-display font-bold text-foreground leading-tight"
                variants={slideUp}
              >
                AXIOM OS
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-foreground-muted leading-relaxed"
                variants={slideUp}
              >
                An operating system without noise
              </motion.p>

              {/* System status glyphs */}
              <motion.div
                className="pt-4 flex items-center justify-center gap-6"
                variants={slideUp}
              >
                <div className="flex items-center gap-2 text-foreground-muted/60">
                  <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  <span className="text-xs font-mono">System Ready</span>
                </div>
                <div className="flex items-center gap-2 text-foreground-muted/60">
                  <div className="w-2 h-2 rounded-full bg-purple-violet animate-pulse" />
                  <span className="text-xs font-mono">Calm Mode</span>
                </div>
              </motion.div>
            </div>
          </OSWindow>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-2 text-foreground-muted/50">
            <span className="text-xs tracking-widest uppercase">Explore</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Living OS Workspace */}
      <WorkspaceSection />

      {/* Section 3: System Principles */}
      <PrinciplesSection />

      {/* Section 4: Spatial Depth */}
      <SpatialDepth />

      {/* Section 5: CTA / Exit */}
      <PresenceCard />

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-xs text-foreground-muted/50">
          AXIOM OS — Design with intention
        </p>
      </footer>
    </div>
  );
}
