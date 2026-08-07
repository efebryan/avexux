-- Drop table if it exists with an old schema to ensure a clean slate
DROP TABLE IF EXISTS site_settings CASCADE;

CREATE TABLE site_settings (
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

-- Ensure there is only one settings row
CREATE UNIQUE INDEX IF NOT EXISTS ensure_single_row_site ON site_settings ((true));

-- Insert default row if none exists
INSERT INTO site_settings (id, site_title)
SELECT gen_random_uuid(), 'Avexux'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- Policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view site settings" ON site_settings;
CREATE POLICY "Public can view site settings"
ON site_settings FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Admins can update site settings" ON site_settings;
CREATE POLICY "Admins can update site settings"
ON site_settings FOR ALL
TO authenticated
USING (true);
