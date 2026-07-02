"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, TrendingUp, Users, CheckCircle, Zap, Award, Coins } from "lucide-react";
import Link from "next/link";

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const earnerFeatures: Feature[] = [
  {
    icon: <Coins className="text-[#2faf2f] w-6 h-6" />,
    title: "Instant Bank Payouts",
    desc: "Earn Naira (₦) directly into your local Nigerian bank account. Withdraw anytime once you hit the ₦2,000 threshold.",
  },
  {
    icon: <Zap className="text-[#2faf2f] w-6 h-6" />,
    title: "Diverse Daily Tasks",
    desc: "Complete fresh campaigns daily. Payouts range from social media follows to beta-testing mobile apps.",
  },
  {
    icon: <Award className="text-[#2faf2f] w-6 h-6" />,
    title: "Tiers & Bonuses",
    desc: "Level up your account to unlock higher-paying tasks, special bonuses, and direct customer support.",
  },
];

const advertiserFeatures: Feature[] = [
  {
    icon: <Shield className="text-[#2faf2f] w-6 h-6" />,
    title: "Escrow Protection",
    desc: "Your campaign budget is securely held in escrow and only released once user proof matches your criteria.",
  },
  {
    icon: <Users className="text-[#2faf2f] w-6 h-6" />,
    title: "Demographic Targeting",
    desc: "Filter your audience by state location within Nigeria, age, gender, and digital interests for optimal conversions.",
  },
  {
    icon: <TrendingUp className="text-[#2faf2f] w-6 h-6" />,
    title: "Auditing Dashboard",
    desc: "View proof files, check analytics, detect anomalies, and track ROI instantly from our centralized hub.",
  },
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<"earners" | "advertisers">("earners");

  const currentFeatures = activeTab === "earners" ? earnerFeatures : advertiserFeatures;

  return (
    <div className="min-h-screen bg-[#fafcfa] py-16 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#e6f7e6] text-[#2faf2f] text-xs font-bold uppercase tracking-wider mb-4">
            Platform Features
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4 tracking-tight">
            Designed for Earners & Advertisers
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Arvexus uses state-of-the-art security, algorithmic verification, and Naira (₦) escrow systems to create a mutually beneficial digital network.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-center mb-16">
          <div className="bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm flex gap-2">
            <button
              onClick={() => setActiveTab("earners")}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "earners"
                  ? "bg-[#2faf2f] text-white shadow-md shadow-green-900/10"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              For Earners
            </button>
            <button
              onClick={() => setActiveTab("advertisers")}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "advertisers"
                  ? "bg-[#2faf2f] text-white shadow-md shadow-green-900/10"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              For Advertisers
            </button>
          </div>
        </div>

        {/* Features Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <AnimatePresence mode="wait">
            {currentFeatures.map((feat, idx) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#e6f7e6] flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-heading">{feat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Core Tech Stack Panel */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-green-50 text-[#2faf2f] text-[10px] font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Security & Auditing
            </span>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 leading-tight">
              Algorithmic Integrity You Can Trust
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-[#2faf2f] w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Sybil Prevention:</strong> Strict device signature checks block multiple accounts and bots from claiming campaign rewards.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-[#2faf2f] w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Verification Logs:</strong> Immutable session hashes ensure every verified action matches a unique local address.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-[#2faf2f] w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Auto-Refund Escrow:</strong> If proof details fail target conditions, your budget immediately reverts back to your Naira balance.
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
            <span className="text-gray-400 font-medium">Dashboard Analytics Preview</span>
          </div>
        </div>

      </div>
    </div>
  );
}
