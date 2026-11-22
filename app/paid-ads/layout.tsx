import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'High-ROI Google Ads & Meta Ads Case Studies | Joy Mondal',
  description:
    'Audited advertising performance across Google PPC, Meta (Facebook/Instagram), negative-keyword gating, and call conversion funnels engineered by Joy Mondal.',
  alternates: {
    canonical: 'https://joymondal.com/paid-ads',
  },
  openGraph: {
    title: 'High-ROI Google Ads & Meta Ads Case Studies | Joy Mondal',
    description:
      'Audited advertising performance across Google PPC, Meta (Facebook/Instagram), negative-keyword gating, and call conversion funnels engineered by Joy Mondal.',
    url: 'https://joymondal.com/paid-ads',
    images: ['https://iamjoymondal.netlify.app/joy-mondal.webp'],
  },
};

export default function PaidAdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
