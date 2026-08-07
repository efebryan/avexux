-- 1. Trigger to automatically create a referral record and notification when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_referral()
RETURNS TRIGGER AS $$
DECLARE
    v_referrer_id UUID;
BEGIN
    -- Check if the user signed up with a referral code
    IF NEW.referred_by_code IS NOT NULL AND NEW.referred_by_code != '' THEN
        -- Find the referrer's ID
        SELECT id INTO v_referrer_id FROM public.profiles WHERE referral_code = NEW.referred_by_code;

        -- If referrer exists, create a referral record
        IF v_referrer_id IS NOT NULL THEN
            INSERT INTO public.referrals (referrer_id, referred_id, status)
            VALUES (v_referrer_id, NEW.id, 'Pending');

            -- Notify the referrer
            INSERT INTO public.notifications (user_id, title, message, type)
            VALUES (
                v_referrer_id, 
                'New Referral!', 
                'Someone just signed up using your referral code. You will earn a commission when they deposit.', 
                'referral'
            );
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger execution on the profiles table
DROP TRIGGER IF EXISTS on_profile_created_referral ON public.profiles;
CREATE TRIGGER on_profile_created_referral
    AFTER INSERT ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_referral();


-- 3. RETROACTIVE FIX: Insert missing referrals for users who signed up before the trigger was created!
DO $$
DECLARE
    prof RECORD;
    v_referrer_id UUID;
BEGIN
    FOR prof IN SELECT * FROM public.profiles WHERE referred_by_code IS NOT NULL AND referred_by_code != '' LOOP
        SELECT id INTO v_referrer_id FROM public.profiles WHERE referral_code = prof.referred_by_code;
        
        IF v_referrer_id IS NOT NULL THEN
            -- Check if referral record already exists
            IF NOT EXISTS (SELECT 1 FROM public.referrals WHERE referred_id = prof.id) THEN
                INSERT INTO public.referrals (referrer_id, referred_id, status)
                VALUES (v_referrer_id, prof.id, 'Pending');
                
                INSERT INTO public.notifications (user_id, title, message, type)
                VALUES (
                    v_referrer_id, 
                    'New Referral Registered!', 
                    'A user who signed up with your code has been successfully synced to your account.', 
                    'referral'
                );
            END IF;
        END IF;
    END LOOP;
END;
$$;
