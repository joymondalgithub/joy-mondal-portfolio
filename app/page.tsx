'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Facebook,
  Mail,
  Megaphone,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import ExecutiveNavbar from '../src/components/ExecutiveNavbar';
import JoySignature from '../src/components/JoySignature';
import {
  GoldSpotlightOverlay,
  HeroPortraitDepth,
  RevealOnScroll,
  useGoldSpotlight,
} from '../src/components/MotionPrimitives';
import ParticleMeshCanvas from '../src/components/ParticleMeshCanvas';
import ScrollLightBeam from '../src/components/ScrollLightBeam';
import TypewriterDeliver from '../src/components/TypewriterDeliver';
import WhatsAppIcon from '../src/components/WhatsAppIcon';

const ContactSection = dynamic(() => import('../src/components/ContactSection'));
const FaqSection = dynamic(() => import('../src/components/FaqSection'));
const AuditSection = dynamic(() =>
  import('../src/components/GrowthSections').then((module) => module.AuditSection)
);
const LiveWorkSection = dynamic(() => import('../src/components/LiveWorkSection'));
const AboutSection = dynamic(() => import('../src/components/AboutSection'));
const QuoteModal = dynamic(() => import('../src/components/QuoteModal'), { ssr: false });
/* =========================================================================
   DATA: 5 CORE SERVICES IN COMPACT SLIM STACKED ARCHITECTURE
   ========================================================================= */
const CORE_SERVICES = [
  {
    number: '01',
    eyebrow: 'WEB ARCHITECTURE & SPEED',
    title: 'Custom Website Design & Development',
    summary: 'High-converting, bespoke web platforms engineered with sub-second .WebP assets, mobile UX, and frictionless quote funnels.',
    tags: ['Sub-Second Speed', 'Conversion UI/UX', 'Mobile Quote Funnels', 'Schema Markup'],
    highlight: 'Sub-Second Speed',
    icon: Zap,
    action: 'Inquire About Web Build',
    actionShort: 'Inquire / Build →',
  },
  {
    number: '02',
    eyebrow: 'ORGANIC & AI SEARCH VISIBILITY',
    title: 'SEO, AEO & GEO',
    summary: 'Tri-factor search dominance: #1 Google organic rankings, Google Maps 3-Pack, and authoritative citations across ChatGPT, Perplexity & Gemini.',
    tags: ['#1 Google Rank', 'Google Maps 3-Pack', 'AEO AI Overviews', 'GEO LLM Citations'],
    highlight: 'Top 3 & AI Overviews',
    icon: Search,
    action: 'Inquire About SEO & AI Search',
    actionShort: 'Inquire SEO →',
  },
  {
    number: '03',
    eyebrow: 'HIGH-INTENT COMMERCIAL ACQUISITION',
    title: 'Google Ads & Facebook Ads',
    summary: 'Precision-targeted PPC and paid social campaigns designed to drive qualified inbound calls and buyer conversions while eliminating wasted spend.',
    tags: ['Google Search PPC', 'Negative-Keyword Gating', 'Meta Retargeting Funnels', 'Full Call Tracking'],
    highlight: 'Zero Wasted Spend',
    icon: Megaphone,
    action: 'Inquire About Paid Ads',
    actionShort: 'Inquire Ads →',
  },
  {
    number: '04',
    eyebrow: '8-PLATFORM REPUTATION GOVERNANCE',
    title: 'Multi-Platform Review Management',
    summary: 'Automated 5-star review acquisition funnels and live rating badges synchronized across Google, Facebook, Trustpilot, Bark, Yell & Yelp.',
    tags: ['Google & Trustpilot', 'Automated SMS/Email', 'Live Rating Badges', '8 Monitored Platforms'],
    highlight: '8 Monitored Platforms',
    icon: Star,
    action: 'Inquire About Review Management',
    actionShort: 'Inquire Reviews →',
  },
  {
    number: '05',
    eyebrow: 'POLICY-COMPLIANT BRAND DEFENSE',
    title: 'Google Negative Review Removal',
    summary: '100% legal, policy-compliant dispute dossiers and appeals submitted directly through Google Legal to remove defamatory, fake, or spam 1-star reviews.',
    tags: ['100% Policy-Compliant', 'Google Legal Dossiers', 'Defamation & Spam Defense', 'Rating Recovery'],
    highlight: '100% Legal & Compliant',
    icon: ShieldCheck,
    action: 'Inquire About Review Removal',
    actionShort: 'Inquire Removal →',
  },
];

