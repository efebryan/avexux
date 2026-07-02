"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Search, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "General",
    question: "What is Arvexus?",
    answer: "Arvexus is an institutional-grade digital rewards and advertising platform based in Nigeria. We bridge the gap between businesses wanting to reach real customers and users seeking verified digital earning opportunities.",
  },
  {
    category: "General",
    question: "How do I get started?",
    answer: "Getting started is simple. Create a free account on our platform, complete your profile verification, and you can immediately begin browsing active tasks to earn rewards or set up your business advertising campaign.",
  },
  {
    category: "Earning",
    question: "How do I earn rewards?",
    answer: "You earn rewards by performing simple verified tasks such as reviewing products, joining community channels, participating in surveys, or testing apps. Each task pays out a specified Naira (₦) reward upon successful verification.",
  },
  {
    category: "Earning",
    question: "What is the minimum withdrawal amount?",
    answer: "The minimum withdrawal limit is ₦2,000. You can request a payout directly to any verified Nigerian commercial bank account, which is processed securely and swiftly.",
  },
  {
    category: "Campaigns",
    question: "How do I promote my business on Arvexus?",
    answer: "You can launch an advertising campaign from your dashboard. Define your target audience, set your budget in Naira (₦), outline the task you want users to complete (e.g., app install, social media engagement), and watch your business grow with verified results.",
  },
  {
    category: "Campaigns",
    question: "Are the users on Arvexus real?",
    answer: "Yes, 100%. We employ institutional-grade verification checks, device finger-printing, and automatic auditing logs to ensure that only real, unique humans complete your campaigns. Bot activity is strictly blocked.",
  },
  {
    category: "Security & Trust",
    question: "Is my personal data secure?",
    answer: "Absolutely. Arvexus infrastructure is designed with security-first principles and verified with SOC2 compliance. We use AES-256 bit encryption to secure your payment information and personal data.",
  },
  {
    category: "Security & Trust",
    question: "What happens if a user submits false proof?",
    answer: "Our automated auditing system flags suspicious proof submissions. Continued attempts to submit false verification details will result in automatic account locking and forfeiture of earned rewards.",
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const categories = ["All", "General", "Earning", "Campaigns", "Security & Trust"];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fafcfa] py-16 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#e6f7e6] text-[#2faf2f] text-xs font-bold uppercase tracking-wider mb-4">
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-500">
            Have questions about Arvexus? Find answers to commonly asked questions about earning, campaigns, and security.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-150 bg-white text-base shadow-sm placeholder:text-gray-300 focus:outline-none focus:border-[#2faf2f] focus:ring-1 focus:ring-[#2faf2f] transition-all"
          />
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setExpandedIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category
                  ? "bg-[#2faf2f] text-white shadow-md shadow-green-900/10"
                  : "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-4 mb-16">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleExpand(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-gray-900 hover:text-[#2faf2f] transition-colors focus:outline-none"
                  >
                    <span className="text-base md:text-lg">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 shrink-0"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 text-sm md:text-base text-gray-500 leading-relaxed border-t border-gray-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <HelpCircle className="mx-auto w-12 h-12 text-gray-300 mb-3" />
              <p className="text-base font-semibold">No questions found matching your search.</p>
            </div>
          )}
        </div>

        {/* CTA Card */}
        <div className="bg-[#e6f7e6]/50 rounded-3xl p-8 border border-[#e6f7e6] text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#2faf2f] flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-green-900/20">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Still have questions?</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            If you couldn't find the answer you were looking for, feel free to contact our dedicated local support team.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 h-12 bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white font-bold rounded-xl shadow-md transition-all"
          >
            Contact Support <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
