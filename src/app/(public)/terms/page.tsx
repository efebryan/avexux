"use client";

import { ShieldCheck, FileText, CheckCircle2, Lock, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "August 4, 2026";

  const keyPoints = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-[#2faf2f]" />,
      title: "Real & Verified Activity",
      desc: "All tasks must be performed by authentic human users. Manipulation or bot usage results in immediate ban.",
    },
    {
      icon: <Lock className="w-5 h-5 text-[#2faf2f]" />,
      title: "Secure Wallet & Payouts",
      desc: "Earnings in Naira (₦) are safely processed. Refunds apply if campaign tasks fail verification criteria.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#2faf2f]" />,
      title: "Fair Platform Policy",
      desc: "Advertisers get guaranteed engagement; earners receive prompt payment for verified proof.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafcfa] py-16 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-[#e6f7e6] text-[#2faf2f] text-xs font-bold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" /> Legal Agreement
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Please read these terms carefully before using the Avexux platform. By creating an account or using our services, you agree to be bound by this agreement.
          </p>
          <div className="mt-4 text-xs font-semibold text-gray-400">
            Last Updated: <span className="text-gray-700">{lastUpdated}</span>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {keyPoints.map((item, index) => (
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
              Acceptance of Terms
            </h2>
            <p>
              By accessing or using Avexux ("Platform", "we", "us", or "our"), you ("User", "Earner", "Advertiser") confirm that you are at least 18 years old and legally competent to enter into this legally binding contract. If you use the Platform on behalf of an entity, you warrant that you have authority to bind that entity.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 font-heading tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#2faf2f] text-white flex items-center justify-center text-xs font-mono">2</span>
              User Accounts & Eligibility
            </h2>
            <p>
              To access task completion or campaign management features, you must register an account with accurate details. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Each user is allowed only one personal account. Duplicate or secondary accounts will be terminated.</li>
              <li>Providing false identity information or impersonating others is strictly prohibited.</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 font-heading tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#2faf2f] text-white flex items-center justify-center text-xs font-mono">3</span>
              Earners & Task Execution Guidelines
            </h2>
            <p>
              Earners complete online tasks (such as social engagements, app testing, surveys, or content reviews) in exchange for financial rewards credited in Nigerian Naira (₦).
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Verified Proof Required:</strong> Earners must submit valid screenshots, links, or requested proof of completion.</li>
              <li><strong>Zero Bot Tolerance:</strong> Automated scripts, bots, emulators, or click farms are illegal on Avexux and will lead to permanent forfeiture of earnings and account deletion.</li>
              <li><strong>Rejection & Disputes:</strong> Submissions that fail to meet advertiser requirements may be rejected by our automated or manual verification team.</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 font-heading tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#2faf2f] text-white flex items-center justify-center text-xs font-mono">4</span>
              Advertiser Campaigns & Wallet Funds
            </h2>
            <p>
              Advertisers create micro-tasks to promote their digital offerings. Advertisers pre-fund their Avexux wallet to initiate campaigns.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Campaign budgets are escrowed per completed task and paid only for valid submissions.</li>
              <li>Unused campaign balances remain in the advertiser’s wallet for future campaigns or withdrawal in accordance with our withdrawal policies.</li>
              <li>Prohibited campaigns include illegal products, scams, malware, deceptive links, or adult content.</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 font-heading tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#2faf2f] text-white flex items-center justify-center text-xs font-mono">5</span>
              Withdrawals & Payments
            </h2>
            <p>
              All financial transactions are conducted in Nigerian Naira (₦). Earners can request payouts to their verified bank accounts once the minimum threshold is met. Processing times typically range from instant transfers up to 24 business hours.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 font-heading tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#2faf2f] text-white flex items-center justify-center text-xs font-mono">6</span>
              Limitation of Liability & Modifications
            </h2>
            <p>
              Avexux provides the Platform "as is" without warranty of uninterrupted operation. We reserve the right to modify these terms at any time. Continued usage of Avexux after changes constitutes acceptance of the updated terms.
            </p>
          </section>

        </div>

        {/* Support Banner */}
        <div className="mt-12 text-center bg-[#e6f7e6]/50 p-6 rounded-2xl border border-[#2faf2f]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <HelpCircle className="w-6 h-6 text-[#2faf2f] shrink-0" />
            <div>
              <div className="font-bold text-gray-900 text-sm">Have questions about our Terms?</div>
              <div className="text-xs text-gray-500">Contact our legal and compliance support team anytime.</div>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
          >
            Contact Legal Team
          </Link>
        </div>

      </div>
    </div>
  );
}
