-- 1. Create the new site_settings table for branding
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text,
  favicon_url text,
  og_image_url text,
  site_title text DEFAULT 'Avexux',
  copyright_text text DEFAULT '© 2024 Avexux',
  og_title text DEFAULT 'Avexux - Complete Tasks and Earn',
  og_description text DEFAULT 'Join Avexux to complete digital tasks and earn money online.',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ensure there is only one site_settings row
CREATE UNIQUE INDEX IF NOT EXISTS ensure_single_row_site_settings ON site_settings ((true));

-- 2. Migrate existing data from app_settings (the new branding one) into site_settings
INSERT INTO site_settings (id, logo_url, favicon_url, og_image_url, site_title, copyright_text, og_title, og_description)
SELECT id, logo_url, favicon_url, og_image_url, site_title, copyright_text, og_title, og_description
FROM app_settings
WHERE NOT EXISTS (SELECT 1 FROM site_settings)
ON CONFLICT DO NOTHING;

-- Policies for site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view site settings" ON site_settings;
CREATE POLICY "Public can view site settings"
ON site_settings FOR SELECT
TO public
USING (true);

-- Allow authenticated admins to insert/update site_settings
DROP POLICY IF EXISTS "Admins can update site settings" ON site_settings;
CREATE POLICY "Admins can update site settings"
ON site_settings FOR ALL
TO authenticated
USING (true);

-- 3. Drop the hijacked app_settings table
DROP TABLE IF EXISTS app_settings CASCADE;

-- 4. Restore the original app_settings (key/value) table
CREATE TABLE app_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS for the restored app_settings
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view app settings"
ON app_settings FOR SELECT
TO public
USING (true);

CREATE POLICY "Authenticated users can view and update app settings"
ON app_settings FOR ALL
TO authenticated
USING (true);
