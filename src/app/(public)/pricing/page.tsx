"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Plan {
  name: string;
  priceMonthly: number;
  priceAnnually: number;
  description: string;
  features: string[];
  ctaText: string;
  popular: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter Pack",
    priceMonthly: 15000,
    priceAnnually: 12000,
    description: "Perfect for small businesses starting their digital reach.",
    features: [
      "Up to 5,000 verified task completions",
      "Standard demographic targeting",
      "Automatic proof verification",
      "Standard email support",
      "72-hour campaign setup time",
    ],
    ctaText: "Launch Starter Campaign",
    popular: false,
  },
  {
    name: "Growth Plan",
    priceMonthly: 45000,
    priceAnnually: 36000,
    description: "Designed for scaling brands requiring faster verified results.",
    features: [
      "Up to 20,000 verified task completions",
      "Advanced geo-state targeting",
      "Fraud detection protocols active",
      "Priority verification (under 2 hours)",
      "24/7 Priority support channel",
      "Custom task design support",
    ],
    ctaText: "Launch Growth Campaign",
    popular: true,
  },
  {
    name: "Enterprise Pro",
    priceMonthly: 120000,
    priceAnnually: 96000,
    description: "For agencies and large corporations needing massive reach.",
    features: [
      "Unlimited task completions",
      "Granular state and age-based targeting",
      "Dedicated account manager",
      "Instant AI-driven proof validation",
      "API access for campaign automation",
      "Custom branding options",
      "Direct account manager line",
    ],
    ctaText: "Contact Enterprise Sales",
    popular: false,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#fafcfa] py-16 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#e6f7e6] text-[#2faf2f] text-xs font-bold uppercase tracking-wider mb-4">
            Advertising Plans
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4 tracking-tight">
            Transparent Pricing for Growing Brands
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Choose the advertising package that matches your campaign goals. Fund your wallet in Naira (₦) and pay only for verified human engagements.
          </p>
        </div>

        {/* Toggle Billing */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-semibold ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-400"}`}>
            Bill Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")}
            className="w-14 h-8 bg-[#e6f7e6] rounded-full p-1 relative flex items-center transition-colors"
          >
            <motion.div
              layout
              className="w-6 h-6 bg-[#2faf2f] rounded-full shadow-sm"
              animate={{ x: billingCycle === "monthly" ? 0 : 24 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-semibold ${billingCycle === "annually" ? "text-gray-900" : "text-gray-400"}`}>
            Bill Annually
            <span className="ml-2 py-0.5 px-2 bg-[#2faf2f] text-white text-[10px] rounded-full font-bold uppercase">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-24">
          {plans.map((plan, idx) => {
            const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnually;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-white rounded-3xl p-8 border transition-all ${
                  plan.popular
                    ? "border-[#2faf2f] ring-2 ring-[#2faf2f]/10 shadow-lg relative"
                    : "border-gray-100 shadow-sm hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 bg-[#2faf2f] text-white text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">{plan.name}</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed h-12">{plan.description}</p>
                
                <div className="flex items-baseline gap-1.5 mb-8">
                  <span className="text-4xl font-extrabold text-gray-900 font-heading">
                    {formatPrice(price)}
                  </span>
                  <span className="text-sm font-semibold text-gray-400">/ month</span>
                </div>

                <Link
                  href="/register?type=advertiser"
                  className={`w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2 mb-8 transition-all ${
                    plan.popular
                      ? "bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white shadow-md shadow-green-900/10"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {plan.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="space-y-4">
                  <div className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">What's included:</div>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#e6f7e6] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="text-[#2faf2f] w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-gray-600 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing Notice */}
        <div className="bg-[#e6f7e6]/30 rounded-3xl p-6 border border-[#e6f7e6]/50 flex items-start gap-4 max-w-3xl mx-auto">
          <HelpCircle className="text-[#2faf2f] w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Pay-Per-Engagement Model</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              All plans leverage our locked Naira (₦) wallet infrastructure. If a task does not meet your specific submission guidelines or fails validation, your wallet balance is immediately refunded.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
