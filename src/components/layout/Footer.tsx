"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Globe, Link as LinkIcon } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                A
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-background">
                Arvexus
              </span>
            </Link>
            <p className="text-muted/80 text-sm mb-6 leading-relaxed">
              The modern digital opportunities platform. Complete tasks, earn
              rewards, and grow with us.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted hover:text-primary transition-colors">
                <MessageCircle size={20} />
              </Link>
              <Link href="#" className="text-muted hover:text-primary transition-colors">
                <Globe size={20} />
              </Link>
              <Link href="#" className="text-muted hover:text-primary transition-colors">
                <LinkIcon size={20} />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold mb-6">Platform</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/features" className="text-muted/80 hover:text-primary transition-colors text-sm">Features</Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted/80 hover:text-primary transition-colors text-sm">Pricing</Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted/80 hover:text-primary transition-colors text-sm">FAQ</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted/80 hover:text-primary transition-colors text-sm">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="text-muted/80 hover:text-primary transition-colors text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted/80 hover:text-primary transition-colors text-sm">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted/80 hover:text-primary transition-colors text-sm">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold mb-6">Stay Updated</h4>
            <p className="text-muted/80 text-sm mb-4">
              Subscribe to our newsletter for the latest opportunities.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-card/10 border-border/20 text-background placeholder:text-muted/50 focus-visible:ring-primary"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border/20 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted/60">
          <p>&copy; {currentYear} Arvexus. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