/* =========================================================================
   DATA: 4-STEP PROCESS (FOR 4-COLUMN DARK GRID)
   ========================================================================= */
const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Research & Audit',
    description: 'Deep dive into technical site health, local market competitors, missed keyword opportunities, and review directory gaps.',
  },
  {
    number: '02',
    title: 'Strategy & Architecture',
    description: 'Designing custom wireframes, conversion funnels, semantic entity schemas, and advertising campaign roadmaps.',
  },
  {
    number: '03',
    title: 'Execution & Optimization',
    description: 'Deploying clean code, launching negative-keyword gated ad funnels, and initiating policy-compliant reputation workflows.',
  },
  {
    number: '04',
    title: 'Tracking & Scaling',
    description: 'Monitoring Google Search Console impressions, AI Overview citations, lead costs, and scaling winning acquisition channels.',
  },
];

/* =========================================================================
   DATA: 5 FOUNDER AVATARS FOR HERO TRUST BADGE
   ========================================================================= */
const FOUNDER_AVATARS = [
  { name: 'Sarah M. · E-Commerce Founder', src: '/avatars/avatar-1.webp' },
  { name: 'David K. · Commercial Contractor', src: '/avatars/avatar-2.webp' },
  { name: 'Elena R. · Legal Firm Partner', src: '/avatars/avatar-3.webp' },
  { name: 'Marcus T. · Healthcare Clinic Owner', src: '/avatars/avatar-4.webp' },
  { name: 'Chloe B. · B2B SaaS Founder', src: '/avatars/avatar-5.webp' },
];

