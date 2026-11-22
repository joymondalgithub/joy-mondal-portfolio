import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO, AEO & GEO Proof & Case Studies | Joy Mondal',
  description:
    'Verified Google Search Console telemetry, #1 organic rankings, Google Maps 3-Pack, and AI Overview (AEO/GEO) citations delivered by Joy Mondal.',
  alternates: {
    canonical: 'https://joymondal.com/seo-results',
  },
  openGraph: {
    title: 'SEO, AEO & GEO Proof & Case Studies | Joy Mondal',
    description:
      'Verified Google Search Console telemetry, #1 organic rankings, Google Maps 3-Pack, and AI Overview (AEO/GEO) citations delivered by Joy Mondal.',
    url: 'https://joymondal.com/seo-results',
    images: ['/joy-mondal.webp'],
  },
};

export default function SeoResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
