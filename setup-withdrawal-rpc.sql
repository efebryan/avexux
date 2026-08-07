-- RPC Function to Request a Withdrawal
CREATE OR REPLACE FUNCTION public.request_withdrawal(
    p_user_id UUID,
    p_amount NUMERIC,
    p_bank_name TEXT,
    p_account_number TEXT,
    p_account_name TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_balance NUMERIC;
    v_total_earned NUMERIC;
    v_total_past_withdrawals NUMERIC;
    v_withdrawable_balance NUMERIC;
    v_withdrawal_request_id UUID;
    v_transaction_id UUID;
BEGIN
    -- 1. Lock the wallet row to prevent race conditions
    SELECT balance, total_earned INTO v_balance, v_total_earned
    FROM public.wallets
    WHERE user_id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Wallet not found');
    END IF;

    -- 2. Calculate withdrawable balance
    -- We get all non-failed past withdrawals for the user
    SELECT COALESCE(SUM(amount), 0) INTO v_total_past_withdrawals
    FROM public.withdrawal_requests
    WHERE user_id = p_user_id AND status != 'Rejected';

    -- Withdrawable balance is the MIN of current balance and (total_earned - past_withdrawals)
    v_withdrawable_balance := LEAST(v_balance, v_total_earned - v_total_past_withdrawals);
    -- Ensure it's not negative
    IF v_withdrawable_balance < 0 THEN
        v_withdrawable_balance := 0;
    END IF;

    IF p_amount > v_withdrawable_balance THEN
        RETURN jsonb_build_object('success', false, 'error', 'Insufficient withdrawable earnings balance');
    END IF;

    -- 3. Deduct from wallet immediately
    UPDATE public.wallets
    SET balance = balance - p_amount,
        updated_at = now()
    WHERE user_id = p_user_id;

    -- 4. Record Withdrawal Request
    INSERT INTO public.withdrawal_requests (
        user_id, amount, bank_name, account_number, account_name, status
    ) VALUES (
        p_user_id, p_amount, p_bank_name, p_account_number, COALESCE(p_account_name, 'Unknown'), 'Pending'
    ) RETURNING id INTO v_withdrawal_request_id;

    -- 5. Record Transaction
    INSERT INTO public.transactions (
        reference_id, user_id, type, amount, status, metadata
    ) VALUES (
        'WD_' || v_withdrawal_request_id,
        p_user_id, 'WITHDRAWAL', p_amount, 'Pending', 
        jsonb_build_object('bank_name', p_bank_name, 'account_number', p_account_number)
    ) RETURNING id INTO v_transaction_id;

    RETURN jsonb_build_object('success', true, 'withdrawal_request_id', v_withdrawal_request_id);
END;
$$;


-- RPC Function for Admin to Process a Withdrawal (Approve/Reject)
CREATE OR REPLACE FUNCTION public.process_withdrawal(
    p_request_id UUID,
    p_admin_id UUID,
    p_status TEXT,
    p_reason TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_request RECORD;
BEGIN
    -- 1. Get and lock the withdrawal request
    SELECT * INTO v_request
    FROM public.withdrawal_requests
    WHERE id = p_request_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Withdrawal request not found');
    END IF;

    IF v_request.status != 'Pending' THEN
        RETURN jsonb_build_object('success', false, 'error', 'Request is already processed');
    END IF;

    -- 2. Process based on status
    IF p_status = 'Approved' THEN
        -- Update Request
        UPDATE public.withdrawal_requests
        SET status = 'Approved',
            processed_by = p_admin_id,
            processed_at = now()
        WHERE id = p_request_id;

        -- Update Transaction
        UPDATE public.transactions
        SET status = 'Completed'
        WHERE reference_id = 'WD_' || p_request_id;
        
    ELSIF p_status = 'Rejected' THEN
        -- Refund the wallet
        UPDATE public.wallets
        SET balance = balance + v_request.amount,
            updated_at = now()
        WHERE user_id = v_request.user_id;

        -- Update Request
        UPDATE public.withdrawal_requests
        SET status = 'Rejected',
            processed_by = p_admin_id,
            processed_at = now(),
            rejection_reason = p_reason
        WHERE id = p_request_id;

        -- Update Transaction
        UPDATE public.transactions
        SET status = 'Failed'
        WHERE reference_id = 'WD_' || p_request_id;
    ELSE
        RETURN jsonb_build_object('success', false, 'error', 'Invalid status');
    END IF;

    RETURN jsonb_build_object('success', true);
END;
$$;
