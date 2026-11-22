'use client';

import React, { useState, type FormEvent } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Globe,
  Mail,
  Megaphone,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import WhatsAppIcon from './WhatsAppIcon';
import type { AuditResponseData, PriorityFix } from '../../app/api/audit/route';

export interface FixPlanPayload {
  website: string;
  businessName?: string;
  location?: string;
  industry?: string;
  summary?: string;
}

interface AuditSectionProps {
  onGetFixPlan: (payload: FixPlanPayload | string) => void;
}

export function AuditSection({ onGetFixPlan }: AuditSectionProps) {
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('');
  const [cityCountry, setCityCountry] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('');
  const [auditResult, setAuditResult] = useState<AuditResponseData | null>(null);
  const [error, setError] = useState('');
  const [copiedBrief, setCopiedBrief] = useState(false);

  const handleRunAudit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!website.trim()) {
      setError('Please provide a website URL to audit.');
      return;
    }

    const normalizedWebsite = /^https?:\/\//i.test(website) ? website.trim() : `https://${website.trim()}`;
    try {
      new URL(normalizedWebsite);
    } catch {
      setError('Please enter a valid website address (e.g. yourbusiness.com).');
      return;
    }

    setError('');
    setIsLoading(true);
    setAuditResult(null);
    setScanProgress(15);
    setScanMessage('Connecting to domain and extracting live HTML, Core Web Vitals & mobile viewport...');

    // Progress step 2: AEO & Schemas
    const timer1 = setTimeout(() => {
      setScanProgress(40);
      setScanMessage('Inspecting JSON-LD structured schema, AEO & GEO conversational AI signals...');
    }, 600);

    // Progress step 3: Images & CTAs
    const timer2 = setTimeout(() => {
      setScanProgress(68);
      setScanMessage('Auditing asset optimization (.WebP format, alt tags) & conversion pathways...');
    }, 1200);

    // Progress step 4: PPC & Reputation
    const timer3 = setTimeout(() => {
      setScanProgress(88);
      setScanMessage('Evaluating ad tracking hygiene (GTM / Meta Pixel) & multi-platform reputation...');
    }, 1700);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: businessName.trim(),
          websiteUrl: normalizedWebsite,
          industry: industry.trim(),
          location: cityCountry.trim(),
        }),
      });

      const json = await response.json();

      // Ensure minimum scanning duration so visitor observes real telemetry inspection
      setTimeout(() => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        setScanProgress(100);
        if (json.success && json.data) {
          setAuditResult(json.data);
        } else {
          setError(json.error || 'Failed to complete audit. Please check details and try again.');
        }
        setIsLoading(false);
      }, 2100);
    } catch {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setTimeout(() => {
        setIsLoading(false);
        setError('Network error occurred during audit. Please check the URL and try again.');
      }, 1400);
    }
  };

  const auditSummaryText = auditResult
    ? [
        `Hi Joy, I would like to request a bespoke proposal based on my live AI & Technical Diagnostic for ${auditResult.businessName}:`,
        ``,
        `• Website: ${auditResult.websiteUrl}`,
        `• Target Market / Location: ${auditResult.location}`,
        `• Industry / Niche: ${auditResult.industry}`,
        `• Overall Diagnostic Index: ${auditResult.overallScore}/100`,
        ``,
        `Live Inspected Signals:`,
        `• Page Title: ${auditResult.liveSignals?.title || 'Missing'}`,
        `• Meta Description: ${auditResult.liveSignals?.metaDescription ? 'Present' : 'Missing'}`,
        `• H1 Heading: ${auditResult.liveSignals?.h1Text || 'Missing'} (${auditResult.liveSignals?.h1Count || 0} found)`,
        `• Structured JSON-LD Schema: ${auditResult.liveSignals?.hasSchema ? auditResult.liveSignals.schemaTypes.join(', ') : 'None detected (AEO/GEO Gap)'}`,
        `• Images / Assets: ${auditResult.liveSignals?.totalImages || 0} images (${auditResult.liveSignals?.imagesMissingAlt || 0} missing alt, ${auditResult.liveSignals?.modernImagesCount || 0} modern WebP/SVG)`,
        `• Conversion Pathways: Phone (${auditResult.liveSignals?.hasPhoneLink ? 'Yes' : 'No'}), Quote Form (${auditResult.liveSignals?.hasForm ? 'Yes' : 'No'}), WhatsApp (${auditResult.liveSignals?.hasWhatsAppLink ? 'Yes' : 'No'})`,
        `• Ad Tracking: GTM (${auditResult.liveSignals?.hasGoogleTagManager ? 'Yes' : 'No'}), Meta Pixel (${auditResult.liveSignals?.hasMetaPixel ? 'Yes' : 'No'})`,
        ``,
        `Diagnostic Pillars:`,
        `1. Website Design & Development: ${auditResult.pillars.speedUx.score}/100 (${auditResult.pillars.speedUx.status})`,
        `2. SEO, AEO & GEO Visibility: ${auditResult.pillars.seoAeoGeo.score}/100 (${auditResult.pillars.seoAeoGeo.status})`,
        `3. Google Ads & Facebook Ads: ${auditResult.pillars.paidAds.score}/100 (${auditResult.pillars.paidAds.status})`,
        `4. Review Management & Negative Review Removal: ${auditResult.pillars.reputation.score}/100 (${auditResult.pillars.reputation.status})`,
        ``,
        `Key Priority Fixes:`,
        ...(auditResult.priorityFixes || []).map(
          (f, i) => `${i + 1}. [${f.category}] ${f.title}\n   Issue: ${f.issue || f.description}\n   Fix: ${f.fix || f.description}`
        ),
        ``,
        `Please provide a custom scope and proposal for this project.`,
      ].join('\n')
    : '';

  const whatsappAuditUrl = `https://wa.me/917980941101?text=${encodeURIComponent(auditSummaryText)}`;
  const emailAuditUrl = `mailto:joymondal1306@gmail.com?subject=${encodeURIComponent(
    `Growth & Reputation Audit Fix Plan: ${auditResult?.businessName || 'Diagnostic Request'}`
  )}&body=${encodeURIComponent(auditSummaryText)}`;

  const handleCopyBrief = async () => {
    if (!auditSummaryText) return;
    try {
      await navigator.clipboard.writeText(auditSummaryText);
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleTriggerFixPlan = () => {
    if (!auditResult) {
      onGetFixPlan(website || 'https://yourbusiness.com');
      return;
    }

    onGetFixPlan({
      website: auditResult.websiteUrl,
      businessName: auditResult.businessName,
      location: auditResult.location,
      industry: auditResult.industry,
      summary: auditSummaryText,
    });
  };

  return (
    <section
      id="ai-audit"
      data-scroll-reveal
      className="bg-[#F8F5EE] py-24 lg:py-28 text-[#574E46] border-t border-[#E3DCD0] scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* =========================================================================
            1. EDITORIAL SECTION HEADER
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-10"
        >
          <div className="flex items-center gap-2.5 text-[#9C7130] text-xs font-semibold tracking-[0.2em] uppercase">
            <span className="w-6 h-[1px] bg-[#9C7130] inline-block mr-1" />
            <span>LIVE AI GROWTH &amp; REPUTATION AUDIT</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold tracking-wider bg-[#C99D55] text-[#221710] shadow-xs leading-none">
              LIVE INSPECTION
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-tight text-[#221710] mt-4">
            Audit your website, AI search visibility{' '}
            <em className="font-serif italic font-normal text-[#9C7130]">
              &amp; online reputation.
            </em>
          </h2>

          <p className="mt-4 text-[#574E46] max-w-2xl text-base leading-relaxed">
            Enter your business details below to run a real-time live inspection of your website conversion architecture, Core Web Vitals, Google &amp; AI answer visibility (SEO, AEO, GEO), and reputation footprint.
          </p>
        </motion.div>

        {/* =========================================================================
            2. INTERACTIVE AUDIT FORM CARD
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#EFEAE0] border border-[#E3DCD0] rounded-2xl p-5 sm:p-8 md:p-10 shadow-sm"
        >
          
          <form onSubmit={handleRunAudit} className="space-y-5">
            {/* 2x2 Grid of Styled Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Field 1: Business Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221710] mb-2">
                  Business Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Apex Dental Clinic"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-[#F8F5EE] border border-[#D8CFC0] focus:border-[#B88A44] rounded-xl px-4 py-3.5 text-sm text-[#221710] placeholder:text-[#8C8278] focus:outline-none transition-colors disabled:opacity-60"
                />
              </div>

              {/* Field 2: Website URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221710] mb-2">
                  Website URL *
                </label>
                <input
                  required
                  type="text"
                  inputMode="url"
                  placeholder="e.g. https://yourbusiness.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-[#F8F5EE] border border-[#D8CFC0] focus:border-[#B88A44] rounded-xl px-4 py-3.5 text-sm text-[#221710] placeholder:text-[#8C8278] focus:outline-none transition-colors disabled:opacity-60"
                />
              </div>

              {/* Field 3: Industry / Niche */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221710] mb-2">
                  Industry / Niche *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Healthcare, Commercial Roofing, Legal, E-Commerce"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-[#F8F5EE] border border-[#D8CFC0] focus:border-[#B88A44] rounded-xl px-4 py-3.5 text-sm text-[#221710] placeholder:text-[#8C8278] focus:outline-none transition-colors disabled:opacity-60"
                />
              </div>

              {/* Field 4: Target City & Country */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#221710] mb-2">
                  Target City &amp; Country *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Dublin, Ireland / London, UK / New York, USA"
                  value={cityCountry}
                  onChange={(e) => setCityCountry(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-[#F8F5EE] border border-[#D8CFC0] focus:border-[#B88A44] rounded-xl px-4 py-3.5 text-sm text-[#221710] placeholder:text-[#8C8278] focus:outline-none transition-colors disabled:opacity-60"
                />
              </div>

            </div>

            {error && (
              <p role="alert" className="text-xs font-semibold text-rose-700 pt-1">
                {error}
              </p>
            )}

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <span className="text-xs text-[#7A7066] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#9C7130]" />
                Live server-side HTML check • Instant diagnostic • Evaluated across 4 growth pillars
              </span>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#B88A44] hover:bg-[#9C7130] text-[#221710] font-semibold px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-75 disabled:cursor-not-allowed shrink-0"
              >
                <span>{isLoading ? 'Inspecting Live Website...' : 'Run Live AI Growth & Reputation Audit →'}</span>
              </button>
            </div>
          </form>

          {/* =========================================================================
              ANIMATED SCANNING BAR
              ========================================================================= */}
          {isLoading && (
            <div className="mt-8 pt-8 border-t border-[#DCD3C4] animate-in fade-in duration-300">
              <div className="bg-[#F8F5EE] border border-[#E3DCD0] rounded-xl p-6 shadow-2xs">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B88A44] opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#9C7130]" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9C7130]">
                      Live Server-Side Inspection Active
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#221710]">{scanProgress}%</span>
                </div>

                {/* Bronze Progress Bar */}
                <div className="w-full bg-[#E5DDCF] h-2 rounded-full overflow-hidden mb-3">
                  <div
                    className="bg-[#B88A44] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>

                <p className="text-xs text-[#574E46] italic">
                  &ldquo;{scanMessage || 'Analyzing live website speed, HTML signals & reputation footprint...'}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* =========================================================================
              3. DIAGNOSTIC REPORT OUTPUT UI
              ========================================================================= */}
          {auditResult && !isLoading && (
            <div className="mt-10 pt-8 border-t border-[#DCD3C4] animate-in fade-in duration-400">
              
              {/* Report Header Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-[#F8F5EE] border border-[#E3DCD0] rounded-xl p-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9C7130] bg-[#EDE5D6] px-2.5 py-0.5 rounded border border-[#D8CFC0]">
                      LIVE DIAGNOSTIC REPORT
                    </span>
                    <span className="text-xs text-[#7A7066]">
                      {auditResult.location} • {auditResult.industry}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#221710]">
                    {auditResult.businessName}
                  </h3>
                  <a
                    href={auditResult.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#9C7130] hover:underline font-mono break-all inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>{auditResult.websiteUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-[#E3DCD0] pt-3 md:pt-0 md:pl-6 shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7066] block">
                      Overall Readiness
                    </span>
                    <span className="text-2xl font-bold text-[#221710] font-mono">
                      {auditResult.overallScore}<span className="text-sm text-[#7A7066]">/100</span>
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#B88A44]/15 border border-[#B88A44]/30 flex items-center justify-center text-[#9C7130]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* =====================================================================
                  LIVE DETECTED PAGE SIGNALS PANEL (HONEST DOM & TELEMETRY AUDIT)
                  ===================================================================== */}
              {auditResult.liveSignals && (
                <div className="bg-[#FAF7F0] border border-[#E3DCD0] rounded-xl p-5 mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#E8E1D5]">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            auditResult.liveSignals.fetched ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                            auditResult.liveSignals.fetched ? 'bg-emerald-600' : 'bg-amber-600'
                          }`}
                        />
                      </span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#221710]">
                        {auditResult.liveSignals.fetched
                          ? 'Detected Live Page Signals & Architecture'
                          : 'Live Connection Notice'}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFEAE0] text-[#7A7066] border border-[#DCD3C4]">
                        {auditResult.liveSignals.https ? 'HTTPS Secure' : 'HTTP'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#7A7066] font-mono">
                      {typeof auditResult.liveSignals.responseTimeMs === 'number' && (
                        <span>Latency: {auditResult.liveSignals.responseTimeMs}ms</span>
                      )}
                      {typeof auditResult.liveSignals.pageSpeedMobile === 'number' && (
                        <span className="text-emerald-700 font-semibold">
                          PageSpeed Mobile: {auditResult.liveSignals.pageSpeedMobile}/100
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 6-Grid of Verified Page Signals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                    
                    {/* Title */}
                    <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E1D5] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[#221710]">Page Title (&lt;title&gt;)</span>
                          <span
                            className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                              auditResult.liveSignals.titleLength >= 25 &&
                              auditResult.liveSignals.titleLength <= 70
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {auditResult.liveSignals.titleLength} chars
                          </span>
                        </div>
                        <p className="text-[11px] text-[#574E46] line-clamp-2 font-mono">
                          {auditResult.liveSignals.title
                            ? `"${auditResult.liveSignals.title}"`
                            : 'Missing primary title tag'}
                        </p>
                      </div>
                    </div>

                    {/* Meta Description */}
                    <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E1D5] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[#221710]">Meta Description</span>
                          <span
                            className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                              auditResult.liveSignals.metaDescriptionLength >= 80 &&
                              auditResult.liveSignals.metaDescriptionLength <= 165
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {auditResult.liveSignals.metaDescriptionLength > 0
                              ? `${auditResult.liveSignals.metaDescriptionLength} chars`
                              : 'Missing'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#574E46] line-clamp-2">
                          {auditResult.liveSignals.metaDescription
                            ? `"${auditResult.liveSignals.metaDescription}"`
                            : 'No meta description detected on landing page'}
                        </p>
                      </div>
                    </div>

                    {/* H1 Heading */}
                    <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E1D5] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[#221710]">Primary Heading (&lt;h1&gt;)</span>
                          <span
                            className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                              auditResult.liveSignals.h1Count === 1
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {auditResult.liveSignals.h1Count === 1
                              ? '1 H1 (Optimal)'
                              : `${auditResult.liveSignals.h1Count} H1 tags`}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#574E46] line-clamp-2">
                          {auditResult.liveSignals.h1Text
                            ? `"${auditResult.liveSignals.h1Text}"`
                            : 'No H1 heading detected on landing page'}
                        </p>
                      </div>
                    </div>

                    {/* JSON-LD Schema (AEO/GEO) */}
                    <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E1D5] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[#221710]">JSON-LD Schema (AEO/GEO)</span>
                          <span
                            className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                              auditResult.liveSignals.hasSchema
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {auditResult.liveSignals.hasSchema
                              ? `${auditResult.liveSignals.schemaTypes.length} types detected`
                              : 'None detected'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#574E46] line-clamp-1 font-mono">
                          {auditResult.liveSignals.hasSchema
                            ? auditResult.liveSignals.schemaTypes.join(', ')
                            : 'Missing structured schema (AI Overviews & ChatGPT blind spot)'}
                        </p>
                      </div>
                    </div>

                    {/* Media & Images */}
                    <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E1D5] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[#221710]">Media &amp; Images</span>
                          <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-stone-100 text-[#574E46]">
                            {auditResult.liveSignals.totalImages} images
                          </span>
                        </div>
                        <div className="text-[11px] text-[#574E46] flex flex-col gap-0.5">
                          <span>
                            Alt Attributes:{' '}
                            {auditResult.liveSignals.imagesMissingAlt === 0
                              ? '✓ 100% descriptive'
                              : `⚠️ ${auditResult.liveSignals.imagesMissingAlt} missing alt tags`}
                          </span>
                          <span>
                            Next-Gen WebP/SVG: {auditResult.liveSignals.modernImagesCount} /{' '}
                            {auditResult.liveSignals.totalImages}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Conversion & Tracking */}
                    <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E1D5] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[#221710]">Conversion &amp; Tracking</span>
                          <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-stone-100 text-[#574E46]">
                            Detected
                          </span>
                        </div>
                        <div className="text-[11px] text-[#574E46] flex flex-wrap gap-1 mt-0.5">
                          {auditResult.liveSignals.hasPhoneLink && (
                            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded font-mono text-[10px]">
                              Phone (tel:)
                            </span>
                          )}
                          {auditResult.liveSignals.hasForm && (
                            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded font-mono text-[10px]">
                              Lead Form
                            </span>
                          )}
                          {auditResult.liveSignals.hasWhatsAppLink && (
                            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded font-mono text-[10px]">
                              WhatsApp
                            </span>
                          )}
                          {auditResult.liveSignals.hasGoogleTagManager && (
                            <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-800 rounded font-mono text-[10px]">
                              GTM
                            </span>
                          )}
                          {auditResult.liveSignals.hasMetaPixel && (
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-800 rounded font-mono text-[10px]">
                              Meta Pixel
                            </span>
                          )}
                          {!auditResult.liveSignals.hasPhoneLink &&
                            !auditResult.liveSignals.hasForm &&
                            !auditResult.liveSignals.hasGoogleTagManager && (
                              <span className="text-amber-800 text-[10.5px]">Limited conversion triggers</span>
                            )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* 4 Pillar Scorecards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Pillar 1: Website Design & Development */}
                <div className="bg-[#F8F5EE] border border-[#E3DCD0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#EFEAE0] border border-[#DCD3C4] flex items-center justify-center text-[#9C7130]">
                        <Globe className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C7130] bg-[#EFEAE0] border border-[#DCD3C4] px-2 py-0.5 rounded">
                        {auditResult.pillars.speedUx.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#221710] mb-1">
                      {auditResult.pillars.speedUx.title || 'Website Design & Development'}
                    </h4>
                    <p className="text-[11px] text-[#7A7066] mb-3">
                      Bespoke Architecture, Mobile UX &amp; Speed
                    </p>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs font-bold text-[#221710] mb-1.5 font-mono">
                        <span>Readiness Score</span>
                        <span className="text-[#9C7130]">{auditResult.pillars.speedUx.score}/100</span>
                      </div>
                      <div className="w-full bg-[#E5DDCF] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#B88A44] h-full rounded-full transition-all duration-1000"
                          style={{ width: `${auditResult.pillars.speedUx.score}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-[#574E46] leading-relaxed mb-3">
                      {auditResult.pillars.speedUx.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E1D5] space-y-1">
                    {auditResult.pillars.speedUx.metrics?.map((metric, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#7A7066]">
                        <CheckCircle2 className="w-3 h-3 text-[#059669] shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pillar 2: SEO, AEO & GEO Visibility */}
                <div className="bg-[#F8F5EE] border border-[#E3DCD0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#EFEAE0] border border-[#DCD3C4] flex items-center justify-center text-[#9C7130]">
                        <Search className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C7130] bg-[#EFEAE0] border border-[#DCD3C4] px-2 py-0.5 rounded">
                        {auditResult.pillars.seoAeoGeo.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#221710] mb-1">
                      {auditResult.pillars.seoAeoGeo.title || 'SEO, AEO & GEO Visibility'}
                    </h4>
                    <p className="text-[11px] text-[#7A7066] mb-3">
                      Google, AI Overviews, ChatGPT &amp; Perplexity
                    </p>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs font-bold text-[#221710] mb-1.5 font-mono">
                        <span>Readiness Score</span>
                        <span className="text-[#9C7130]">{auditResult.pillars.seoAeoGeo.score}/100</span>
                      </div>
                      <div className="w-full bg-[#E5DDCF] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#B88A44] h-full rounded-full transition-all duration-1000"
                          style={{ width: `${auditResult.pillars.seoAeoGeo.score}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-[#574E46] leading-relaxed mb-3">
                      {auditResult.pillars.seoAeoGeo.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E1D5] space-y-1">
                    {auditResult.pillars.seoAeoGeo.metrics?.map((metric, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#7A7066]">
                        <CheckCircle2 className="w-3 h-3 text-[#059669] shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pillar 3: Google Ads & Facebook Ads */}
                <div className="bg-[#F8F5EE] border border-[#E3DCD0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#EFEAE0] border border-[#DCD3C4] flex items-center justify-center text-[#9C7130]">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C7130] bg-[#EFEAE0] border border-[#DCD3C4] px-2 py-0.5 rounded">
                        {auditResult.pillars.paidAds.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#221710] mb-1">
                      {auditResult.pillars.paidAds.title || 'Google Ads & Facebook Ads'}
                    </h4>
                    <p className="text-[11px] text-[#7A7066] mb-3">
                      Google &amp; Meta Ads Conversion Tracking
                    </p>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs font-bold text-[#221710] mb-1.5 font-mono">
                        <span>Readiness Score</span>
                        <span className="text-[#9C7130]">{auditResult.pillars.paidAds.score}/100</span>
                      </div>
                      <div className="w-full bg-[#E5DDCF] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#B88A44] h-full rounded-full transition-all duration-1000"
                          style={{ width: `${auditResult.pillars.paidAds.score}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-[#574E46] leading-relaxed mb-3">
                      {auditResult.pillars.paidAds.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E1D5] space-y-1">
                    {auditResult.pillars.paidAds.metrics?.map((metric, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#7A7066]">
                        <CheckCircle2 className="w-3 h-3 text-[#059669] shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pillar 4: Review Management & Google Review Removal */}
                <div className="bg-[#F8F5EE] border border-[#E3DCD0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#EFEAE0] border border-[#DCD3C4] flex items-center justify-center text-[#9C7130]">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C7130] bg-[#EFEAE0] border border-[#DCD3C4] px-2 py-0.5 rounded">
                        {auditResult.pillars.reputation.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#221710] mb-1">
                      {auditResult.pillars.reputation.title || 'Review Management & Google Review Removal'}
                    </h4>
                    <p className="text-[11px] text-[#7A7066] mb-3">
                      Google, Trustpilot, Facebook &amp; Removal Dossiers
                    </p>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs font-bold text-[#221710] mb-1.5 font-mono">
                        <span>Readiness Score</span>
                        <span className="text-[#9C7130]">{auditResult.pillars.reputation.score}/100</span>
                      </div>
                      <div className="w-full bg-[#E5DDCF] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#B88A44] h-full rounded-full transition-all duration-1000"
                          style={{ width: `${auditResult.pillars.reputation.score}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-[#574E46] leading-relaxed mb-3">
                      {auditResult.pillars.reputation.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E1D5] space-y-1">
                    {auditResult.pillars.reputation.metrics?.map((metric, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#7A7066]">
                        <CheckCircle2 className="w-3 h-3 text-[#059669] shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* =====================================================================
                  4 ACTIONABLE PRIORITY FIXES (ITEMIZED ISSUES + CONCRETE ACTIONABLE FIXES)
                  ===================================================================== */}
              <div className="bg-[#F8F5EE] border border-[#E3DCD0] rounded-xl p-6 mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B88A44]" />
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#221710]">
                      Itemized Technical Gaps &amp; Actionable Fixes for {auditResult.businessName}
                    </h4>
                  </div>
                  <span className="text-xs text-[#7A7066]">
                    Tailored to {auditResult.industry} in {auditResult.location}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {auditResult.priorityFixes?.map((fix: PriorityFix, index: number) => (
                    <div
                      key={index}
                      className="bg-[#EFEAE0]/60 border border-[#E0D7C8] rounded-xl p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9C7130] bg-[#E5DDCF] px-2 py-0.5 rounded">
                            {fix.category}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              fix.impact === 'Critical'
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-amber-100 text-amber-900 border border-amber-200'
                            }`}
                          >
                            {fix.impact} Priority
                          </span>
                        </div>

                        <h5 className="text-xs font-bold text-[#221710] mb-2 leading-snug">
                          {fix.title}
                        </h5>

                        {/* Issue Found */}
                        <div className="mb-2.5">
                          <span className="text-[10.5px] font-bold uppercase tracking-wider text-rose-900 block mb-0.5">
                            Issue / Bottleneck:
                          </span>
                          <p className="text-xs leading-relaxed text-[#574E46]">
                            {fix.issue || fix.description}
                          </p>
                        </div>

                        {/* Actionable Fix */}
                        <div className="pt-2 border-t border-[#DCD3C4]/60">
                          <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#9C7130] block mb-0.5">
                            Actionable Solution:
                          </span>
                          <p className="text-xs leading-relaxed text-[#221710] font-medium">
                            {fix.fix || fix.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* =====================================================================
                  EXECUTIVE TRANSPARENCY NOTE
                  ===================================================================== */}
              <div className="mt-6 p-4 rounded-xl bg-[#FAF7F0] border border-[#E3DCD0] text-xs text-[#7A7066] leading-relaxed flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#9C7130] shrink-0 mt-0.5" />
                <p>
                  <strong>Executive Scope Note:</strong>{' '}
                  {auditResult.executiveNote ||
                    'This automated live audit inspects public DOM, viewport, and telemetry signals. Deep technical server logs, AEO entity graph disambiguation, ad account spend audits, and policy-compliant negative review removal eligibility are conducted during custom scope consultation.'}
                </p>
              </div>

              {/* =====================================================================
                  SMART LEAD HANDOFF CONVERSION BAR
                  ===================================================================== */}
              <div className="mt-8 pt-6 border-t border-[#DCD3C4] flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div>
                  <h4 className="text-base font-bold text-[#221710]">
                    Ready to implement these growth recommendations?
                  </h4>
                  <p className="text-xs text-[#7A7066] mt-0.5 max-w-xl">
                    Request a bespoke implementation scope directly from Joy Mondal, or connect instantly via WhatsApp or Email with this live diagnostic context pre-filled.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href={whatsappAuditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-5 py-3 rounded-full transition-all inline-flex items-center gap-2 text-xs shadow-sm cursor-pointer"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Proposal</span>
                  </a>

                  <a
                    href={emailAuditUrl}
                    className="bg-[#FAF7F0] hover:bg-[#FFFFFF] border border-[#D8CFC0] text-[#221710] font-semibold px-5 py-3 rounded-full transition-all inline-flex items-center gap-2 text-xs shadow-sm cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#9C7130]" />
                    <span>Email Joy</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="bg-[#EFEAE0] hover:bg-[#E5DDCF] border border-[#D8CFC0] text-[#221710] font-semibold px-4 py-3 rounded-full transition-all inline-flex items-center gap-1.5 text-xs shadow-sm cursor-pointer"
                  >
                    {copiedBrief ? (
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#9C7130]" />
                    )}
                    <span>{copiedBrief ? 'Brief Copied!' : 'Copy Brief'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTriggerFixPlan}
                    className="bg-[#221710] hover:bg-[#36251A] text-[#F8F5EE] font-semibold px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm text-xs"
                  >
                    <span>Custom Fix Scope →</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </motion.div>

      </div>
    </section>
  );
}
export default AuditSection;
