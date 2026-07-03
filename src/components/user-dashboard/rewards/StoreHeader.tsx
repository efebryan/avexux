import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StoreHeaderProps {
  balance: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
}

export function StoreHeader({ 
  balance, 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory, 
  categories 
}: StoreHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards Store</h1>
          <p className="text-gray-500">Redeem your earnings for exclusive perks and gifts.</p>
        </div>
        <div className="bg-[#0f8538] text-white px-5 py-3 rounded-2xl shadow-md flex items-center gap-3 w-full md:w-auto">
          <span className="text-sm font-medium text-green-100">Wallet Balance:</span>
          <span className="text-xl font-bold">₦{balance.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rewards..." 
            className="pl-10 h-12 bg-white rounded-xl shadow-sm border-gray-200"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                activeCategory === cat ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
