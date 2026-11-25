'use client';

import React, { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );
}

/**
 * Lightweight IntersectionObserver scroll reveal using strictly GPU transform & opacity.
 */
export function RevealOnScroll({
  children,
  className = '',
  delayMs = 0,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const isVisible = reducedMotion || revealed;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
        transition: reducedMotion
          ? undefined
          : `opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Zero-rerender radial Champagne Gold spotlight tracker for cards.
 */
export function useGoldSpotlight() {
  const reducedMotion = usePrefersReducedMotion();

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion || e.pointerType !== 'mouse') return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${Math.round(e.clientX - rect.left)}px`);
      el.style.setProperty('--my', `${Math.round(e.clientY - rect.top)}px`);
    },
    [reducedMotion]
  );

  const onPointerLeave = useCallback((e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.removeProperty('--mx');
    e.currentTarget.style.removeProperty('--my');
  }, []);

  return { onPointerMove, onPointerLeave };
}

/**
 * Radial Champagne Gold overlay paired with useGoldSpotlight().
 */
export function GoldSpotlightOverlay({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${className}`}
      style={{
        background:
          'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(212, 175, 55, 0.12), transparent 70%)',
      }}
    />
  );
}

interface ParsedMetricToken {
  raw: string;
  target: number;
  decimals: number;
  useCommas: boolean;
  start: number;
  end: number;
}

function formatNumberToken(val: number, decimals: number, useCommas: boolean): string {
  const fixed = val.toFixed(decimals);
  if (!useCommas) return fixed;
  const parts = fixed.split('.');
  parts[0] = Number(parts[0]).toLocaleString('en-US');
  return parts.join('.');
}

/**
 * Smoothly counts up numeric KPI & proof metrics once upon entering the viewport.
 */
export function AnimatedMetricValue({
  value,
  className = '',
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);
  const hasAnimatedRef = useRef(false);

  // Skip date ranges like "Jun 1 – Jul 7"
  const isDateLike = /^[A-Za-z]{3}\s+\d/.test(value.trim());

  useEffect(() => {
    if (reducedMotion || isDateLike) return;
    const el = ref.current;
    if (!el) return;

    const tokens: ParsedMetricToken[] = [];
    const regex = /\d[\d,]*(?:\.\d+)?/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(value)) !== null) {
      const raw = match[0];
      const num = parseFloat(raw.replace(/,/g, ''));
      if (Number.isFinite(num)) {
        const dotIdx = raw.indexOf('.');
        tokens.push({
          raw,
          target: num,
          decimals: dotIdx === -1 ? 0 : raw.length - dotIdx - 1,
          useCommas: raw.includes(','),
          start: match.index,
          end: match.index + raw.length,
        });
      }
    }

    if (tokens.length === 0) return;

    let rafId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;
        observer.disconnect();

        const duration = 850;
        const startTime = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          // Smooth cubic ease-out
          const eased = 1 - Math.pow(1 - progress, 3);

          let rebuilt = '';
          let cursor = 0;
          for (const tok of tokens) {
            rebuilt += value.slice(cursor, tok.start);
            const currentVal = progress >= 1 ? tok.target : tok.target * eased;
            rebuilt += formatNumberToken(currentVal, tok.decimals, tok.useCommas);
            cursor = tok.end;
          }
          rebuilt += value.slice(cursor);

          setDisplay(rebuilt);
          if (progress < 1) {
            rafId = requestAnimationFrame(tick);
          } else {
            setDisplay(value);
          }
        };

        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [value, reducedMotion, isDateLike]);

  return (
    <span ref={ref} className={className}>
      {reducedMotion || isDateLike ? value : display}
    </span>
  );
}

/**
 * Subtle GPU cursor-depth wrapper with Champagne Gold ambient aura for the Hero portrait.
 */
export function HeroPortraitDepth({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || e.pointerType !== 'mouse' || !layerRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      const tx = (nx * 10).toFixed(2);
      const ty = (ny * 10).toFixed(2);
      layerRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    },
    [reducedMotion]
  );

  const handlePointerLeave = useCallback(() => {
    if (layerRef.current) {
      layerRef.current.style.transform = 'translate3d(0px, 0px, 0)';
    }
  }, []);

  return (
    <div
      className={`relative ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Subtle Champagne Gold Ambient Portrait Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-[36px] opacity-85"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(212, 175, 55, 0.16), rgba(201, 157, 85, 0.05) 55%, transparent 75%)',
        }}
      />
      <div
        ref={layerRef}
        style={{
          transition: reducedMotion ? undefined : 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: reducedMotion ? undefined : 'transform',
        }}
        className="relative"
      >
        {children}
      </div>
    </div>
  );
}
