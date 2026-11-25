export interface LiveProject {
  title: string;
  url: string;
  domain: string;
  eyebrow: string;
  summary: string;
  tags: string[];
  localImage: string;
}

export const CUSTOM_WEBSITES: LiveProject[] = [
  // =========================================================================
  // TOP PRIORITY GROUP (POSITIONS 1 TO 8 — SHOWN FIRST)
  // =========================================================================
  {
    title: 'Sudell',
    url: 'https://sudell.co.uk/',
    domain: 'sudell.co.uk',
    eyebrow: 'UNITED KINGDOM • EXTERIOR & BUILDING SERVICES',
    summary:
      'Commercial exterior maintenance and specialist vacuum clearance platform engineered for regional search capture and rapid quote enquiries.',
    tags: ['Web Design', 'Local SEO', 'Conversion Funnel'],
    localImage: '/projects/sudell.webp',
  },
  {
    title: 'KRC Roofing & Construction Ltd',
    url: 'https://krcroofingandconstructionltd.co.uk/',
    domain: 'krcroofingandconstructionltd.co.uk',
    eyebrow: 'UNITED KINGDOM • ROOFING & CONSTRUCTION',
    summary:
      'Structural roofing and construction portal featuring emergency dispatch triggers, multi-service architecture, and mobile-optimized enquiry forms.',
    tags: ['Contractor Platform', 'Lead Gen', 'Mobile-First UI'],
    localImage: '/projects/krc-roofing.webp',
  },
  {
    title: 'Hi-Tech Property Maintenance',
    url: 'https://hitechpropertymaintenace.com/',
    domain: 'hitechpropertymaintenace.com',
    eyebrow: 'UNITED KINGDOM • PROPERTY MAINTENANCE',
    summary:
      'Multi-trade domestic and commercial facilities platform built with service tier pathways, certified compliance proofs, and sub-second edge loading.',
    tags: ['Facilities UX', 'Local Authority', 'Speed Optimization'],
    localImage: '/projects/hi-tech.webp',
  },
  {
    title: 'One Base Media',
    url: 'https://onebasemedia.co.uk/',
    domain: 'onebasemedia.co.uk',
    eyebrow: 'UNITED KINGDOM • DIGITAL AGENCY & MEDIA',
    summary:
      'High-authority digital agency platform with interactive case study galleries, structured SEO architecture, and bespoke client acquisition funnels.',
    tags: ['Agency Platform', 'SEO & GEO', 'Brand UX'],
    localImage: '/projects/one-base-media.webp',
  },
  {
    title: 'Garland UK',
    url: 'https://garlanduk.com/',
    domain: 'garlanduk.com',
    eyebrow: 'UNITED KINGDOM • COMMERCIAL ROOFING SYSTEMS',
    summary:
      'Enterprise commercial roofing and building envelope portal engineered for architectural specifiers, asset managers, and technical asset data delivery.',
    tags: ['Enterprise Architecture', 'B2B Specifier UX', 'Technical Catalog'],
    localImage: '/projects/garland-uk.webp',
  },
  {
    title: 'CARiD',
    url: 'https://www.carid.com/',
    domain: 'carid.com',
    eyebrow: 'UNITED STATES • AUTOMOTIVE E-COMMERCE',
    summary:
      'High-scale automotive aftermarket storefront engineered for complex fitment filtering, high-volume inventory taxonomy, and conversion velocity.',
    tags: ['E-Commerce Scale', 'Catalog Taxonomy', 'Conversion Funnel'],
    localImage: '/projects/carid.webp',
  },
  {
    title: 'BMI Group',
    url: 'https://www.bmigroup.com/',
    domain: 'bmigroup.com',
    eyebrow: 'EUROPE & UK • ROOFING & WATERPROOFING',
    summary:
      'Global enterprise building envelope platform delivering multi-region product specifications, sustainable architectural systems, and contractor portals.',
    tags: ['Global Enterprise', 'Multi-Region Architecture', 'Specification Engine'],
    localImage: '/projects/bmi-group.webp',
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

  // =========================================================================
  // SECONDARY GROUP (POSITIONS 9 TO 11 — SHOWN AFTER TOP GROUP)
  // =========================================================================
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

// Alias for seamless backward compatibility across components
export const LIVE_PROJECTS = CUSTOM_WEBSITES;
