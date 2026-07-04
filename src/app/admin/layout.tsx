"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";
import { Menu, X } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-[100dvh] w-full bg-gray-50 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-gray-900 border-r border-gray-800 shadow-2xl transform transition-transform duration-300 lg:hidden ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute top-6 right-4 z-50">
          <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 hover:bg-gray-800 rounded-full text-gray-400 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="h-full overflow-y-auto">
           <Sidebar />
        </div>
      </div>

      {/* Desktop Sidebar (Hidden on small screens) */}
      <div className="hidden lg:block w-64 xl:w-72 border-r border-gray-200 bg-gray-900 shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 shrink-0 border-b border-gray-200 bg-white px-4 md:px-6 flex items-center gap-4">
          <button 
            className="lg:hidden p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 w-full min-w-0">
             <Header />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          <div className="mx-auto max-w-7xl w-full pb-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
