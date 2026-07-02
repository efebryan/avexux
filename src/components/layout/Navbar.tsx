"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Tasks", href: "/tasks" },
    { name: "Advertise", href: "/advertise" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-4"
          : "bg-white py-4 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading font-bold text-2xl tracking-tight text-gray-900">
            Arvexus
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-primary font-semibold border-b-2 border-primary pb-1"
                  : "text-gray-500 font-medium pb-1"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Login
          </Link>
          <Link href="/register" className={cn(buttonVariants({ size: "sm" }), "bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white rounded-full px-6")}>
            Create Account
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base font-medium ${
                pathname === link.href ? "text-primary" : "text-gray-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-center font-medium text-gray-600 py-2">
                Login
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)} className={cn(buttonVariants(), "w-full bg-[#2faf2f] text-white rounded-full")}>
                Create Account
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
