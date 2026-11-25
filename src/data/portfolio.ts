export {
  type LiveProject,
  CUSTOM_WEBSITES,
  LIVE_PROJECTS,
} from './customWebsites';

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
    imageSrc: '/images/case-studies/google-ads-1984-purchases.jpg',
    width: 985,
    height: 603,
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
    imageSrc: '/images/case-studies/google-ads-1646-purchases.jpg',
    width: 1308,
    height: 769,
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
    imageSrc: '/images/case-studies/google-ads-193-conversions.jpg',
    width: 1647,
    height: 722,
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
    imageSrc: '/images/case-studies/meta-ads-335-purchases.jpg',
    width: 990,
    height: 576,
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
    imageSrc: '/images/case-studies/meta-ads-high-performing.jpg',
    width: 1469,
    height: 655,
    metrics: [
      { label: 'Top Purchases', value: '365 & 361' },
      { label: 'Cost / Result', value: '$1.86–$1.89' },
      { label: 'Max Reach', value: '501.1K' },
      { label: 'Delivery', value: 'High Performing' },
    ],
  },
];
