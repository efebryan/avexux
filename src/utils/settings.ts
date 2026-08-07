import { createClient } from "./supabase/server";

export type SiteSettings = {
  logo_url: string | null;
  favicon_url: string | null;
  og_image_url: string | null;
  site_title: string;
  copyright_text: string;
  og_title: string;
  og_description: string;
};

const defaultSettings: SiteSettings = {
  logo_url: null,
  favicon_url: null,
  og_image_url: null,
  site_title: "Avexux Corporate Suite",
  copyright_text: "© 2024 Avexux Intelligence Systems",
  og_title: "Avexux - Digital Opportunities Platform",
  og_description: "Complete online tasks, earn rewards, and grow with Avexux.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("app_settings").select("*").limit(1).single();
    if (error || !data) {
      return defaultSettings;
    }
    return {
      logo_url: data.logo_url || defaultSettings.logo_url,
      favicon_url: data.favicon_url || defaultSettings.favicon_url,
      og_image_url: data.og_image_url || defaultSettings.og_image_url,
      site_title: data.site_title || defaultSettings.site_title,
      copyright_text: data.copyright_text || defaultSettings.copyright_text,
      og_title: data.og_title || defaultSettings.og_title,
      og_description: data.og_description || defaultSettings.og_description,
    };
  } catch (error) {
    return defaultSettings;
  }
}
