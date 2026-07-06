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
    <div className="flex h-[100dvh] w-full bg-slate-50 overflow-hidden relative font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-slate-950 border-r border-slate-800 shadow-2xl transform transition-transform duration-300 lg:hidden ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="absolute top-6 right-4 z-50">
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </div>

      {/* Desktop Sidebar (Hidden on small screens) */}
      <div className="hidden lg:block w-64 xl:w-72 border-r border-slate-800/50 bg-slate-950 shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 shrink-0 border-b border-gray-200 bg-white px-4 md:px-6 flex items-center gap-4">
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
        <main className="flex-1 overflow-y-auto relative">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl w-full">{children}</div>
          </div>
        </main>
          
        {/* Static Footer */}
        <footer className="shrink-0 border-t border-slate-200 bg-white py-4 px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-4">
              <span>&copy; 2024 Arvexus Admin Pro</span>
              <span className="text-slate-300">&bull;</span>
              <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
              <span className="text-slate-300">&bull;</span>
              <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              System Operational: v2.4.1
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
