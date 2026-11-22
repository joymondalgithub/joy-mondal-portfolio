'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Globe,
} from 'lucide-react';
import JoySignature from '../../src/components/JoySignature';
import WhatsAppIcon from '../../src/components/WhatsAppIcon';
import { LIVE_PROJECTS } from '../../src/data/portfolio';

const QuoteModal = dynamic(() => import('../../src/components/QuoteModal'), { ssr: false });

export default function CustomWebsitesPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('Custom Website Design & Development');

  const openQuote = (service = 'Custom Website Design & Development') => {
    setQuoteService(service);
    setQuoteOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8F5EE] text-[#221710] selection:bg-[#C99D55]/30 selection:text-[#221710]">
      {/* =========================================================================
          STICKY LUXURY EDITORIAL HEADER (CREAM #F8F5EE)
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#F8F5EE]/98 border-b border-[#C99D55]/25 py-4 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-[#221710] hover:text-[#9C7130] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-[#C99D55]/40 bg-[#EDE7DD] flex items-center justify-center group-hover:border-[#C99D55] transition-colors">
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
              onClick={() => openQuote('Custom Website Design & Development')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C99D55] bg-[#C99D55] text-[#221710] hover:bg-[#D5AC65] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
            >
              <span>Get Web Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO SECTION (SOFT WARM CREAM #F8F5EE)
          ========================================================================= */}
      <section className="pt-14 pb-12 sm:pt-18 sm:pb-16 border-b border-[#E3DCD0]">
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
            <span className="text-[#9C7130] font-semibold">Custom Websites</span>
          </nav>

          {/* Editorial Eyebrow & Headline */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="w-7 h-[1.5px] bg-[#C99D55]" />
              <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#9C7130]">
                CUSTOM WEB ARCHITECTURE &amp; SPEED
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#221710] leading-[1.14] tracking-tight mb-4">
              Bespoke Websites Engineered for{' '}
              <em className="font-serif italic font-normal text-[#9C7130]">
                Sub-Second Speed &amp; Revenue.
              </em>
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[#574E46] max-w-2xl">
              High-converting commercial platforms built with sub-second .WebP assets, mobile-first UX, and frictionless quote funnels. Strictly zero generic page-builder bloat—every site is custom-coded for maximum conversions.
            </p>
          </div>

          {/* 4 Architecture Highlights Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10">
            <div className="bg-[#FFFFFF] border border-[#E3DCD0] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                Edge Speed &amp; LCP
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                &lt; 0.8s
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                Sub-second edge delivery
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E3DCD0] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                Conversion Funnel
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                100%
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                Mobile-first call &amp; quote
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E3DCD0] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                Semantic Schema
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                Structured
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                Rich snippets &amp; entity graph
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E3DCD0] rounded-xl p-4 shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#9C7130] font-bold mb-1">
                Codebase Standard
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#221710]">
                Zero Bloat
              </div>
              <div className="text-[11px] font-mono text-[#10B981] font-semibold mt-0.5">
                Clean modern stack
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4 COMPACT LIVE WEBSITE CARDS (STRICTLY CUSTOM WEBSITES ONLY)
          ========================================================================= */}
      <section data-scroll-reveal className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E3DCD0]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#C99D55]/40 flex items-center justify-center text-[#9C7130]">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9C7130]">
                  Production Deployments
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#221710]">
                  4 Verified Client Websites Deployed Live
                </h2>
              </div>
            </div>
            <span className="text-xs font-mono text-[#8C7E72] hidden sm:inline">
              Strictly Web Architecture Only
            </span>
          </div>

          {/* 2x2 Responsive Compact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {LIVE_PROJECTS.map((project) => {
              const fallbackMshot = `https://s0.wp.com/mshots/v1/${encodeURIComponent(
                project.url
              )}?w=1200&h=750`;

              return (
                <article
                  key={project.domain}
                  data-scroll-reveal
                  className="bg-[#FFFFFF] border border-[#E3DCD0] hover:border-[#C99D55] rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Compact Browser Frame with Image Preview */}
                    <div className="aspect-[16/10] bg-[#FAF8F5] rounded-xl overflow-hidden border border-[#E3DCD0] relative mb-5 group">
                      
                      {/* Browser Top Chrome Header */}
                      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-3.5 py-1.5 border-b border-[#E3DCD0] bg-[#F8F5EE]">
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                          <span className="h-2 w-2 rounded-full bg-[#E57373]" />
                          <span className="h-2 w-2 rounded-full bg-[#E5C585]" />
                          <span className="h-2 w-2 rounded-full bg-[#81C784]" />
                        </div>
                        <span className="truncate rounded border border-[#C99D55]/30 bg-[#FFFFFF] px-2 py-0.5 font-mono text-[10px] text-[#221710] font-medium">
                          {project.domain}
                        </span>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8C7E72] hover:text-[#9C7130] transition-colors p-0.5"
                          title="Open website in new tab"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>

                      {/* Screenshot Container */}
                      <div className="relative pt-6 h-full w-full overflow-hidden">
                        <Image
                          src={project.localImage}
                          alt={`${project.title} live website preview`}
                          fill
                          loading="lazy"
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src !== fallbackMshot) {
                              target.src = fallbackMshot;
                            }
                          }}
                          className="h-full w-full object-cover object-top group-hover:scale-102 transition-transform duration-300 ease-out"
                        />
                      </div>

                      {/* Hover Overlay Pill */}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-30 flex items-center justify-center bg-[#221710]/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        aria-label={`Open live site for ${project.title}`}
                      >
                        <span className="bg-[#C99D55] text-[#221710] font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 transform group-hover:scale-100 scale-95 transition-transform duration-200">
                          Open Live Website ↗
                        </span>
                      </a>
                    </div>

                    {/* Eyebrow */}
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9C7130] block mb-1.5">
                      {project.eyebrow}
                    </span>

                    {/* Project Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#221710] mb-2 group-hover:text-[#9C7130] transition-colors">
                      {project.title}
                    </h3>

                    {/* Concise 1-2 Line Summary */}
                    <p className="text-xs sm:text-[13px] leading-relaxed text-[#574E46] mb-4">
                      {project.summary}
                    </p>

                    {/* Compact Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#FAF7F0] text-[#574E46] text-[11px] px-2.5 py-1 rounded-md font-medium border border-[#E3DCD0]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Bar */}
                  <div className="pt-4 mt-5 border-t border-[#E3DCD0] flex items-center justify-between">
                    <span className="font-mono text-xs text-[#8C7E72] truncate max-w-[180px] sm:max-w-xs">
                      {project.domain}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9C7130] hover:text-[#C99D55] font-semibold text-xs transition-colors inline-flex items-center gap-1"
                    >
                      <span>Visit Live Site</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* =========================================================================
              CUSTOM WEB PROPOSAL CTA CARD
              ========================================================================= */}
          <div className="mt-16 rounded-2xl bg-[#221710] border border-[#C99D55]/30 p-8 sm:p-10 text-[#F6F2EA] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#C99D55] bg-[#2B1E15] border border-[#C99D55]/30 px-3 py-1 rounded-full inline-block mb-3">
                  READY TO UPGRADE YOUR WEB INFRASTRUCTURE?
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F6F2EA] leading-tight mb-2.5">
                  Let&apos;s Build a Custom Platform That Converts.
                </h3>
                <p className="text-xs sm:text-sm text-[#C4B9AE] leading-relaxed mb-6 max-w-xl">
                  Every website is tailored to your commercial vertical with sub-second speeds, mobile quote funnels, and semantic entity schema.
                </p>
                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => openQuote('Custom Website Design & Development')}
                    className="bg-[#C99D55] hover:bg-[#D8AF68] text-[#221710] font-semibold px-6 py-3 text-xs sm:text-sm rounded-full transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
                  >
                    <span>Request a Web Proposal →</span>
                  </button>
                  <a
                    href="https://wa.me/917980941101?text=Hi%20Joy%2C%20I%27d%20like%20to%20discuss%20a%20custom%20website%20build."
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
                  Web Architecture &amp; Growth Consultant
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
