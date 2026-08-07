import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { getSiteSettings } from "@/utils/settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Preloader />
      <Navbar settings={settings} />
      <main className="flex-1 pt-20">{children}</main>
      <Footer settings={settings} />
    </>
  );
}

