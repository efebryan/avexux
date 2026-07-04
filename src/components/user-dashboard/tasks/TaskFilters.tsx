import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TaskFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
}

export function TaskFilters({ searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, categories }: TaskFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for tasks..." 
          className="pl-9 h-9 bg-white rounded-lg shadow-sm border-gray-200 text-xs"
        />
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 md:pb-0 scrollbar-hide">
        <button
          onClick={() => setCategoryFilter("All")}
          className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            categoryFilter === "All" ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              categoryFilter === cat ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
