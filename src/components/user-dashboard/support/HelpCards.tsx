import { BookOpen, HelpCircle, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";

const cards = [
  {
    title: "Getting Started",
    desc: "Learn the basics of using Arvexus and setting up your profile.",
    icon: <BookOpen className="w-6 h-6 text-[#0f8538]" />,
    link: "Read Guide"
  },
  {
    title: "Task Guidelines",
    desc: "Understand how to complete tasks successfully to ensure payment.",
    icon: <HelpCircle className="w-6 h-6 text-[#0f8538]" />,
    link: "View Rules"
  },
  {
    title: "Payment & Rewards",
    desc: "Information about withdrawal methods, minimums, and timelines.",
    icon: <CreditCard className="w-6 h-6 text-[#0f8538]" />,
    link: "Learn More"
  }
];

export function HelpCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <Card key={i} className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-[#0f8538]/30 transition-colors flex flex-col items-start cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-[#ade5bb]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            {card.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
          <p className="text-gray-500 text-sm mb-6 flex-1">{card.desc}</p>
          <span className="text-[#0f8538] font-bold text-sm group-hover:underline">{card.link} &rarr;</span>
        </Card>
      ))}
    </div>
  );
}
