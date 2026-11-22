'use client';

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Sparkles,
  X,
  MessageSquare,
  Mail,
  Facebook,
  Copy,
  ExternalLink,
  Search,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import JoySignature from './JoySignature';

/* =========================================================================
   TYPES & DATA DEFINITIONS (BESPOKE SCOPES - NO FIXED TIERS)
   ========================================================================= */

export interface ScopeOption {
  id: string;
  name: string;
  isPopular?: boolean;
  subtitle: string;
  timeline: string;
  deliverables: string[];
}

export interface ServiceScopeDefinition {
  id: string;
  number: string;
  title: string;
  summary: string;
  defaultScopeId: string;
  scopes: ScopeOption[];
}

export const SERVICES_CATALOG: ServiceScopeDefinition[] = [
  {
    id: 'web-design',
    number: '01',
    title: 'Custom Website Design & Development',
    summary:
      'High-performance bespoke web applications and digital flagships engineered for conversions, sub-second load times, and executive credibility.',
    defaultScopeId: 'conversion-flagship',
    scopes: [
      {
        id: 'conversion-flagship',
        name: 'High-Converting Brand Flagship',
        isPopular: true,
        subtitle:
          'A bespoke digital flagship built from scratch to attract high-intent clients and convert visitors into qualified calls.',
        timeline: 'Rapid 5–10 Day Sprint',
        deliverables: [
          'Bespoke custom UI/UX design (Tailwind CSS & Next.js)',
          'Mobile-first responsive architecture & micro-interactions',
          'Speed & Core Web Vitals tuning (sub-second load, .WebP assets)',
          'High-converting call, WhatsApp & multi-step quote forms',
          'Google Analytics 4 & Google Search Console verification',
          'Schema markup (Organization, WebSite, LocalBusiness) for SEO & AI visibility',
          'Domain, DNS & high-availability cloud hosting deployment',
        ],
      },
      {
        id: 'interactive-experience',
        name: 'Interactive Brand & Motion Experience',
        subtitle:
          'Elevated bespoke animations, fluid interactive transitions, and immersive brand storytelling for premium positioning.',
        timeline: '7–14 Day Custom Sprint',
        deliverables: [
          'Advanced GPU-accelerated motion & micro-interactions',
          'Custom illustration/asset styling & editorial typography',
          'Interactive calculators, visual product/service selectors',
          'Full Core Web Vitals optimization with zero layout shift',
          'Omnichannel lead qualification funnels & CRM integration',
          'Search Engine & Generative Engine entity optimization',
          'Dedicated post-launch warranty & performance monitoring',
        ],
      },
      {
        id: 'multi-location-system',
        name: 'Multi-Service & Regional Scaling Architecture',
        subtitle:
          'Scalable modular architecture for multi-service or multi-location companies dominating competitive national and international markets.',
        timeline: 'Bespoke Architecture Sprint',
        deliverables: [
          'Modular landing page system for multi-service expansion',
          'Dedicated geo-targeted service area page structure',
          'Dynamic lead routing & CRM/webhook automations',
          'Deep technical SEO, local schema & AEO structured data',
          'Custom headless CMS or component library integration',
          'High-volume conversion optimization & A/B testing readiness',
          'Executive analytics dashboard & pipeline tracking',
        ],
      },
    ],
  },
  {
    id: 'seo-aeo-geo',
    number: '02',
    title: 'SEO, AEO & GEO Search Dominance',
    summary:
      'Omnichannel search authority across Google Map Pack, organic rankings, Google AI Overviews, Perplexity & ChatGPT.',
    defaultScopeId: 'multi-area-authority',
    scopes: [
      {
        id: 'local-market-authority',
        name: 'Local & Regional Market Dominance',
        subtitle:
          'Google Business Profile, local Map Pack dominance, and high-intent buyer keyword capture for local service leaders.',
        timeline: 'Ongoing Monthly Growth System',
        deliverables: [
          'Google Business Profile complete audit, categories & geo-optimization',
          'Local citation cleanup & high-authority directory placements',
          'Primary service-area keyword mapping & on-page technical SEO',
          'Structured JSON-LD schema (LocalBusiness, GeoCoordinates, Reviews)',
          'Monthly Map Pack ranking, incoming call & conversion tracking',
        ],
      },
      {
        id: 'multi-area-authority',
        name: 'Multi-Location & Technical Scaling',
        isPopular: true,
        subtitle:
          'Multi-area organic search expansion, technical content authority, and high-ranking service hub architecture.',
        timeline: 'Ongoing Monthly Growth System',
        deliverables: [
          'Includes all Local Market Dominance deliverables',
          'Dedicated area & service page SEO expansion architecture',
          'Technical SEO audit, crawl budget & Core Web Vitals remediation',
          'Competitor keyword gap analysis & authoritative backlink building',
          'Bi-weekly conversion tracking & organic pipeline reports',
        ],
      },
      {
        id: 'ai-geo-dominance',
        name: 'Generative AI & Answer Engine Dominance (AEO & GEO)',
        subtitle:
          'Positioning your brand as the primary cited authority in Google AI Overviews, Perplexity, and ChatGPT.',
        timeline: 'Ongoing Monthly Growth System',
        deliverables: [
          'Includes all Multi-Location & Technical Scaling deliverables',
          'Answer Engine Optimization (AEO) for Google featured answers & FAQ snippets',
          'Generative Engine Optimization (GEO) brand entity citation structuring',
          'Authority digital PR placements and verified brand knowledge graph signals',
          'Weekly search rankings, AI model citation & lead pipeline tracking',
        ],
      },
    ],
  },
  {
    id: 'paid-ads',
    number: '03',
    title: 'Google Ads & Facebook / Meta Paid Advertising',
    summary:
      'Precision paid acquisition campaigns engineered to generate qualified inbound calls and high-margin contracts at controlled cost-per-lead.',
    defaultScopeId: 'full-funnel-omnichannel',
    scopes: [
      {
        id: 'google-search-funnel',
        name: 'High-Intent Google Search Funnels',
        subtitle:
          'High-intent buyer search campaigns capturing ready-to-hire clients at the exact moment of search intent.',
        timeline: 'Rapid 3–5 Day Setup',
        deliverables: [
          'High-intent buyer keyword research & negative keyword safeguards',
          'Conversion-focused ad copywriting with all relevant assets/extensions',
          'Direct call & quote form extension configuration',
          'Google Tag Manager & offline conversion value tracking',
          'Weekly bid, search query & cost-per-lead optimization',
        ],
      },
      {
        id: 'meta-lead-engine',
        name: 'Targeted Meta & Social Lead Engines',
        subtitle:
          'High-converting Facebook & Instagram ad creative, targeted audiences, and instant lead capture funnels.',
        timeline: 'Rapid 3–5 Day Setup',
        deliverables: [
          'Custom audience research, interest layering & lookalike targeting',
          'High-performing ad creative, hook copywriting & image/video assets',
          'Instant on-platform lead forms & direct WhatsApp funnel integration',
          'Meta Pixel & Conversions API (CAPI) server-side event tracking',
          'Weekly creative iteration, fatigue prevention & CPL scaling',
        ],
      },
      {
        id: 'full-funnel-omnichannel',
        name: 'Full-Funnel Omnichannel Scaling',
        isPopular: true,
        subtitle:
          'Integrated Google Search + Meta Retargeting omnichannel capture paired with a dedicated custom landing page.',
        timeline: 'Complete 5–7 Day Sprint',
        deliverables: [
          'Combined Google Search Ads & Meta retargeting campaigns',
          'Bespoke high-converting campaign landing page designed & deployed',
          'End-to-end Pixel, Tag Manager & server-side conversion tracking',
          'Weekly ROI optimization, negative search terms audit & lead quality review',
          'Direct Slack / WhatsApp communication channel for immediate feedback',
        ],
      },
    ],
  },
  {
    id: 'reputation',
    number: '04',
    title: 'Multi-Platform Review & Reputation Management',
    summary:
      'Turn online reputation into a dominant conversion moat while defending against malicious, fake, or policy-violating reviews.',
    defaultScopeId: 'automated-review-growth',
    scopes: [
      {
        id: 'automated-review-growth',
        name: 'Automated 5-Star Review Growth Engine',
        isPopular: true,
        subtitle:
          'Automated SMS/Email review collection funnels across Google, Trustpilot, Facebook & key industry directories.',
        timeline: 'Instant 2–3 Day Setup',
        deliverables: [
          'Automated SMS & email review request funnels post-service',
          'Direct routing to Google, Trustpilot, Facebook, Yelp, Bark & Checkatrade',
          'Negative feedback interceptor routing dissatisfied customers to private resolution',
          'Dynamic website review badge & live testimonial widget integration',
        ],
      },
      {
        id: 'negative-review-removal',
        name: 'Policy-Compliant Negative Review Removal',
        subtitle:
          '100% Google policy-compliant forensic dispute of fake, spam, defamatory, or conflict-of-interest reviews.',
        timeline: 'Policy-Led Dispute Dossier',
        deliverables: [
          'Forensic audit of policy violations (spam, defamation, conflict-of-interest, hate speech)',
          'Structured Google Business Profile policy dispute dossiers with evidence',
          'Case escalation & follow-up tracking through Google Support channels',
          'Legitimate customer response drafting & reputational recovery strategy',
        ],
      },
      {
        id: 'full-brand-shield',
        name: '24/7 Full Brand Shield & Defense',
        subtitle:
          'Complete reputation acceleration, real-time alert systems, and active brand defense across all platforms.',
        timeline: 'Continuous Brand Defense',
        deliverables: [
          'Includes all Automated Review Growth + Negative Review Removal deliverables',
          'Real-time multi-platform review alerts & professional response drafting',
          'Competitor reputation benchmarking & sentiment analysis',
          'Monthly trust score reports & executive brand protection reviews',
        ],
      },
    ],
  },
  {
    id: 'cro-speed',
    number: '05',
    title: 'Conversion Rate (CRO) & Speed Optimization',
    summary:
      'Accelerate website loading times to sub-second speeds and re-engineer user journeys to significantly boost qualified lead conversions.',
    defaultScopeId: 'full-cro-speed-overhaul',
    scopes: [
      {
        id: 'speed-core-web-vitals',
        name: 'Core Web Vitals & Sub-Second Speed',
        subtitle:
          'Eliminate slow load times, pass Google Core Web Vitals, and hit 90+ PageSpeed scores on mobile.',
        timeline: 'Rapid 2–3 Day Sprint',
        deliverables: [
          'Next-gen .WebP image compression, sizing & responsive srcset setup',
          'Self-hosted modern .woff2 fonts & render-blocking CSS/JS elimination',
          'Browser caching, CDN asset optimization & preconnect resource hints',
          'Zero layout shift (CLS = 0.00) and sub-second Largest Contentful Paint (LCP)',
        ],
      },
      {
        id: 'conversion-funnel-redesign',
        name: 'Conversion Rate & Lead Funnel Redesign',
        subtitle:
          'Transform existing website traffic into qualified calls, quote requests, and booked appointments.',
        timeline: '3–5 Day Sprint',
        deliverables: [
          'Mobile-first sticky action bar (Call, WhatsApp, Instant Quote)',
          'Hero section restructuring, high-trust credential badges & proof placement',
          'Form friction removal, multi-step lead capture & field optimization',
          'Google Analytics 4 & conversion event tracking for every form and call click',
        ],
      },
      {
        id: 'full-cro-speed-overhaul',
        name: 'Full Speed + Conversion UX Re-Architecture',
        isPopular: true,
        subtitle:
          'End-to-end technical performance overhaul combined with complete UX conversion restructuring.',
        timeline: '5–7 Day Comprehensive Sprint',
        deliverables: [
          'Includes all Speed & Core Web Vitals + Conversion Funnel Redesign deliverables',
          'Comprehensive UX audit of mobile & desktop user journeys',
          'Technical schema markup for search engines & AI crawlers',
          '7-day post-launch conversion and speed telemetry monitoring',
        ],
      },
    ],
  },
  {
    id: 'custom-growth',
    number: '06',
    title: 'Custom Bespoke Growth Engagement',
    summary:
      'End-to-end multi-channel execution tailored directly to your business model, target revenue goals, and market opportunity.',
    defaultScopeId: 'turnkey-growth-partnership',
    scopes: [
      {
        id: 'turnkey-growth-partnership',
        name: 'Turnkey Growth Partnership',
        isPopular: true,
        subtitle:
          'All-in-one execution covering modern web design, multi-location search dominance, and paid lead generation.',
        timeline: 'Bespoke Scope & Dedicated Roadmap',
        deliverables: [
          'High-converting bespoke web application development',
          'Full-funnel Google Ads & Meta advertising campaign management',
          'Organic search dominance (Local SEO, Map Pack, AEO & GEO AI visibility)',
          'Review automation & negative review dispute protection',
          'Direct communication with Joy Mondal via WhatsApp/Slack',
          'Bi-weekly strategy reviews & transparent ROI reporting',
        ],
      },
    ],
  },
];

