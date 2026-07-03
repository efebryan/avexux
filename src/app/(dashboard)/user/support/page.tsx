import { HelpCards } from "@/components/user-dashboard/support/HelpCards";
import { FAQAccordion } from "@/components/user-dashboard/support/FAQAccordion";
import { ContactForm } from "@/components/user-dashboard/support/ContactForm";

export default function SupportPage() {
  return (
    <div className="max-w-6xl mx-auto pb-8">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h1>
        <p className="text-gray-500 text-lg">Browse our resources below or send us a message directly. We're here to support your growth.</p>
      </div>

      <HelpCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <FAQAccordion />
        <ContactForm />
      </div>
    </div>
  );
}
