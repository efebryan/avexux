-- Add day_of_week column to tasks table
-- Existing tasks will default to 'Friday' as requested
ALTER TABLE public.tasks 
ADD COLUMN IF NOT EXISTS day_of_week TEXT NOT NULL DEFAULT 'Friday'
CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'));
