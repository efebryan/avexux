import { Sidebar } from "@/components/user-dashboard/Sidebar";
import { Header } from "@/components/user-dashboard/Header";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      {/* Sidebar (Hidden on small screens) */}
      <div className="hidden lg:block w-64 xl:w-72 border-r border-gray-200 bg-[#f8fafc] shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 shrink-0 border-b border-gray-200 bg-[#f8fafc] px-6 flex items-center justify-between">
          <Header />
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
