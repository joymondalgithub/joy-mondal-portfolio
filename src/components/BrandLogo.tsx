import Image from 'next/image';

interface BrandLogoProps {
  className?: string;
  priority?: boolean;
}

export default function BrandLogo({ className = '', priority = false }: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <Image
        src="/assets/joy-mondal-growth-logo-trimmed.webp"
        alt="Joy Mondal | GROWTH · WEB • SEO • ADS"
        width={1132}
        height={243}
        className="h-10 sm:h-[42px] w-auto object-contain block"
        priority={priority}
      />
    </span>
  );
}
