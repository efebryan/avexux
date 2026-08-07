-- Add target_plan column to tasks table
ALTER TABLE public.tasks 
ADD COLUMN IF NOT EXISTS target_plan TEXT DEFAULT 'All';

-- Backfill existing rows (if any)
UPDATE public.tasks 
SET target_plan = 'All' 
WHERE target_plan IS NULL;
