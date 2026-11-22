'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

export default function ParticleMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrameId: number | null = null;
    let isCanvasVisible = false;
    let isPageVisible = !document.hidden;
    let lastFrameTime = 0;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = motionPreference.matches;

    // Zero-Forced-Reflow: Cached canvas coordinates
    let cachedRectLeft = 0;
    let cachedRectTop = 0;
    let hasCachedRect = false;

    const updateCachedRect = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      cachedRectLeft = rect.left;
      cachedRectTop = rect.top;
      hasCachedRect = true;
    };

    const particleCount = 36;
    const maxDistance = 130;
    const maxDistanceSquared = maxDistance * maxDistance;
    const cursorMaxDistance = 150;
    const cursorMaxDistanceSquared = cursorMaxDistance * cursorMaxDistance;

    let mouseX = -9999;
    let mouseY = -9999;

    const particles: Particle[] = [];

    const initParticles = (w: number, h: number) => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: 1.5 + Math.random() * 1.0,
          baseAlpha: 0.35 + Math.random() * 0.2,
        });
      }
    };

    // Zero forced reflow resize handler using ResizeObserver contentRect
    const applySize = (w: number, h: number) => {
      width = w;
      height = h;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      hasCachedRect = false;
      if (particles.length === 0) {
        initParticles(width, height);
      }
    };

    const handleMouseEnter = () => {
      updateCachedRect();
    };

    // Avoid layout reads during mouse movement by using cached coordinates
    const handleMouseMove = (e: MouseEvent) => {
      if (!isCanvasVisible || !isPageVisible) return;
      if (!hasCachedRect) updateCachedRect();
      mouseX = e.clientX - cachedRectLeft;
      mouseY = e.clientY - cachedRectTop;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      hasCachedRect = false;
    };

    // Invalidate cursor position on scroll to avoid forced reflow and save GPU
    const handleScroll = () => {
      hasCachedRect = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    const render = (time: number) => {
      animationFrameId = null;
      if (!isCanvasVisible || !isPageVisible) return;

      const delta = lastFrameTime ? Math.min((time - lastFrameTime) / 1000, 0.05) : 0.016;
      lastFrameTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Update positions with smooth delta timing (normalized to 60fps base)
      const speedMultiplier = delta * 60;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Wrap around boundaries smoothly
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }

      // 2. Batch draw connecting mesh lines in a single stroke call
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(201, 157, 85, 0.16)';
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          if (dx * dx + dy * dy < maxDistanceSquared) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      // 3. Connect to mouse cursor (if active in canvas)
      if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(201, 157, 85, 0.28)';
        ctx.lineWidth = 0.85;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          if (mdx * mdx + mdy * mdy < cursorMaxDistanceSquared) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
          }
        }
        ctx.stroke();
      }

      // 4. Batch draw node circles in a single fill call
      ctx.beginPath();
      ctx.fillStyle = 'rgba(201, 157, 85, 0.45)';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.moveTo(p.x + p.radius, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      ctx.fill();

      if (!reduceMotion) animationFrameId = requestAnimationFrame(render);
    };

    const updateAnimation = () => {
      if (isCanvasVisible && isPageVisible) {
        if (animationFrameId === null) animationFrameId = requestAnimationFrame(render);
      } else if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isCanvasVisible = entry.isIntersecting;
      updateAnimation();
    });
    intersectionObserver.observe(canvas);

    // Read dimensions from ResizeObserver entry.contentRect (No DOM query / reflow!)
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const w = entry ? Math.round(entry.contentRect.width) : window.innerWidth;
      const h = entry ? Math.round(entry.contentRect.height) : window.innerHeight;
      applySize(w, h);
      lastFrameTime = 0;
      updateAnimation();
    });
    resizeObserver.observe(parent);

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      updateAnimation();
    };
    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      lastFrameTime = 0;
      updateAnimation();
    };

    parent.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    parent.addEventListener('mousemove', handleMouseMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionPreference.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionPreference.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
