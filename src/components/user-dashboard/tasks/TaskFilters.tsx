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
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for tasks..." 
          className="pl-10 h-12 bg-white rounded-xl shadow-sm border-gray-200"
        />
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        <button
          onClick={() => setCategoryFilter("All")}
          className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
            categoryFilter === "All" ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
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
