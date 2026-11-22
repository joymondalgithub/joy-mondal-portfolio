import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Website Design & Development | Joy Mondal',
  description:
    'High-converting bespoke website design & development by Joy Mondal. Sub-second speed, .WebP asset optimization, mobile-first UX, and conversion funnels for global businesses.',
  alternates: {
    canonical: 'https://joymondal.com/custom-websites',
  },
  openGraph: {
    title: 'Custom Website Design & Development | Joy Mondal',
    description:
      'High-converting bespoke website design & development by Joy Mondal. Sub-second speed, .WebP asset optimization, mobile-first UX, and conversion funnels for global businesses.',
    url: 'https://joymondal.com/custom-websites',
    images: ['/joy-mondal.webp'],
  },
};

export default function CustomWebsitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
