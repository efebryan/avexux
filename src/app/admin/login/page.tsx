import { AdminLoginForm } from "@/features/auth/components/AdminLoginForm";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, RefreshCw, FileCheck } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Admin Login - Arvexus Internal Systems",
};

export default function AdminLoginPage() {
  return (
    <div className="h-screen flex w-full font-sans bg-[#f9fafa] overflow-hidden">
      
      {/* Left Column: Form Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-8 relative border-r border-gray-100">
        
        <div className="w-full max-w-[440px] flex flex-col items-center my-auto">
          {/* Header */}
          <div className="text-center mb-6 lg:mb-8">
            <h1 className="font-heading font-bold text-2xl tracking-tight text-[#004a09]">
              Arvexus
            </h1>
            <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mt-1">
              Internal Systems
            </p>
          </div>
 
          {/* Login Form */}
          <AdminLoginForm />
 

        </div>
      </div>
 
      {/* Right Column: Information Section */}
      <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-white p-8 lg:p-12 relative overflow-hidden">
        <div className="w-full max-w-md relative z-10">
          
          {/* Floating Card Mockup */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-gray-100 -rotate-2 transform hover:rotate-0 transition-transform duration-500">
             <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 relative bg-gray-100">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614064005084-5eb170d10091?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply opacity-80"></div>
               {/* Overlay effect for the vault */}
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
               <div className="absolute inset-0 border-[4px] border-[#00ff88]/20 rounded-2xl m-4 shadow-[0_0_30px_rgba(0,255,136,0.3)]"></div>
             </div>
             <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3 leading-tight">
               Institutional<br/>Integrity
             </h3>
             <p className="text-sm text-gray-500 leading-relaxed">
               Real-time monitoring and verified asset distribution for the Arvexus network.
             </p>
          </div>



        </div>
      </div>

    </div>
  );
}
