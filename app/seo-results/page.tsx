'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
} from 'lucide-react';
import JoySignature from '../../src/components/JoySignature';
import SeoProofShowcase from '../../src/components/SeoProofShowcase';
import WhatsAppIcon from '../../src/components/WhatsAppIcon';
import { AnimatedMetricValue } from '../../src/components/MotionPrimitives';

const QuoteModal = dynamic(() => import('../../src/components/QuoteModal'), { ssr: false });

export default function SeoResultsPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('SEO, AEO & GEO Search Dominance');

  const openQuote = (service = 'SEO, AEO & GEO Search Dominance') => {
    setQuoteService(service);
    setQuoteOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F4EFE6] text-[#221710] selection:bg-[#C99D55]/30 selection:text-[#221710]">
      {/* =========================================================================
          STICKY LUXURY EDITORIAL HEADER (SANDSTONE / CHAMPAGNE-IVORY #F4EFE6)
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#F4EFE6]/98 border-b border-[#C99D55]/25 py-4 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-[#221710] hover:text-[#9C7130] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-[#C99D55]/40 bg-[#E8E1D5] flex items-center justify-center group-hover:border-[#C99D55] transition-colors">
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
              onClick={() => openQuote('SEO, AEO & GEO Search Dominance')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C99D55] bg-[#C99D55] text-[#221710] hover:bg-[#D5AC65] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
            >
              <span>Get SEO Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO SECTION (SOFT CHAMPAGNE-IVORY / SANDSTONE #F4EFE6)
          ========================================================================= */}
      <section className="pt-14 pb-12 sm:pt-18 sm:pb-16 border-b border-[#DFD7C9]">
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
            <span className="text-[#9C7130] font-semibold">SEO, AEO &amp; GEO Proof</span>
          </nav>

          {/* Editorial Eyebrow & Headline */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="w-7 h-[1.5px] bg-[#C99D55]" />
              <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#9C7130]">
                VERIFIED SEARCH &amp; AI TELEMETRY
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#221710] leading-[1.14] tracking-tight mb-4">
              SEO, AEO &amp; GEO{' '}
              <em className="font-serif italic font-normal text-[#9C7130]">
                Proof &amp; Rankings.
              </em>
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#574E46] max-w-2xl">
              Unfiltered Google Search Console telemetry, live ranking verifications, and real-time screen recordings across organic search, answer engines, and generative AI.
            </p>
          </div>

          {/* 4 High-Impact KPI Banners */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10">
            <div className="bg-[#FFFFFF] border border-[#DFD7C9] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                90-Day Impressions
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                <AnimatedMetricValue value="1.26M+" />
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                +413K vs Prior Cycle
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#DFD7C9] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                Verified Clicks
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                <AnimatedMetricValue value="87.6K+" />
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                +55.8% YoY Acceleration
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#DFD7C9] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                Peak SERP CTR
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                <AnimatedMetricValue value="28.8%" />
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                4.2x Industry Standard
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#DFD7C9] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                Average Position
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                <AnimatedMetricValue value="5.8" />
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                First Page Core Terms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CASE STUDIES SHOWCASE CONTAINER (STRICTLY SEO ONLY)
          ========================================================================= */}
      <section data-scroll-reveal className="py-14 sm:py-18">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <SeoProofShowcase showPageLink={false} />

          {/* =========================================================================
              CUSTOM SEO PROPOSAL CTA CARD
              ========================================================================= */}
          <div className="mt-16 rounded-2xl bg-[#221710] border border-[#C99D55]/30 p-8 sm:p-10 text-[#F6F2EA] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#C99D55] bg-[#2B1E15] border border-[#C99D55]/30 px-3 py-1 rounded-full inline-block mb-3">
                  READY TO SCALE YOUR ORGANIC SEARCH PIPELINE?
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F6F2EA] leading-tight mb-2.5">
                  Secure #1 Rankings &amp; AI Overview Citations.
                </h3>
                <p className="text-xs sm:text-sm text-[#C4B9AE] leading-relaxed mb-6 max-w-xl">
                  Tri-factor search dominance combining Google organic rankings, Google 3-Pack local map visibility, and direct authoritative citations across ChatGPT, Perplexity, and Gemini.
                </p>
                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => openQuote('SEO, AEO & GEO Search Dominance')}
                    className="bg-[#C99D55] hover:bg-[#D8AF68] text-[#221710] font-semibold px-6 py-3 text-xs sm:text-sm rounded-full transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
                  >
                    <span>Request an SEO Strategy →</span>
                  </button>
                  <a
                    href="https://wa.me/917980941101?text=Hi%20Joy%2C%20I%27d%20like%20to%20discuss%20SEO%20and%20AI%20search%20dominance."
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
                  SEO &amp; AI Search Growth Consultant
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
