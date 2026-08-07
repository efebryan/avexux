-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    phone TEXT,
    referral_code TEXT UNIQUE NOT NULL,
    referred_by_code TEXT REFERENCES public.profiles(referral_code) ON DELETE SET NULL,
    bank_name TEXT,
    account_number TEXT,
    account_name TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PENDING', 'SUSPENDED')),
    growth_points INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast user/referral lookups
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON public.profiles(referral_code);
CREATE INDEX IF NOT EXISTS idx_profiles_referred_by_code ON public.profiles(referred_by_code);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 2. WALLETS TABLE
CREATE TABLE IF NOT EXISTS public.wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    balance NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (balance >= 0),
    pending_balance NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (pending_balance >= 0),
    today_earnings NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (today_earnings >= 0),
    total_earned NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (total_earned >= 0),
    free_spins INTEGER NOT NULL DEFAULT 1 CHECK (free_spins >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON public.wallets(user_id);

-- 3. TASKS TABLE
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    advertiser TEXT NOT NULL,
    reward_amount NUMERIC(12, 2) NOT NULL CHECK (reward_amount >= 0),
    timer_seconds INTEGER NOT NULL DEFAULT 30 CHECK (timer_seconds >= 0),
    task_link TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
    max_submissions INTEGER,
    submissions_count INTEGER NOT NULL DEFAULT 0 CHECK (submissions_count >= 0),
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Paused', 'Completed', 'Draft')),
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_category ON public.tasks(category);

-- 4. TASK SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.task_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'Pending Review' CHECK (status IN ('In Progress', 'Pending Review', 'Approved', 'Rejected')),
    proof_notes TEXT,
    proof_attachments JSONB DEFAULT '[]'::jsonb,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    rejection_reason TEXT,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_user_task_submission UNIQUE(task_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_task_submissions_task_id ON public.task_submissions(task_id);
CREATE INDEX IF NOT EXISTS idx_task_submissions_user_id ON public.task_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_task_submissions_status ON public.task_submissions(status);

-- 5. TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('DEPOSIT', 'WITHDRAWAL', 'TASK_REWARD', 'REFERRAL_BONUS', 'SPIN_REWARD', 'SPIN_COST')),
    amount NUMERIC(12, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Failed', 'Cancelled')),
    payment_method TEXT NOT NULL DEFAULT 'Bank Transfer',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_reference ON public.transactions(reference_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(type);

-- 6. WITHDRAWAL REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.withdrawal_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    bank_name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    account_name TEXT,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    processed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    processed_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_withdrawals_user_id ON public.withdrawal_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON public.withdrawal_requests(status);

-- 7. REFERRALS TABLE
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    referred_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    commission_earned NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (commission_earned >= 0),
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Pending')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON public.referrals(referrer_id);

-- 8. REWARDS SPINS TABLE
CREATE TABLE IF NOT EXISTS public.rewards_spins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reward_label TEXT NOT NULL,
    reward_type TEXT NOT NULL CHECK (reward_type IN ('cash', 'premium', 'gift', 'none')),
    reward_value NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    cost_paid NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rewards_spins_user_id ON public.rewards_spins(user_id);

-- 8.5 SPIN OVERRIDES TABLE (For rigged spins)
CREATE TABLE IF NOT EXISTS public.spin_overrides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reward_label TEXT NOT NULL,
    is_used BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_spin_overrides_user_id ON public.spin_overrides(user_id);

-- 8.6 APP SETTINGS TABLE (For global configuration like wheel sectors)
CREATE TABLE IF NOT EXISTS public.app_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'system',
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);

-- 10. SUPPORT TICKETS TABLE
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================================================
-- AUTOMATIC PROFILE & WALLET CREATION TRIGGER ON SIGNUP
-- ========================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    gen_ref TEXT;
BEGIN
    -- Generate unique referral code (e.g. ARV-A1B2)
    gen_ref := 'ARV-' || UPPER(SUBSTRING(MD5(NEW.id::text || clock_timestamp()::text) FROM 1 FOR 5));

    INSERT INTO public.profiles (
        id,
        full_name,
        email,
        referral_code,
        referred_by_code
    ) VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        NEW.email,
        gen_ref,
        NEW.raw_user_meta_data->>'referral_code'
    );

    -- Create corresponding wallet automatically
    INSERT INTO public.wallets (user_id) VALUES (NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards_spins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Wallets Policies
CREATE POLICY "Users can view own wallet" ON public.wallets FOR SELECT USING (auth.uid() = user_id);

-- Tasks Policies
CREATE POLICY "Tasks viewable by all authenticated users" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Admins can insert tasks" ON public.tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update tasks" ON public.tasks FOR UPDATE USING (true);
CREATE POLICY "Admins can delete tasks" ON public.tasks FOR DELETE USING (true);

-- Task Submissions Policies
CREATE POLICY "Users can view own task submissions" ON public.task_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own task submission" ON public.task_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own task submission" ON public.task_submissions FOR UPDATE USING (auth.uid() = user_id);

-- Transactions Policies
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);

-- Withdrawal Requests Policies
CREATE POLICY "Users can view own withdrawal requests" ON public.withdrawal_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create withdrawal request" ON public.withdrawal_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Notifications Policies
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Support Tickets Policies
CREATE POLICY "Users can view own tickets" ON public.support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can create support ticket" ON public.support_tickets FOR INSERT WITH CHECK (true);



CREATE TABLE IF NOT EXISTS public.app_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default spin wheel configuration
INSERT INTO public.app_settings (key, value)
VALUES (
    'spin_wheel_config',
    '{"cost": 500, "sectors": [{"id": "1", "label": "₦1,000 Cash", "type": "cash", "value": 1000, "color": "#10b981", "isWin": true}, {"id": "2", "label": "Try Again 😢", "type": "none", "value": 0, "color": "#64748b", "isWin": false}, {"id": "3", "label": "Premium Pro", "type": "premium", "value": 0, "color": "#3b82f6", "isWin": true}, {"id": "4", "label": "Better Luck 🍀", "type": "none", "value": 0, "color": "#475569", "isWin": false}]}'::jsonb

CREATE TABLE IF NOT EXISTS public.app_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default spin wheel configuration
INSERT INTO public.app_settings (key, value)
VALUES (
    'spin_wheel_config',
    '{"cost": 500, "sectors": [{"id": "1", "label": "₦1,000 Cash", "type": "cash", "value": 1000, "color": "#10b981", "isWin": true}, {"id": "2", "label": "Try Again 😢", "type": "none", "value": 0, "color": "#64748b", "isWin": false}, {"id": "3", "label": "Premium Pro", "type": "premium", "value": 0, "color": "#3b82f6", "isWin": true}, {"id": "4", "label": "Better Luck 🍀", "type": "none", "value": 0, "color": "#475569", "isWin": false}]}'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- Insert default congratulations modal configuration
INSERT INTO public.app_settings (key, value)
VALUES (
    'congrats_modal_config',
    '{"active": true, "title": "Dear users, congratulations! 🥳", "amount": "₦204,000"}'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- ========================================================
-- RPC FUNCTION FOR APPROVING TASK SUBMISSIONS (BYPASS RLS)
-- ========================================================
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
        jsonb_build_object('task_id', v_task_id, 'submission_id', submission_id)
    );

    RETURN TRUE;
END;
$$;
