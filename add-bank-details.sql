-- Add bank details columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bank_name TEXT,
ADD COLUMN IF NOT EXISTS account_number TEXT,
ADD COLUMN IF NOT EXISTS account_name TEXT;

-- Notify PostgREST to reload the schema cache so the API recognizes the new columns immediately
NOTIFY pgrst, 'reload schema';
