-- ============================================================
-- ADD TASK COMMISSION LOGIC
-- Run this script in Supabase SQL Editor
-- ============================================================

CREATE OR REPLACE FUNCTION public.approve_task_submission(submission_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id UUID;
    v_task_id UUID;
    v_reward_amount NUMERIC(12, 2);
    v_status TEXT;
    
    -- New variables for task commission
    v_config JSONB;
    v_upline_1 UUID;
    v_upline_2 UUID;
    v_upline_3 UUID;
    v_current_upline UUID;
    v_level INT;
    v_highest_dep NUMERIC;
    v_plan TEXT;
    v_commission_pct NUMERIC;
    v_commission_amount NUMERIC;
BEGIN
    -- Get submission details
    SELECT user_id, task_id, status INTO v_user_id, v_task_id, v_status
    FROM public.task_submissions
    WHERE id = submission_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Submission not found';
    END IF;

    IF v_status = 'Approved' THEN
        RETURN TRUE; -- Already approved
    END IF;

    -- Get task reward amount
    SELECT reward_amount INTO v_reward_amount
    FROM public.tasks
    WHERE id = v_task_id;

    -- Update submission status
    UPDATE public.task_submissions
    SET status = 'Approved', updated_at = now()
    WHERE id = submission_id;

    -- Update wallet
    UPDATE public.wallets
    SET balance = balance + v_reward_amount,
        today_earnings = today_earnings + v_reward_amount,
        total_earned = total_earned + v_reward_amount,
        updated_at = now()
    WHERE user_id = v_user_id;

    -- Create transaction record
    INSERT INTO public.transactions (
        reference_id,
        user_id,
        type,
        amount,
        status,
        metadata
    ) VALUES (
        'TASK-' || UPPER(SUBSTRING(MD5(submission_id::text || clock_timestamp()::text) FROM 1 FOR 8)),
        v_user_id,
        'TASK_REWARD',
        v_reward_amount,
        'Completed',
        jsonb_build_object('note', 'Reward for completed task')
    );

    -- ==========================================
    -- Multi-level Task Commission Logic
    -- ==========================================

    -- Check if user was referred (Level 1)
    SELECT referrer_id INTO v_upline_1 FROM public.referrals WHERE referred_id = v_user_id LIMIT 1;
    
    IF v_upline_1 IS NOT NULL THEN
        -- Find Level 2 and Level 3 uplines
        SELECT referrer_id INTO v_upline_2 FROM public.referrals WHERE referred_id = v_upline_1 LIMIT 1;
        SELECT referrer_id INTO v_upline_3 FROM public.referrals WHERE referred_id = v_upline_2 LIMIT 1;
        
        -- Get config
        SELECT value INTO v_config FROM public.app_settings WHERE key = 'task_earning_commission_config';
        
        IF v_config IS NOT NULL THEN
            FOR v_level IN 1..3 LOOP
                IF v_level = 1 THEN v_current_upline := v_upline_1;
                ELSIF v_level = 2 THEN v_current_upline := v_upline_2;
                ELSIF v_level = 3 THEN v_current_upline := v_upline_3;
                END IF;

                CONTINUE WHEN v_current_upline IS NULL;

                -- Calculate their highest deposit to determine their plan
                SELECT COALESCE(MAX(amount), 0) INTO v_highest_dep 
                FROM public.transactions 
                WHERE user_id = v_current_upline AND type = 'DEPOSIT' AND status = 'Completed';

                IF v_highest_dep >= 88000 THEN v_plan := 'platinum';
                ELSIF v_highest_dep >= 42000 THEN v_plan := 'gold';
                ELSIF v_highest_dep >= 18000 THEN v_plan := 'silver';
                ELSE v_plan := 'bronze';
                END IF;

                -- Look up percentage config: e.g. v_config->'gold'->>'level_1'
                BEGIN
                    v_commission_pct := COALESCE((v_config->v_plan->>('level_' || v_level))::NUMERIC, 0);
                EXCEPTION WHEN OTHERS THEN
                    v_commission_pct := 0;
                END;

                IF v_commission_pct > 0 THEN
                    v_commission_amount := v_reward_amount * (v_commission_pct / 100.0);
                    
                    IF v_commission_amount > 0 THEN
                        UPDATE public.wallets 
                        SET 
                            balance = balance + v_commission_amount,
                            total_earned = total_earned + v_commission_amount,
                            updated_at = now()
                        WHERE user_id = v_current_upline;

                        INSERT INTO public.transactions (
                            user_id, reference_id, type, amount, status, metadata
                        ) VALUES (
                            v_current_upline,
                            'TSK_REF_L' || v_level || '_' || extract(epoch from now())::text || '_' || substring(gen_random_uuid()::text from 1 for 6),
                            'TASK_COMMISSION',
                            v_commission_amount,
                            'Completed',
                            jsonb_build_object('note', 'Level ' || v_level || ' commission for downline task completion', 'level', v_level, 'percentage', v_commission_pct)
                        );
                    END IF;
                END IF;
            END LOOP;
        END IF;
    END IF;

    RETURN TRUE;
END;
$$;

-- Default task earning commission config
INSERT INTO public.app_settings (key, value)
VALUES (
  'task_earning_commission_config',
  '{
    "bronze": { "level_1": 2, "level_2": 1, "level_3": 0 },
    "silver": { "level_1": 3, "level_2": 1, "level_3": 0 },
    "gold": { "level_1": 4, "level_2": 2, "level_3": 0 },
    "platinum": { "level_1": 5, "level_2": 2, "level_3": 0 }
  }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
