-- Function to securely process a referral commission
CREATE OR REPLACE FUNCTION process_referral_commission(
  p_referral_id UUID,
  p_referrer_id UUID,
  p_commission_amount NUMERIC
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_referrer_wallet RECORD;
BEGIN
  -- 1. Verify the referral is still Pending
  DECLARE
    v_status TEXT;
  BEGIN
    SELECT status INTO v_status FROM referrals WHERE id = p_referral_id FOR UPDATE;
    IF v_status != 'Pending' THEN
      RETURN jsonb_build_object('success', false, 'error', 'Referral has already been processed.');
    END IF;
  END;

  -- 2. Lock and update referrer's wallet
  SELECT * INTO v_referrer_wallet FROM wallets WHERE user_id = p_referrer_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Referrer wallet not found.');
  END IF;

  IF p_commission_amount > 0 THEN
    UPDATE wallets 
    SET 
      balance = balance + p_commission_amount,
      total_earned = total_earned + p_commission_amount
    WHERE user_id = p_referrer_id;

    -- 3. Record transaction for referrer
    INSERT INTO transactions (
      user_id,
      reference_id,
      type,
      amount,
      status,
      metadata
    ) VALUES (
      p_referrer_id,
      'REF_COMM_' || extract(epoch from now())::text || '_' || substring(p_referral_id::text from 1 for 6),
      'REFERRAL_BONUS',
      p_commission_amount,
      'Completed',
      jsonb_build_object('note', 'Commission for referring a user who deposited')
    );
  END IF;

  -- 4. Mark referral as Active/Completed
  UPDATE referrals 
  SET 
    status = 'Active',
    commission_earned = p_commission_amount
  WHERE id = p_referral_id;

  RETURN jsonb_build_object('success', true);
EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;
