'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Megaphone,
  X,
} from 'lucide-react';
import JoySignature from '../../src/components/JoySignature';
import WhatsAppIcon from '../../src/components/WhatsAppIcon';
import { PAID_AD_STUDIES, type PaidAdStudy } from '../../src/data/portfolio';

const QuoteModal = dynamic(() => import('../../src/components/QuoteModal'), { ssr: false });

export default function PaidAdsPage() {
  const [mounted, setMounted] = useState(false);
  const [adsFilter, setAdsFilter] = useState<'all' | 'google' | 'meta'>('all');
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('Google Ads & Meta Paid Advertising');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredStudies = PAID_AD_STUDIES.filter((study) => {
    if (adsFilter === 'all') return true;
    return study.category === adsFilter;
  });

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
      const currentStudy = PAID_AD_STUDIES[curr];
      const activeIdx = filteredStudies.findIndex((s) => s.id === currentStudy.id);
      if (activeIdx === -1) return curr === 0 ? PAID_AD_STUDIES.length - 1 : curr - 1;
      const prevActiveIdx = activeIdx === 0 ? filteredStudies.length - 1 : activeIdx - 1;
      return PAID_AD_STUDIES.findIndex((s) => s.id === filteredStudies[prevActiveIdx].id);
    });
  }, [filteredStudies]);

  const handleNextModal = useCallback(() => {
    setModalIndex((curr) => {
      if (curr === null) return null;
      const currentStudy = PAID_AD_STUDIES[curr];
      const activeIdx = filteredStudies.findIndex((s) => s.id === currentStudy.id);
      if (activeIdx === -1) return curr === PAID_AD_STUDIES.length - 1 ? 0 : curr + 1;
      const nextActiveIdx = activeIdx === filteredStudies.length - 1 ? 0 : activeIdx + 1;
      return PAID_AD_STUDIES.findIndex((s) => s.id === filteredStudies[nextActiveIdx].id);
    });
  }, [filteredStudies]);

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

  const openQuote = (service = 'Google Ads & Meta Paid Advertising') => {
    setQuoteService(service);
    setQuoteOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#EFE9DF] text-[#221710] selection:bg-[#C99D55]/30 selection:text-[#221710]">
      {/* =========================================================================
          STICKY LUXURY EDITORIAL HEADER (STONE / PEARL CREAM #EFE9DF)
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#EFE9DF]/98 border-b border-[#C99D55]/25 py-4 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-[#221710] hover:text-[#9C7130] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-[#C99D55]/40 bg-[#E4DDD1] flex items-center justify-center group-hover:border-[#C99D55] transition-colors">
              <ArrowLeft className="w-4 h-4 text-[#9C7130] transition-transform group-hover:-translate-x-0.5" />
            </div>
            <div className="flex flex-col">
              <JoySignature variant="gold" width={110} height={32} />
              <span className="text-[10px] font-mono tracking-widest text-[#9C7130] uppercase">
                Return to Portfolio
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/#services"
              className="hidden sm:inline-flex text-xs font-mono uppercase tracking-wider text-[#6B5E54] hover:text-[#221710] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#work"
              className="hidden sm:inline-flex text-xs font-mono uppercase tracking-wider text-[#6B5E54] hover:text-[#221710] transition-colors"
            >
              All Work
            </Link>
            <button
              type="button"
              onClick={() => openQuote('Google Ads & Meta Paid Advertising')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C99D55] bg-[#C99D55] text-[#221710] hover:bg-[#D5AC65] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
            >
              <span>Get Ads Proposal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO SECTION (SUBTLE EDITORIAL STONE / PEARL CREAM #EFE9DF)
          ========================================================================= */}
      <section className="pt-14 pb-12 sm:pt-18 sm:pb-16 border-b border-[#DCD3C5]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[#8C7E72] mb-5">
            <Link href="/" className="hover:text-[#9C7130] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#work" className="hover:text-[#9C7130] transition-colors">
              Selected Work
            </Link>
            <span>/</span>
            <span className="text-[#9C7130] font-semibold">Google Ads &amp; Meta Ads</span>
          </nav>

          {/* Editorial Eyebrow & Headline */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="w-7 h-[1.5px] bg-[#C99D55]" />
              <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#9C7130]">
                VERIFIED PAID ACQUISITION TELEMETRY
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#221710] leading-[1.14] tracking-tight mb-4">
              High-ROI Google Ads &amp; Meta Ads{' '}
              <em className="font-serif italic font-normal text-[#9C7130]">
                Conversion Funnels.
              </em>
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#574E46] max-w-2xl">
              Unfiltered campaign dashboards, high-volume purchase funnels, and disciplined cost-per-conversion acquisition. Strictly zero wasted ad spend through negative-keyword gating and precision audience targeting.
            </p>
          </div>

          {/* 4 Performance KPI Banners */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10">
            <div className="bg-[#FFFFFF] border border-[#DCD3C5] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                Total Purchases
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                3,965+
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                Across verified accounts
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#DCD3C5] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                Cost Per Conv.
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                $0.97 – $1.01
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                Sub-$2 acquisition cost
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#DCD3C5] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                Campaign Impressions
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                11.5M+
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                Targeted commercial reach
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#DCD3C5] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                Paid Traffic Clicks
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                224K+
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                High-intent buyer traffic
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5 COMPACT PAID ADS CARDS (STRICTLY GOOGLE & META ADS ONLY)
          ========================================================================= */}
      <section data-scroll-reveal className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-3 border-b border-[#DCD3C5]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#C99D55]/40 flex items-center justify-center text-[#9C7130]">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9C7130]">
                  Audited Revenue Dashboards
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#221710]">
                  5 Live Google Ads &amp; Meta Ads Telemetry Studies
                </h2>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAdsFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  adsFilter === 'all'
                    ? 'bg-[#C99D55] text-[#221710] shadow-sm'
                    : 'bg-[#FFFFFF] border border-[#DCD3C5] text-[#574E46] hover:text-[#221710]'
                }`}
              >
                All Ads (5)
              </button>
              <button
                type="button"
                onClick={() => setAdsFilter('google')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  adsFilter === 'google'
                    ? 'bg-[#C99D55] text-[#221710] shadow-sm'
                    : 'bg-[#FFFFFF] border border-[#DCD3C5] text-[#574E46] hover:text-[#221710]'
                }`}
              >
                Google Ads (3)
              </button>
              <button
                type="button"
                onClick={() => setAdsFilter('meta')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  adsFilter === 'meta'
                    ? 'bg-[#C99D55] text-[#221710] shadow-sm'
                    : 'bg-[#FFFFFF] border border-[#DCD3C5] text-[#574E46] hover:text-[#221710]'
                }`}
              >
                Meta Ads (2)
              </button>
            </div>
          </div>

          {/* 5-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <div
                key={study.id}
                data-scroll-reveal
                className="bg-[#FFFFFF] border border-[#DCD3C5] hover:border-[#C99D55] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div>
                  {/* Top Tag Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold text-[#9C7130] bg-[#FAF7F0] border border-[#C99D55]/30 px-2.5 py-0.5 rounded truncate">
                      {study.tag}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#6B5E54] shrink-0 tracking-wider">
                      {study.platformLabel}
                    </span>
                  </div>

                  {/* Card Headline */}
                  <h3 className="text-base sm:text-lg font-bold text-[#221710] mb-1.5 leading-snug group-hover:text-[#9C7130] transition-colors">
                    {study.headline}
                  </h3>

                  {/* Stats Summary Line */}
                  <p className="font-mono text-[11px] text-[#9C7130] mb-2.5 font-semibold">
                    {study.stats}
                  </p>

                  {/* Brief 1-Line Description */}
                  <p className="text-xs leading-relaxed text-[#574E46] mb-4">
                    {study.description}
                  </p>

                  {/* Clean Framed Screenshot Container with Zoom Trigger */}
                  <div
                    onClick={() => handleOpenModal(study.id)}
                    className="relative rounded-xl overflow-hidden border border-[#DCD3C5] bg-[#FAF8F5] p-1 shadow-xs cursor-pointer group/img transition-all duration-300 hover:border-[#C99D55] hover:shadow-md"
                    title="Click to zoom dashboard"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#FAF8F5]">
                      <Image
                        src={study.imageSrc}
                        alt={study.headline}
                        width={study.width}
                        height={study.height}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-full object-contain object-center transition-transform duration-300 ease-out group-hover/img:scale-[1.02]"
                        loading="lazy"
                      />

                      {/* Zoom Hover Overlay */}
                      <div className="absolute inset-0 bg-[#221710]/80 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1.5 p-3 text-center">
                        <div className="w-9 h-9 rounded-full bg-[#C99D55] text-[#221710] flex items-center justify-center shadow-lg transform -translate-y-1 group-hover/img:translate-y-0 transition-transform duration-200">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-[#F6F2EA]">
                          Click to Expand
                        </span>
                        <span className="text-[9.5px] text-[#E5C585] font-mono">
                          Audited Dashboard
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4-Metric Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-[#E3DCD0]">
                    {study.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FAF7F0] border border-[#E3DCD0] rounded-lg px-2.5 py-1.5 flex flex-col"
                      >
                        <span className="text-[9px] uppercase tracking-wider text-[#8C7E72] font-semibold">
                          {m.label}
                        </span>
                        <span className="text-xs font-bold text-[#221710] font-mono mt-0.5">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 mt-4 border-t border-[#E3DCD0] flex items-center justify-between">
                  <span className="text-[11px] text-[#10B981] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    Verified Dashboard
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenModal(study.id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#9C7130] hover:text-[#C99D55] transition-colors cursor-pointer"
                  >
                    <span>Inspect</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* =========================================================================
              CUSTOM PAID ADS PROPOSAL CTA CARD
              ========================================================================= */}
          <div className="mt-16 rounded-2xl bg-[#221710] border border-[#C99D55]/30 p-8 sm:p-10 text-[#F6F2EA] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#C99D55] bg-[#2B1E15] border border-[#C99D55]/30 px-3 py-1 rounded-full inline-block mb-3">
                  READY TO SCALE YOUR PAID CUSTOMER ACQUISITION?
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F6F2EA] leading-tight mb-2.5">
                  Eliminate Wasted Spend. Capture Inbound Buyers.
                </h3>
                <p className="text-xs sm:text-sm text-[#C4B9AE] leading-relaxed mb-6 max-w-xl">
                  Whether launching high-intent Google Search PPC or retargeting on Meta, every campaign is engineered with negative-keyword gating and transparent ROI attribution.
                </p>
                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => openQuote('Google Ads & Meta Paid Advertising')}
                    className="bg-[#C99D55] hover:bg-[#D8AF68] text-[#221710] font-semibold px-6 py-3 text-xs sm:text-sm rounded-full transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
                  >
                    <span>Request an Ads Strategy →</span>
                  </button>
                  <a
                    href="https://wa.me/917980941101?text=Hi%20Joy%2C%20I%27d%20like%20to%20discuss%20Google%20%26%20Meta%20Ads%20for%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2B1E15] hover:bg-[#35251A] border border-[#C99D55]/30 text-[#F6F2EA] font-semibold px-5 py-3 text-xs sm:text-sm rounded-full transition-all inline-flex items-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                    <span>WhatsApp Direct Chat</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center text-center lg:text-right border-t lg:border-t-0 border-[#C99D55]/20 pt-4 lg:pt-0">
                <JoySignature variant="gold" width={180} height={45} className="mb-2" />
                <span className="text-xs font-semibold text-[#F6F2EA]">Joy Mondal</span>
                <span className="text-[10px] text-[#C99D55] uppercase tracking-wider mt-0.5">
                  Paid Advertising &amp; Growth Consultant
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            className="relative w-full max-w-5xl bg-[#221710] border border-[#C99D55]/35 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#C99D55]/20 bg-[#2B1E15]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#C99D55] bg-[#1C130D] border border-[#C99D55]/25 px-2.5 py-1 rounded">
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
                className="w-9 h-9 rounded-full bg-[#1C130D] border border-[#C99D55]/30 text-[#F6F2EA] hover:border-[#C99D55] hover:text-[#C99D55] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close zoomed view"
              >
                <X className="w-5 h-5" />
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
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {currentModalStudy.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-[#2B1E15] border border-[#C99D55]/20 rounded-xl px-4 py-3 flex flex-col text-center"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-[#B89B72] font-semibold">
                      {m.label}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#F6F2EA] font-mono mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Context Summary */}
              <div className="w-full mt-4 bg-[#2B1E15]/60 border border-[#C99D55]/15 rounded-xl px-5 py-3 text-xs sm:text-sm text-[#B8AFA6] text-center">
                <p className="font-medium text-[#E5DDD3]">{currentModalStudy.description}</p>
                <span className="font-mono text-xs text-[#C99D55] mt-1 block">
                  {currentModalStudy.stats}
                </span>
              </div>
            </div>

            {/* Modal Footer with Previous / Next Controls */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#C99D55]/20 bg-[#2B1E15]">
              <button
                type="button"
                onClick={handlePrevModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1C130D] border border-[#C99D55]/25 text-xs font-semibold text-[#F6F2EA] hover:border-[#C99D55] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#C99D55]" />
                <span>Previous Case</span>
              </button>

              <span className="text-xs font-mono text-[#B89B72]">
                {modalIndex !== null ? modalIndex + 1 : 1} of {PAID_AD_STUDIES.length}
              </span>

              <button
                type="button"
                onClick={handleNextModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1C130D] border border-[#C99D55]/25 text-xs font-semibold text-[#F6F2EA] hover:border-[#C99D55] transition-colors cursor-pointer"
              >
                <span>Next Case</span>
                <ChevronRight className="w-4 h-4 text-[#C99D55]" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Quote Modal */}
      {quoteOpen && (
        <QuoteModal
          isOpen={quoteOpen}
          onClose={() => setQuoteOpen(false)}
          initialService={quoteService}
        />
      )}
    </main>
  );
}
