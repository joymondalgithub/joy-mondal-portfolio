import Image from 'next/image';

interface BrandLogoProps {
  className?: string;
  priority?: boolean;
}

export default function BrandLogo({ className = '', priority = false }: BrandLogoProps) {
  return (
    <span
      role="img"
      aria-label="Joy Mondal | GROWTH | WEBSITE • SEO • ADS"
      className={`inline-flex h-10 items-stretch overflow-hidden border border-[#D4AF37] bg-[#16181D] sm:h-[42px] ${className}`}
    >
      <span className="flex w-[100px] shrink-0 items-center justify-center bg-[#16181D] sm:w-[112px]">
        <Image
          src="/assets/joy-mondal-signature.png"
          alt=""
          width={572}
          height={207}
          className="h-[90%] w-full object-contain"
          priority={priority}
        />
      </span>
      <span className="flex w-[124px] shrink-0 flex-col items-center justify-center bg-[#D4AF37] px-1.5 text-[#16181D] sm:w-[142px]">
        <span className="-translate-y-[1px] text-[13px] font-extrabold uppercase leading-none tracking-[0.06em] sm:text-[15px]">
          GROWTH
        </span>
        <span className="mt-1 whitespace-nowrap text-[7px] font-semibold uppercase leading-none tracking-[0.12em] sm:text-[8px]">
          WEBSITE • SEO • ADS
        </span>
      </span>
    </span>
  );
}
