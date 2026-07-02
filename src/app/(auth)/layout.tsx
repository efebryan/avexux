import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col">
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            A
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-foreground">
            Arvexus
          </span>
        </Link>
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-6 pt-24">
        {children}
      </main>
    </div>
  );
}
