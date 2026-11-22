'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Globe,
  Search,
  Layers,
} from 'lucide-react';
import { motion } from 'motion/react';
import SeoProofShowcase from './SeoProofShowcase';
import { LIVE_PROJECTS, PAID_AD_STUDIES } from '../data/portfolio';

/* =========================================================================
   PROJECT PREVIEW IMAGE WITH GRACEFUL FALLBACK
   ========================================================================= */
function ProjectPreviewImage({
  localSrc,
  fallbackSrc,
  alt,
}: {
  localSrc: string;
  fallbackSrc: string;
  alt: string;
}) {
  const [imgSrc, setImgSrc] = useState(localSrc);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      loading="lazy"
      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
      onError={() => {
        if (!hasError && imgSrc !== fallbackSrc) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
      className="h-full w-full object-cover object-top group-hover:scale-102 transition-transform duration-300 ease-out"
    />
  );
}

/* =========================================================================
   LIVE WORK SECTION COMPONENT
   Supports BOTH Quick Switching AND Continuous Vertical Viewing
   ========================================================================= */
interface LiveWorkSectionProps {
  onOpenQuote?: (service?: string) => void;
}

export default function LiveWorkSection({ onOpenQuote }: LiveWorkSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'websites' | 'seo' | 'ads'>('all');
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hash navigation support: jumps or filters smoothly if user clicks submenu
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#work-websites') {
        setActiveTab('all');
        timeoutId = setTimeout(() => {
          document.getElementById('work-websites')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash === '#work-seo') {
        setActiveTab('all');
        timeoutId = setTimeout(() => {
          document.getElementById('work-seo')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash === '#work-ads') {
        setActiveTab('all');
        timeoutId = setTimeout(() => {
          document.getElementById('work-ads')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleOpenModal = (studyId: string) => {
    const idx = PAID_AD_STUDIES.findIndex((s) => s.id === studyId);
    if (idx !== -1) setModalIndex(idx);
  };

  const handleCloseModal = () => {
    setModalIndex(null);
  };

  const handlePrevModal = useCallback(() => {
    setModalIndex((curr) => {
      if (curr === null) return null;
      return curr === 0 ? PAID_AD_STUDIES.length - 1 : curr - 1;
    });
  }, []);

  const handleNextModal = useCallback(() => {
    setModalIndex((curr) => {
      if (curr === null) return null;
      return curr === PAID_AD_STUDIES.length - 1 ? 0 : curr + 1;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalIndex === null) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') handlePrevModal();
      if (e.key === 'ArrowRight') handleNextModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (modalIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalIndex, handlePrevModal, handleNextModal]);

  const currentModalStudy = modalIndex !== null ? PAID_AD_STUDIES[modalIndex] : null;

  const topAds = PAID_AD_STUDIES.slice(0, 3);
  const bottomAds = PAID_AD_STUDIES.slice(3, 5);

  return (
    <section
      id="work"
      data-scroll-reveal
      className="bg-[#221710] py-20 lg:py-24 border-t border-[#C99D55]/15 text-[#B8AFA6] scroll-mt-20 relative overflow-hidden"
    >
      {/* Subtle Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 10%, rgba(201, 157, 85, 0.08), transparent 70%)',
        }}
      />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Section Header with Quick Selector Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B89B72] block mb-2.5">
              — SELECTED PORTFOLIO &amp; MEASURABLE PROOF
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.14] tracking-tight text-[#F6F2EA] mb-3">
              Websites, SEO &amp; Paid Ads proof built for{' '}
              <em className="font-serif italic font-normal text-[#C99D55]">
                real businesses.
              </em>
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#B8AFA6] max-w-2xl">
              Inspect verified client production platforms, Google Search Console rankings, and audited Google &amp; Meta Ads revenue dashboards.
            </p>
          </div>

          {/* Quick Selector Tabs (Both Quick Switching AND Continuous Vertical Viewing) */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#1C130D] border border-[#C99D55]/25 p-1 rounded-full shrink-0 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-[#C99D55] text-[#221710] shadow-md'
                  : 'text-[#B8AFA6] hover:text-[#F6F2EA]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Work</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('websites')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'websites'
                  ? 'bg-[#C99D55] text-[#221710] shadow-md'
                  : 'text-[#B8AFA6] hover:text-[#F6F2EA]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Custom Websites</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'seo'
                  ? 'bg-[#C99D55] text-[#221710] shadow-md'
                  : 'text-[#B8AFA6] hover:text-[#F6F2EA]'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>SEO, AEO &amp; GEO Proof</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ads')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'ads'
                  ? 'bg-[#C99D55] text-[#221710] shadow-md'
                  : 'text-[#B8AFA6] hover:text-[#F6F2EA]'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Google Ads &amp; Facebook Ads</span>
            </button>
          </div>
        </motion.div>

        {/* =========================================================================
            SUBSECTION 1: CUSTOM WEBSITES (COMPACT LAYOUT)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'websites') && (
          <div id="work-websites" className="scroll-mt-24 mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2.5 border-b border-[#C99D55]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#36261B] border border-[#C99D55]/30 flex items-center justify-center text-[#C99D55]">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C99D55]">
                    Part 1 • Custom Web Architecture
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#F6F2EA]">
                    Custom Websites
                  </h3>
                </div>
              </div>
              <Link
                href="/custom-websites"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[#C99D55]/40 bg-[#2B1E15] text-[#C99D55] hover:bg-[#C99D55] hover:text-[#221710] text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm shrink-0"
              >
                <span>Full Web Showcase</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* 4 Compact Live Website Cards (4-Column Desktop Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {LIVE_PROJECTS.map((project, idx) => {
                const fallbackMshot = `https://s0.wp.com/mshots/v1/${encodeURIComponent(
                  project.url
                )}?w=1200&h=750`;

                return (
                  <motion.article
                    key={project.domain}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-[#2B1E15] border border-[#C99D55]/20 hover:border-[#C99D55]/50 rounded-xl p-3 sm:p-3.5 transition-all duration-300 flex flex-col justify-between group shadow-lg h-full"
                  >
                    <div>
                      {/* Compact Browser Frame with Image Preview */}
                      <div className="relative h-28 sm:h-32 w-full bg-[#1A120C] rounded-lg overflow-hidden border border-[#C99D55]/20 mb-2.5 group/preview">
                        
                        {/* Browser Top Chrome Header */}
                        <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-2 py-1 border-b border-[#C99D55]/15 bg-[#1C130D]">
                          <div className="flex items-center gap-1" aria-hidden="true">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#E57373]/80" />
                            <span className="h-1.5 w-1.5 rounded-full bg-[#E5C585]/70" />
                            <span className="h-1.5 w-1.5 rounded-full bg-[#81C784]/80" />
                          </div>
                          <span className="truncate rounded border border-[#C99D55]/25 bg-[#261D17] px-1.5 py-0.2 font-mono text-[8.5px] text-[#E5C585] max-w-[120px]">
                            {project.domain}
                          </span>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B8AFA6] hover:text-[#E5C585] transition-colors p-0.5"
                            title="Open website in new tab"
                          >
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        </div>

                        {/* Screenshot Container */}
                        <div className="relative pt-4 h-full w-full overflow-hidden">
                          <ProjectPreviewImage
                            localSrc={project.localImage}
                            fallbackSrc={fallbackMshot}
                            alt={`${project.title} live website preview`}
                          />
                        </div>

                        {/* Hover Overlay Pill */}
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200"
                          aria-label={`Open live site for ${project.title}`}
                        >
                          <span className="bg-[#C99D55] text-[#221710] font-bold text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1 transform group-hover/preview:scale-100 scale-95 transition-transform duration-200">
                            Visit Site ↗
                          </span>
                        </a>
                      </div>

                      {/* Eyebrow */}
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#C99D55] block mb-0.5 truncate">
                        {project.eyebrow}
                      </span>

                      {/* Project Title */}
                      <h4 className="text-sm sm:text-[15px] font-bold text-[#F6F2EA] mb-1 group-hover:text-[#C99D55] transition-colors leading-snug truncate">
                        {project.title}
                      </h4>

                      {/* Concise 1-2 Line Summary (Consistent Baseline Height) */}
                      <p className="text-[11px] sm:text-[11.5px] leading-snug text-[#B8AFA6] mb-2 line-clamp-2 min-h-[2.1rem]">
                        {project.summary}
                      </p>

                      {/* Compact Service Pill Tags (Consistent Baseline Height) */}
                      <div className="flex flex-wrap gap-1 mb-2.5 min-h-[1.75rem] items-start">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#36261B] text-[#D8CFC4] text-[9px] sm:text-[9.5px] px-1.5 py-0.5 rounded font-medium border border-[#C99D55]/15 whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Compact Footer with Live Indicator, Live Domain Text & Visit Site Action */}
                    <div className="pt-2 border-t border-[#C99D55]/15 flex items-center justify-between text-xs gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[10px] text-[#25D366] font-medium flex items-center gap-1 font-mono shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                          Live
                        </span>
                        <span className="font-mono text-[9px] text-[#8C7E72] truncate max-w-[110px] sm:max-w-[130px]">
                          {project.domain}
                        </span>
                      </div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C99D55] hover:text-[#E5C585] font-semibold text-[11px] sm:text-[11.5px] transition-colors inline-flex items-center gap-0.5 group/link shrink-0 ml-auto"
                      >
                        <span>Visit Site</span>
                        <ArrowUpRight className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            SUBSECTION 2: SEO (5 ITEMS — 3 HORIZONTAL TOP, 2 HORIZONTAL BELOW)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'seo') && (
          <div
            id="work-seo"
            className={`scroll-mt-24 mb-14 ${activeTab === 'all' ? 'pt-10 border-t border-[#C99D55]/15' : ''}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2.5 border-b border-[#C99D55]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#36261B] border border-[#C99D55]/30 flex items-center justify-center text-[#C99D55]">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C99D55]">
                    Part 2 • Verified Telemetry
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#F6F2EA]">
                    SEO, AEO &amp; GEO Proof
                  </h3>
                </div>
              </div>
              <Link
                href="/seo-results"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[#C99D55]/40 bg-[#2B1E15] text-[#C99D55] hover:bg-[#C99D55] hover:text-[#221710] text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm shrink-0"
              >
                <span>Full SEO Page</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Compact SEO Showcase (3 items top row, 2 items bottom row) */}
            <SeoProofShowcase showPageLink={false} />
          </div>
        )}

        {/* =========================================================================
            SUBSECTION 3: GOOGLE ADS & FACEBOOK ADS (COMPACT LAYOUT)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'ads') && (
          <div
            id="work-ads"
            className={`scroll-mt-24 ${activeTab === 'all' ? 'pt-10 border-t border-[#C99D55]/15' : ''}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2.5 border-b border-[#C99D55]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#36261B] border border-[#C99D55]/30 flex items-center justify-center text-[#C99D55]">
                  <Megaphone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C99D55]">
                    Part 3 • Paid Advertising Telemetry
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#F6F2EA]">
                    Google Ads &amp; Facebook Ads
                  </h3>
                </div>
              </div>

              <Link
                href="/paid-ads"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[#C99D55]/40 bg-[#2B1E15] text-[#C99D55] hover:bg-[#C99D55] hover:text-[#221710] text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm shrink-0"
              >
                <span>Full Ads Page</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* TOP ROW: 3 ITEMS IN A HORIZONTAL ROW */}
            <div className="mb-4 sm:mb-5">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C99D55] mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span>Google Ads Telemetry</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                {topAds.map((study, idx) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-[#2B1E15] border border-[#C99D55]/20 hover:border-[#C99D55]/50 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 shadow-lg group h-full"
                  >
                    <div>
                      {/* Top Tag Row */}
                      <div className="flex items-center justify-between gap-1.5 mb-1.5">
                        <span className="font-mono text-[9px] font-bold text-[#C99D55] bg-[#1C130D] border border-[#C99D55]/25 px-2 py-0.5 rounded truncate">
                          {study.tag}
                        </span>
                        <span className="text-[9.5px] uppercase font-semibold text-[#B89B72] shrink-0 tracking-wider">
                          {study.platformLabel}
                        </span>
                      </div>

                      {/* Card Headline */}
                      <h4 className="text-sm sm:text-[15px] font-bold text-[#F6F2EA] mb-0.5 leading-snug group-hover:text-[#C99D55] transition-colors truncate">
                        {study.headline}
                      </h4>

                      {/* Stats Summary Line */}
                      <p className="font-mono text-[9.5px] sm:text-[10px] text-[#E5C585] mb-1.5 font-medium truncate">
                        {study.stats}
                      </p>

                      {/* Brief 1-Line Description */}
                      <p className="text-[11px] sm:text-[11.5px] leading-snug text-[#B8AFA6] mb-2.5 line-clamp-2">
                        {study.description}
                      </p>

                      {/* Compact Screenshot Preview Container with Zoom Trigger */}
                      <div
                        onClick={() => handleOpenModal(study.id)}
                        className="relative rounded-lg overflow-hidden border border-[#C99D55]/25 bg-[#FAF8F5] p-1 shadow-xs cursor-pointer group/img transition-all duration-300 hover:border-[#C99D55]/60 hover:shadow-md mb-2.5"
                        title="Click to zoom dashboard"
                      >
                        <div className="relative aspect-[16/9] max-h-44 sm:max-h-48 w-full overflow-hidden rounded bg-[#FAF8F5]">
                          <Image
                            src={study.imageSrc}
                            alt={study.headline}
                            width={study.width}
                            height={study.height}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="w-full h-full object-contain object-center transition-transform duration-300 ease-out group-hover/img:scale-[1.02]"
                            loading="lazy"
                          />

                          {/* Dark Clean Hover Overlay */}
                          <div className="absolute inset-0 bg-[#221710]/80 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1 p-2 text-center">
                            <div className="w-7 h-7 rounded-full bg-[#C99D55] text-[#221710] flex items-center justify-center shadow-md">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-semibold text-[#F6F2EA]">
                              Click to Expand
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 4-Metric Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 pt-2 border-t border-[#C99D55]/15">
                        {study.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="bg-[#221710] border border-[#C99D55]/15 rounded px-1.5 py-0.5 sm:py-1 flex flex-col text-center"
                          >
                            <span className="text-[8px] uppercase tracking-wider text-[#B89B72] font-semibold truncate">
                              {m.label}
                            </span>
                            <span className="text-[10.5px] sm:text-[11px] font-bold text-[#F6F2EA] font-mono mt-0.5 truncate">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-2 mt-2.5 border-t border-[#C99D55]/15 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-[#25D366] font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                        Verified
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenModal(study.id)}
                        className="inline-flex items-center gap-1 text-[11px] sm:text-[11.5px] font-semibold text-[#C99D55] hover:text-[#D5AC65] transition-colors cursor-pointer"
                      >
                        <span>Inspect</span>
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* BOTTOM ROW: 2 ITEMS IN A HORIZONTAL ROW */}
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C99D55] mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C99D55]" />
                <span>Facebook Ads Telemetry</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {bottomAds.map((study, idx) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-[#2B1E15] border border-[#C99D55]/20 hover:border-[#C99D55]/50 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 shadow-lg group h-full"
                  >
                    <div>
                      {/* Top Tag Row */}
                      <div className="flex items-center justify-between gap-1.5 mb-1.5">
                        <span className="font-mono text-[9px] font-bold text-[#C99D55] bg-[#1C130D] border border-[#C99D55]/25 px-2 py-0.5 rounded truncate">
                          {study.tag}
                        </span>
                        <span className="text-[9.5px] uppercase font-semibold text-[#B89B72] shrink-0 tracking-wider">
                          {study.platformLabel}
                        </span>
                      </div>

                      {/* Card Headline */}
                      <h4 className="text-base sm:text-[17px] font-bold text-[#F6F2EA] mb-0.5 leading-snug group-hover:text-[#C99D55] transition-colors truncate">
                        {study.headline}
                      </h4>

                      {/* Stats Summary Line */}
                      <p className="font-mono text-[9.5px] sm:text-[10px] text-[#E5C585] mb-1.5 font-medium truncate">
                        {study.stats}
                      </p>

                      {/* Brief 1-Line Description */}
                      <p className="text-[11px] sm:text-[11.5px] leading-snug text-[#B8AFA6] mb-2.5 line-clamp-2">
                        {study.description}
                      </p>

                      {/* Compact Screenshot Preview Container with Zoom Trigger */}
                      <div
                        onClick={() => handleOpenModal(study.id)}
                        className="relative rounded-lg overflow-hidden border border-[#C99D55]/25 bg-[#FAF8F5] p-1 shadow-xs cursor-pointer group/img transition-all duration-300 hover:border-[#C99D55]/60 hover:shadow-md mb-2.5"
                        title="Click to zoom dashboard"
                      >
                        <div className="relative aspect-[16/9] max-h-48 sm:max-h-52 w-full overflow-hidden rounded bg-[#FAF8F5]">
                          <Image
                            src={study.imageSrc}
                            alt={study.headline}
                            width={study.width}
                            height={study.height}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="w-full h-full object-contain object-center transition-transform duration-300 ease-out group-hover/img:scale-[1.02]"
                            loading="lazy"
                          />

                          {/* Dark Clean Hover Overlay */}
                          <div className="absolute inset-0 bg-[#221710]/80 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1 p-2 text-center">
                            <div className="w-7 h-7 rounded-full bg-[#C99D55] text-[#221710] flex items-center justify-center shadow-md">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[10px] font-semibold text-[#F6F2EA]">
                              Click to Expand
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 4-Metric Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 pt-2 border-t border-[#C99D55]/15">
                        {study.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="bg-[#221710] border border-[#C99D55]/15 rounded px-1.5 py-0.5 sm:py-1 flex flex-col text-center"
                          >
                            <span className="text-[8px] uppercase tracking-wider text-[#B89B72] font-semibold truncate">
                              {m.label}
                            </span>
                            <span className="text-[10.5px] sm:text-[11px] font-bold text-[#F6F2EA] font-mono mt-0.5 truncate">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-2 mt-2.5 border-t border-[#C99D55]/15 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-[#25D366] font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                        Verified
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenModal(study.id)}
                        className="inline-flex items-center gap-1 text-[11px] sm:text-[11.5px] font-semibold text-[#C99D55] hover:text-[#D5AC65] transition-colors cursor-pointer"
                      >
                        <span>Inspect</span>
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          FULL-SCREEN ZOOM LIGHTBOX MODAL (FOR PAID ADS PROOF)
          ========================================================================= */}
      {mounted && currentModalStudy && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentModalStudy.headline}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-5xl bg-[#221710] border border-[#C99D55]/35 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C99D55]/20 bg-[#2B1E15]">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[11px] font-bold text-[#C99D55] bg-[#1C130D] border border-[#C99D55]/25 px-2 py-0.5 rounded">
                  {currentModalStudy.tag}
                </span>
                <span className="text-xs text-[#E5DDD3] font-semibold hidden sm:inline">
                  {currentModalStudy.headline}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-[#1C130D] border border-[#C99D55]/30 text-[#F6F2EA] hover:border-[#C99D55] hover:text-[#C99D55] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close zoomed view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-[#18100B]">
              <div className="relative w-full rounded-xl overflow-hidden border border-[#C99D55]/25 bg-[#F6F2EA] p-2 shadow-2xl">
                <Image
                  src={currentModalStudy.imageSrc}
                  alt={currentModalStudy.headline}
                  width={currentModalStudy.width}
                  height={currentModalStudy.height}
                  className="w-full h-auto object-contain mx-auto rounded-lg"
                  priority
                />
              </div>

              {/* Verified Metrics Breakdown Row inside Modal */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
                {currentModalStudy.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-[#2B1E15] border border-[#C99D55]/20 rounded-xl px-3 py-2.5 flex flex-col text-center"
                  >
                    <span className="text-[9.5px] uppercase tracking-wider text-[#B89B72] font-semibold">
                      {m.label}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#F6F2EA] font-mono mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Context Summary */}
              <div className="w-full mt-3 bg-[#2B1E15]/60 border border-[#C99D55]/15 rounded-xl px-4 py-2.5 text-xs text-[#B8AFA6] text-center">
                <p className="font-medium text-[#E5DDD3]">{currentModalStudy.description}</p>
                <span className="font-mono text-[11px] text-[#C99D55] mt-0.5 block">
                  {currentModalStudy.stats}
                </span>
              </div>
            </div>

            {/* Modal Footer with Previous / Next Controls */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#C99D55]/20 bg-[#2B1E15]">
              <button
                type="button"
                onClick={handlePrevModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C130D] border border-[#C99D55]/25 text-xs font-semibold text-[#F6F2EA] hover:border-[#C99D55] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#C99D55]" />
                <span>Previous Case</span>
              </button>

              <span className="text-xs font-mono text-[#B89B72]">
                {modalIndex !== null ? modalIndex + 1 : 1} of {PAID_AD_STUDIES.length}
              </span>

              <button
                type="button"
                onClick={handleNextModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C130D] border border-[#C99D55]/25 text-xs font-semibold text-[#F6F2EA] hover:border-[#C99D55] transition-colors cursor-pointer"
              >
                <span>Next Case</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#C99D55]" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
