"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Globe, Link as LinkIcon, Send } from "lucide-react";
import type { SiteSettings } from "@/utils/settings";

export function Footer({ settings }: { settings?: SiteSettings }) {
  const currentYear = new Date().getFullYear();
  const siteTitle = settings?.site_title || "Avexux";
  const copyrightText = settings?.copyright_text || `© ${currentYear} ${siteTitle} Inc. All rights reserved.`;

  return (
    <footer className="bg-foreground text-background pt-12 pb-8 border-t border-border/10 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Grid: 2 columns on mobile (side-by-side), 4 columns on desktop (lg) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 lg:gap-12">
          
          {/* Brand & Mission (Full 2-column width on mobile, 1 col on lg) */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt={siteTitle} className="h-8 w-auto object-contain" />
              ) : (
                <>
                  <div className="w-8 h-8 rounded-lg bg-[#2faf2f] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                    {siteTitle.charAt(0)}
                  </div>
                  <span className="font-heading font-bold text-2xl tracking-tight text-white">
                    {siteTitle}<span className="text-[#2faf2f]">.</span>
                  </span>
                </>
              )}
            </Link>
            <p className="text-muted/80 text-sm leading-relaxed max-w-sm">
              The modern digital opportunities platform. Complete tasks, earn verified rewards, and grow your brand with us.
            </p>
            {/* Touch-Friendly Social Links */}
            <div className="flex items-center gap-2 pt-1">
              <Link
                href="#"
                aria-label="Community"
                className="w-9 h-9 rounded-xl bg-card/10 hover:bg-[#2faf2f]/20 text-muted hover:text-[#2faf2f] flex items-center justify-center transition-all"
              >
                <MessageCircle size={18} />
              </Link>
              <Link
                href="#"
                aria-label="Website"
                className="w-9 h-9 rounded-xl bg-card/10 hover:bg-[#2faf2f]/20 text-muted hover:text-[#2faf2f] flex items-center justify-center transition-all"
              >
                <Globe size={18} />
              </Link>
              <Link
                href="#"
                aria-label="Connect"
                className="w-9 h-9 rounded-xl bg-card/10 hover:bg-[#2faf2f]/20 text-muted hover:text-[#2faf2f] flex items-center justify-center transition-all"
              >
                <LinkIcon size={18} />
              </Link>
            </div>
          </div>

          {/* Platform Navigation (Col 1 on mobile) */}
          <div className="col-span-1">
            <h4 className="font-heading font-bold text-white text-base mb-3 tracking-wide">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-muted/80 hover:text-[#2faf2f] transition-colors text-sm font-medium">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="text-muted/80 hover:text-[#2faf2f] transition-colors text-sm font-medium">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted/80 hover:text-[#2faf2f] transition-colors text-sm font-medium">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted/80 hover:text-[#2faf2f] transition-colors text-sm font-medium">
                  FAQ & Help
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted/80 hover:text-[#2faf2f] transition-colors text-sm font-medium">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Navigation (Col 2 on mobile - SIDE BY SIDE WITH PLATFORM) */}
          <div className="col-span-1">
            <h4 className="font-heading font-bold text-white text-base mb-3 tracking-wide">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted/80 hover:text-[#2faf2f] transition-colors text-sm font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted/80 hover:text-[#2faf2f] transition-colors text-sm font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted/80 hover:text-[#2faf2f] transition-colors text-sm font-medium">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-muted/80 hover:text-[#2faf2f] transition-colors text-sm font-medium">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter (Full 2-column width on mobile, 1 col on lg) */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <h4 className="font-heading font-bold text-white text-base mb-1 tracking-wide">
              Stay Updated
            </h4>
            <p className="text-muted/80 text-sm leading-relaxed">
              Subscribe to get instant alerts on new reward tasks and feature updates.
            </p>
            <form className="flex flex-col sm:flex-row lg:flex-col gap-2.5 pt-1" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-card/10 border-border/20 text-white placeholder:text-muted/50 focus-visible:ring-[#2faf2f] rounded-xl h-11 text-sm"
              />
              <Button className="w-full sm:w-auto lg:w-full h-11 bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/15 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted/60 text-center sm:text-left">
          <p>{copyrightText}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#2faf2f] transition-colors">
              Privacy
            </Link>
            <span className="text-border/40">•</span>
            <Link href="/terms" className="hover:text-[#2faf2f] transition-colors">
              Terms
            </Link>
            <span className="text-border/40">•</span>
            <Link href="/contact" className="hover:text-[#2faf2f] transition-colors">
              Support
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
