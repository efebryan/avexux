-- Function to securely process a multi-level referral commission
CREATE OR REPLACE FUNCTION process_multi_level_referral_commission(
  p_referral_id UUID,
  p_deposit_amount NUMERIC,
  p_config JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_referred_id UUID;
  v_upline_1 UUID;
  v_upline_2 UUID;
  v_upline_3 UUID;
  v_current_upline UUID;
  v_level INT;
  v_highest_dep NUMERIC;
  v_plan TEXT;
  v_commission_pct NUMERIC;
  v_commission_amount NUMERIC;
  v_status TEXT;
BEGIN
  -- 1. Check referral status
  SELECT status, referred_id, referrer_id 
  INTO v_status, v_referred_id, v_upline_1 
  FROM referrals 
  WHERE id = p_referral_id FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Referral not found.');
  END IF;

  IF v_status != 'Pending' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Referral has already been processed.');
  END IF;

  -- 2. Find uplines
  -- We already have v_upline_1 from the primary referral.
  -- Find v_upline_2
  SELECT referrer_id INTO v_upline_2 FROM referrals WHERE referred_id = v_upline_1;
  -- Find v_upline_3
  SELECT referrer_id INTO v_upline_3 FROM referrals WHERE referred_id = v_upline_2;

  -- 3. Loop through the 3 uplines
  FOR v_level IN 1..3 LOOP
    IF v_level = 1 THEN v_current_upline := v_upline_1;
    ELSIF v_level = 2 THEN v_current_upline := v_upline_2;
    ELSIF v_level = 3 THEN v_current_upline := v_upline_3;
    END IF;

    CONTINUE WHEN v_current_upline IS NULL;

    -- Calculate their highest deposit to determine their plan
    SELECT COALESCE(MAX(amount), 0) INTO v_highest_dep 
    FROM transactions 
    WHERE user_id = v_current_upline AND type = 'DEPOSIT' AND status = 'Completed';

    IF v_highest_dep >= 88000 THEN v_plan := 'platinum';
    ELSIF v_highest_dep >= 42000 THEN v_plan := 'gold';
    ELSIF v_highest_dep >= 18000 THEN v_plan := 'silver';
    ELSE v_plan := 'bronze';
    END IF;

    -- Look up percentage config: e.g. p_config->'gold'->>'level_1'
    BEGIN
      v_commission_pct := COALESCE((p_config->v_plan->>('level_' || v_level))::NUMERIC, 0);
    EXCEPTION WHEN OTHERS THEN
      v_commission_pct := 0;
    END;

    IF v_commission_pct > 0 THEN
      v_commission_amount := p_deposit_amount * (v_commission_pct / 100.0);
      
      IF v_commission_amount > 0 THEN
        UPDATE wallets 
        SET 
          balance = balance + v_commission_amount,
          total_earned = total_earned + v_commission_amount,
          updated_at = now()
        WHERE user_id = v_current_upline;

        INSERT INTO transactions (
          user_id, reference_id, type, amount, status, metadata
        ) VALUES (
          v_current_upline,
          'REF_L' || v_level || '_' || extract(epoch from now())::text || '_' || substring(gen_random_uuid()::text from 1 for 6),
          'REFERRAL_BONUS',
          v_commission_amount,
          'Completed',
          jsonb_build_object('note', 'Level ' || v_level || ' commission for referred user deposit', 'level', v_level, 'percentage', v_commission_pct)
        );

        -- If it's level 1, update the original referral commission_earned
        IF v_level = 1 THEN
          UPDATE referrals SET commission_earned = v_commission_amount WHERE id = p_referral_id;
        END IF;
      END IF;
    END IF;
  END LOOP;

  -- 4. Mark referral as Active
  UPDATE referrals SET status = 'Active' WHERE id = p_referral_id;

  RETURN jsonb_build_object('success', true);
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Initialize default 3-level config
INSERT INTO app_settings (key, value)
VALUES (
  'referral_commission_config',
  '{
    "bronze": { "level_1": 10, "level_2": 2, "level_3": 1 },
    "silver": { "level_1": 15, "level_2": 5, "level_3": 2 },
    "gold": { "level_1": 20, "level_2": 8, "level_3": 3 },
    "platinum": { "level_1": 25, "level_2": 10, "level_3": 5 }
  }'::jsonb
)
ON CONFLICT (key) DO UPDATE 
SET value = '{
    "bronze": { "level_1": 10, "level_2": 2, "level_3": 1 },
    "silver": { "level_1": 15, "level_2": 5, "level_3": 2 },
    "gold": { "level_1": 20, "level_2": 8, "level_3": 3 },
    "platinum": { "level_1": 25, "level_2": 10, "level_3": 5 }
  }'::jsonb;
