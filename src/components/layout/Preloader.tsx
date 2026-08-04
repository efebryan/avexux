"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Force scroll to top on page reload & disable automatic browser scroll restoration
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  // Force scroll to top whenever pathname changes (when page links are clicked)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  useEffect(() => {
    // Lock scrolling while loading & keep position at top
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment for organic feel
        const diff = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + diff, 100);
      });
    }, 90);

    // Timeout fallback to ensure loading completes smoothly
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "unset";
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 400);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.03,
            filter: "blur(8px)",
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fafcfa] overflow-hidden select-none"
        >
          {/* Ambient Glowing Background Orbs */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-[#2faf2f]/15 via-[#e6f7e6]/50 to-transparent rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-[#2faf2f]/10 via-[#e6f7e6]/40 to-transparent rounded-full blur-3xl animate-pulse pointer-events-none" />

          {/* Central Logo & Rings */}
          <div className="relative flex flex-col items-center z-10">
            {/* Animated Ring Container */}
            <div className="relative w-28 h-28 flex items-center justify-center mb-8">
              {/* Outer Rotating Dotted/Glow Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#2faf2f]/30"
              />

              {/* Counter-rotating Gradient Accent Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-1 rounded-full border-2 border-t-[#2faf2f] border-r-transparent border-b-[#4ade80] border-l-transparent"
              />

              {/* Pulsing Glow Halo */}
              <motion.div
                animate={{ scale: [0.95, 1.1, 0.95], opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-2 bg-[#2faf2f]/15 rounded-full blur-md"
              />

              {/* Center Brand Icon Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-16 h-16 bg-gradient-to-br from-[#2faf2f] to-[#238c23] rounded-2xl shadow-[0_10px_25px_rgba(47,175,47,0.35)] flex items-center justify-center text-white font-extrabold text-2xl tracking-tighter border border-white/20"
              >
                {/* Custom Avexux 'A' Emblem */}
                <svg
                  className="w-9 h-9 text-[#fafcfa] drop-shadow-md"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L3 21h4.5l2.25-5h8.5l2.25 5H21L12 2z" />
                  <path d="M11 12h4" />
                </svg>
              </motion.div>
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-center mb-6"
            >
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 font-heading">
                Avexux<span className="text-[#2faf2f]">.</span>
              </h1>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-medium mt-1">
                Digital Rewards & Growth
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-56 flex flex-col items-center gap-2">
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200/60 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2faf2f] via-[#4ade80] to-[#2faf2f] rounded-full shadow-[0_0_10px_rgba(47,175,47,0.5)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>

              {/* Percentage Indicator */}
              <div className="w-full flex items-center justify-between text-xs font-semibold text-gray-400 font-mono px-1">
                <span>Loading</span>
                <span className="text-[#2faf2f] font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
