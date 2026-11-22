'use client';

import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';

const FAQ_ITEMS = [
  {
    question: 'Do you offer fixed packages or custom project quotes?',
    answer: 'Every engagement is scoped around your exact goals, current digital footprint, market competition, and target regions. Following an initial review, Joy Mondal outlines a transparent, customized scope and deliverables schedule tailored to your business—rather than forcing you into a generic package.',
  },
  {
    question: 'How long do custom website builds and SEO/AEO campaigns take?',
    answer: 'A high-converting, custom multi-page website typically launches within 3 to 6 weeks, including technical schema, mobile optimization, and conversion funnels. Organic search, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) are compounding systems where initial indexing and entity citations typically accelerate within 30 to 90 days.',
  },
  {
    question: 'Can I work with you internationally, and which currencies do you accept?',
    answer: 'Yes. Joy Mondal collaborates with clients worldwide across Ireland, the United Kingdom, the United States, Canada, Australia, and Europe. Proposals and invoicing can be handled in USD ($), GBP (£), USDT, or INR (₹) via secure international payment methods.',
  },
  {
    question: 'How do Answer Engine Optimization (AEO) and GEO help my business win AI search?',
    answer: 'AEO structures direct answers, FAQ matrices, and technical schema so modern AI search engines (like Google AI Overviews and Perplexity) can immediately understand and quote your content. GEO optimizes semantic brand entities, citations, and digital authority so conversational AI assistants like ChatGPT and Gemini cite your business when recommending top providers.',
  },
  {
    question: 'How does your policy-compliant Google Negative Review Removal work?',
    answer: 'We prepare evidence-backed, legal and policy-compliant dispute dossiers directly citing platform content violations (e.g., conflict of interest, defamatory content, fake accounts, harassment, or off-topic spam). We follow official Google, Trustpilot, and directory guidelines to safeguard your brand authority responsibly.',
  },
  {
    question: 'What is included in the full-stack growth system?',
    answer: 'The full-stack growth system integrates custom website design, technical and semantic SEO, AEO/GEO answer architecture, negative-keyword filtered Google & Meta ads, and multi-platform reputation governance into a cohesive, measurable lead generation engine.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" data-scroll-reveal className="bg-[#F8F5EE] py-24 lg:py-28 border-t border-[#E3DCD0] text-[#574E46] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6226] block mb-3">
            — FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold leading-[1.14] tracking-tight text-[#1C1510] mb-4">
            Clear answers for{' '}
            <em className="font-serif italic font-normal text-[#8C6226]">
              global business leaders.
            </em>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#574E46]">
            Everything you need to know about working with Joy Mondal, project scopes, international payments, AI visibility, and reputation governance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl divide-y divide-[#E0D7C8] border-y border-[#E0D7C8]"
        >
          {FAQ_ITEMS.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            return (
              <div key={question} className="transition-colors hover:bg-[#EFEAE0]/40">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 py-6 px-3 text-left text-base sm:text-lg font-bold text-[#1C1510] transition-colors hover:text-[#8C6226] cursor-pointer"
                  >
                    <span>{question}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#B68945]/40 text-[#8C6226] bg-[#EDE7DC]">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div id={answerId} className="px-3 pb-6 pt-1 max-w-3xl animate-in fade-in duration-200">
                    <p className="text-sm leading-relaxed text-[#574E46]">
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
