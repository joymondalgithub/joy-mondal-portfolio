'use client';

import React, { useState, useEffect } from 'react';

const SERVICES = [
  'Website Design & Development',
  'SEO, AEO & GEO',
  'Google & Meta Ads',
  'Reputation Management',
  'Web Speed & CRO',
];

interface TypewriterDeliverProps {
  className?: string;
}

export default function TypewriterDeliver({ className = '' }: TypewriterDeliverProps) {
  const [serviceIndex, setServiceIndex] = useState(0);
  const [currentText, setCurrentText] = useState('Website Design & Development');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = SERVICES[serviceIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Type forward (~60ms per character)
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 60);
      } else {
        // Pause briefly (1600ms) when word is fully typed
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1600);
      }
    } else {
      // Delete backward (~35ms per character)
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 35);
      } else {
        // Switch to next service in cycle with brief smooth pause
        timer = setTimeout(() => {
          setIsDeleting(false);
          setServiceIndex((prev) => (prev + 1) % SERVICES.length);
        }, 120);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, serviceIndex]);

  return (
    <div
      className={`font-sans font-semibold text-base sm:text-xl lg:text-2xl mb-6 min-h-[2rem] sm:min-h-[2.25rem] flex items-center whitespace-nowrap overflow-hidden select-none ${className}`}
      aria-label={`I Deliver ${currentText}`}
    >
      <span className="text-[#F6F2EA] shrink-0 font-medium">
        I Deliver&nbsp;
      </span>
      <span className="text-[#C99D55] font-semibold tracking-tight">
        {currentText}
      </span>
      <span
        className="inline-block w-[2.5px] h-[1.2em] bg-[#C99D55] ml-1.5 animate-pulse"
        aria-hidden="true"
      />
    </div>
  );
}
