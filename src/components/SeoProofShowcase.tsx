'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Maximize2,
  X,
  Search,
  Zap,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import SmartVideo from './SmartVideo';
import {
  AnimatedMetricValue,
  GoldSpotlightOverlay,
  useGoldSpotlight,
} from './MotionPrimitives';

export interface ScreenshotProof {
  id: string;
  src: string;
  badge: string;
  title: string;
  subtitle: string;
  pills: string[];
  metrics: { label: string; val: string; diff?: string }[];
  summary: string;
}

export interface VideoProof {
  id: string;
  src: string;
  poster?: string;
  cardIndex: string;
  badge: string;
  pillar: string;
  title: string;
  pills: string[];
  summary: string;
}

export const GSC_VIDEOS: VideoProof[] = [
  {
    id: 'gsc-live-growth',
    src: '/seo/gsc-live-growth.mp4',
    poster: '/seo/gsc-live-growth-poster.webp',
    cardIndex: '01',
    badge: 'Console Telemetry',
    pillar: 'SEO Proof',
    title: 'Real-Time Console Range & Filter Telemetry',
    pills: ['1.86K Clicks', '418K Impressions', '8.3 Avg Pos'],
    summary:
      'Continuous query and date-range verification across 3-month and 28-day cycles demonstrating steady top-10 rankings.',
  },
  {
    id: 'gsc-multi-campaign',
    src: '/seo/gsc-multi-campaign.mp4',
    poster: '/seo/gsc-3month-growth.webp',
    cardIndex: '02',
    badge: 'Entity Authority',
    pillar: 'AEO Proof',
    title: 'Answer Engine Citations & Cluster Growth',
    pills: ['174K Impressions', 'Multi-Cluster', '100% Organic'],
    summary:
      'Multi-cluster authority scaling from 123K to 174K impressions, securing citations across AI answer engines.',
  },
  {
    id: 'gsc-zero-to-scale',
    src: '/seo/gsc-zero-to-scale.mp4',
    poster: '/seo/gsc-top-position.webp',
    cardIndex: '03',
    badge: 'Index Velocity',
    pillar: 'GEO Proof',
    title: 'Fresh Indexation to 110K Breakout Curve',
    pills: ['110K+ Breakout', 'Rapid 90-Day Ramp', 'Sub-Second LCP'],
    summary:
      'Velocity curve from initial indexation to 110K impressions driven by structured JSON-LD entity graphs.',
  },
];

export const GSC_SCREENSHOTS: ScreenshotProof[] = [
  {
    id: '3month-growth',
    src: '/seo/gsc-3month-growth.webp',
    badge: '📈 90-Day Growth',
    title: '87.6K Clicks & 1.26M Impressions',
    subtitle: 'Search Console 90-Day Comparative Audit',
    pills: ['+55.8% YoY', '6.9% CTR', '10.8 Avg Pos'],
    metrics: [
      { label: 'Total Clicks', val: '87.6K', diff: '+55.8% YoY' },
      { label: 'Impressions', val: '1.26M', diff: '+413K vs Prev' },
      { label: 'Average CTR', val: '6.9%', diff: '+0.3% Lift' },
      { label: 'Avg Position', val: '10.8', diff: 'Up from 11.5' },
    ],
    summary:
      'Unfiltered 90-day comparative telemetry showing clicks accelerating from 56.2K to 87.6K (+55.8%) while impressions climbed to 1.26M.',
  },
  {
    id: 'top-position',
    src: '/seo/gsc-top-position.webp',
    badge: '🎯 SERP Dominance',
    title: '62.1K Clicks & 28.8% Peak CTR',
    subtitle: 'High-Intent Commercial Query Cluster',
    pills: ['216K Impressions', '5.8 Avg Pos', 'Top Page SERP'],
    metrics: [
      { label: 'Total Clicks', val: '62.1K', diff: 'Verified Inbound' },
      { label: 'Average CTR', val: '28.8%', diff: '4.2x Benchmark' },
      { label: 'Impressions', val: '216K', diff: 'Hyper-Targeted' },
      { label: 'Avg Position', val: '5.8', diff: 'Top-Page SERP' },
    ],
    summary:
      'Delivered a 28.8% average CTR and a 5.8 top-page position across 216K search impressions, converting search visibility into commercial leads.',
  },
];

interface SeoProofShowcaseProps {
  showPageLink?: boolean;
}

