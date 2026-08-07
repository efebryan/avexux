-- RPC to permanently delete a user from auth.users (cascades to all other tables)
-- This requires SECURITY DEFINER so that it can bypass RLS and delete from the auth schema.
-- It strictly verifies that the caller is an admin.

CREATE OR REPLACE FUNCTION public.delete_user_completely(p_user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  v_role TEXT;
  v_uid UUID;
BEGIN
  v_uid := auth.uid();
  SELECT role INTO v_role FROM public.profiles WHERE id = v_uid;

  -- Verify the caller is an admin
  IF v_role != 'admin' OR v_role IS NULL THEN
    RAISE EXCEPTION 'Unauthorized: Only admins can perform this action. (Role: %, UID: %)', COALESCE(v_role, 'NULL'), COALESCE(v_uid::text, 'NULL');
  END IF;

  -- Delete from auth.users (this will cascade to public.profiles, public.wallets, etc.)
  DELETE FROM auth.users WHERE id = p_user_id;

END;
$$;
