'use client';

import React, { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import BrandLogo from './BrandLogo';
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  Facebook,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ContactSectionProps {
  onOpenQuote?: () => void;
}

export default function ContactSection({ onOpenQuote }: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="contact" data-scroll-reveal className="bg-[#221710] py-24 lg:py-28 border-t border-[#C99D55]/15 text-[#B8AFA6] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* =========================================================================
            TWO-COLUMN CONTACT SECTION (DARK WARM ESPRESSO #221710)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (lg:col-span-6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B89B72] block mb-3">
              — START A PROJECT
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] text-[#F6F2EA] mb-6">
              Ready to Grow Your Business Through{' '}
              <em className="font-serif italic font-normal text-[#C99D55]">
                Search Visibility &amp; Web Design?
              </em>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#B8AFA6] mb-8 max-w-xl">
              Serving ambitious business owners and enterprise leaders across all industries and countries worldwide. Connect directly with Joy Mondal to review your requirements, explore immediate opportunities, or request a custom proposal.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="https://wa.me/917980941101?text=Hi%20Joy%2C%20I%27d%20like%20to%20discuss%20growth%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#B88A44] hover:bg-[#C99D55] text-[#221710] font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-all shadow-lg hover:shadow-xl cursor-pointer text-sm"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Message on WhatsApp</span>
              </a>

              {onOpenQuote && (
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="bg-[#2B1E15] hover:bg-[#35251A] border border-[#C99D55]/30 hover:border-[#C99D55]/60 text-[#F6F2EA] font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2 transition-all cursor-pointer text-sm"
                >
                  <span>Get Custom Quote</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C99D55]" />
                </button>
              )}
            </div>

            {/* Editorial Reassurance Badge */}
            <div className="p-4 rounded-xl bg-[#2B1E15] border border-[#C99D55]/18 flex items-start gap-3 text-xs text-[#B8AFA6]">
              <ShieldCheck className="w-4 h-4 text-[#C99D55] shrink-0 mt-0.5" />
              <span>
                Transparent pricing, direct collaboration, and no generic retainer traps. You work directly with Joy Mondal.
              </span>
            </div>
          </motion.div>

          {/* Right Column (lg:col-span-6): Stacked #2B1E15 Contact Cards with Copy Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-4"
          >
            
            {/* Card 1: Direct WhatsApp Desk */}
            <div className="bg-[#2B1E15] border border-[#C99D55]/20 rounded-xl p-6 flex items-center justify-between gap-4 shadow-sm hover:border-[#C99D55]/45 transition-all">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-6 h-6 fill-current" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C99D55]">
                    DIRECT WHATSAPP DESK
                  </div>
                  <div className="text-base font-bold text-[#F6F2EA] truncate">
                    +91 79809 41101
                  </div>
                  <p className="text-xs text-[#B8AFA6] truncate">
                    Fastest response for briefs &amp; audit inquiries
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => copyToClipboard('+917980941101', 'phone')}
                  className="p-2.5 rounded-lg border border-[#C99D55]/20 hover:border-[#C99D55]/60 text-[#B8AFA6] hover:text-[#FAF6F0] bg-[#1C130D] transition-colors cursor-pointer"
                  title="Copy Phone Number"
                  aria-label="Copy Phone Number"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href="https://wa.me/917980941101?text=Hi%20Joy%2C%20I%27d%20like%20to%20discuss%20growth%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[#C99D55]/20 hover:border-[#C99D55]/60 text-[#C99D55] hover:text-[#FAF6F0] bg-[#1C130D] transition-colors"
                  title="Open in WhatsApp"
                  aria-label="Open in WhatsApp"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Card 2: Executive Email Desk */}
            <div className="bg-[#2B1E15] border border-[#C99D55]/20 rounded-xl p-6 flex items-center justify-between gap-4 shadow-sm hover:border-[#C99D55]/45 transition-all">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#36261B] text-[#C99D55] flex items-center justify-center shrink-0 border border-[#C99D55]/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C99D55]">
                    EXECUTIVE EMAIL DESK
                  </div>
                  <div className="text-base font-bold text-[#F6F2EA] truncate">
                    joymondal1306@gmail.com
                  </div>
                  <p className="text-xs text-[#B8AFA6] truncate">
                    RFPs, documentation &amp; detailed briefs
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => copyToClipboard('joymondal1306@gmail.com', 'email')}
                  className="p-2.5 rounded-lg border border-[#C99D55]/20 hover:border-[#C99D55]/60 text-[#B8AFA6] hover:text-[#FAF6F0] bg-[#1C130D] transition-colors cursor-pointer"
                  title="Copy Email Address"
                  aria-label="Copy Email Address"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href="mailto:joymondal1306@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Joy%20Mondal"
                  className="p-2.5 rounded-lg border border-[#C99D55]/20 hover:border-[#C99D55]/60 text-[#C99D55] hover:text-[#FAF6F0] bg-[#1C130D] transition-colors"
                  title="Send Email"
                  aria-label="Send Email"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Card 3: Direct Facebook / Meta Desk */}
            <div className="bg-[#2B1E15] border border-[#C99D55]/20 rounded-xl p-6 flex items-center justify-between gap-4 shadow-sm hover:border-[#C99D55]/45 transition-all">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#1877F2]/15 text-[#1877F2] flex items-center justify-center shrink-0 border border-[#1877F2]/25">
                  <Facebook className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C99D55]">
                    DIRECT FACEBOOK / META DESK
                  </div>
                  <div className="text-base font-bold text-[#F6F2EA] truncate">
                    facebook.com/joymondal
                  </div>
                  <p className="text-xs text-[#B8AFA6] truncate">
                    Messenger chats &amp; social project inquiries
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://facebook.com/joymondal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[#C99D55]/20 hover:border-[#C99D55]/60 text-[#C99D55] hover:text-[#FAF6F0] bg-[#1C130D] transition-colors"
                  title="Connect on Facebook"
                  aria-label="Connect on Facebook"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Card 3: Global Operating Hours & SLA */}
            <div className="bg-[#2B1E15] border border-[#C99D55]/20 rounded-xl p-6 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#36261B] text-[#C99D55] flex items-center justify-center shrink-0 border border-[#C99D55]/20">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6F2EA]">
                    GLOBAL OPERATING HOURS &amp; SLA
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#FAF6F0] mt-0.5">
                  Serving Clients Worldwide
                </div>
                <p className="text-xs text-[#B8AFA6] mt-0.5">
                  All inquiries reviewed within 12–24 business hours.
                </p>
              </div>
            </div>

          </motion.div>

        </div>

        {/* =========================================================================
            REFINED EXECUTIVE FOOTER
            ========================================================================= */}
        <footer className="border-t border-[#C99D55]/15 mt-20 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left: Brand Logo */}
            <BrandLogo />

            {/* Center: Quick Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#B8AFA6]" aria-label="Footer Navigation">
              <a href="#about-me" className="hover:text-[#E5C585] transition-colors">About</a>
              <a href="#capabilities" className="hover:text-[#E5C585] transition-colors">Expertise</a>
              <a href="#services" className="hover:text-[#E5C585] transition-colors">Services</a>
              <a href="#work" className="hover:text-[#E5C585] transition-colors">Work</a>
              <a href="#ai-audit" className="hover:text-[#E5C585] transition-colors">AI Audit</a>
              <a href="#process" className="hover:text-[#E5C585] transition-colors">Process</a>
              <a href="#faq" className="hover:text-[#E5C585] transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-[#E5C585] transition-colors">Contact</a>
            </nav>

            {/* Right: Copyright */}
            <div className="text-xs text-[#8C7E72] text-center md:text-right">
              &copy; 2026 Joy Mondal. All rights reserved.
            </div>

          </div>
        </footer>

      </div>
    </section>
  );
}
