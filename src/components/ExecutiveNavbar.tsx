'use client';

import React, { useState, useEffect, memo } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface ExecutiveNavbarProps {
  onOpenQuote: (service?: string) => void;
}

const navItems = [
  ['About', '#about-me'],
  ['Work', '#work'],
  ['Services', '#services'],
  ['AI Audit', '#ai-audit'],
  ['Process', '#process'],
  ['FAQ', '#faq'],
];

function ExecutiveNavbar({ onOpenQuote }: ExecutiveNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Zero-Reflow IntersectionObserver for navbar scroll state (no continuous scroll listener)
  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      const topObserver = new IntersectionObserver(
        ([entry]) => {
          setScrolled(!entry.isIntersecting);
        },
        { rootMargin: '-20px 0px 0px 0px', threshold: 0 }
      );
      topObserver.observe(heroEl);
      return () => topObserver.disconnect();
    }

    let frameId = 0;
    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 20;
        setScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
        frameId = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  // Section highlight observer isolated strictly to this navbar with zero DOM reads
  useEffect(() => {
    const sections = ['about-me', 'work', 'services', 'ai-audit', 'process', 'faq'];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    let rAFId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          if (rAFId) cancelAnimationFrame(rAFId);
          rAFId = requestAnimationFrame(() => {
            setActiveSection((prev) => (prev !== visible.target.id ? visible.target.id : prev));
          });
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      if (rAFId) cancelAnimationFrame(rAFId);
    };
  }, []);

  // Close mobile navigation menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 h-20 w-full transition-colors duration-200 flex items-center ${
        scrolled
          ? 'bg-[#221710]/98 border-b border-[#C99D55]/20 shadow-lg'
          : 'bg-[#221710] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex items-center justify-between gap-6">
        {/* Left Brand Lockup: Joy Mondal | GROWTH · WEBSITE • SEO • ADS */}
        <a
          href="#hero"
          className="flex items-center shrink-0 group select-none transition-transform hover:opacity-95"
          aria-label="Joy Mondal | GROWTH · WEBSITE • SEO • ADS"
        >
          <BrandLogo priority className="h-10 sm:h-[42px] w-auto shrink-0" />
        </a>

        {/* Balanced International Navigation Links with Gold Hover Underlines & Submenu */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8" aria-label="Main navigation">
          {navItems.map(([label, href]) => {
            const sectionId = href.replace('#', '');
            const isActive = activeSection === sectionId;

            if (label === 'Work') {
              return (
                <div key={href} className="relative group/work py-2">
                  <a
                    href={href}
                    onClick={() => setActiveSection(sectionId)}
                    className={`group relative inline-flex items-center gap-1.5 pb-1 text-[13.5px] font-medium tracking-[0.01em] whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                      isActive ? 'text-[#F6F2EA]' : 'text-[#F6F2EA]/80 hover:text-[#F6F2EA]'
                    }`}
                  >
                    <span>{label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#C99D55] transition-transform duration-200 group-hover/work:rotate-180" />
                    <span
                      className={`pointer-events-none absolute left-0 bottom-0 h-[2px] bg-[#C99D55] rounded-full transition-all duration-300 ease-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>

                  {/* Work Dropdown Submenu */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 opacity-0 pointer-events-none group-hover/work:opacity-100 group-hover/work:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-[#1C130D]/98 border border-[#C99D55]/30 rounded-xl p-1.5 shadow-2xl min-w-[210px] flex flex-col gap-0.5">
                      <a
                        href="#work"
                        onClick={() => setActiveSection('work')}
                        className="flex items-center px-3 py-2 rounded-lg text-xs font-semibold text-[#F6F2EA] hover:bg-[#C99D55]/15 transition-colors"
                      >
                        All Work
                      </a>
                      <div className="h-px bg-[#C99D55]/15 my-0.5" />
                      <a
                        href="#work-websites"
                        onClick={() => setActiveSection('work')}
                        className="flex items-center px-3 py-2 rounded-lg text-xs font-medium text-[#C4B9AE] hover:text-[#F6F2EA] hover:bg-[#C99D55]/15 transition-colors"
                      >
                        Custom Websites
                      </a>
                      <a
                        href="#work-seo"
                        onClick={() => setActiveSection('work')}
                        className="flex items-center px-3 py-2 rounded-lg text-xs font-medium text-[#C4B9AE] hover:text-[#F6F2EA] hover:bg-[#C99D55]/15 transition-colors"
                      >
                        SEO, AEO &amp; GEO Proof
                      </a>
                      <a
                        href="#work-ads"
                        onClick={() => setActiveSection('work')}
                        className="flex items-center px-3 py-2 rounded-lg text-xs font-medium text-[#C4B9AE] hover:text-[#F6F2EA] hover:bg-[#C99D55]/15 transition-colors"
                      >
                        Google Ads &amp; Facebook Ads
                      </a>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={href}
                href={href}
                onClick={() => setActiveSection(sectionId)}
                className={`group relative inline-flex items-center gap-1.5 pb-1 text-[13.5px] font-medium tracking-[0.01em] whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-[#F6F2EA]' : 'text-[#F6F2EA]/80 hover:text-[#F6F2EA]'
                }`}
              >
                <span>{label}</span>
                {label === 'AI Audit' && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-mono font-extrabold uppercase tracking-wider bg-[#C99D55] text-[#221710] shadow-xs leading-none">
                    NEW
                  </span>
                )}
                <span
                  className={`pointer-events-none absolute left-0 bottom-0 h-[2px] bg-[#C99D55] rounded-full transition-all duration-300 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right Executive CTA Button */}
        <div className="hidden sm:flex items-center">
          <button
            type="button"
            onClick={() => onOpenQuote()}
            className="btn-gold-sheen shrink-0 px-5 py-2.5 rounded-full bg-[#C99D55] hover:bg-[#D5AC65] text-[#221710] text-[13.5px] font-semibold tracking-wide transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md inline-flex items-center justify-center"
          >
            Let&apos;s Talk
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="rounded-full border border-[#C99D55]/30 p-2 text-[#F6F2EA] md:hidden hover:border-[#C99D55]/60 transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <nav className="border-t border-[#C99D55]/20 bg-[#221710]/98 px-6 py-5 md:hidden" aria-label="Mobile navigation">
          <div className="max-w-7xl mx-auto flex flex-col gap-3">
            {navItems.map(([label, href]) => {
              const sectionId = href.replace('#', '');
              const isActive = activeSection === sectionId;

              if (label === 'Work') {
                return (
                  <div key={href} className="flex flex-col gap-1 pb-1">
                    <a
                      href={href}
                      onClick={() => {
                        setActiveSection(sectionId);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between text-sm font-medium transition-colors py-1 ${
                        isActive ? 'text-[#C99D55] font-semibold' : 'text-[#F6F2EA]/80 hover:text-[#F6F2EA]'
                      }`}
                    >
                      <span>{label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C99D55]" />}
                    </a>
                    <div className="pl-3 py-1 flex flex-col gap-2 border-l border-[#C99D55]/25 my-1 ml-1">
                      <a
                        href="#work-websites"
                        onClick={() => {
                          setActiveSection('work');
                          setMobileMenuOpen(false);
                        }}
                        className="text-xs text-[#C4B9AE] hover:text-[#F6F2EA] flex items-center justify-between py-0.5"
                      >
                        <span>↳ Custom Websites</span>
                      </a>
                      <a
                        href="#work-seo"
                        onClick={() => {
                          setActiveSection('work');
                          setMobileMenuOpen(false);
                        }}
                        className="text-xs text-[#C4B9AE] hover:text-[#F6F2EA] flex items-center justify-between py-0.5"
                      >
                        <span>↳ SEO, AEO &amp; GEO Proof</span>
                      </a>
                      <a
                        href="#work-ads"
                        onClick={() => {
                          setActiveSection('work');
                          setMobileMenuOpen(false);
                        }}
                        className="text-xs text-[#C4B9AE] hover:text-[#F6F2EA] flex items-center justify-between py-0.5"
                      >
                        <span>↳ Google Ads &amp; Facebook Ads</span>
                      </a>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => {
                    setActiveSection(sectionId);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between text-sm font-medium transition-colors py-1 ${
                    isActive ? 'text-[#C99D55] font-semibold' : 'text-[#F6F2EA]/80 hover:text-[#F6F2EA]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{label}</span>
                    {label === 'AI Audit' && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-mono font-extrabold uppercase tracking-wider bg-[#C99D55] text-[#221710] leading-none">
                        NEW
                      </span>
                    )}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C99D55]" />}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="bg-[#C99D55] hover:bg-[#D5AC65] text-[#221710] font-semibold text-sm px-6 py-3 rounded-full transition-colors mt-2 text-center cursor-pointer"
            >
              Let&apos;s Talk
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}

export default memo(ExecutiveNavbar);
