-- ============================================================
-- COMPREHENSIVE REFERRAL FIX SCRIPT
-- Run this entire script in Supabase SQL Editor
-- ============================================================

-- 1. Fix the referrals table default status from 'Active' to 'Pending'
ALTER TABLE public.referrals 
  ALTER COLUMN status SET DEFAULT 'Pending';

-- Also fix the check constraint to include 'Inactive' as a valid status
ALTER TABLE public.referrals 
  DROP CONSTRAINT IF EXISTS referrals_status_check;

ALTER TABLE public.referrals 
  ADD CONSTRAINT referrals_status_check 
  CHECK (status IN ('Active', 'Pending', 'Inactive'));

-- 2. Add missing RLS policies for the referrals table so users can read their own referrals
-- (the table had RLS enabled but NO SELECT policy, so all reads were blocked!)
DROP POLICY IF EXISTS "Users can view referrals they made" ON public.referrals;
CREATE POLICY "Users can view referrals they made" 
  ON public.referrals FOR SELECT 
  USING (auth.uid() = referrer_id);

DROP POLICY IF EXISTS "Users can view their own referral entry" ON public.referrals;
CREATE POLICY "Users can view their own referral entry" 
  ON public.referrals FOR SELECT 
  USING (auth.uid() = referred_id);

-- 3. Fix existing referrals: set any 'Active' ones back to 'Pending'
-- if the referred user has never made a deposit
UPDATE public.referrals r
SET status = 'Pending'
WHERE r.status = 'Active'
  AND NOT EXISTS (
    SELECT 1 FROM public.transactions t
    WHERE t.user_id = r.referred_id
      AND t.type = 'DEPOSIT'
      AND t.status = 'Completed'
  );

-- 4. RETROACTIVE FIX: Insert missing referral records for existing users
-- who signed up with a referral code but were never recorded in the referrals table
DO $$
DECLARE
    prof RECORD;
    v_referrer_id UUID;
    v_has_deposit BOOLEAN;
    v_new_status TEXT;
BEGIN
    FOR prof IN 
        SELECT * FROM public.profiles 
        WHERE referred_by_code IS NOT NULL AND referred_by_code != '' 
    LOOP
        -- Find referrer
        SELECT id INTO v_referrer_id 
        FROM public.profiles 
        WHERE referral_code = prof.referred_by_code;
        
        IF v_referrer_id IS NOT NULL THEN
            -- Only insert if the referral record doesn't already exist
            IF NOT EXISTS (SELECT 1 FROM public.referrals WHERE referred_id = prof.id) THEN
                
                -- Check if referred user has made a deposit
                SELECT EXISTS (
                    SELECT 1 FROM public.transactions t
                    WHERE t.user_id = prof.id
                      AND t.type = 'DEPOSIT'
                      AND t.status = 'Completed'
                ) INTO v_has_deposit;
                
                -- Set status based on deposit history
                IF v_has_deposit THEN
                    v_new_status := 'Active';
                ELSE
                    v_new_status := 'Pending';
                END IF;
                
                INSERT INTO public.referrals (referrer_id, referred_id, status)
                VALUES (v_referrer_id, prof.id, v_new_status);
                
                RAISE NOTICE 'Inserted referral: referrer=%, referred=%, status=%', v_referrer_id, prof.id, v_new_status;
            END IF;
        END IF;
    END LOOP;
END;
$$;

-- 5. Re-install the trigger for future signups
CREATE OR REPLACE FUNCTION public.handle_new_referral()
RETURNS TRIGGER AS $$
DECLARE
    v_referrer_id UUID;
BEGIN
    IF NEW.referred_by_code IS NOT NULL AND NEW.referred_by_code != '' THEN
        SELECT id INTO v_referrer_id 
        FROM public.profiles 
        WHERE referral_code = NEW.referred_by_code;

        IF v_referrer_id IS NOT NULL THEN
            INSERT INTO public.referrals (referrer_id, referred_id, status)
            VALUES (v_referrer_id, NEW.id, 'Pending');

            INSERT INTO public.notifications (user_id, title, message, type)
            VALUES (
                v_referrer_id, 
                'New Referral!', 
                'Someone just signed up using your referral code. You will earn a commission when they make their first deposit.', 
                'referral'
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created_referral ON public.profiles;
CREATE TRIGGER on_profile_created_referral
    AFTER INSERT ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_referral();
