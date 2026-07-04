"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Target, 
  Lightbulb, 
  Users, 
  Rocket, 
  ShieldCheck, 
  TrendingUp,
  Globe
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { label: "Active Users", value: "50K+" },
  { label: "Tasks Completed", value: "2M+" },
  { label: "Total Paid Out", value: "₦150M+" },
  { label: "Business Partners", value: "1,200+" },
];

const values = [
  {
    title: "Empowerment",
    description: "We provide accessible digital opportunities for anyone to earn a sustainable income, bridging the gap between talent and opportunity.",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Innovation",
    description: "Continuously evolving our platform to deliver the most effective and seamless experience for both earners and businesses.",
    icon: Lightbulb,
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  {
    title: "Integrity",
    description: "Building trust through transparent operations, verified users, and guaranteed payouts for completed quality work.",
    icon: ShieldCheck,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Impact",
    description: "Driving real, measurable growth for businesses while creating meaningful financial impact for our community.",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafcfa]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-32">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#e6f7e6] to-transparent rounded-full opacity-60 -translate-x-1/3 -translate-y-1/4 pointer-events-none blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-green-100 to-transparent rounded-full opacity-50 translate-x-1/3 translate-y-1/3 pointer-events-none blur-3xl"></div>
        
        <div className="container relative mx-auto px-6 max-w-5xl z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#e6f7e6] text-[#2faf2f] text-sm font-semibold mb-6 shadow-sm border border-green-100">
              <Globe className="w-4 h-4" />
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight tracking-tight mb-6 text-gray-900">
              Bridging the gap between <br className="hidden md:block" />
              <span className="text-[#2faf2f] relative">
                opportunity
                <svg className="absolute -bottom-2 w-full h-3 text-green-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span> and growth.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Arvexus was founded on a simple belief: that the digital economy should be accessible to everyone. We connect ambitious businesses with a motivated workforce ready to execute.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100 relative z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-gray-100">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-heading">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2faf2f]/20 to-transparent mix-blend-overlay z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
                  alt="Team collaborating" 
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <Rocket className="text-[#2faf2f] w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Est. 2023</div>
                    <div className="text-sm text-gray-500">Growing fast</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-bold font-heading mb-4 text-gray-900">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To democratize access to digital earning opportunities while providing businesses with an unparalleled, authentic audience to drive their growth. We believe in creating a symbiotic ecosystem where every interaction brings value to both parties.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold font-heading mb-4 text-gray-900">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To become Africa's leading digital micro-tasking and promotional platform, setting the standard for transparent, impactful, and rewarding digital engagements.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-14 px-8 text-base bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white rounded-xl shadow-lg shadow-green-900/10",
                  )}
                >
                  Join Our Community <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-gray-900">Our Core Values</h2>
            <p className="text-gray-600 text-lg">
              The principles that guide our decisions, shape our culture, and drive our platform forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", value.bgColor)}>
                  <value.icon className={cn("w-7 h-7", value.color)} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#2faf2f]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-white leading-tight">
              Ready to transform your digital journey?
            </h2>
            <p className="text-green-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Whether you're looking to earn extra income or seeking to amplify your business reach, Arvexus is your trusted partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-14 px-8 text-base bg-white hover:bg-gray-50 text-[#2faf2f] rounded-xl font-semibold",
                )}
              >
                Start Earning Today
              </Link>
              <Link
                href="/advertise"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-14 px-8 text-base border-white/20 text-white hover:bg-white/10 rounded-xl",
                )}
              >
                Launch a Campaign
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
