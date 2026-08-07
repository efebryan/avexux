-- RPC Function for Atomic Spin Transactions
-- This function adheres to Supabase best practices for atomicity and concurrency control.

CREATE OR REPLACE FUNCTION public.execute_spin_transaction(
    p_user_id UUID,
    p_cost NUMERIC,
    p_reward_amount NUMERIC,
    p_reward_label TEXT,
    p_reward_type TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER -- Allows the function to bypass RLS and perform atomic operations securely
AS $$
DECLARE
    v_balance NUMERIC;
    v_free_spins INTEGER;
    v_paid_spins_today INTEGER;
BEGIN
    -- 1. Lock the wallet row to prevent race conditions (FOR UPDATE)
    SELECT balance, free_spins INTO v_balance, v_free_spins
    FROM public.wallets
    WHERE user_id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Wallet not found for user';
    END IF;

    -- 2. Deduct Cost (Check free spins first)
    IF v_free_spins > 0 THEN
        UPDATE public.wallets
        SET free_spins = free_spins - 1,
            updated_at = now()
        WHERE user_id = p_user_id;
    ELSE
        -- Verify daily paid spin limit
        SELECT count(*) INTO v_paid_spins_today
        FROM public.rewards_spins
        WHERE user_id = p_user_id 
          AND cost_paid > 0 
          AND created_at >= current_date;
          
        IF v_paid_spins_today > 0 THEN
            RAISE EXCEPTION 'You have already used your extra paid spin for today.';
        END IF;

        IF v_balance < p_cost THEN
            RAISE EXCEPTION 'Insufficient balance for spin';
        END IF;

        UPDATE public.wallets
        SET balance = balance - p_cost,
            updated_at = now()
        WHERE user_id = p_user_id;

        -- Record cost transaction
        INSERT INTO public.transactions (
            reference_id, user_id, type, amount, status, metadata
        ) VALUES (
            'SPIN_COST_' || extract(epoch from now())::text,
            p_user_id, 'SPIN_COST', p_cost, 'Completed', '{"note": "Paid for wheel spin"}'::jsonb
        );
    END IF;

    -- 3. Apply Reward (if any cash won)
    IF p_reward_amount > 0 AND p_reward_type = 'cash' THEN
        UPDATE public.wallets
        SET balance = balance + p_reward_amount,
            total_earned = total_earned + p_reward_amount,
            updated_at = now()
        WHERE user_id = p_user_id;

        -- Record win transaction
        INSERT INTO public.transactions (
            reference_id, user_id, type, amount, status
        ) VALUES (
            'SPIN_WIN_' || extract(epoch from now())::text,
            p_user_id, 'SPIN_REWARD', p_reward_amount, 'Completed'
        );
    END IF;

    -- 4. Log the Spin
    INSERT INTO public.rewards_spins (
        user_id, reward_label, reward_type, reward_value, cost_paid
    ) VALUES (
        p_user_id, p_reward_label, p_reward_type, p_reward_amount, CASE WHEN v_free_spins > 0 THEN 0 ELSE p_cost END
    );

    RETURN TRUE;
END;
$$;

-- Initialize spins_per_plan_config
INSERT INTO public.app_settings (key, value)
VALUES (
    'spins_per_plan_config',
    '{"bronze": [5], "silver": [1, 5], "gold": [1, 3, 5], "platinum": [1, 2, 3, 4, 5], "diamond": [1, 2, 3, 4, 5], "apex": [1, 2, 3, 4, 5]}'::jsonb
) ON CONFLICT (key) DO NOTHING;
