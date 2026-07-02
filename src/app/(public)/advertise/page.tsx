"use client";

import { motion } from "framer-motion";
import { Megaphone, Users, ShieldCheck, BarChart3, ArrowRight, Share2, Eye, Award } from "lucide-react";
import Link from "next/link";

export default function AdvertisePage() {
  const steps = [
    {
      step: "01",
      title: "Create Account",
      desc: "Sign up as an advertiser and set up your business profile in under 2 minutes.",
    },
    {
      step: "02",
      title: "Fund Your Wallet",
      desc: "Fund your secure wallet using any Nigerian bank transfer or debit card in Naira (₦).",
    },
    {
      step: "03",
      title: "Launch Your Campaign",
      desc: "Specify your task criteria, demographic targets, and payout per successful task.",
    },
    {
      step: "04",
      title: "Review & Grow",
      desc: "Track real-time proof submissions on your auditing dashboard and pay only for verified actions.",
    },
  ];

  const campaignTypes = [
    {
      icon: <Share2 className="text-[#2faf2f] w-6 h-6" />,
      title: "Social Growth",
      desc: "Gain real followers, likes, comments, and shares across Twitter, TikTok, and Instagram.",
    },
    {
      icon: <Eye className="text-[#2faf2f] w-6 h-6" />,
      title: "E-commerce & App Testing",
      desc: "Get authentic reviews, store ratings, and feedback on your newly launched products and mobile apps.",
    },
    {
      icon: <Users className="text-[#2faf2f] w-6 h-6" />,
      title: "Community Expansion",
      desc: "Drive active members to your Telegram, Discord, or WhatsApp groups.",
    },
    {
      icon: <Award className="text-[#2faf2f] w-6 h-6" />,
      title: "Brand Awareness",
      desc: "Distribute your promotional videos, surveys, and content directly to verified target demographics.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafcfa] py-16 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-7 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#e6f7e6] text-[#2faf2f] text-xs font-bold uppercase tracking-wider mb-6">
              Advertise on Arvexus
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Reach Verified Customers in Nigeria.
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Arvexus helps your business grow by driving authentic user actions, social engagements, app downloads, and product testing from thousands of verified local users.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/register?type=advertiser" className="w-full sm:w-auto h-14 px-8 text-base bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white font-bold rounded-xl shadow-lg shadow-green-900/10 flex items-center justify-center gap-2">
                Launch a Campaign <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto h-14 px-8 text-base border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold rounded-xl flex items-center justify-center">
                View Pricing Plans
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e6f7e6] flex items-center justify-center">
                    <Megaphone className="text-[#2faf2f] w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 font-heading">Campaign Calculator</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Naira based estimations</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                  <span className="text-xs text-gray-500 font-bold">Estimated Cost</span>
                  <span className="text-xl font-black text-gray-950 font-heading">₦50,000</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                  <span className="text-xs text-gray-500 font-bold">Target Engagement</span>
                  <span className="text-xl font-black text-gray-950 font-heading">1,500 - 2,200 Actions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e6f7e6] flex items-center justify-center">
              <Users className="text-[#2faf2f] w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-heading">100% Real Audited Humans</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Every single user action is verified through strict identity auditing. We eliminate bots, spoofing, and duplicate accounts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e6f7e6] flex items-center justify-center">
              <ShieldCheck className="text-[#2faf2f] w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-heading">Secure Escrow Protection</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your advertising budget stays in escrow and is only released to the user once you approve their proof of completion.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e6f7e6] flex items-center justify-center">
              <BarChart3 className="text-[#2faf2f] w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-heading">Real-Time Analytics</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Track proof files, user submissions, conversion rates, and ROI metrics live from your business campaign dashboard.
            </p>
          </div>
        </div>

        {/* How it works steps */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">How to Launch a Campaign</h2>
            <p className="text-sm text-gray-500">Four simple steps to connect with real Nigerian users on Arvexus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.step} className="space-y-4 relative">
                <div className="text-4xl font-extrabold text-[#2faf2f]/20 font-heading">{step.step}</div>
                <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Types Section */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm mb-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Supported Campaigns</h2>
            <p className="text-sm text-gray-500">Pick the best campaign model that fits your digital growth objectives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campaignTypes.map((type, idx) => (
              <div key={idx} className="flex gap-4 items-start p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#e6f7e6] flex items-center justify-center shrink-0">
                  {type.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{type.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
