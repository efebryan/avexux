-- Enable Realtime for admin notifications

-- First, ensure the supabase_realtime publication exists (it usually does by default on Supabase)
-- We use a DO block to safely add tables to the publication

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'withdrawal_requests'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.withdrawal_requests;
  END IF;

  IF NOT EXISTS (
    SELECT 1 
    FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'task_submissions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.task_submissions;
  END IF;
  
  -- Optionally add profiles for new user registrations
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'profiles'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
  END IF;
END $$;
