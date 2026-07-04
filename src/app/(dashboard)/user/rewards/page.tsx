"use client";

import { useState } from "react";
import { StoreHeader } from "@/components/user-dashboard/rewards/StoreHeader";
import { RewardCard, RewardItem } from "@/components/user-dashboard/rewards/RewardCard";
import { RedeemModal } from "@/components/user-dashboard/rewards/RedeemModal";
import { Gift, Zap, Smartphone, Shirt, CreditCard } from "lucide-react";
import { toast } from "sonner";

const mockInventory: RewardItem[] = [
  { id: "r1", title: "₦1,000 Cash Bonus", description: "Instantly add ₦1,000 to your withdrawable wallet balance.", category: "Cash Bonuses", cost: 1000, icon: <CreditCard className="w-5 h-5 text-[#0f8538]" /> },
  { id: "r2", title: "₦5,000 Amazon Gift Card", description: "Receive a digital Amazon gift card code via email within 24 hours.", category: "Gift Cards", cost: 5500, icon: <Gift className="w-5 h-5 text-yellow-500" /> },
  { id: "r3", title: "1 Month Premium Status", description: "Unlock premium tasks, priority support, and 0% withdrawal fees for 30 days.", category: "Premium Features", cost: 3000, icon: <Zap className="w-5 h-5 text-blue-500" /> },
  { id: "r4", title: "Arvexus T-Shirt", description: "Exclusive branded merchandise shipped directly to your address.", category: "Merchandise", cost: 8000, icon: <Shirt className="w-5 h-5 text-purple-500" /> },
  { id: "r5", title: "500 Platform Credits", description: "Use credits to boost your own tasks if you ever switch to an Advertiser account.", category: "Platform Credits", cost: 500, icon: <Smartphone className="w-5 h-5 text-gray-700" /> },
  { id: "r6", title: "₦10,000 Cash Bonus", description: "Instantly add ₦10,000 to your withdrawable wallet balance.", category: "Cash Bonuses", cost: 10000, icon: <CreditCard className="w-5 h-5 text-[#0f8538]" /> },
];

const categories = ["All", "Cash Bonuses", "Gift Cards", "Premium Features", "Merchandise", "Platform Credits"];

export default function RewardsStorePage() {
  const [balance, setBalance] = useState(12500); // Mock starting balance
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const [selectedItem, setSelectedItem] = useState<RewardItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredInventory = mockInventory.filter(item => {
    // Category Filter
    if (activeCategory !== "All" && item.category !== activeCategory) return false;
    
    // Search Filter
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  const handleRedeemClick = (item: RewardItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleConfirmRedemption = (item: RewardItem) => {
    setBalance(prev => prev - item.cost);
    setIsModalOpen(false);
    toast.success(`Successfully redeemed ${item.title}!`);
  };

  return (
    <div className="max-w-6xl mx-auto pb-8">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <StoreHeader 
          balance={balance}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in duration-500 mt-8">
        {filteredInventory.length > 0 ? (
          filteredInventory.map(item => (
            <RewardCard 
              key={item.id} 
              item={item} 
              userBalance={balance} 
              onRedeem={handleRedeemClick} 
            />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <p className="text-gray-500 font-medium">No rewards found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-4 text-[#0f8538] font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <RedeemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        balance={balance}
        onConfirm={handleConfirmRedemption}
      />
    </div>
  );
}
