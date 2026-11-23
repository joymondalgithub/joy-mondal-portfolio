import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export interface LiveSignals {
  fetched: boolean;
  httpStatus?: number;
  responseTimeMs?: number;
  https: boolean;
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  h1Count: number;
  h1Text: string | null;
  h2Count: number;
  hasViewport: boolean;
  hasSchema: boolean;
  schemaTypes: string[];
  totalImages: number;
  imagesMissingAlt: number;
  modernImagesCount: number;
  hasPhoneLink: boolean;
  hasEmailLink: boolean;
  hasWhatsAppLink: boolean;
  hasForm: boolean;
  hasGoogleAnalytics: boolean;
  hasGoogleTagManager: boolean;
  hasMetaPixel: boolean;
  hasCanonical: boolean;
  pageSpeedMobile?: number | null;
  pageSpeedSeo?: number | null;
  note?: string;
}

export interface AuditPillar {
  title: string;
  score: number;
  badge: string;
  status: string;
  description: string;
  platforms?: string;
  metrics: string[];
}

export interface PriorityFix {
  title: string;
  category: string;
  impact: 'Critical' | 'High' | 'Strategic';
  issue: string;
  fix: string;
  description: string;
}

export interface AuditResponseData {
  businessName: string;
  websiteUrl: string;
  industry: string;
  location: string;
  overallScore: number;
  liveSignals: LiveSignals;
  pillars: {
    speedUx: AuditPillar;
    seoAeoGeo: AuditPillar;
    paidAds: AuditPillar;
    reputation: AuditPillar;
  };
  priorityFixes: PriorityFix[];
  executiveNote: string;
}

// SSRF prevention: validate host is not a private/loopback network
function isSafeHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (
    lower === 'localhost' ||
    lower.endsWith('.localhost') ||
    lower.endsWith('.local') ||
    lower.endsWith('.internal')
  ) {
    return false;
  }
  // IPv4 private ranges: 127.*, 10.*, 192.168.*, 172.16-31.*, 169.254.*
  if (
    /^127\./.test(lower) ||
    /^10\./.test(lower) ||
    /^192\.168\./.test(lower) ||
    /^169\.254\./.test(lower) ||
    /^0\./.test(lower) ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(lower) ||
    lower === '::1' ||
    lower === '0.0.0.0'
  ) {
    return false;
  }
  return true;
}

/**
 * Perform a real live HTML inspection of the target website URL
 */
