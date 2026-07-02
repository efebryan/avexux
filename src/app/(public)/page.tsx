"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Link as LinkIcon, Megaphone, DollarSign, Users, ShieldCheck, BarChart3, CheckCircle2, Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafcfa]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#e6f7e6] to-transparent rounded-full opacity-70 translate-x-1/3 -translate-y-1/4 pointer-events-none blur-3xl"></div>
        <div className="container relative mx-auto px-6 max-w-7xl z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#e6f7e6] text-[#2faf2f] text-sm font-semibold mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#2faf2f]"></span>
                  Now available for Businesses
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-[1.1] tracking-tight mb-6 text-gray-900">
                  Earn Rewards.<br />
                  Promote Your Business.<br />
                  Grow with Arvexus.
                </h1>
                <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  The bridge between real digital opportunities and impactful business growth. Complete tasks to earn or launch campaigns to reach thousands of verified users.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="/register" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto h-14 px-8 text-base bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white rounded-xl shadow-lg shadow-green-900/10")}>
                    Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto h-14 px-8 text-base border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl")}>
                    How it works
                  </Link>
                </div>
              </motion.div>
            </div>
            
             {/* Hero Visual Mockups */}
             <motion.div 
               className="flex-1 w-full max-w-lg mx-auto relative"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, delay: 0.2 }}
             >
               <div className="relative w-full flex flex-col gap-6">
                 
                 {/* Wallet Card */}
                 <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-4 sm:p-6 z-20 lg:translate-x-4">
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                         <Wallet className="text-[#2faf2f] w-5 h-5" />
                       </div>
                       <div>
                         <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Wallet Balance</div>
                         <div className="text-2xl font-bold text-gray-900">₦1,245.50</div>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="text-xs text-gray-400 font-medium">Today's Earnings</div>
                       <div className="text-sm font-bold text-[#2faf2f]">+₦42.50</div>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                     <div className="bg-gray-50 rounded-xl p-4">
                       <div className="text-xs text-gray-500 mb-1">Tasks Completed</div>
                       <div className="text-lg font-bold text-gray-900">124</div>
                     </div>
                     <div className="bg-gray-50 rounded-xl p-4">
                       <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                       <div className="text-lg font-bold text-gray-900">99.2%</div>
                     </div>
                   </div>
                 </div>
 
                 {/* Active Tasks Card */}
                 <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-4 sm:p-6 z-10 lg:-translate-y-4">
                   <div className="text-sm font-bold text-gray-900 mb-4">Active Tasks</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                           <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">TikTok Product Review</div>
                          <div className="text-xs text-gray-500">E-commerce App</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-[#2faf2f]">+₦2.50</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
                           <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Join Telegram Channel</div>
                          <div className="text-xs text-gray-500">Fintech Group</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-[#2faf2f]">+₦0.75</div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-transparent">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "50K+", label: "Verified Users" },
              { value: "1.2M+", label: "Active Campaigns" },
              { value: "2M+", label: "Tasks Completed" },
              { value: "₦500K+", label: "Rewards Distributed" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white py-8 px-4 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-[#2faf2f] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4 text-gray-900">Platform Built for Everyone</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">
              Discover the powerful tools designed to simplify digital tasks and maximize business reach in one seamless interface.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <LinkIcon className="w-5 h-5 text-[#2faf2f]" />,
                title: "Complete Tasks",
                desc: "Simple, verified actions you can perform daily to grow your balance effortlessly."
              },
              {
                icon: <Megaphone className="w-5 h-5 text-[#2faf2f]" />,
                title: "Promote Business",
                desc: "Get your brand in front of a global audience with laser-focused engagement campaigns."
              },
              {
                icon: <DollarSign className="w-5 h-5 text-[#2faf2f]" />,
                title: "Earn Rewards",
                desc: "Consistent payouts and competitive rates for all types of micro-tasks and promotions."
              },
              {
                icon: <Users className="w-5 h-5 text-[#2faf2f]" />,
                title: "Referral Program",
                desc: "Grow together. Earn lifetime commissions by bringing new members and businesses."
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-[#2faf2f]" />,
                title: "Secure Wallet",
                desc: "Military-grade encryption for all transactions and instant withdrawals to your account."
              },
              {
                icon: <BarChart3 className="w-5 h-5 text-[#2faf2f]" />,
                title: "Business Dashboard",
                desc: "Advanced analytics to track ROI, engagement rates, and campaign performance in real-time."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Path to Growth / How it Works */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Path to Growth</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-gray-200 z-0"></div>

            {[
              { num: "01", title: "Create Account", desc: "Sign up in seconds and verify your profile to unlock all features." },
              { num: "02", title: "Explore Opportunities", desc: "Browse available tasks or set up your first business campaign." },
              { num: "03", title: "Complete Tasks", desc: "Submit proof of completion and watch your earnings grow automatically." },
              { num: "04", title: "Track Growth", desc: "Withdraw rewards or analyze campaign data through your dashboard." },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-[#2faf2f] flex items-center justify-center text-[#2faf2f] font-bold text-lg mb-6 shadow-[0_0_0_8px_white]">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-24 bg-[#fafcfa]">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Individual Audience */}
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <div className="flex-1 w-full">
               <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-gradient-to-tr from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center">
                 {/* Placeholder for dashboard image */}
                 <div className="text-gray-400 font-medium">Dashboard Mockup Image</div>
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
               </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold font-heading mb-6 text-gray-900 leading-tight">
                Turn Your Time<br/>Into Opportunities
              </h2>
              <p className="text-gray-500 mb-8 text-lg">
                Arvexus provides a secure environment for individuals to earn from anywhere. No experience required—just your device and a little bit of time.
              </p>
              <ul className="space-y-4 mb-10">
                {['Unlimited daily tasks', 'Secure and fast payments', 'Tiered rewards system'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#2faf2f] w-5 h-5 shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className={cn(buttonVariants({ size: "lg" }), "bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white rounded-xl px-8")}>
                Join as Individual
              </Link>
            </div>
          </div>

          {/* Business Audience */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl font-bold font-heading mb-6 text-gray-900 leading-tight">
                Reach Real People.<br/>Drive Real Results.
              </h2>
              <p className="text-gray-500 mb-8 text-lg">
                Stop wasting budget on bot-heavy ads. Arvexus connects you with real verified users who engage with your content and products.
              </p>
              <ul className="space-y-4 mb-10">
                {['100% human verification', 'Detailed engagement analytics', 'Flexible budget control'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#2faf2f] w-5 h-5 shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl px-8")}>
                Launch Campaign
              </Link>
            </div>
            <div className="flex-1 w-full">
               <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-gradient-to-tr from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center">
                 {/* Placeholder for workspace image */}
                 <div className="text-gray-400 font-medium">Workspace Image</div>
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-multiply"></div>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Professional Choose Arvexus (Dark Section) */}
      <section className="py-24 bg-[#333535] text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4 text-white">Why Professional Choose Arvexus</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base">
              Trust, transparency, and growth are baked into our DNA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Trusted", desc: "Verified by thousands of active users and businesses worldwide." },
              { title: "Fast", desc: "Instant task verification and rapid payment withdrawals." },
              { title: "Simple", desc: "Intuitively designed for ease of use across all devices." },
              { title: "Secure", desc: "Advanced security protocols protect your data and earnings." },
              { title: "Powerful", desc: "Tools that scale with your growth, from micro-tasks to enterprise ads." },
              { title: "Community", desc: "A vibrant ecosystem of professionals helping each other grow." },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#3e4141] p-8 rounded-2xl border border-white/5 hover:bg-[#464949] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                  <ShieldCheck className="text-[#2faf2f] w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Future of Digital Opportunity */}
      <section className="py-24 bg-[#fafcfa] overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-16">The Future of Digital Opportunity</h2>
          
          <div className="relative max-w-5xl mx-auto">
            <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl relative bg-gradient-to-tr from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center">
               <div className="text-gray-400 font-medium">Complex App Interface Mockup</div>
            </div>
            
            {/* Floating Elements Mockups */}
            <motion.div 
              className="absolute -left-12 top-12 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden lg:flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#2faf2f]"><CheckCircle2 className="w-4 h-4"/></div>
              <div className="text-sm font-bold">+ ₦20.00 Task Reward</div>
            </motion.div>

            <motion.div 
              className="absolute -right-12 bottom-12 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden lg:flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#2faf2f]"><BarChart3 className="w-4 h-4"/></div>
              <div className="text-sm font-bold">Campaign ROI: 240%</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials (Partial view from image) */}
      <section className="py-24 bg-white border-t border-gray-100">
         <div className="container mx-auto px-6 max-w-7xl text-center">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-16">What Our Community Says</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#fafcfa] p-8 rounded-2xl border border-gray-100 text-left">
                <div className="text-gray-900 font-medium italic mb-6">"Arvexus completely changed how I monetize my free time."</div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Sarah Jenkins</div>
                    <div className="text-xs text-gray-500">Freelancer</div>
                  </div>
                </div>
              </div>
            </div>
         </div>
      </section>

    </div>
  );
}
