"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! We will get back to you shortly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fafcfa] py-16 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#e6f7e6] text-[#2faf2f] text-xs font-bold uppercase tracking-wider mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4 tracking-tight">
              We're here to help you grow.
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Have questions about our algorithmic opportunities, advertising campaigns, or need support? Reach out and our team will get back to you within 24 hours.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 font-heading">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#e6f7e6] flex items-center justify-center shrink-0">
                    <Mail className="text-[#2faf2f] w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Email Support</h3>
                    <p className="text-sm text-gray-500 mb-1">Send us an email anytime. We reply within 24 hours.</p>
                    <a href="mailto:support@arvexus.com" className="text-sm font-semibold text-[#2faf2f] hover:underline">
                      support@arvexus.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#e6f7e6] flex items-center justify-center shrink-0">
                    <Phone className="text-[#2faf2f] w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Phone Support</h3>
                    <p className="text-sm text-gray-500 mb-1">Speak directly with our local support agents in Nigeria.</p>
                    <a href="tel:+234800000000" className="text-sm font-semibold text-[#2faf2f] hover:underline">
                      +234 (0) 800 000 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#e6f7e6] flex items-center justify-center shrink-0">
                    <MapPin className="text-[#2faf2f] w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Headquarters</h3>
                    <p className="text-sm text-gray-500">
                      12, Victoria Island Boulevard,<br />
                      Lagos, Nigeria.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra Info Card */}
            <div className="bg-[#e6f7e6]/50 rounded-3xl p-8 border border-[#e6f7e6] flex items-start gap-4">
              <Clock className="text-[#2faf2f] w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">Business Hours</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Our digital platform runs 24/7. Phone and live chat support are active Monday through Friday, 8:00 AM to 6:00 PM (WAT).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#e6f7e6] flex items-center justify-center">
                  <MessageSquare className="text-[#2faf2f] w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading">Send a Message</h2>
                  <p className="text-xs text-gray-500">Tell us how we can assist you today.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-gray-700">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#2faf2f] focus:ring-1 focus:ring-[#2faf2f] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-gray-700">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#2faf2f] focus:ring-1 focus:ring-[#2faf2f] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold text-gray-700">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#2faf2f] focus:ring-1 focus:ring-[#2faf2f] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-gray-700">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#2faf2f] focus:ring-1 focus:ring-[#2faf2f] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#2faf2f] hover:bg-[#2faf2f]/90 text-white font-bold transition-all shadow-md shadow-green-900/10 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