export default function HomePage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('');
  const [quoteWebsite, setQuoteWebsite] = useState('');
  const [quoteBusiness, setQuoteBusiness] = useState('');
  const [quoteCountry, setQuoteCountry] = useState('');
  const [quoteBrief, setQuoteBrief] = useState('');

  const spotlight = useGoldSpotlight();
  const processGridRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress: processScrollProgress } = useScroll({
    target: processGridRef,
    offset: ['start 82%', 'end 55%'],
  });
  const processLineScaleX = useTransform(processScrollProgress, [0, 1], [0, 1]);

  const openQuote = (
    websiteOrService = '',
    extra?: { business?: string; country?: string; brief?: string; service?: string }
  ) => {
    if (websiteOrService.startsWith('http') || websiteOrService.includes('.')) {
      setQuoteWebsite(websiteOrService);
      setQuoteService(extra?.service || '');
    } else if (websiteOrService) {
      setQuoteService(websiteOrService);
      setQuoteWebsite('');
    } else {
      setQuoteWebsite('');
      setQuoteService(extra?.service || '');
    }

    if (extra?.service) setQuoteService(extra.service);
    if (extra?.business) setQuoteBusiness(extra.business);
    if (extra?.country) setQuoteCountry(extra.country);
    if (extra?.brief) setQuoteBrief(extra.brief);

    setQuoteOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#221710] text-[#1C1510] relative">
      {/* =========================================================================
          HIGH-END SCROLL LIGHT BEAM & DIRECTIONAL "LIGHT-ON" AMBIENT GLOW
          ========================================================================= */}
      <ScrollLightBeam />

      {/* =========================================================================
          EXECUTIVE CONSULTANT NAVBAR (ISOLATED COMPONENT - ZERO SCROLL RE-RENDERS)
          ========================================================================= */}
      <ExecutiveNavbar onOpenQuote={openQuote} />

      {/* =========================================================================
          HERO SECTION (DARK ESPRESSO #221710)
          ========================================================================= */}
      <section
        id="about"
        className="bg-[#221710] relative overflow-hidden text-[#C4B9AE] pt-3 sm:pt-5 pb-12 lg:pb-16 scroll-mt-20"
      >
        <div id="hero" className="absolute top-0 left-0 -mt-20 pointer-events-none" />
        {/* Interactive Gold Particle Mesh / Constellation Canvas Background */}
        <ParticleMeshCanvas />

        {/* Subtle Warm Radial Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at 75% 35%, rgba(201, 157, 85, 0.12), transparent 60%)',
          }}
        />

        {/* Floating Gold Dust Accents */}
        <div aria-hidden="true" className="pointer-events-none absolute top-1/4 left-[15%] w-1.5 h-1.5 rounded-full bg-[#E5C585]/40 animate-pulse z-0" />
        <div aria-hidden="true" className="pointer-events-none absolute top-[58%] right-[22%] w-2 h-2 rounded-full bg-[#C99D55]/30 animate-float-slow z-0" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-1/4 left-[35%] w-1 h-1 rounded-full bg-[#E5C585]/35 z-0" />

        {/* Outer Container (Lifted Closer to Navbar) */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-1 sm:pt-2 w-full relative z-10">
          
          {/* Main Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14 w-full">
            
            {/* Left Column (lg:col-span-7 flex flex-col items-start text-left max-w-2xl) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left max-w-2xl">
              {/* Top Eyebrow Tagline & Outcome Headline */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="mb-2.5 flex items-center text-[11px] font-['Plus_Jakarta_Sans'] font-semibold tracking-[0.2em] uppercase text-[#C99D55]">
                  <span className="w-6 h-[1px] bg-[#C99D55]/60 inline-block mr-3" />
                  WEB ARCHITECTURE, SEO &amp; AI SEARCH GROWTH CONSULTANT
                </div>

                <h1
                  className="mb-4 tracking-tight"
                  style={{ fontSize: 'clamp(2.35rem, 3.8vw, 3.5rem)', lineHeight: 1.12 }}
                >
                  <span className="block font-['Plus_Jakarta_Sans'] font-extrabold text-[#F6F2EA]">
                    Websites &amp; Search
                  </span>
                  <span className="block">
                    <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-[#F6F2EA]">
                      That Drive{' '}
                    </span>
                    <span
                      className="font-['Playfair_Display'] italic font-bold text-[#C99D55]"
                      style={{ fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif" }}
                    >
                      Real
                    </span>
                  </span>
                  <span
                    className="block font-['Playfair_Display'] italic font-bold text-[#C99D55]"
                    style={{ fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif" }}
                  >
                    Business Growth.
                  </span>
                </h1>
              </motion.div>

              {/* Single-Line I Deliver Typewriter Row & Executive Bio Copy */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <TypewriterDeliver />

                <p className="mb-6 max-w-xl font-['Plus_Jakarta_Sans'] text-base sm:text-[17px] leading-[1.65] text-[#F6F2EA]/85">
                  I&apos;m Joy Mondal. I help ambitious businesses worldwide build high-converting websites, rank on Google Search and AI answers (AEO/GEO), scale with Paid Ads, and turn online visibility into qualified revenue.
                </p>
              </motion.div>

              {/* Primary CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-3.5 sm:gap-4"
              >
                <button
                  type="button"
                  onClick={() => openQuote()}
                  className="btn-gold-sheen bg-[#C99D55] hover:bg-[#D8AF68] text-[#221710] font-semibold px-7 py-3.5 text-base rounded-full transition-colors cursor-pointer shadow-lg inline-flex items-center gap-2"
                >
                  Book a Strategy Call →
                </button>
                <a
                  href="#work"
                  className="bg-[#2B1E15] hover:bg-[#35251A] border border-[#C99D55]/30 hover:border-[#C99D55]/60 text-[#F6F2EA] font-semibold px-7 py-3.5 text-base rounded-full transition-all inline-flex items-center gap-2"
                >
                  View Live Work
                </a>

                {/* Circular Social & Quick Connect Icons */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/917980941101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2B1E15] border border-[#C99D55]/30 text-[#25D366] hover:border-[#25D366] hover:bg-[#36261B] flex items-center justify-center transition-all shadow-md group"
                    title="Direct WhatsApp: +91 79809 41101"
                    aria-label="Direct WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="mailto:joymondal1306@gmail.com"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2B1E15] border border-[#C99D55]/30 text-[#E5C585] hover:border-[#C99D55] hover:bg-[#36261B] flex items-center justify-center transition-all shadow-md group"
                    title="Direct Email: joymondal1306@gmail.com"
                    aria-label="Direct Email"
                  >
                    <Mail className="w-5 h-5 text-[#C99D55] group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1FCjoMoAzP/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#2B1E15] border border-[#C99D55]/30 text-[#1877F2] hover:border-[#1877F2] hover:bg-[#36261B] flex items-center justify-center transition-all shadow-md group"
                    title="Connect on Facebook"
                    aria-label="Connect on Facebook"
                  >
                    <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </motion.div>

              {/* 5-Avatar Overlapping Trust Badge & Micro-Trust Note */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 sm:mt-6 pt-3.5 border-t border-[#C99D55]/15 flex flex-wrap items-center gap-y-3 gap-x-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center -space-x-3">
                    {FOUNDER_AVATARS.map((av, idx) => (
                      <div
                        key={idx}
                        className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-[#221710] shadow-md overflow-hidden select-none shrink-0 bg-[#2B1E15]"
                        title={av.name}
                      >
                        <Image
                          src={av.src}
                          alt={av.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          loading="eager"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C99D55] text-[#C99D55]" />
                      ))}
                    </div>
                    <span className="text-[12px] sm:text-[13px] font-medium text-[#F6F2EA]/90 tracking-tight mt-0.5">
                      Trusted by business owners &amp; founders worldwide
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-6 bg-[#C99D55]/20" />

                <p className="text-[11.5px] sm:text-xs text-[#F6F2EA]/65 tracking-wide">
                  Free 15-min growth audit • Direct consultation
                </p>
              </motion.div>
            </div>

            {/* Right Column (lg:col-span-5 flex justify-center lg:justify-end) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[420px]"
              >
                
                <HeroPortraitDepth>
                  {/* Symmetrical Rounded Portrait Frame */}
                  <div className="relative aspect-[4/5] w-full rounded-3xl border border-[#C99D55]/30 bg-gradient-to-b from-[#332419] to-[#221710] shadow-xl overflow-hidden">
                    <Image
                      src="/joy-mondal.webp"
                      alt="Joy Mondal, Search Visibility & Web Design Specialist"
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover object-top"
                    />
                  </div>
                </HeroPortraitDepth>

                {/* 1. Top-Left Badge: KEYWORD #1 */}
                <div className="absolute top-4 -left-3 sm:top-5 sm:-left-7 z-20 bg-[#221710]/98 border border-[#C99D55]/35 hover:border-[#C99D55]/60 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.5)] flex items-center gap-2.5 transition-all animate-float-slow">
                  <div className="w-7 h-7 rounded-lg bg-[#36261B] border border-[#C99D55]/30 flex items-center justify-center text-[#C99D55] shrink-0">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                      <span className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-bold tracking-wider text-[#F6F2EA] uppercase">
                        KEYWORD #1
                      </span>
                    </div>
                    <span className="font-mono text-[9.5px] sm:text-[10px] text-[#C99D55] font-medium leading-tight">
                      ↗ 1.26M+ Impressions
                    </span>
                  </div>
                </div>

                {/* 2. Top-Right Badge: Highlighted Champagne-Gold Pill (SEO • AEO • GEO) */}
                <div className="absolute top-4 -right-3 sm:top-5 sm:-right-7 z-20 bg-gradient-to-r from-[#C99D55] via-[#D5AC65] to-[#C99D55] border border-[#F6F2EA]/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-[0_6px_18px_rgba(201,157,85,0.3)] flex items-center gap-2.5 transition-all">
                  <div className="w-7 h-7 rounded-lg bg-[#221710] border border-[#221710] flex items-center justify-center text-[#C99D55] shrink-0 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#221710] animate-ping shrink-0" />
                      <span className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-extrabold tracking-wider text-[#221710] uppercase">
                        SEO • AEO • GEO
                      </span>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans'] text-[9.5px] sm:text-[10px] text-[#221710]/85 font-semibold leading-tight">
                      AI &amp; Search Visibility
                    </span>
                  </div>
                </div>

                {/* 3. Bottom-Left Badge: Average Client Growth */}
                <div className="absolute bottom-6 -left-3 sm:bottom-7 sm:-left-7 z-20 bg-[#221710]/98 border border-[#C99D55]/35 hover:border-[#C99D55]/60 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.5)] flex items-center gap-2.5 transition-all animate-float-delayed">
                  <div className="w-7 h-7 rounded-lg bg-[#36261B] border border-[#C99D55]/30 flex items-center justify-center text-[#C99D55] shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                      <span className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-bold tracking-wider text-[#F6F2EA]">
                        Average Client Growth
                      </span>
                    </div>
                    <span className="font-mono text-[9.5px] sm:text-[10px] text-[#25D366] font-medium leading-tight">
                      ↗ +185% Organic &amp; Leads
                    </span>
                  </div>
                </div>

                {/* 4. Bottom-Right Badge: HIGH-ROI ADS & WEB */}
                <div className="absolute bottom-6 -right-3 sm:bottom-7 sm:-right-7 z-20 bg-[#221710]/98 border border-[#C99D55]/35 hover:border-[#C99D55]/60 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.5)] flex items-center gap-2.5 transition-all">
                  <div className="w-7 h-7 rounded-lg bg-[#36261B] border border-[#C99D55]/30 flex items-center justify-center text-[#C99D55] shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C99D55] animate-pulse shrink-0" />
                      <span className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-bold tracking-wider text-[#F6F2EA] uppercase">
                        HIGH-ROI ADS &amp; WEB
                      </span>
                    </div>
                    <span className="font-mono text-[9.5px] sm:text-[10px] text-[#C99D55] font-medium leading-tight">
                      ↗ Google, Meta &amp; CRO
                    </span>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          FULL-WIDTH AUTHORITY TICKER BAR (BETWEEN HERO & SERVICES)
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ contain: 'layout paint' }}
        className="w-full border-t border-b border-[#C99D55]/20 bg-[#1C130D] py-3.5 overflow-hidden relative z-20"
      >
        <div className="animate-marquee whitespace-nowrap flex select-none text-xs sm:text-sm font-medium text-[#E5DDD3] tracking-wide items-center">
          {[1, 2].map((loop) => (
            <div key={loop} className="flex items-center shrink-0">
              <span className="mx-4 text-[#C99D55]">•</span>
              <span className="mx-2">Website Architecture</span>
              <span className="mx-4 text-[#C99D55]">•</span>
              <span className="mx-2">Google Search (SEO)</span>
              <span className="mx-4 text-[#C99D55]">•</span>
              <span className="mx-2">AI Overviews (AEO &amp; GEO)</span>
              <span className="mx-4 text-[#C99D55]">•</span>
              <span className="mx-2">Google &amp; Meta Ads</span>
              <span className="mx-4 text-[#C99D55]">•</span>
              <span className="mx-2">5-Star Reputation Management</span>
              <span className="mx-4 text-[#C99D55]">•</span>
              <span className="mx-2">Sub-Second Web Speed &amp; CRO</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* =========================================================================
          ABOUT SECTION
          ========================================================================= */}
      <AboutSection />

      {/* =========================================================================
          SECTION 1 — SELECTED WORK & PROOF (DARK ESPRESSO #221710)
          ========================================================================= */}
      <LiveWorkSection onOpenQuote={openQuote} />

      {/* =========================================================================
          SECTION 2 — CORE SERVICES & REPUTATION GOVERNANCE (WARM CREAM #FAF7F0)
          ========================================================================= */}
      <section
        id="services"
        data-scroll-reveal
        className="bg-[#FAF7F0] py-20 lg:py-24 text-[#221710] border-t border-b border-[#E3DCD0] scroll-mt-20 relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mb-10"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#9C7130] block mb-2.5">
              — CORE SERVICES &amp; GROWTH DISCIPLINES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.14] tracking-tight text-[#221710] mb-3">
              Bespoke growth solutions,{' '}
              <em className="font-serif italic font-normal text-[#9C7130]">
                engineered to compound.
              </em>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#574E46]">
              Five integrated growth disciplines tailored to your commercial model, target markets, and revenue goals—delivered with complete technical transparency, zero generic shortcuts, and measurable ROI.
            </p>
          </motion.div>

          {/* 5 Stacked Slim Horizontal Row Boxes */}
          <div className="flex flex-col gap-2.5 sm:gap-3 mb-12 sm:mb-14">
            {CORE_SERVICES.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <RevealOnScroll
                  key={service.number}
                  delayMs={index * 70}
                  style={{ contain: 'layout paint' }}
                  className="relative"
                >
                  <div
                    onPointerMove={spotlight.onPointerMove}
                    onPointerLeave={spotlight.onPointerLeave}
                    className="relative bg-[#FFFFFF] border border-[#E3DCD0] hover:border-[#C99D55] hover:-translate-y-0.5 rounded-xl sm:rounded-2xl p-3.5 sm:py-3.5 sm:px-5 transition-[transform,border-color] duration-200 shadow-xs group flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 overflow-hidden"
                  >
                    <GoldSpotlightOverlay />
                  {/* Left Column: Number Badge + Icon + Service Eyebrow & Title */}
                  <div className="relative z-10 flex items-center gap-3 sm:gap-3.5 md:min-w-[270px] lg:min-w-[320px] md:shrink-0">
                    <span className="font-mono text-xs font-bold text-[#9C7130] bg-[#FAF7F0] border border-[#C99D55]/30 px-2 py-0.5 rounded shrink-0">
                      {service.number}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#FAF7F0] border border-[#C99D55]/30 flex items-center justify-center text-[#9C7130] group-hover:border-[#C99D55] group-hover:scale-105 transition-all shadow-xs shrink-0">
                      <ServiceIcon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[9.5px] uppercase tracking-wider font-bold text-[#9C7130] leading-none mb-1">
                        {service.eyebrow}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#221710] group-hover:text-[#9C7130] transition-colors leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Middle Column: 1-Line Summary & Compact Inline Bullet Tags */}
                  <div className="flex-1 md:px-2 lg:px-4 flex flex-col justify-center">
                    <p className="text-xs text-[#574E46] leading-relaxed mb-1.5 line-clamp-1 hidden sm:block">
                      {service.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {service.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#4A3E36] bg-[#FAF7F0] border border-[#E3DCD0] px-2 py-0.5 rounded-md"
                        >
                          <span className="text-[#9C7130] text-[9px]">✦</span>
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Sleek Action Link/Button */}
                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E3DCD0]/60">
                    <span className="md:hidden text-[10.5px] font-mono font-semibold text-[#9C7130] bg-[#FAF7F0] border border-[#C99D55]/30 px-2 py-0.5 rounded">
                      {service.highlight}
                    </span>
                    <button
                      type="button"
                      onClick={() => openQuote(service.title)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF7F0] hover:bg-[#C99D55] text-[#221710] border border-[#C99D55]/40 hover:border-[#C99D55] text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs group/btn ml-auto md:ml-0"
                    >
                      <span>{service.actionShort}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Custom Consultation & Quote Banner */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl bg-gradient-to-br from-[#221710] via-[#2A1D15] to-[#1C130D] border border-[#C99D55]/30 p-8 sm:p-10 shadow-xl overflow-hidden text-[#F6F2EA]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(201, 157, 85, 0.14) 0%, rgba(201, 157, 85, 0.04) 45%, transparent 70%)',
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Headline & Value Proposition */}
              <div className="lg:col-span-8">
                <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#C99D55] bg-[#1C130D] border border-[#C99D55]/30 px-3 py-1 rounded-full inline-block mb-3">
                  TRANSPARENT, BESPOKE ENGAGEMENTS
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F6F2EA] leading-tight mb-3">
                  No Rigid Packages. Every Scope Is Custom-Built.
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#B8AFA6] mb-5 max-w-2xl">
                  Every business operates with distinct margins, competitive landscapes, and target demographics. Whether you are a growing local service company, an e-commerce brand, a B2B enterprise, or a professional services firm, I engineer a tailored scope of work aligned with your exact commercial objectives in your market. No locked-in bloated retainers; every proposal includes transparent milestone deliverables and dedicated execution.
                </p>

                {/* 4 Trust Signals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#E5DDD3] mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99D55] shrink-0" />
                    <span>Serving all industries &amp; commercial verticals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99D55] shrink-0" />
                    <span>Worldwide client delivery across all global markets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99D55] shrink-0" />
                    <span>Multi-currency invoicing (USD, GBP, EUR, INR, USDT)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99D55] shrink-0" />
                    <span>Direct founder collaboration — no outsourced juniors</span>
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => openQuote('Custom Growth Engagement')}
                    className="btn-gold-sheen bg-[#C99D55] hover:bg-[#D8AF68] text-[#221710] font-semibold px-6 py-3 text-sm rounded-full transition-colors cursor-pointer shadow-lg inline-flex items-center gap-2"
                  >
                    Request a Custom Proposal →
                  </button>
                  <a
                    href="https://wa.me/917980941101?text=Hi%20Joy%2C%20I%27d%20like%20to%20discuss%20a%20custom%20growth%20engagement%20for%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2B1E15] hover:bg-[#35251A] border border-[#C99D55]/30 hover:border-[#C99D55]/60 text-[#F6F2EA] font-semibold px-6 py-3 text-sm rounded-full transition-all inline-flex items-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                    <span>WhatsApp Direct Chat</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Joy Signature Stamp & Verification */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center text-center lg:text-right pt-4 lg:pt-0 border-t lg:border-t-0 border-[#C99D55]/15">
                <JoySignature variant="gold" width={220} height={55} className="mb-3" />
                <span className="text-xs font-semibold text-[#F6F2EA] tracking-wide block">
                  Joy Mondal
                </span>
                <span className="text-[11px] text-[#C99D55] tracking-wider uppercase block mt-0.5">
                  Web Architecture &amp; Growth Consultant
                </span>
                <span className="text-[10px] text-[#B8AFA6] mt-2 block">
                  Confidential NDAs &amp; Guaranteed SLAs
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — FREE AI GROWTH & REPUTATION AUDIT (CREAM #F8F5EE)
          ========================================================================= */}
      <AuditSection
        onGetFixPlan={(data) => {
          if (typeof data === 'string') {
            openQuote(data);
          } else {
            openQuote(data.website, {
              business: data.businessName,
              country: data.location,
              brief: data.summary,
            });
          }
        }}
      />

      {/* =========================================================================
          SECTION 6 — FOUR-STEP PROCESS (DARK ESPRESSO #221710)
          ========================================================================= */}
      <section id="process" data-scroll-reveal className="bg-[#221710] py-24 lg:py-28 text-[#B8AFA6] border-t border-[#C99D55]/15 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mb-14"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B89B72] block mb-3">
              — HOW WE WORK
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold leading-[1.14] tracking-tight text-[#F6F2EA] mb-4">
              A four-step process,{' '}
              <em className="font-serif italic font-normal text-[#C99D55]">
                repeated until it compounds.
              </em>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#B8AFA6]">
              A disciplined, transparent delivery framework engineered to turn initial audits into compounding market leadership.
            </p>
          </motion.div>

          {/* 4-Column Dark Grid with Scroll-Linked Champagne Gold Connector Line */}
          <div ref={processGridRef} className="relative">
            <div
              aria-hidden="true"
              className="hidden lg:block pointer-events-none absolute top-9 left-[12.5%] right-[12.5%] h-[2px] bg-[#C99D55]/15 rounded-full overflow-hidden z-0"
            >
              <motion.div
                className="h-full w-full bg-gradient-to-r from-[#C99D55] via-[#E5C585] to-[#D4AF37]"
                style={{
                  scaleX: shouldReduceMotion ? 1 : processLineScaleX,
                  transformOrigin: 'left',
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {PROCESS_STEPS.map((step, idx) => (
                <RevealOnScroll
                  key={step.number}
                  delayMs={idx * 80}
                  style={{ contain: 'layout paint' }}
                  className="h-full"
                >
                  <div
                    onPointerMove={spotlight.onPointerMove}
                    onPointerLeave={spotlight.onPointerLeave}
                    className="relative h-full bg-[#2B1E15] border border-[#C99D55]/18 hover:border-[#C99D55]/50 hover:-translate-y-0.5 rounded-xl p-6 flex flex-col justify-between transition-[transform,border-color] duration-200 group shadow-lg overflow-hidden"
                  >
                    <GoldSpotlightOverlay />
                    <div className="relative z-10">
                      <span className="text-xs font-mono font-bold text-[#C99D55] bg-[#36261B] border border-[#C99D55]/25 px-2.5 py-1 rounded w-fit inline-block mb-4">
                        STEP {step.number}
                      </span>
                      <h3 className="text-lg font-bold text-[#F6F2EA] mb-2 group-hover:text-[#C99D55] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] leading-relaxed text-[#B8AFA6]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — FAQ ACCORDION (CREAM #F8F5EE)
          ========================================================================= */}
      <FaqSection />

      {/* =========================================================================
          SECTION 8 — CONTACT & FOOTER (DARK ESPRESSO #221710)
          ========================================================================= */}
      <ContactSection onOpenQuote={() => openQuote()} />

      {/* =========================================================================
          FLOATING WHATSAPP BUTTON
          ========================================================================= */}
      <a
        href="https://wa.me/917980941101?text=Hi%20Joy%2C%20I%27d%20like%20to%20discuss%20growth%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105"
        aria-label="Chat with Joy on WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      {/* Service Proposal & Quote Modal */}
      {quoteOpen && (
        <QuoteModal
          isOpen={quoteOpen}
          onClose={() => setQuoteOpen(false)}
          initialService={quoteService}
          initialWebsite={quoteWebsite}
          initialBusiness={quoteBusiness}
          initialCountry={quoteCountry}
          initialBrief={quoteBrief}
        />
      )}
    </main>
  );
}
