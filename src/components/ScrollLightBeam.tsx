'use client';

import React, { memo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

/**
 * ScrollLightBeam Component (Optimized)
 *
 * A refined, champagne-gold / warm ambient light beam and directional glow.
 *
 * High-Performance GPU Architecture:
 * - Pure GPU compositor layers: animates transform (translate3d) and opacity only.
 * - Zero CSS filter blurs: uses pre-rendered soft-falloff radial gradients instead of blur-3xl / blur-[90px].
 * - Eliminates continuous requestAnimationFrame spring solver loops during scroll.
 * - Hardware acceleration via translate3d and contain: paint / contain: strict.
 * - Supports prefers-reduced-motion with static zero-cost fallback.
 */
function ScrollLightBeam() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Direct, linear GPU transforms linked to scroll progress without expensive spring physics loops
  const topGlowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.12, 0.24, 0.26, 0.18]);
  const topGlowTranslateY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const sideBeamOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0.25, 0.55, 0.65, 0.45]);
  const beamGlintY = useTransform(scrollYProgress, [0, 1], ['12vh', '80vh']);

  if (shouldReduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none"
        style={{ contain: 'strict' }}
      >
        <div
          className="absolute -top-28 right-0 sm:right-1/4 w-[480px] h-[340px] rounded-full pointer-events-none opacity-20"
          style={{
            background:
              'radial-gradient(circle at 60% 30%, rgba(201, 157, 85, 0.35) 0%, rgba(229, 197, 133, 0.15) 45%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-[1.5px] h-full opacity-35"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(201, 157, 85, 0.5) 20%, rgba(229, 197, 133, 0.6) 50%, rgba(201, 157, 85, 0.4) 80%, transparent)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none"
      style={{ contain: 'strict' }}
    >
      {/* -------------------------------------------------------------------
          1. TOP HEADLINE / AMBIENT "LIGHT-ON" DIRECTIONAL GLOW
          Uses soft-falloff radial gradient texture - NO expensive filter: blur()
          ------------------------------------------------------------------- */}
      <motion.div
        style={{
          opacity: topGlowOpacity,
          y: topGlowTranslateY,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
          contain: 'paint',
        }}
        className="absolute -top-32 right-[-5%] sm:right-[8%] lg:right-[15%] w-[360px] sm:w-[580px] lg:w-[740px] h-[340px] sm:h-[460px] rounded-full pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(229, 197, 133, 0.28) 0%, rgba(201, 157, 85, 0.16) 35%, rgba(184, 142, 40, 0.05) 60%, transparent 75%)',
          }}
        />
      </motion.div>

      {/* -------------------------------------------------------------------
          2. LATERAL SIDE EDGE LIGHT BEAM (Champagne-Gold Perimeter Ray)
          Soft lateral linear gradient + crisp core filament
          ------------------------------------------------------------------- */}
      <motion.div
        style={{
          opacity: sideBeamOpacity,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'opacity',
          contain: 'paint',
        }}
        className="absolute top-0 right-0 h-full w-[80px] sm:w-[120px] flex justify-end pointer-events-none"
      >
        {/* Soft lateral ambient aura via smooth linear-gradient falloff */}
        <div
          className="h-full w-full"
          style={{
            background:
              'linear-gradient(to left, rgba(201, 157, 85, 0.14) 0%, rgba(229, 197, 133, 0.05) 50%, transparent 100%)',
          }}
        />

        {/* Crisp champagne-gold edge filament (1.5px core beam) */}
        <div
          className="absolute top-0 right-0 w-[1.5px] h-full"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(201, 157, 85, 0.2) 8%, rgba(229, 197, 133, 0.75) 30%, rgba(201, 157, 85, 0.9) 55%, rgba(229, 197, 133, 0.6) 80%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* -------------------------------------------------------------------
          3. LUMINOUS GLINT NODE (Subtle Accent on the Filament)
          ------------------------------------------------------------------- */}
      <motion.div
        style={{
          y: beamGlintY,
          opacity: sideBeamOpacity,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity',
        }}
        className="hidden md:block absolute right-0 -translate-x-[0.5px] w-4 h-24 -mt-12 pointer-events-none"
      >
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[3px] h-8 rounded-full"
          style={{
            background: '#FFF5DC',
            boxShadow:
              '0 0 10px 1px rgba(229, 197, 133, 0.75), 0 0 18px 3px rgba(201, 157, 85, 0.35)',
          }}
        />
      </motion.div>
    </div>
  );
}

export default memo(ScrollLightBeam);
