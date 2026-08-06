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
    name: "Lite Plan",
    priceMonthly: 18000,
    priceAnnually: 14400,
    description: "Ideal for individuals or micro-businesses testing task campaigns.",
    features: [
      "Up to 1,500 verified completions",
      "Basic demographic targeting",
      "Automatic proof verification",
      "Standard setup within 72 hrs",
    ],
    ctaText: "Get Started",
    popular: false,
  },
  {
    name: "Growth Plan",
    priceMonthly: 42000,
    priceAnnually: 33600,
    description: "Perfect for growing brands needing consistent, verified reach.",
    features: [
      "Up to 8,000 verified completions",
      "State & location targeting",
      "Fraud detection protocols active",
      "Priority review (under 12 hrs)",
      "Standard email support",
    ],
    ctaText: "Launch Growth",
    popular: false,
  },
  {
    name: "Pro Business",
    priceMonthly: 88000,
    priceAnnually: 70400,
    description: "Designed for scaling businesses requiring rapid verified execution.",
    features: [
      "Up to 25,000 verified completions",
      "Advanced geo & demographic targeting",
      "AI-driven instant proof validation",
      "Priority 2-hr campaign approval",
      "24/7 Priority support channel",
      "Custom task workflow design",
    ],
    ctaText: "Launch Pro Campaign",
    popular: true,
  },
  {
    name: "Enterprise Pro",
    priceMonthly: 124000,
    priceAnnually: 99200,
    description: "For large corporations and agencies requiring massive scale.",
    features: [
      "Unlimited verified completions",
      "Granular state & age targeting",
      "Dedicated account manager",
      "API access & campaign automation",
      "Custom branding & SLA options",
      "Direct account manager line",
    ],
    ctaText: "Contact Sales",
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

        {/* Pricing Grid (4 Plans) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start mb-24">
          {plans.map((plan, idx) => {
            const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnually;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-white rounded-3xl p-6 border transition-all ${
                  plan.popular
                    ? "border-[#2faf2f] ring-2 ring-[#2faf2f]/10 shadow-lg relative"
                    : "border-gray-100 shadow-sm hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-6 -translate-y-1/2 bg-[#2faf2f] text-white text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">{plan.name}</h3>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed h-12">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl lg:text-3xl font-extrabold text-gray-900 font-heading">
                    {formatPrice(price)}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">/ mo</span>
                </div>

                <Link
                  href="/register?type=advertiser"
                  className={`w-full h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 mb-6 transition-all ${
                    plan.popular
                      ? "bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white shadow-md shadow-green-900/10"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {plan.ctaText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2">What's included:</div>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#e6f7e6] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="text-[#2faf2f] w-2.5 h-2.5" strokeWidth={3} />
                      </div>
                      <span className="text-xs text-gray-600 leading-relaxed">{feature}</span>
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
