import { LoginForm } from "@/features/auth/components/LoginForm";
import { Metadata } from "next";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Login - Arvexus",
  description: "Login to your Arvexus account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#f7f9fb] flex flex-col relative font-sans">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 lg:p-8 flex justify-between items-center z-10">
        <Link href="/" className="font-heading font-bold text-2xl tracking-tight text-[#1a9a1a]">
          Arvexus
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-24 pb-8 lg:py-0 gap-8 lg:gap-16 items-center justify-center">
        
        {/* Left Side: Text and Graphic */}
        <div className="hidden lg:flex flex-1 flex-col justify-center max-w-xl w-full">
           <div className="inline-block py-1 px-3 rounded-full bg-[#a3f0b6] text-[#004a09] text-[10px] font-bold tracking-wide uppercase mb-4 lg:mb-3 w-max">
             Institutional Precision
           </div>
           
           <h1 className="text-[36px] md:text-[44px] lg:text-[48px] font-bold font-heading leading-[1.1] tracking-tight text-[#111827] mb-4">
             Grow your wealth with <span className="text-[#1a9a1a]">algorithmic</span> certainty.
           </h1>
           
           <p className="text-base md:text-lg text-gray-600 mb-6 lg:mb-6 leading-relaxed">
             Join 50,000+ professionals using Arvexus to access high-yield digital opportunities through a secure, institutional-grade platform.
           </p>

           {/* Graphic Card */}
           <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden w-full max-w-[450px]">
             <div className="flex justify-between items-start mb-6">
               <div className="w-10 h-10 rounded-lg bg-[#1a9a1a] flex items-center justify-center shadow-lg shadow-green-900/20">
                 <TrendingUp className="text-white w-5 h-5" strokeWidth={2.5} />
               </div>
               <div className="text-right">
                 <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Portfolio Value</div>
                 <div className="text-2xl font-bold font-heading text-gray-900">₦42,890.00</div>
               </div>
             </div>
             
             {/* Bar Chart Mockup */}
             <div className="flex items-end justify-between gap-1.5 h-20 w-full mt-2">
               <div className="w-full bg-[#c9e4c9] rounded-t-sm h-[30%] opacity-80"></div>
               <div className="w-full bg-[#c9e4c9] rounded-t-sm h-[45%] opacity-80"></div>
               <div className="w-full bg-[#c9e4c9] rounded-t-sm h-[40%] opacity-80"></div>
               <div className="w-full bg-[#c9e4c9] rounded-t-sm h-[60%] opacity-80"></div>
               <div className="w-full bg-[#c9e4c9] rounded-t-sm h-[75%] opacity-80"></div>
               <div className="w-full bg-[#006e0d] rounded-t-sm h-[100%] shadow-lg"></div>
             </div>
           </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex items-center justify-center lg:justify-end w-full">
           <LoginForm />
        </div>
      </main>


    </div>
  );
}
