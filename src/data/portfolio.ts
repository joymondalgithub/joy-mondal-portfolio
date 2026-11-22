export interface LiveProject {
  title: string;
  url: string;
  domain: string;
  eyebrow: string;
  summary: string;
  tags: string[];
  localImage: string;
}

export const LIVE_PROJECTS: LiveProject[] = [
  {
    title: 'Roofing Specialist Dublin',
    url: 'https://roofingspecialist-dublin.netlify.app',
    domain: 'roofingspecialist-dublin.netlify.app',
    eyebrow: 'DUBLIN, IE • WEB & LOCAL SEO',
    summary:
      'High-converting contractor platform with regional service architecture, emergency call funnels, and sub-second .WebP delivery.',
    tags: ['Web Design', 'Local SEO', 'Conversion Funnel'],
    localImage: '/projects/roofing-dublin.webp',
  },
  {
    title: 'Prayze Direct',
    url: 'https://prayzedirect.co.uk/',
    domain: 'prayzedirect.co.uk',
    eyebrow: 'UNITED KINGDOM • E-COMMERCE',
    summary:
      'Editorial e-commerce storefront designed for brand authority, structured product discovery, technical SEO, and frictionless conversion.',
    tags: ['E-Commerce', 'SEO & GEO', 'Brand UX'],
    localImage: '/projects/prayze-direct.webp',
  },
  {
    title: 'JG Roofing',
    url: 'https://jgroofting.netlify.app/',
    domain: 'jgroofting.netlify.app',
    eyebrow: 'IRELAND • CONTRACTOR PLATFORM',
    summary:
      'Multi-page service platform built around trust signals, mobile-first emergency callouts, instant quote forms, and fast edge delivery.',
    tags: ['Multi-Page Build', 'Lead Gen', 'Mobile-First UI'],
    localImage: '/projects/jg-roofing.webp',
  },
  {
    title: 'Myers Gutters',
    url: 'https://myersgutters.netlify.app/',
    domain: 'myersgutters.netlify.app',
    eyebrow: 'LIMERICK, IE • EXTERIOR SERVICES',
    summary:
      'Conversion-focused exterior services website structured with local schema markup, click-to-call pathways, and compressed .WebP media.',
    tags: ['Conversion Design', 'AEO & Schema', 'Speed Optimization'],
    localImage: '/projects/myers-gutters.webp',
  },
];

export interface PaidAdStudy {
  id: string;
  category: 'google' | 'meta';
  platformLabel: string;
  tag: string;
  headline: string;
  stats: string;
  description: string;
  imageSrc: string;
  width: number;
  height: number;
  metrics: {
    label: string;
    value: string;
  }[];
}

export const PAID_AD_STUDIES: PaidAdStudy[] = [
  {
    id: 'google-ads-1984-purchases',
    category: 'google',
    platformLabel: 'Google Ads',
    tag: 'Google Ads • Sales & Conversions',
    headline: '1,984 Purchases at $1.01 Cost / Conv.',
    stats: '112,896 Clicks • 6,163,133 Impr. • $2,075.09 Cost',
    description:
      'Scaled Google Ads conversion performance to 1,984 purchases at a disciplined $1.01 cost per conversion.',
    imageSrc: '/images/case-studies/google-ads-1984-purchases.webp',
    width: 985,
    height: 468,
    metrics: [
      { label: 'Purchases', value: '1,984.00' },
      { label: 'Cost / Conv.', value: '$1.01' },
      { label: 'Clicks', value: '112.8K' },
      { label: 'Impressions', value: '6.16M' },
    ],
  },
  {
    id: 'google-ads-1646-purchases',
    category: 'google',
    platformLabel: 'Google Ads',
    tag: 'Google Ads • Apr 9 – Jun 26, 2026',
    headline: '1,646 Purchases at $0.97 Cost / Conv.',
    stats: '94,294 Clicks • 5,343,227 Impr. • $1,666.95 Cost',
    description:
      'Sustained campaign growth delivering 1,646 purchases and 5.34M+ impressions at $0.97 cost per conversion.',
    imageSrc: '/images/case-studies/google-ads-1646-purchases.webp',
    width: 1024,
    height: 455,
    metrics: [
      { label: 'Purchases', value: '1,646.00' },
      { label: 'Cost / Conv.', value: '$0.97' },
      { label: 'Clicks', value: '94.2K' },
      { label: 'Spend', value: '$1,666.95' },
    ],
  },
  {
    id: 'google-ads-193-conversions',
    category: 'google',
    platformLabel: 'Google Ads',
    tag: 'Google Ads • Sep 28 – Oct 13, 2026',
    headline: '193 Conversions & 1.63k Conv. Value',
    stats: '16.9k Clicks • $322 Cost',
    description:
      'Targeted optimization generating 193 conversions and 1.63k conversion value on $322 spend.',
    imageSrc: '/images/case-studies/google-ads-193-conversions.webp',
    width: 780,
    height: 320,
    metrics: [
      { label: 'Conversions', value: '193.00' },
      { label: 'Conv. Value', value: '1.63k' },
      { label: 'Clicks', value: '16.9k' },
      { label: 'Total Spend', value: '$322' },
    ],
  },
  {
    id: 'meta-ads-335-purchases',
    category: 'meta',
    platformLabel: 'Meta Ads',
    tag: 'Meta Ads • Jun 1 – Jul 7',
    headline: '335 Website Purchases at $1.84 Each',
    stats: '$615.75 Amount Spent • Steady Daily Trend',
    description:
      'Consistent Meta Ads purchase funnel producing 335 website purchases at $1.84 per purchase.',
    imageSrc: '/images/case-studies/meta-ads-335-purchases.webp',
    width: 990,
    height: 490,
    metrics: [
      { label: 'Purchases', value: '335' },
      { label: 'Per Purchase', value: '$1.84' },
      { label: 'Amount Spent', value: '$615.75' },
      { label: 'Time Window', value: 'Jun 1 – Jul 7' },
    ],
  },
  {
    id: 'meta-ads-high-performing',
    category: 'meta',
    platformLabel: 'Meta Ads',
    tag: 'Meta Ads • High Performing Sets',
    headline: '365, 361 & 101 Purchases Across Top Sets',
    stats: 'Up to 501,114 Reach • ~$1.86–$2.31 Cost / Result',
    description:
      'High-performing Meta purchase sets scaled across broad reach with controlled cost per result.',
    imageSrc: '/images/case-studies/meta-ads-high-performing.webp',
    width: 665,
    height: 456,
    metrics: [
      { label: 'Top Purchases', value: '365 & 361' },
      { label: 'Cost / Result', value: '$1.86–$1.89' },
      { label: 'Max Reach', value: '501.1K' },
      { label: 'Delivery', value: 'High Performing' },
    ],
  },
];
