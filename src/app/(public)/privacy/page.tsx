"use client";

import { ShieldCheck, Lock, Eye, Database, CheckCircle2, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const lastUpdated = "August 4, 2026";

  const privacyGuarantees = [
    {
      icon: <Lock className="w-5 h-5 text-[#2faf2f]" />,
      title: "Data Encryption",
      desc: "All personal user records and payment data are encrypted in transit (TLS 1.3) and at rest.",
    },
    {
      icon: <Eye className="w-5 h-5 text-[#2faf2f]" />,
      title: "Zero Data Sales",
      desc: "We never sell, rent, or trade your personal information to third-party advertisers or brokers.",
    },
    {
      icon: <Database className="w-5 h-5 text-[#2faf2f]" />,
      title: "Transparent Usage",
      desc: "Data collected is strictly used for task verification, account security, and bank payouts.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafcfa] py-16 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-[#e6f7e6] text-[#2faf2f] text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> Privacy & Protection
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Your privacy is fundamental to our core values. Learn how Avexux collects, protects, and handles your personal information.
          </p>
          <div className="mt-4 text-xs font-semibold text-gray-400">
            Last Updated: <span className="text-gray-700">{lastUpdated}</span>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {privacyGuarantees.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e6f7e6] flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-base font-heading">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Document Body */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-10 text-gray-700 leading-relaxed text-sm">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 font-heading tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#2faf2f] text-white flex items-center justify-center text-xs font-mono">1</span>
              Information We Collect
            </h2>
            <p>
              To provide a secure and functional digital task marketplace, Avexux collects the following categories of information:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Account Details:</strong> Full name, email address, phone number, and account password hash.</li>
              <li><strong>Task Submission Proofs:</strong> Screenshots, links, and uploaded verification files submitted by Earners.</li>
              <li><strong>Financial Data:</strong> Bank account numbers and payment gateway transaction references necessary to process Naira (₦) withdrawals or wallet deposits.</li>
              <li><strong>Technical Data:</strong> IP addresses, device types, operating systems, and browser user-agents used for fraud prevention and security auditing.</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 font-heading tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#2faf2f] text-white flex items-center justify-center text-xs font-mono">2</span>
              How We Use Your Information
            </h2>
            <p>We use collected data solely for legitimate business operations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Authenticating user access and securing accounts against unauthorized logins.</li>
              <li>Validating task completions for Advertisers and disbursing earner rewards.</li>
              <li>Detecting and stopping automated bot networks, click farms, and fraudulent accounts.</li>
              <li>Sending transaction updates, payout notifications, and security alerts.</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 font-heading tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#2faf2f] text-white flex items-center justify-center text-xs font-mono">3</span>
              Information Sharing & Third Parties
            </h2>
            <p>
              We do not share your private data except in limited operational circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Payment Processors:</strong> Licensed payment gateways in Nigeria to execute instant bank payouts.</li>
              <li><strong>Advertiser Task Verification:</strong> Advertisers receive submitted task proofs (e.g., screenshots or task links) to verify campaign compliance. Personal contact details are never shared with advertisers.</li>
              <li><strong>Legal Compliance:</strong> When mandated by applicable law, regulation, or court order.</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 font-heading tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#2faf2f] text-white flex items-center justify-center text-xs font-mono">4</span>
              Data Security & Retention
            </h2>
            <p>
              We employ industry-standard administrative, technical, and physical safeguards to safeguard user records. Data is stored on secure cloud servers with strict access controls. We retain personal data for as long as your account remains active or as required by law.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 font-heading tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#2faf2f] text-white flex items-center justify-center text-xs font-mono">5</span>
              Your Privacy Rights & Data Erasure
            </h2>
            <p>
              You have the right to access, update, or request the deletion of your personal data at any time. You can manage your profile settings inside your account dashboard or request complete account erasure by contacting our Privacy Team.
            </p>
          </section>

        </div>

        {/* Privacy Support Banner */}
        <div className="mt-12 text-center bg-[#e6f7e6]/50 p-6 rounded-2xl border border-[#2faf2f]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <HelpCircle className="w-6 h-6 text-[#2faf2f] shrink-0" />
            <div>
              <div className="font-bold text-gray-900 text-sm">Questions about your data privacy?</div>
              <div className="text-xs text-gray-500">Contact our dedicated Data Protection Officer.</div>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
          >
            Contact Privacy Officer
          </Link>
        </div>

      </div>
    </div>
  );
}