export const GLOBAL_CURRENCIES = [
  'USD ($)',
  'GBP (£)',
  'EUR (€)',
  'CAD (C$)',
  'AUD (A$)',
  'AED',
  'SAR',
  'SGD (S$)',
  'NZD (NZ$)',
  'CHF',
  'INR (₹)',
  'USDT (Crypto)',
  'Other / Custom Currency',
] as const;

export interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialWebsite?: string;
  initialBusiness?: string;
  initialCountry?: string;
  initialBrief?: string;
}

/* =========================================================================
   MODAL CONTAINER COMPONENT
   ========================================================================= */

export default function QuoteModal({
  isOpen,
  onClose,
  initialService = '',
  initialWebsite = '',
  initialBusiness = '',
  initialCountry = '',
  initialBrief = '',
}: QuoteModalProps) {
  if (!isOpen) return null;

  return (
    <QuoteModalContent
      onClose={onClose}
      initialService={initialService}
      initialWebsite={initialWebsite}
      initialBusiness={initialBusiness}
      initialCountry={initialCountry}
      initialBrief={initialBrief}
    />
  );
}

/* =========================================================================
   MODAL CONTENT CONTROLLER
   ========================================================================= */

function QuoteModalContent({
  onClose,
  initialService = '',
  initialWebsite = '',
  initialBusiness = '',
  initialCountry = '',
  initialBrief = '',
}: Omit<QuoteModalProps, 'isOpen'>) {
  // Determine matching service definition from initialService
  const matchedService =
    SERVICES_CATALOG.find((s) => {
      const q = initialService.toLowerCase().trim();
      if (!q) return false;
      return (
        s.title.toLowerCase() === q ||
        q.includes(s.title.toLowerCase()) ||
        s.title.toLowerCase().includes(q) ||
        s.id.toLowerCase() === q ||
        (q.includes('web') && s.id === 'web-design') ||
        (q.includes('seo') && s.id === 'seo-aeo-geo') ||
        (q.includes('aeo') && s.id === 'seo-aeo-geo') ||
        (q.includes('geo') && s.id === 'seo-aeo-geo') ||
        (q.includes('ads') && s.id === 'paid-ads') ||
        (q.includes('negative review') && s.id === 'reputation') ||
        (q.includes('review') && s.id === 'reputation') ||
        (q.includes('speed') && s.id === 'cro-speed') ||
        (q.includes('cro') && s.id === 'cro-speed') ||
        (q.includes('growth') && s.id === 'custom-growth')
      );
    }) || SERVICES_CATALOG[0];

  const initialScopeId = initialService.toLowerCase().includes('negative review')
    ? 'negative-review-removal'
    : matchedService.defaultScopeId;

  const [activeServiceId, setActiveServiceId] = useState<string>(matchedService.id);
  const [activeScopeId, setActiveScopeId] = useState<string>(initialScopeId);

  const activeService =
    SERVICES_CATALOG.find((s) => s.id === activeServiceId) || SERVICES_CATALOG[0];

  const currentScope =
    activeService.scopes.find((sc) => sc.id === activeScopeId) || activeService.scopes[0];

  // Modal View: 'scope-overview' (Scope focus & direct contact) | 'brief-form' (Tailored intake) | 'submitted' (Summary & instant dispatch)
  const [modalView, setModalView] = useState<'scope-overview' | 'brief-form' | 'submitted'>(
    'scope-overview'
  );

  // Form states
  const [currency, setCurrency] = useState<(typeof GLOBAL_CURRENCIES)[number]>('USD ($)');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [business, setBusiness] = useState(initialBusiness);
  const [website, setWebsite] = useState(initialWebsite);
  const [country, setCountry] = useState(initialCountry);
  const [brief, setBrief] = useState(initialBrief);
  const [copied, setCopied] = useState(false);

  // Check if Custom Website is active
  const isCustomWebsite = activeService.id === 'web-design';

  // Handle escape key & lock background scroll
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Jump to page section helper (smooth scroll)
  const handleJumpToSection = (sectionId: string) => {
    onClose();
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/') {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = `#${sectionId}`;
        }
      } else {
        window.location.href = `/#${sectionId}`;
      }
    }
  };

  // Switch service and select its default scope
  const handleServiceChange = (serviceId: string) => {
    setActiveServiceId(serviceId);
    const targetService = SERVICES_CATALOG.find((s) => s.id === serviceId);
    if (targetService) {
      setActiveScopeId(targetService.defaultScopeId);
    }
  };

  // Immediate WhatsApp direct message text (from scope view)
  const directScopeWhatsAppText = [
    `Hi Joy, I would like to discuss a custom proposal for ${activeService.title}.`,
    `Scope Focus: ${currentScope.name} (${currentScope.timeline})`,
    website ? `Website / Reference: ${website}` : '',
    business ? `Business: ${business}` : '',
    country ? `Market: ${country}` : '',
    `I'd like to align on custom scope, deliverables, and timeline.`,
  ]
    .filter(Boolean)
    .join('\n');

  const directWhatsAppUrl = `https://wa.me/917980941101?text=${encodeURIComponent(
    directScopeWhatsAppText
  )}`;

  // Full brief message text
  const fullBriefSummaryText = [
    `Hi Joy, I would like to request a bespoke proposal for ${activeService.title}.`,
    `Selected Scope Focus: ${currentScope.name} (${currentScope.timeline})`,
    `Business / Company: ${business || 'Not specified'}`,
    `Contact Name: ${name || 'Prospective Client'}`,
    `${isCustomWebsite ? 'Inspiration / Reference Website' : 'Current Website'}: ${website || 'Not provided'}`,
    `Target Country / Market: ${country || 'Worldwide'}`,
    `Currency: ${currency}`,
    `Budget: ${budget ? budget : 'Custom quote requested (open for recommendation)'}`,
    `Project Brief & Objectives: ${brief || 'Custom implementation aligned with selected scope focus.'}`,
  ].join('\n');

  const fullWhatsAppUrl = `https://wa.me/917980941101?text=${encodeURIComponent(
    fullBriefSummaryText
  )}`;
  const fullEmailUrl = `mailto:joymondal1306@gmail.com?subject=${encodeURIComponent(
    `Bespoke Scope Inquiry: ${activeService.title} (${currentScope.name}) — ${business || name || 'Project'}`
  )}&body=${encodeURIComponent(fullBriefSummaryText)}`;

  const directEmailUrl = `mailto:joymondal1306@gmail.com?subject=${encodeURIComponent(
    `Inquiry: ${activeService.title} (${currentScope.name})`
  )}&body=${encodeURIComponent(directScopeWhatsAppText)}`;

  const handleCopyBrief = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(fullBriefSummaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-5 lg:p-6 animate-in fade-in duration-200"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-modal-title"
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#D4AF37]/35 bg-[#16181D] p-5 sm:p-8 text-[#F6F2EA] shadow-2xl scrollbar-thin"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full border border-[#D4AF37]/30 bg-[#1F2228] p-2 text-[#E8E1D5] transition hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#272A32] cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* =========================================================================
            VIEW 1: BESPOKE SCOPE FOCUS & DIRECT ACTIONS (NO FIXED TIERS)
            ========================================================================= */}
        {modalView === 'scope-overview' && (
          <div>
            {/* Modal Header */}
            <div className="pr-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  BESPOKE SCOPE &amp; CONSULTATION
                </span>
              </div>
              <h2
                id="proposal-modal-title"
                className="text-2xl sm:text-3xl font-semibold leading-tight text-[#F6F2EA]"
              >
                Let&apos;s Build Your Scope.
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-[#A39B8E] leading-relaxed">
                No rigid packages or forced tiers. Every engagement is custom-scoped to your
                exact business goals, market competition, and target revenue.
              </p>
            </div>

            {/* Instant Direct Contact Bar */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#1F2228]/90 border border-[#D4AF37]/25">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold block mb-2">
                Need an Immediate Answer? Connect Directly:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href={directEmailUrl}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#272A32] hover:bg-[#323640] border border-[#D4AF37]/40 text-[#F6F2EA] text-xs font-semibold transition"
                >
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span>Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href="https://www.facebook.com/share/1FCjoMoAzP/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold transition shadow-sm"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>

              {/* Quick Jump Options */}
              <div className="mt-2.5 pt-2 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#A39B8E]">
                <button
                  type="button"
                  onClick={() => handleJumpToSection('ai-audit')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Search className="w-3 h-3 text-[#D4AF37]" /> Run Free AI Website Diagnostic →
                </button>
                <button
                  type="button"
                  onClick={() => handleJumpToSection('contact')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Jump to Contact Section ↓
                </button>
              </div>
            </div>

            {/* Service Area Selector Dropdown */}
            <div className="mt-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                Target Capability / Service:
              </label>
              <select
                value={activeServiceId}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full bg-[#1F2228] border border-[#D4AF37]/35 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#F6F2EA] focus:outline-none focus:border-[#D4AF37] transition cursor-pointer"
              >
                {SERVICES_CATALOG.map((service) => (
                  <option key={service.id} value={service.id} className="bg-[#16181D] text-[#F6F2EA]">
                    {service.number}. {service.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Scope Focus Selector Options */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                  Select Scope Objective / Focus:
                </span>
                <span className="text-[10px] font-mono text-[#A39B8E]">Custom-built for you</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeService.scopes.map((scope) => {
                  const isActive = scope.id === activeScopeId;
                  return (
                    <button
                      key={scope.id}
                      type="button"
                      onClick={() => setActiveScopeId(scope.id)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#F6F2EA] shadow-sm'
                          : 'bg-[#1F2228]/80 border-[#D4AF37]/20 text-[#A39B8E] hover:text-[#F6F2EA] hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="font-semibold text-xs leading-tight text-[#F6F2EA]">
                          {scope.name}
                        </span>
                        {scope.isPopular && (
                          <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-[#16181D] shrink-0 font-mono">
                            Popular
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-[#D4AF37] mt-1">
                        {scope.timeline}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Scope Specification Card */}
            <div className="mt-4 rounded-2xl border border-[#D4AF37]/30 bg-[#1F2228]/80 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-[#D4AF37]/20">
                <p className="text-xs sm:text-[13px] text-[#E8E1D5] italic leading-relaxed">
                  &ldquo;{currentScope.subtitle}&rdquo;
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16181D] border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs font-semibold shrink-0 self-start sm:self-auto">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  {currentScope.timeline}
                </span>
              </div>

              {/* Scope Deliverables List */}
              <div className="mt-4">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#D4AF37] block mb-2.5">
                  Scope Deliverables &amp; Inclusions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentScope.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-xs leading-snug text-[#E8E1D5]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setModalView('brief-form')}
                className="w-full sm:flex-1 bg-[#D4AF37] hover:bg-[#E5BE4A] text-[#16181D] font-bold py-3.5 px-6 rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>REQUEST CUSTOM PROPOSAL →</span>
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#25D366]/50 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-bold transition cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>

            <p className="mt-3 text-center text-[11px] text-[#A39B8E]">
              Custom quotes are delivered within hours with transparent milestones and zero obligations.
            </p>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: TAILORED INTAKE FORM (CURRENCIES & OPTIONAL BUDGET)
            ========================================================================= */}
        {modalView === 'brief-form' && (
          <div>
            <div className="flex items-center justify-between gap-3 mb-2 pr-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                BESPOKE PROPOSAL INTAKE
              </span>
              <button
                type="button"
                onClick={() => setModalView('scope-overview')}
                className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Scope Options
              </button>
            </div>

            <h2
              id="proposal-modal-title"
              className="text-2xl sm:text-3xl font-semibold leading-tight text-[#F6F2EA]"
            >
              Proposal for:{' '}
              <span className="text-[#D4AF37] font-normal italic font-serif">
                {currentScope.name}
              </span>
            </h2>

            <div className="mt-1.5 flex items-center gap-2 text-xs text-[#A39B8E]">
              <span>{activeService.title}</span>
              <span>•</span>
              <span className="font-mono text-[#D4AF37]">{currentScope.timeline}</span>
            </div>

            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setModalView('submitted');
              }}
            >
              {/* Currency & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                    Select Currency *
                  </label>
                  <select
                    value={currency}
                    onChange={(e) =>
                      setCurrency(e.target.value as (typeof GLOBAL_CURRENCIES)[number])
                    }
                    className="w-full bg-[#1F2228] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#F6F2EA] focus:outline-none focus:border-[#D4AF37] transition"
                  >
                    {GLOBAL_CURRENCIES.map((code) => (
                      <option key={code} value={code} className="bg-[#16181D] text-[#F6F2EA]">
                        {code}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                    Estimated Budget <span className="font-normal text-[#A39B8E] lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    required={false}
                    placeholder="Type estimated budget or leave blank"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#1F2228] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#F6F2EA] placeholder:text-[#A39B8E]/60 focus:outline-none focus:border-[#D4AF37] transition"
                  />
                  <span className="block text-[10px] text-[#A39B8E] mt-1 italic">
                    Optional — leave blank for custom recommendation.
                  </span>
                </div>
              </div>

              {/* Name & Business */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. David Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1F2228] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#F6F2EA] placeholder:text-[#A39B8E]/60 focus:outline-none focus:border-[#D4AF37] transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                    Business / Company *
                  </label>
                  <input
                    required
                    type="text"
                    autoComplete="organization"
                    placeholder="e.g. Miller Roofing Specialists"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="w-full bg-[#1F2228] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#F6F2EA] placeholder:text-[#A39B8E]/60 focus:outline-none focus:border-[#D4AF37] transition"
                  />
                </div>
              </div>

              {/* Website & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                    {isCustomWebsite
                      ? 'Reference / Inspiration URL (Optional)'
                      : 'Current Website URL'}
                  </label>
                  <input
                    type="text"
                    inputMode="url"
                    required={false}
                    placeholder={
                      isCustomWebsite
                        ? 'Link to a website whose style you like'
                        : 'https://yourbusiness.com'
                    }
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full bg-[#1F2228] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#F6F2EA] placeholder:text-[#A39B8E]/60 focus:outline-none focus:border-[#D4AF37] transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                    Target Country / Market *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. USA, UK, Ireland, Canada, Australia"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#1F2228] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#F6F2EA] placeholder:text-[#A39B8E]/60 focus:outline-none focus:border-[#D4AF37] transition"
                  />
                </div>
              </div>

              {/* Brief textarea */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                  Project Brief &amp; Primary Objectives *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell me about your goals, key challenges, target timeframe, or specific deliverables..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full bg-[#1F2228] border border-[#D4AF37]/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#F6F2EA] placeholder:text-[#A39B8E]/60 focus:outline-none focus:border-[#D4AF37] transition resize-y"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 bg-[#D4AF37] hover:bg-[#E5BE4A] text-[#16181D] font-bold py-3.5 px-6 rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Review &amp; Transmit Proposal →</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalView('scope-overview')}
                  className="w-full sm:w-auto border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#A39B8E] hover:text-[#F6F2EA] font-semibold py-3.5 px-6 rounded-full text-xs transition cursor-pointer"
                >
                  Change Scope
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: PROPOSAL SUMMARY & INSTANT DISPATCH
            ========================================================================= */}
        {modalView === 'submitted' && (
          <div className="py-2">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35">
              <Check className="h-5 w-5" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
              PROPOSAL SPECIFICATION READY
            </span>
            <h2
              id="proposal-modal-title"
              className="text-2xl sm:text-3xl font-semibold text-[#F6F2EA]"
            >
              Ready to send, {name || 'Partner'}.
            </h2>

            {/* Summary Box */}
            <div className="my-4 space-y-2 rounded-2xl border border-[#D4AF37]/30 bg-[#1F2228] p-4 sm:p-5 text-xs sm:text-[13px] text-[#E8E1D5]">
              <p>
                <strong className="text-[#D4AF37]">Service:</strong> {activeService.title}
              </p>
              <p>
                <strong className="text-[#D4AF37]">Selected Scope Focus:</strong> {currentScope.name}{' '}
                <span className="text-[#D4AF37] font-mono font-bold">
                  ({currentScope.timeline})
                </span>
              </p>
              <p>
                <strong className="text-[#D4AF37]">Business:</strong> {business || 'Not specified'}
              </p>
              <p>
                <strong className="text-[#D4AF37]">Target Market:</strong> {country || 'Worldwide'}
              </p>
              <p>
                <strong className="text-[#D4AF37]">Currency &amp; Budget:</strong> {currency}{' '}
                {budget ? `· ${budget}` : '· Custom quote requested'}
              </p>
              {website && (
                <p className="break-all">
                  <strong className="text-[#D4AF37]">
                    {isCustomWebsite ? 'Reference / Inspiration URL:' : 'Website:'}
                  </strong>{' '}
                  {website}
                </p>
              )}
              <p>
                <strong className="text-[#D4AF37]">Brief:</strong> {brief}
              </p>
            </div>

            <div className="mb-4">
              <JoySignature variant="gold" width={140} height={38} />
            </div>

            <p className="mb-3 text-xs text-[#A39B8E]">
              Select your preferred channel to transmit this inquiry directly to Joy Mondal:
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={fullWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition"
              >
                <WhatsAppIcon className="h-4 w-4" /> Message on WhatsApp <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href={fullEmailUrl}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#272A32] hover:bg-[#323640] px-4 py-3 text-xs sm:text-sm font-semibold text-[#F6F2EA] shadow-sm transition"
              >
                <Mail className="h-4 w-4 text-[#D4AF37]" /> Send via Email <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="https://www.facebook.com/share/1FCjoMoAzP/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex sm:flex-none items-center justify-center gap-2 rounded-full bg-[#1877F2] hover:bg-[#166fe5] px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition"
              >
                <Facebook className="h-4 w-4" /> Facebook <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs pt-2">
              <button
                type="button"
                onClick={handleCopyBrief}
                className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Brief to Clipboard'}</span>
              </button>

              <button
                type="button"
                onClick={() => setModalView('brief-form')}
                className="text-xs text-[#A39B8E] hover:text-[#F6F2EA] underline cursor-pointer"
              >
                ← Edit details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