const SeoProofShowcase = memo(function SeoProofShowcase({ showPageLink = false }: SeoProofShowcaseProps) {
  const [mounted, setMounted] = useState(false);
  const [lightboxProof, setLightboxProof] = useState<ScreenshotProof | null>(null);
  const [lightboxVideo, setLightboxVideo] = useState<VideoProof | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);
  const spotlight = useGoldSpotlight();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-play modal video on open and pause if page tab becomes hidden
  useEffect(() => {
    if (!lightboxVideo) return;
    const vidEl = lightboxVideoRef.current;
    if (vidEl) {
      vidEl.muted = true;
      vidEl.play().catch(() => {});
    }
    const handleVisibility = () => {
      if (document.hidden && lightboxVideoRef.current && !lightboxVideoRef.current.paused) {
        lightboxVideoRef.current.pause();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [lightboxVideo]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxProof(null);
        setLightboxVideo(null);
      }
    };
    if (lightboxProof || lightboxVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxProof, lightboxVideo]);

  return (
    <div className="space-y-6 sm:space-y-7">
      {/* Optional Top Link Bar */}
      {showPageLink && (
        <div className="flex items-center justify-between pb-3 border-b border-[#C99D55]/20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-mono font-semibold text-[#C99D55] uppercase tracking-wider">
              Verified SEO, AEO &amp; GEO Telemetry
            </span>
          </div>
          <Link
            href="/seo-results"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#C99D55]/40 bg-[#2B1E15] text-[#C99D55] hover:bg-[#C99D55] hover:text-[#221710] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm"
          >
            <span>View Full SEO Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* =========================================================================
          TOP ROW: 3-COLUMN EQUAL-HEIGHT PROOF CARDS (SEO, AEO, GEO)
          ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C99D55]">
              Live Search &amp; AI Recordings
            </span>
          </div>
          <span className="text-[10.5px] font-mono text-[#8C7E72] hidden sm:inline">
            Muted by default · Click video to expand
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {GSC_VIDEOS.map((vid, idx) => {
            const isSeo = vid.pillar === 'SEO Proof';
            const isAeo = vid.pillar === 'AEO Proof';

            return (
              <motion.article
                key={vid.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ contain: 'layout paint' }}
                onPointerMove={spotlight.onPointerMove}
                onPointerLeave={spotlight.onPointerLeave}
                className="relative bg-[#2B1E15] border border-[#C99D55]/20 hover:border-[#C99D55]/55 hover:-translate-y-0.5 rounded-xl p-3.5 sm:p-4 transition-[transform,border-color] duration-200 flex flex-col justify-between group shadow-lg h-full"
              >
                <GoldSpotlightOverlay />
                <div className="relative z-10">
                  {/* Sleek Framed Video Container (No Browser Chrome Clutter) */}
                  <div className="rounded-lg overflow-hidden border border-[#C99D55]/30 bg-white mb-2.5 shadow-xs relative">
                    <div className="w-full aspect-video bg-white relative overflow-hidden">
                      <SmartVideo
                        src={vid.src}
                        poster={vid.poster || undefined}
                        title={vid.title}
                        muted={true}
                        onExpand={() => setLightboxVideo(vid)}
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Top Pill Row: Pillar + Category Badge */}
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] sm:text-[9.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSeo
                          ? 'bg-[#1C130D] text-[#C99D55] border border-[#C99D55]/30'
                          : isAeo
                          ? 'bg-[#221710] text-[#E5C585] border border-[#E5C585]/30'
                          : 'bg-[#221710] text-[#10B981] border border-[#10B981]/30'
                      }`}
                    >
                      {isSeo && <Search className="w-2.5 h-2.5" />}
                      {isAeo && <Sparkles className="w-2.5 h-2.5" />}
                      {!isSeo && !isAeo && <Zap className="w-2.5 h-2.5" />}
                      <span>{vid.pillar}</span>
                    </span>
                    <span className="text-[9px] font-mono text-[#8C7E72] uppercase truncate max-w-[120px]">
                      {vid.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm sm:text-[15px] font-bold text-[#F6F2EA] mb-1 group-hover:text-[#C99D55] transition-colors leading-snug truncate">
                    {vid.title}
                  </h4>

                  {/* Metric Badges Pill Row */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {vid.pills.map((pill) => (
                      <span
                        key={pill}
                        className="inline-flex items-center text-[9px] sm:text-[9.5px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#221710] text-[#E5C585] border border-[#C99D55]/20"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  {/* Summary Context */}
                  <p className="text-[11px] sm:text-[11.5px] leading-snug text-[#B8AFA6] mb-2.5 line-clamp-2">
                    {vid.summary}
                  </p>
                </div>

                {/* Card Action Bar */}
                <div className="pt-2 border-t border-[#C99D55]/15 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#8C7E72]">
                    Unedited Telemetry
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxVideo(vid)}
                    className="text-[#C99D55] hover:text-[#E5C585] text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Inspect</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          BOTTOM ROW: 2-COLUMN BALANCED AUDITED GSC EVIDENCE CARDS
          ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C99D55]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C99D55]">
              Audited Search Console Telemetry
            </span>
          </div>
          <span className="text-[10.5px] font-mono text-[#8C7E72] hidden sm:inline">
            Click screenshot to expand full resolution
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {GSC_SCREENSHOTS.map((proof, idx) => (
            <motion.article
              key={proof.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ contain: 'layout paint' }}
              onPointerMove={spotlight.onPointerMove}
              onPointerLeave={spotlight.onPointerLeave}
              className="relative bg-[#2B1E15] border border-[#C99D55]/20 hover:border-[#C99D55]/55 hover:-translate-y-0.5 rounded-xl p-3.5 sm:p-4 transition-[transform,border-color] duration-200 flex flex-col justify-between group shadow-lg h-full"
            >
              <GoldSpotlightOverlay />
              <div className="relative z-10">
                {/* Top Badge & Subtitle */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="inline-flex items-center text-[9.5px] sm:text-[10px] font-semibold px-2 py-0.5 rounded bg-[#1C130D] text-[#E5C585] border border-[#C99D55]/25">
                    {proof.badge}
                  </span>
                  <span className="text-[9px] font-mono text-[#8C7E72] uppercase truncate max-w-[200px]">
                    {proof.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-[17px] font-bold text-[#F6F2EA] mb-1.5 group-hover:text-[#C99D55] transition-colors leading-snug truncate">
                  {proof.title}
                </h4>

                {/* Screenshot Container with Click-to-Zoom */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setLightboxProof(proof)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxProof(proof);
                    }
                  }}
                  className="cursor-zoom-in relative rounded-lg overflow-hidden border border-[#C99D55]/25 bg-white p-1 group/img select-none focus:outline-hidden focus:ring-2 focus:ring-[#C99D55] shadow-xs mb-2.5"
                  title="Click to zoom full telemetry"
                >
                  <div className="relative aspect-[16/9] max-h-48 sm:max-h-52 w-full overflow-hidden rounded bg-white">
                    <Image
                      src={proof.src}
                      alt={proof.title}
                      fill
                      unoptimized
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover/img:scale-[1.01]"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#221710]/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
                    <span className="bg-[#C99D55] text-[#221710] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform scale-95 group-hover/img:scale-100 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                      Expand Full View
                    </span>
                  </div>
                </div>

                {/* 4-Stat Metric Summary Grid */}
                <div className="grid grid-cols-4 gap-1 sm:gap-1.5 mb-2">
                  {proof.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="bg-[#221710] border border-[#C99D55]/15 rounded p-1 sm:p-1.5 text-center"
                    >
                      <div className="text-[8px] sm:text-[8.5px] font-medium text-[#8C7E72] uppercase tracking-wider truncate">
                        {m.label}
                      </div>
                      <div className="text-xs sm:text-[12.5px] font-bold font-mono text-[#F6F2EA] mt-0.5 truncate">
                        <AnimatedMetricValue value={m.val} />
                      </div>
                      {m.diff && (
                        <div className="text-[8px] sm:text-[8.5px] font-mono text-[#10B981] font-semibold mt-0.5 truncate">
                          {m.diff}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Concise Summary */}
                <p className="text-[11px] sm:text-[11.5px] leading-snug text-[#B8AFA6] mb-2.5 line-clamp-2">
                  {proof.summary}
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-2 border-t border-[#C99D55]/15 flex items-center justify-between">
                <span className="text-[9px] font-mono text-[#8C7E72]">
                  Verified Telemetry
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxProof(proof)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#C99D55] hover:text-[#E5C585] transition-colors cursor-pointer"
                >
                  <span>Inspect Telemetry ↗</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* =========================================================================
          LIGHTBOX MODAL FOR SCREENSHOTS
          ========================================================================= */}
      {mounted && lightboxProof && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/95 animate-fadeIn"
          onClick={() => setLightboxProof(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#221710] border border-[#C99D55]/40 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3 border-b border-[#C99D55]/20 bg-[#2B1E15] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#E5C585] font-semibold tracking-wider block">
                  {lightboxProof.badge}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#F6F2EA]">
                  {lightboxProof.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setLightboxProof(null)}
                className="w-8 h-8 rounded-full bg-[#1A120C] border border-[#C99D55]/30 text-[#E5C585] flex items-center justify-center hover:bg-[#C99D55] hover:text-[#221710] transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#150E09] flex flex-col items-center justify-center">
              <div className="bg-white p-2 sm:p-3 rounded-xl border border-[#C99D55]/25 shadow-2xl max-w-4xl w-full flex items-center justify-center">
                <Image
                  src={lightboxProof.src}
                  alt={lightboxProof.title}
                  width={1200}
                  height={675}
                  unoptimized
                  className="max-h-[62vh] w-full h-auto object-contain rounded-lg"
                />
              </div>

              {/* Telemetry Breakdown */}
              <div className="w-full max-w-3xl mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {lightboxProof.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-[#2B1E15] border border-[#C99D55]/20 rounded-xl p-2.5 text-center"
                  >
                    <div className="text-[9.5px] text-[#8C7E72] uppercase font-medium">{m.label}</div>
                    <div className="text-base font-bold font-mono text-[#F6F2EA] mt-0.5">{m.val}</div>
                    {m.diff && <div className="text-[10px] font-mono text-[#10B981] font-semibold mt-0.5">{m.diff}</div>}
                  </div>
                ))}
              </div>

              <p className="text-xs text-center text-[#B8AFA6] max-w-2xl mt-3 leading-relaxed">
                {lightboxProof.summary}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-[#C99D55]/20 bg-[#2B1E15] flex items-center justify-between text-xs text-[#8C7E72]">
              <span>Press Escape or click outside to dismiss</span>
              <button
                type="button"
                onClick={() => setLightboxProof(null)}
                className="text-[#C99D55] hover:underline font-medium cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* =========================================================================
          LIGHTBOX MODAL FOR VIDEOS (ALWAYS MUTED BY DEFAULT)
          ========================================================================= */}
      {mounted && lightboxVideo && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/95 animate-fadeIn"
          onClick={() => setLightboxVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col bg-[#221710] border border-[#C99D55]/40 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3 border-b border-[#C99D55]/20 bg-[#2B1E15] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#C99D55] font-semibold tracking-wider block">
                  {lightboxVideo.pillar} · {lightboxVideo.badge}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#F6F2EA]">
                  {lightboxVideo.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setLightboxVideo(null)}
                className="w-8 h-8 rounded-full bg-[#1A120C] border border-[#C99D55]/30 text-[#E5C585] flex items-center justify-center hover:bg-[#C99D55] hover:text-[#221710] transition-colors cursor-pointer"
                aria-label="Close video inspection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Container (Strictly Muted & volume = 0 on Load) */}
            <div className="bg-[#150E09] p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center">
              <div className="bg-white p-2 rounded-xl border border-[#C99D55]/25 shadow-2xl flex items-center justify-center max-w-full">
                <video
                  ref={lightboxVideoRef}
                  src={lightboxVideo.src}
                  poster={lightboxVideo.poster || undefined}
                  controls
                  playsInline
                  loop
                  muted
                  preload="metadata"
                  autoPlay
                  onLoadedMetadata={(e) => {
                    e.currentTarget.muted = true;
                    e.currentTarget.volume = 0;
                  }}
                  className="h-[75vh] w-auto max-w-full object-contain mx-auto rounded-lg block bg-white"
                />
              </div>

              {/* Pills & Summary */}
              <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                {lightboxVideo.pills.map((p) => (
                  <span
                    key={p}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#2B1E15] text-[#E5C585] border border-[#C99D55]/20"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <p className="text-xs text-center text-[#B8AFA6] max-w-xl mt-2 leading-relaxed">
                {lightboxVideo.summary}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-2.5 border-t border-[#C99D55]/20 bg-[#2B1E15] flex items-center justify-between text-xs text-[#8C7E72]">
              <span>Muted by default · Use video controls to unmute. Press Escape to close.</span>
              <button
                type="button"
                onClick={() => setLightboxVideo(null)}
                className="text-[#C99D55] hover:underline font-medium cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
});

export default SeoProofShowcase;
