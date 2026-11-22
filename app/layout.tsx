import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://joymondal.com'),
  title: 'Joy Mondal | Digital Marketing & Web Design Specialist',
  description:
    'Joy Mondal helps businesses across every industry and country worldwide grow with digital marketing, web design, SEO, AEO, GEO, paid advertising, and policy-compliant reputation management.',
  keywords: [
    'Joy Mondal',
    'Website Design & Development',
    'Custom Web Architecture',
    'SEO Specialist',
    'AEO Answer Engine Optimization',
    'GEO Generative Engine Optimization',
    'AI Search Visibility',
    'Google Ads Management',
    'Meta Facebook Ads',
    'Multi-Platform Review Management',
    'Google Negative Review Removal',
    'Conversion Rate Optimization CRO',
    'Global Digital Marketing Consultant',
  ],
  authors: [{ name: 'Joy Mondal', url: 'https://joymondal.com' }],
  creator: 'Joy Mondal',
  publisher: 'Joy Mondal',
  alternates: {
    canonical: 'https://joymondal.com',
  },
  icons: {
    icon: 'https://iamjoymondal.netlify.app/joy-mondal.webp',
    apple: 'https://iamjoymondal.netlify.app/joy-mondal.webp',
  },
  openGraph: {
    title: 'Joy Mondal | Digital Marketing & Web Design Specialist',
    description:
      'Joy Mondal helps businesses across every industry and country worldwide grow with digital marketing, web design, SEO, AEO, GEO, paid advertising, and policy-compliant reputation management.',
    url: 'https://joymondal.com',
    siteName: 'Joy Mondal GROWTH',
    type: 'website',
    images: [
      {
        url: 'https://iamjoymondal.netlify.app/joy-mondal.webp',
        width: 1200,
        height: 1500,
        alt: 'Joy Mondal GROWTH',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joy Mondal | Digital Marketing & Web Design Specialist',
    description:
      'Joy Mondal helps businesses across every industry and country worldwide grow with digital marketing, web design, SEO, AEO, GEO, paid advertising, and policy-compliant reputation management.',
    images: ['https://iamjoymondal.netlify.app/joy-mondal.webp'],
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://joymondal.com/#person',
      name: 'Joy Mondal',
      url: 'https://joymondal.com',
      image: 'https://iamjoymondal.netlify.app/joy-mondal.webp',
      jobTitle: 'Web Architecture, SEO & AI Search Growth Consultant',
      description:
        'Joy Mondal is a digital growth consultant specializing in bespoke website architecture, SEO, AEO, GEO, high-ROI Google & Meta ads, and multi-platform reputation management for businesses worldwide.',
      knowsAbout: [
        'Website Design & Development',
        'Search Engine Optimization (SEO)',
        'Answer Engine Optimization (AEO)',
        'Generative Engine Optimization (GEO)',
        'AI Overviews Optimization',
        'Google Ads PPC',
        'Meta Facebook Ads',
        'Online Reputation Governance',
        'Policy-Compliant Negative Review Removal',
        'Conversion Rate Optimization (CRO)',
      ],
      sameAs: ['https://wa.me/917980941101', 'https://www.facebook.com/share/1FCjoMoAzP/'],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://joymondal.com/#service',
      name: 'Joy Mondal Digital Consulting',
      url: 'https://joymondal.com',
      image: 'https://iamjoymondal.netlify.app/joy-mondal.webp',
      telephone: '+91-7980941101',
      priceRange: '$$$',
      areaServed: [
        { '@type': 'Place', name: 'Worldwide' },
        { '@type': 'Country', name: 'Ireland' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'Australia' },
        { '@type': 'Country', name: 'Europe' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Growth & Digital Consulting Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Website Design & Development',
              description:
                'High-converting, bespoke web platforms engineered with sub-second .WebP assets, mobile UX, and frictionless quote funnels.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'SEO, AEO & GEO Search Dominance',
              description:
                'Tri-factor search dominance: #1 Google organic rankings, Google Maps 3-Pack, and authoritative citations across ChatGPT, Perplexity & Gemini.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Google Ads & Meta Advertising',
              description:
                'Precision-targeted PPC and paid social campaigns designed to drive qualified inbound calls and buyer conversions.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Multi-Platform Review Management',
              description:
                'Automated 5-star review acquisition funnels and live rating badges synchronized across Google, Facebook, Trustpilot, Bark, Yell & Yelp.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Google Negative Review Removal',
              description:
                '100% legal, policy-compliant dispute dossiers and appeals submitted directly through Google Legal to remove defamatory, fake, or spam 1-star reviews.',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://joymondal.com/#website',
      url: 'https://joymondal.com',
      name: 'Joy Mondal Portfolio',
      publisher: {
        '@id': 'https://joymondal.com/#person',
      },
    },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans bg-[#221710] text-[#1C1510] antialiased selection:bg-[#D4A857]/30 selection:text-[#1C1510]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        {children}
      </body>
    </html>
  );
}
