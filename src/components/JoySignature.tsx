'use client';

import React, { useEffect, useId, useRef, useState } from 'react';

export interface JoySignatureProps {
  variant?: 'gold' | 'watermark' | 'dark' | 'light-bg' | 'dark-bg';
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function JoySignature({
  variant = 'gold',
  width,
  height,
  className = '',
}: JoySignatureProps) {
  const signatureRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const instanceId = useId().replace(/:/g, '');

  // Normalize variant aliases
  const effectiveVariant: 'gold' | 'watermark' | 'dark' =
    variant === 'dark-bg' ? 'gold' : variant === 'light-bg' ? 'dark' : variant;

  const gradientId = `sig-grad-${effectiveVariant}-${instanceId}`;

  useEffect(() => {
    const el = signatureRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const wrapperStyle: React.CSSProperties = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  const colors = {
    gold: {
      start: '#E5C585',
      end: '#C99D55',
      flourish: '#C99D55',
    },
    watermark: {
      start: 'rgba(92, 68, 42, 0.25)',
      end: 'rgba(92, 68, 42, 0.25)',
      flourish: 'rgba(92, 68, 42, 0.25)',
    },
    dark: {
      start: '#8C6226',
      end: '#7A5218',
      flourish: '#8C6226',
    },
  }[effectiveVariant];

  return (
    <div
      ref={signatureRef}
      className={`joy-signature inline-block select-none leading-none ${isVisible ? 'is-drawn' : ''} ${className}`}
      style={wrapperStyle}
      aria-label="Joy Mondal calligraphy signature"
      role="img"
    >
      <svg
        viewBox="0 0 280 75"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
        </defs>

        {/* Crisp Luxury Calligraphy Typography "Joy Mondal" */}
        <text
          x="12"
          y="48"
          fontFamily="'Alex Brush', 'Playfair Display', cursive"
          fontSize="48"
          fontWeight="400"
          fill={effectiveVariant === 'watermark' ? colors.start : `url(#${gradientId})`}
          letterSpacing="0.03em"
          style={{
            textShadow: effectiveVariant === 'gold' ? '0 2px 14px rgba(201,157,85,0.22)' : 'none',
          }}
        >
          Joy Mondal
        </text>

        {/* Sleek Underline Calligraphic Flourish with animated stroke-dashoffset */}
        <path
          className="signature-stroke"
          d="M 14 58 C 70 54, 130 62, 190 56 C 225 52, 255 50, 266 54 C 272 56, 268 62, 252 61 C 235 60, 215 56, 175 58"
          fill="none"
          stroke={effectiveVariant === 'watermark' ? colors.flourish : `url(#${gradientId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
