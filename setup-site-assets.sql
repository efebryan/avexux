-- Create a public storage bucket for site assets (logo, favicon, OG images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site_assets', 'site_assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public access to read files in the 'site_assets' bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'site_assets' );

-- Allow authenticated users (admin) to insert files into the 'site_assets' bucket
CREATE POLICY "Auth Users Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'site_assets' );

-- Allow authenticated users to update files in the 'site_assets' bucket
CREATE POLICY "Auth Users Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'site_assets' );

-- Allow authenticated users to delete files in the 'site_assets' bucket
CREATE POLICY "Auth Users Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'site_assets' );