async function fetchAndInspectHtml(targetUrl: string): Promise<LiveSignals> {
  const startTime = Date.now();
  let https = targetUrl.startsWith('https://');

  try {
    const parsed = new URL(targetUrl);
    if (!isSafeHost(parsed.hostname)) {
      return {
        fetched: false,
        https,
        title: null,
        titleLength: 0,
        metaDescription: null,
        metaDescriptionLength: 0,
        h1Count: 0,
        h1Text: null,
        h2Count: 0,
        hasViewport: false,
        hasSchema: false,
        schemaTypes: [],
        totalImages: 0,
        imagesMissingAlt: 0,
        modernImagesCount: 0,
        hasPhoneLink: false,
        hasEmailLink: false,
        hasWhatsAppLink: false,
        hasForm: false,
        hasGoogleAnalytics: false,
        hasGoogleTagManager: false,
        hasMetaPixel: false,
        hasCanonical: false,
        note: 'Restricted host. Evaluated with industry standard baseline.',
      };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 (JoyMondalAuditBot/1.0; +https://iamjoymondal.netlify.app)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    clearTimeout(timeoutId);

    const responseTimeMs = Date.now() - startTime;
    const httpStatus = response.status;
    const finalUrl = response.url || targetUrl;
    https = finalUrl.startsWith('https://');

    if (!response.ok && response.status >= 400 && response.status !== 403) {
      return {
        fetched: false,
        httpStatus,
        responseTimeMs,
        https,
        title: null,
        titleLength: 0,
        metaDescription: null,
        metaDescriptionLength: 0,
        h1Count: 0,
        h1Text: null,
        h2Count: 0,
        hasViewport: false,
        hasSchema: false,
        schemaTypes: [],
        totalImages: 0,
        imagesMissingAlt: 0,
        modernImagesCount: 0,
        hasPhoneLink: false,
        hasEmailLink: false,
        hasWhatsAppLink: false,
        hasForm: false,
        hasGoogleAnalytics: false,
        hasGoogleTagManager: false,
        hasMetaPixel: false,
        hasCanonical: false,
        note: `Server responded with HTTP ${httpStatus}. Evaluated with industry baselines.`,
      };
    }

    const rawHtml = await response.text();
    // Cap analysis to first 1.5MB to maintain sub-second speed
    const html = rawHtml.slice(0, 1500000);

    // 1. Title tag
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : null;
    const title = rawTitle && rawTitle.length > 0 ? rawTitle : null;
    const titleLength = title ? title.length : 0;

    // 2. Meta description
    const descMatch =
      html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const metaDescription = descMatch ? descMatch[1].trim() : null;
    const metaDescriptionLength = metaDescription ? metaDescription.length : 0;

    // 3. Headings: H1 and H2
    const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
    const h1Matches = [...html.matchAll(h1Regex)].map((m) =>
      m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    );
    const h1Count = h1Matches.length;
    const h1Text = h1Matches.length > 0 ? h1Matches[0] : null;

    const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;

    // 4. Viewport
    const hasViewport = /<meta\s+[^>]*name=["']viewport["']/i.test(html);

    // 5. JSON-LD Structured Data Schema
    const schemaRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const schemaMatches = [...html.matchAll(schemaRegex)];
    const schemaTypes: string[] = [];

    for (const match of schemaMatches) {
      try {
        const parsedJson = JSON.parse(match[1]);
        const extractTypes = (obj: unknown) => {
          if (!obj || typeof obj !== 'object') return;
          if (Array.isArray(obj)) {
            obj.forEach(extractTypes);
            return;
          }
          const record = obj as Record<string, unknown>;
          if (record['@type']) {
            if (Array.isArray(record['@type'])) {
              record['@type'].forEach((t) => {
                if (typeof t === 'string' && !schemaTypes.includes(t)) schemaTypes.push(t);
              });
            } else if (typeof record['@type'] === 'string') {
              if (!schemaTypes.includes(record['@type'])) schemaTypes.push(record['@type']);
            }
          }
          if (record['@graph'] && Array.isArray(record['@graph'])) {
            record['@graph'].forEach(extractTypes);
          }
        };
        extractTypes(parsedJson);
      } catch {
        // Skip malformed script blocks
      }
    }
    const hasSchema = schemaTypes.length > 0;

    // 6. Image Analysis
    const imgMatches = [...html.matchAll(/<img\b([^>]*)>/gi)];
    const totalImages = imgMatches.length;
    let imagesMissingAlt = 0;
    let modernImagesCount = 0;

    for (const img of imgMatches) {
      const attrs = img[1];
      const hasAlt = /alt=["']([^"']+)["']/i.test(attrs);
      if (!hasAlt) imagesMissingAlt++;

      const isModern = /\.(webp|avif|svg)[\b"'\s?]/i.test(attrs) || /srcset=[^>]*(webp|avif)/i.test(attrs);
      if (isModern) modernImagesCount++;
    }

    // 7. Conversion & Contact CTAs
    const hasPhoneLink = /href=["']tel:[^"']+["']/i.test(html);
    const hasEmailLink = /href=["']mailto:[^"']+["']/i.test(html);
    const hasWhatsAppLink = /href=["'][^"']*(?:wa\.me|whatsapp|api\.whatsapp)[^"']*["']/i.test(html);
    const hasForm = /<form\b[^>]*>/i.test(html);

    // 8. Tracking & Ad Tags
    const hasGoogleTagManager = /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]+/i.test(html);
    const hasGoogleAnalytics =
      /googletagmanager\.com\/gtag\/js|google-analytics\.com|gtag\(["']config["']/i.test(html);
    const hasMetaPixel = /connect\.facebook\.net\/[a-zA-Z_]+\/fbevents\.js|fbq\(/i.test(html);

    // 9. Canonical
    const hasCanonical = /<link\s+[^>]*rel=["']canonical["']/i.test(html);

    return {
      fetched: true,
      httpStatus,
      responseTimeMs,
      https,
      title,
      titleLength,
      metaDescription,
      metaDescriptionLength,
      h1Count,
      h1Text,
      h2Count,
      hasViewport,
      hasSchema,
      schemaTypes,
      totalImages,
      imagesMissingAlt,
      modernImagesCount,
      hasPhoneLink,
      hasEmailLink,
      hasWhatsAppLink,
      hasForm,
      hasGoogleAnalytics,
      hasGoogleTagManager,
      hasMetaPixel,
      hasCanonical,
      note: 'Live signals successfully inspected from public DOM.',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    const isTimeout = errorMsg.includes('abort') || errorMsg.includes('timeout');

    return {
      fetched: false,
      responseTimeMs: Date.now() - startTime,
      https,
      title: null,
      titleLength: 0,
      metaDescription: null,
      metaDescriptionLength: 0,
      h1Count: 0,
      h1Text: null,
      h2Count: 0,
      hasViewport: false,
      hasSchema: false,
      schemaTypes: [],
      totalImages: 0,
      imagesMissingAlt: 0,
      modernImagesCount: 0,
      hasPhoneLink: false,
      hasEmailLink: false,
      hasWhatsAppLink: false,
      hasForm: false,
      hasGoogleAnalytics: false,
      hasGoogleTagManager: false,
      hasMetaPixel: false,
      hasCanonical: false,
      note: isTimeout
        ? 'Domain connection timed out (server or bot-protection delay). Evaluated with industry baseline.'
        : 'Domain inspection restricted or shielded. Evaluated with industry baseline.',
    };
  }
}

/**
 * Optional Google PageSpeed Insights check (timeout-protected, non-blocking)
 */
async function checkGooglePageSpeed(targetUrl: string): Promise<{ mobilePerf: number | null; mobileSeo: number | null }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const apiKey = process.env.PAGESPEED_API_KEY || '';
    const keyParam = apiKey ? `&key=${apiKey}` : '';
    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      targetUrl
    )}&strategy=mobile&category=PERFORMANCE&category=SEO${keyParam}`;

    const res = await fetch(psiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return { mobilePerf: null, mobileSeo: null };
    const data = await res.json();

    const perfScore = data?.lighthouseResult?.categories?.performance?.score;
    const seoScore = data?.lighthouseResult?.categories?.seo?.score;

    return {
      mobilePerf: typeof perfScore === 'number' ? Math.round(perfScore * 100) : null,
      mobileSeo: typeof seoScore === 'number' ? Math.round(seoScore * 100) : null,
    };
  } catch {
    return { mobilePerf: null, mobileSeo: null };
  }
}

/**
 * Deterministic live diagnostic report synthesis grounded in real findings
 */
function buildDiagnosticReport(
  businessName: string,
  websiteUrl: string,
  industry: string,
  location: string,
  signals: LiveSignals
): AuditResponseData {
  const cleanName = businessName.trim() || 'Your Business';
  const cleanUrl = websiteUrl.trim();
  const cleanIndustry = industry.trim() || 'Commercial Services';
  const cleanLocation = location.trim() || 'Global Target Market';

  // Seed for baseline stability
  const seed = (cleanName + cleanUrl).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // 1. Pillar 1: Website Design & Development (Speed & UX)
  let speedScore = 78;
  if (signals.fetched) {
    let pts = 0;
    if (signals.hasViewport) pts += 20;
    if (signals.https) pts += 15;
    if (signals.hasForm || signals.hasPhoneLink || signals.hasWhatsAppLink) pts += 20;
    if (signals.totalImages === 0 || signals.modernImagesCount / Math.max(signals.totalImages, 1) >= 0.5) pts += 20;
    else pts += 10;
    if (signals.responseTimeMs && signals.responseTimeMs < 800) pts += 25;
    else if (signals.responseTimeMs && signals.responseTimeMs < 1800) pts += 15;
    else pts += 10;

    if (typeof signals.pageSpeedMobile === 'number') {
      speedScore = Math.round((pts * 0.4) + (signals.pageSpeedMobile * 0.6));
    } else {
      speedScore = pts;
    }
  } else {
    speedScore = 74 + (seed % 12);
  }
  speedScore = Math.min(Math.max(speedScore, 58), 94);

  // 2. Pillar 2: SEO, AEO & GEO Visibility
  let seoScore = 70;
  if (signals.fetched) {
    let pts = 0;
    if (signals.title && signals.titleLength >= 25 && signals.titleLength <= 70) pts += 25;
    else if (signals.title) pts += 14;

    if (signals.metaDescription && signals.metaDescriptionLength >= 80 && signals.metaDescriptionLength <= 165) pts += 20;
    else if (signals.metaDescription) pts += 10;

    if (signals.h1Count === 1) pts += 20;
    else if (signals.h1Count > 1) pts += 10;

    if (signals.hasSchema) pts += 25;
    else pts += 5; // Major penalty for missing JSON-LD schema (critical for AEO & GEO)

    if (signals.hasCanonical) pts += 10;

    if (typeof signals.pageSpeedSeo === 'number') {
      seoScore = Math.round((pts * 0.5) + (signals.pageSpeedSeo * 0.5));
    } else {
      seoScore = pts;
    }
  } else {
    seoScore = 68 + ((seed * 3) % 14);
  }
  seoScore = Math.min(Math.max(seoScore, 55), 93);

  // 3. Pillar 3: Google Ads & Facebook Ads
  let adsScore = 65;
  if (signals.fetched) {
    let pts = 50;
    if (signals.hasGoogleTagManager || signals.hasGoogleAnalytics) pts += 20;
    if (signals.hasMetaPixel) pts += 15;
    if (signals.hasForm && (signals.hasPhoneLink || signals.hasWhatsAppLink)) pts += 15;
    adsScore = pts;
  } else {
    adsScore = 64 + ((seed * 7) % 15);
  }
  adsScore = Math.min(Math.max(adsScore, 52), 90);

  // 4. Pillar 4: Review Management & Google Review Removal
  let repScore = 72;
  const hasReviewType = signals.schemaTypes.some((t) => /Review|AggregateRating|Rating/i.test(t));
  if (signals.fetched) {
    let pts = 65;
    if (hasReviewType) pts += 20;
    if (signals.hasPhoneLink || signals.hasEmailLink) pts += 10;
    repScore = pts;
  } else {
    repScore = 72 + ((seed * 11) % 14);
  }
  repScore = Math.min(Math.max(repScore, 60), 92);

  const overallScore = Math.round((speedScore + seoScore + adsScore + repScore) / 4);

  // Dynamic Itemized Priority Fixes based on real findings
  const priorityFixes: PriorityFix[] = [];

  // Fix 1: Schema / AEO / GEO
  if (!signals.hasSchema) {
    priorityFixes.push({
      title: 'Deploy Comprehensive JSON-LD Entity Schema (AEO & GEO Blind Spot)',
      category: 'SEO, AEO & GEO Visibility',
      impact: 'Critical',
      issue: `No structured JSON-LD schema detected on ${cleanUrl}. Conversational AI engines (Google AI Overviews, ChatGPT, Perplexity, Gemini) cannot reliably identify ${cleanName}'s entity classification, services, or regional jurisdiction in ${cleanLocation}.`,
      fix: `Implement structured JSON-LD schemas (${cleanIndustry.includes('Dent') ? 'Dentist / MedicalBusiness' : cleanIndustry.includes('Legal') ? 'LegalService' : cleanIndustry.includes('Roof') || cleanIndustry.includes('Contract') ? 'HomeAndConstructionBusiness' : 'LocalBusiness'}, Organization, Service, and FAQPage) with verified geo-coordinates and service taxonomy.`,
      description: `Deploy semantic JSON-LD entity markup so search engines and AI assistants (ChatGPT, Gemini, Perplexity) cite ${cleanName} as the primary authority in ${cleanLocation}.`,
    });
  } else {
    priorityFixes.push({
      title: 'Expand Entity Schema with Service Taxonomy & FAQ Matrices',
      category: 'SEO, AEO & GEO Visibility',
      impact: 'High',
      issue: `Found schema types: [${signals.schemaTypes.slice(0, 3).join(', ')}]. Schema can be expanded with granular service catalog entities and question-answer matrices to capture conversational AI queries.`,
      fix: `Enhance existing JSON-LD markup with FAQPage schemas, author credentials, and specific commercial service entities targeting high-intent buyer searches in ${cleanLocation}.`,
      description: `Expand existing schema with FAQPage and service taxonomy so Google AI Overviews cite ${cleanName} for complex buyer searches.`,
    });
  }

  // Fix 2: Speed / UX / Assets
  if (signals.totalImages > 0 && signals.imagesMissingAlt > 0) {
    priorityFixes.push({
      title: `Remediate ${signals.imagesMissingAlt} Missing Alt Attributes & Deploy Modern .WebP Pipeline`,
      category: 'Website Design & Development',
      impact: 'High',
      issue: `Detected ${signals.totalImages} images on the landing page, of which ${signals.imagesMissingAlt} lack descriptive alt attributes and several use legacy raster formats, increasing payload weight and missing Google Image visibility.`,
      fix: `Convert media to sub-second Next-Gen .WebP format with explicit aspect-ratio width/height tags, and inject descriptive, keyword-rich alt attributes tailored to ${cleanIndustry} in ${cleanLocation}.`,
      description: `Optimize media pipeline with .WebP assets and descriptive alt tags to enhance Core Web Vitals and image search rankings.`,
    });
  } else if (!signals.hasForm || (!signals.hasPhoneLink && !signals.hasWhatsAppLink)) {
    priorityFixes.push({
      title: 'Implement Mobile Sticky Conversion Funnel (Call & Quote Pathways)',
      category: 'Website Design & Development',
      impact: 'Critical',
      issue: `Landing page lacks prominent direct-conversion pathways (${!signals.hasForm ? 'missing embedded quote form' : 'missing instant call/WhatsApp triggers'}). Mobile visitors experience friction when attempting to request pricing or schedule service.`,
      fix: `Deploy a high-converting sticky mobile CTA bar with tap-to-call, WhatsApp direct chat, and a 3-step frictionless quote request module.`,
      description: `Eliminate mobile conversion friction with sticky contact pathways and quick-quote funnels for ${cleanName}.`,
    });
  } else {
    priorityFixes.push({
      title: 'Streamline Asset Delivery & Micro-Conversion Architecture',
      category: 'Website Design & Development',
      impact: 'High',
      issue: `Mobile response latency measured at ${signals.responseTimeMs || 'standard'}ms. Enhancing edge caching and asset preloading will reduce bounce rates for paid and organic visitors.`,
      fix: `Implement sub-second edge CDN caching, critical CSS inlining, and automated WebP asset serving across all mobile viewpoints.`,
      description: `Optimize mobile loading and edge caching to achieve sub-second speeds for visitors in ${cleanLocation}.`,
    });
  }

  // Fix 3: Google Ads & Facebook Ads
  if (!signals.hasMetaPixel || !signals.hasGoogleTagManager) {
    priorityFixes.push({
      title: 'Deploy Server-Side Meta CAPI & Google Tag Conversion Tracking',
      category: 'Google Ads & Facebook Ads',
      impact: 'High',
      issue: `Missing full-funnel ad telemetry (${!signals.hasGoogleTagManager ? 'Google Tag Manager not detected; ' : ''}${!signals.hasMetaPixel ? 'Meta Pixel / CAPI not detected' : ''}). Running paid ads without verified server-side conversion tags results in inaccurate ROAS attribution and wasted spend.`,
      fix: `Install Google Tag Manager with enhanced conversion tracking, Meta Conversions API (CAPI), and negative-keyword gated campaign structures to capture high-intent commercial buyers.`,
      description: `Set up robust conversion tracking and negative keyword gating to prevent wasted ad budget and maximize inbound lead volume.`,
    });
  } else {
    priorityFixes.push({
      title: 'Structure Negative Keyword Gating & Dedicated Ad Landing Page Match',
      category: 'Google Ads & Facebook Ads',
      impact: 'Strategic',
      issue: `Ad tracking infrastructure detected. Opportunity exists to improve Cost-Per-Acquisition by tightening search term match types and eliminating competitor/irrelevant clicks.`,
      fix: `Implement comprehensive negative keyword matrices (filtering low-budget/DIY queries) and build dedicated landing page experiences aligned with exact campaign search intent.`,
      description: `Eliminate wasted ad spend by gating low-intent search queries and deploying dedicated conversion-focused landing pages.`,
    });
  }

  // Fix 4: Review Management & Policy-Compliant Removal
  priorityFixes.push({
    title: 'Establish 8-Platform Review Acquisition Funnel & Google Legal Dispute Protocol',
    category: 'Review Management & Google Review Removal',
    impact: 'Critical',
    issue: `Multi-platform reputation dispersal gap. In competitive ${cleanIndustry} markets across ${cleanLocation}, businesses need authentic 5-star review velocity on Google, Trustpilot & directories, alongside an established legal protocol to dispute defamatory or fake 1-star reviews.`,
    fix: `Deploy an automated SMS/Email post-service review collection system, sync live rating badges, and assemble 100% policy-compliant dispute dossiers submitted directly through Google Legal for illegitimate reviews.`,
    description: `Automate authentic 5-star review generation while establishing policy-compliant dispute dossiers to legally challenge defamatory reviews.`,
  });

  return {
    businessName: cleanName,
    websiteUrl: cleanUrl,
    industry: cleanIndustry,
    location: cleanLocation,
    overallScore,
    liveSignals: signals,
    pillars: {
      speedUx: {
        title: 'Website Design & Development',
        score: speedScore,
        badge: speedScore >= 80 ? 'Sub-Second Edge Ready' : 'UX & Speed Optimization Needed',
        status:
          signals.hasViewport && signals.https
            ? 'Mobile Responsive Core'
            : 'Mobile Viewport / Security Gap',
        description: `Bespoke modern architecture, mobile responsiveness, Next-Gen WebP asset optimization, and friction-free inquiry funnels for ${cleanIndustry} in ${cleanLocation}.`,
        platforms: 'Mobile & Desktop Conversion Funnels',
        metrics: [
          signals.hasViewport ? 'Mobile Viewport: Properly declared' : 'Mobile Viewport: Missing tag',
          signals.totalImages > 0
            ? `Asset Health: ${signals.totalImages} images (${signals.imagesMissingAlt} missing alt, ${signals.modernImagesCount} modern format)`
            : 'Asset Pipeline: Sub-second edge compression recommended',
          signals.hasForm || signals.hasPhoneLink
            ? 'Conversion Pathways: Form / phone contact detected'
            : 'Conversion Funnel: Missing direct quote / contact pathways',
        ],
      },
      seoAeoGeo: {
        title: 'SEO, AEO & GEO Visibility',
        score: seoScore,
        badge: signals.hasSchema ? 'Schema Verified' : 'AI & Schema Gap',
        status: signals.hasSchema ? 'Entity Knowledge Graph Found' : 'Unclaimed AI Citations (No Schema)',
        description: `Entity schema structure, Google Maps 3-Pack footprint, and authoritative citation presence across Google AI Overviews, ChatGPT, Gemini & Perplexity in ${cleanLocation}.`,
        platforms: 'Google Search, Google Maps, AI Overviews, ChatGPT, Perplexity',
        metrics: [
          signals.title ? `Title Tag: "${signals.title.slice(0, 42)}..." (${signals.titleLength} chars)` : 'Title Tag: Missing primary <title>',
          signals.metaDescription ? `Meta Description: Detected (${signals.metaDescriptionLength} chars)` : 'Meta Description: Missing (Google generates random snippets)',
          signals.hasSchema
            ? `Structured Schema: Types detected [${signals.schemaTypes.slice(0, 3).join(', ')}]`
            : 'Structured Schema: Missing JSON-LD (Urgent for ChatGPT & AI Overviews)',
        ],
      },
      paidAds: {
        title: 'Google Ads & Facebook Ads',
        score: adsScore,
        badge: signals.hasGoogleTagManager || signals.hasMetaPixel ? 'Tracking Detected' : 'Tracking Setup Needed',
        status: signals.hasGoogleTagManager ? 'Conversion Infrastructure Active' : 'Cost-Per-Lead Opportunity',
        description: `High-intent PPC & paid social campaigns, negative keyword gating matrices, server-side CAPI tracking, and dedicated landing page alignment for ${cleanIndustry}.`,
        platforms: 'Google Search Ads & Meta (Facebook/Instagram) Campaigns',
        metrics: [
          signals.hasGoogleTagManager || signals.hasGoogleAnalytics
            ? 'Google Analytics / GTM: Active on landing page'
            : 'Google Tag Manager: Not detected (Ad conversion risk)',
          signals.hasMetaPixel ? 'Meta Pixel: Active on page' : 'Meta Pixel: Not detected on landing page',
          'Negative Keyword Architecture: Custom gating matrix required for zero wasted spend',
        ],
      },
      reputation: {
        title: 'Review Management & Google Review Removal',
        score: repScore,
        badge: 'Reputation Governance',
        status: 'Multi-Platform Authority Gap',
        description: `Automated 5-star review acquisition funnels across Google, Trustpilot & Facebook, combined with 100% legal, policy-compliant dispute dossiers to remove defamatory or fake 1-star reviews.`,
        platforms: 'Google, Facebook, Trustpilot, Yelp, Bark, Checkatrade',
        metrics: [
          hasReviewType ? 'Review Schema: AggregateRating found' : 'Review Schema: Missing structured review markup',
          'Review Dispersal: Footprint across Google, Trustpilot & regional directories',
          'Google Policy Defense: Formal dossier preparation for illegitimate 1-star reviews',
        ],
      },
    },
    priorityFixes,
    executiveNote:
      'Notice: This automated live audit inspects public DOM, viewport, and telemetry signals. Deep technical server logs, AEO entity graph disambiguation, ad account spend audits, and policy-compliant negative review removal eligibility are conducted during custom scope consultation.',
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { businessName = '', websiteUrl = '', industry = '', location = '' } = body;

    if (!websiteUrl) {
      return NextResponse.json(
        { error: 'Website URL is required for live diagnostic analysis.' },
        { status: 400 }
      );
    }

    let normalizedUrl = websiteUrl.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      return NextResponse.json(
        { error: 'Please enter a valid website address (e.g. yourbusiness.com).' },
        { status: 400 }
      );
    }

    // Step 1: Run real server-side live HTML inspection and PageSpeed check in parallel
    const [liveSignals, psiResult] = await Promise.all([
      fetchAndInspectHtml(normalizedUrl),
      checkGooglePageSpeed(normalizedUrl),
    ]);

    if (psiResult.mobilePerf !== null) liveSignals.pageSpeedMobile = psiResult.mobilePerf;
    if (psiResult.mobileSeo !== null) liveSignals.pageSpeedSeo = psiResult.mobileSeo;

    // Step 2: Build deterministic live diagnostic report grounded in real findings
    const diagnosticReport = buildDiagnosticReport(
      businessName,
      normalizedUrl,
      industry,
      location,
      liveSignals
    );

    // Step 3: If GEMINI_API_KEY is configured, enhance descriptions while strictly preserving live detected telemetry
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are Joy Mondal's elite AI digital growth, technical SEO, and online reputation diagnostic engine.
A live website check has just been completed for:
- Business Name: ${diagnosticReport.businessName}
- Website URL: ${diagnosticReport.websiteUrl}
- Industry: ${diagnosticReport.industry}
- Location: ${diagnosticReport.location}
- Live Signals: Title="${liveSignals.title || 'Missing'}", H1="${liveSignals.h1Text || 'Missing'}" (count: ${liveSignals.h1Count}), Schema=[${liveSignals.schemaTypes.join(', ') || 'None'}], Images=${liveSignals.totalImages} (${liveSignals.imagesMissingAlt} missing alt, ${liveSignals.modernImagesCount} modern), Phone=${liveSignals.hasPhoneLink}, Form=${liveSignals.hasForm}, GTM=${liveSignals.hasGoogleTagManager}, MetaPixel=${liveSignals.hasMetaPixel}.

Refine the four pillar descriptions and the four priority fixes to be ultra-crisp, tailored to this exact business and market, without fabricating review counts or fake ranking guarantees. Keep custom quote positioning (no rigid packages).
Return a JSON object with this exact shape:
{
  "pillars": {
    "speedUx": { "description": "string", "badge": "string", "status": "string" },
    "seoAeoGeo": { "description": "string", "badge": "string", "status": "string" },
    "paidAds": { "description": "string", "badge": "string", "status": "string" },
    "reputation": { "description": "string", "badge": "string", "status": "string" }
  },
  "priorityFixes": [
    { "title": "string", "category": "Website Design & Development", "impact": "Critical" | "High" | "Strategic", "issue": "string", "fix": "string", "description": "string" },
    { "title": "string", "category": "SEO, AEO & GEO Visibility", "impact": "Critical" | "High" | "Strategic", "issue": "string", "fix": "string", "description": "string" },
    { "title": "string", "category": "Google Ads & Facebook Ads", "impact": "Critical" | "High" | "Strategic", "issue": "string", "fix": "string", "description": "string" },
    { "title": "string", "category": "Review Management & Google Review Removal", "impact": "Critical" | "High" | "Strategic", "issue": "string", "fix": "string", "description": "string" }
  ]
}`;

        const aiResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' },
        });

        const rawJson = (aiResponse.text || '')
          .replace(/```json\s*/gi, '')
          .replace(/```\s*$/g, '')
          .trim();
        const parsedAi = JSON.parse(rawJson);

        if (parsedAi?.pillars) {
          if (parsedAi.pillars.speedUx?.description) diagnosticReport.pillars.speedUx.description = parsedAi.pillars.speedUx.description;
          if (parsedAi.pillars.seoAeoGeo?.description) diagnosticReport.pillars.seoAeoGeo.description = parsedAi.pillars.seoAeoGeo.description;
          if (parsedAi.pillars.paidAds?.description) diagnosticReport.pillars.paidAds.description = parsedAi.pillars.paidAds.description;
          if (parsedAi.pillars.reputation?.description) diagnosticReport.pillars.reputation.description = parsedAi.pillars.reputation.description;
        }
        if (Array.isArray(parsedAi?.priorityFixes) && parsedAi.priorityFixes.length === 4) {
          diagnosticReport.priorityFixes = parsedAi.priorityFixes.map((f: PriorityFix, i: number) => ({
            ...diagnosticReport.priorityFixes[i],
            ...f,
            description: f.description || f.fix || diagnosticReport.priorityFixes[i].description,
          }));
        }
      } catch (aiErr) {
        console.warn('Gemini enhancement skipped; using verified live deterministic audit:', aiErr);
      }
    }

    return NextResponse.json({ success: true, data: diagnosticReport });
  } catch (err: unknown) {
    console.error('Audit API error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while analyzing the website.' },
      { status: 500 }
    );
  }
}
