"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Globe,
  Search,
  Megaphone,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  MapPin,
  Languages,
} from "lucide-react";

const discoveryChannels = [
  "Google Search",
  "Google Maps",
  "Google AI Overviews",
  "ChatGPT",
  "Gemini",
  "Perplexity",
  "Google Ads",
  "Facebook & Instagram Ads",
  "Trustpilot & Google Reviews",
];

const coreServices = [
  {
    icon: Globe,
    title: "Website Design & Development",
    desc: "Fast-loading, mobile-first, conversion-engineered websites built for global businesses across every industry.",
  },
  {
    icon: Search,
    title: "SEO, AEO & GEO",
    desc: "Search engine optimization, answer engine optimization, and generative engine optimization so buyers find you on search and AI.",
  },
  {
    icon: Megaphone,
    title: "Google Ads & Facebook Ads",
    desc: "Data-driven paid acquisition campaigns focused on qualified leads, calls, and measurable return on ad spend.",
  },
  {
    icon: ShieldCheck,
    title: "Reputation & Review Management",
    desc: "Review growth and policy-compliant negative review removal across Google, Facebook, Trustpilot, Bark, Yell, Checkatrade, Yelp, and HomeAdvisor.",
  },
];

const workingPrinciples = [
  {
    number: "Principle 01",
    title: "Clear Strategy",
    description:
      "Understanding your market, customer intent, and exact growth bottlenecks across web, search, ads, and reputation before building or launching anything.",
  },
  {
    number: "Principle 02",
    title: "Full-Stack Execution",
    description:
      "Connecting high-speed websites, SEO/AEO/GEO visibility, paid ads, and review trust into one cohesive growth system without agency runaround.",
  },
  {
    number: "Principle 03",
    title: "Real Business Outcomes",
    description:
      "Prioritizing qualified inquiries, stronger brand authority, and sustainable revenue across countries and industries rather than empty vanity numbers.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about-me"
      data-scroll-reveal
      className="relative w-full bg-[#F7F3EB] text-[#1C1510] py-20 md:py-28 px-4 sm:px-6 lg:px-10 border-t border-[#E3DCD0] overflow-hidden scroll-mt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[540px] h-[240px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0.03) 50%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 lg:sticky lg:top-24"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#E3DCD0] hover:border-[#D4AF37]/60 bg-[#FFFFFF] shadow-md transition-all">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFEAE0]">
                <Image
                  src="/joy-mondal.webp"
                  alt="Joy Mondal - Web Design, SEO, AEO, GEO, Ads & Reputation Specialist"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>

              <div className="p-4 sm:p-5 bg-[#FFFFFF] border-t border-[#E3DCD0] flex items-center justify-between gap-3">
                <div>
                  <p className="text-base font-bold text-[#1C1510] tracking-wide">
                    Joy Mondal
                  </p>
                  <p className="text-xs sm:text-sm text-[#B88E28] font-medium flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Kolkata, India • Global Clients Worldwide</span>
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#EFEAE0] text-[#B88E28] border border-[#D4AF37]/30">
                  All Industries
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#B88E28]">
              <span className="w-8 h-[1.5px] bg-[#B88E28]" />
              <span>About Me &amp; What I Do</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[#1C1510]">
              Websites, Search &amp; Growth Systems for the{" "}
              <span className="italic font-serif text-[#B88E28]">
                modern business landscape.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#4A4036] leading-relaxed">
              Most businesses treat their website, search rankings, paid ads, and
              online reviews as separate disconnected pieces. I help businesses
              across all countries and industries turn them into one growth
              engine—bringing in the right buyers, earning trust fast, and
              converting attention into real revenue.
            </p>

            <div className="pt-3 border-t border-[#E3DCD0] space-y-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-[#B88E28] tracking-tight">
                Worldwide
              </div>
              <p className="text-sm sm:text-base text-[#4A4036] leading-relaxed">
                I work with businesses across every sector and country—not
                locked into one niche or region—building fast custom websites,
                ranking them across search and AI platforms, scaling paid ads,
                and protecting brand reputation.
              </p>
            </div>

            <div className="space-y-3.5">
              <p className="text-sm sm:text-base text-[#302720] font-medium leading-relaxed">
                Today, customers do not rely on a single search result or ad.
                Before they buy, they check and compare businesses across:
              </p>

              <div className="flex flex-wrap gap-2.5">
                {discoveryChannels.map((channel) => (
                  <span
                    key={channel}
                    className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[#FFFFFF] text-[#1C1510] border border-[#E3DCD0] shadow-xs hover:border-[#D4AF37] hover:shadow-sm transition-all"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#4A4036] leading-relaxed">
              That is why my work covers the full growth stack: custom website
              design and development, SEO, Answer Engine Optimization (AEO),
              Generative Engine Optimization (GEO), high-converting Google Ads
              and Facebook Ads, online review management, and negative review
              removal across Google, Facebook, Trustpilot, Bark, Yell,
              Checkatrade, Yelp, and HomeAdvisor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {coreServices.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-xl p-5 bg-[#FFFFFF] border border-[#E3DCD0] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#EFEAE0] border border-[#D4AF37]/30 flex items-center justify-center text-[#B88E28] mb-3.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-[#1C1510] mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#574E46] leading-relaxed">
                      {service.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="pt-5 border-t border-[#E3DCD0] space-y-2.5"
            >
              <p className="text-lg sm:text-xl italic font-serif text-[#1C1510] leading-relaxed">
                <span className="text-2xl sm:text-3xl font-serif text-[#B88E28] select-none mr-1 inline-block align-baseline font-normal">
                  &ldquo;
                </span>
                Traffic and rankings only matter when they build trust and bring
                paying customers. My job is to make your business look credible,
                get discovered everywhere buyers look, and convert consistently.
                <span className="text-2xl sm:text-3xl font-serif text-[#B88E28] select-none ml-1 inline-block align-baseline font-normal">
                  &rdquo;
                </span>
              </p>
              <footer className="text-xs font-bold uppercase tracking-[0.18em] text-[#B88E28]">
                Joy Mondal &bull; Working Philosophy
              </footer>
            </motion.blockquote>

            <div className="pt-3 border-t border-[#E3DCD0]/70 flex flex-wrap items-center justify-between gap-4 text-sm text-[#574E46]">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-[#B88E28]" />
                <span>
                  <strong className="text-[#1C1510] font-bold">
                    Languages:
                  </strong>{" "}
                  Bengali (Native), English (Fluent / Professional), Hindi
                  (Working)
                </span>
              </div>

              <a
                href="#work"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#B88E28] hover:text-[#9A741E] transition-colors"
              >
                <span>See Proof &amp; Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 pt-10 border-t border-[#E3DCD0] grid grid-cols-1 md:grid-cols-3 gap-6">
          {workingPrinciples.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl p-6 sm:p-7 bg-[#FFFFFF] border border-[#E3DCD0] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#B88E28]">
                  {principle.number}
                </span>
                <Sparkles className="w-4 h-4 text-[#B88E28]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1C1510] mb-2.5">
                {principle.title}
              </h3>
              <p className="text-sm text-[#574E46] leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
