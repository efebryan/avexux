"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I withdraw my earnings?",
    answer: "You can withdraw your earnings once you hit the minimum payout threshold of ₦5,000. Go to the Wallet page, add your local bank account details, and click 'Withdraw'. Funds usually arrive within 24-48 hours."
  },
  {
    question: "Why was my task rejected?",
    answer: "Tasks are usually rejected if they don't meet the advertiser's specific guidelines. Always read the instructions carefully. If you believe it was an error, you can dispute the rejection from your Active Tasks page."
  },
  {
    question: "How does the referral program work?",
    answer: "When someone signs up using your unique affiliate link, they become your referral. You earn a 5% commission on all their approved tasks for life! There's no limit to how many people you can invite."
  },
  {
    question: "What is a Pro Membership?",
    answer: "Pro Membership gives you priority access to high-yield tasks, faster withdrawal processing, and a higher commission rate on referrals. You can upgrade from the Sidebar."
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className={`border rounded-2xl overflow-hidden transition-colors ${openIndex === i ? 'border-[#0f8538]/30 bg-[#f8fafc]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <span className={`font-bold text-[15px] pr-4 ${openIndex === i ? 'text-[#0f8538]' : 'text-gray-900'}`}>
                {faq.question}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${openIndex === i ? 'bg-[#ade5bb]/40 rotate-180' : 'bg-gray-100'}`}>
                <ChevronDown className={`w-4 h-4 ${openIndex === i ? 'text-[#0f8538]' : 'text-gray-500'}`} />
              </div>
            </button>
            <div 
              className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === i ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
