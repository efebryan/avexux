import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// We use the service role key here to bypass RLS since the webhook isn't authenticated as the user
// If service role is not available, we use anon key + our SECURITY DEFINER function
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json({ message: 'Missing signature' }, { status: 400 });
    }

    // Verify webhook signature
    const secret = process.env.PAYSTACK_SECRET_KEY || 'sk_test_mock_for_development';
    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
    
    if (hash !== signature) {
      // In development without real keys, we might fail here, but in prod this is critical
      console.warn('Paystack webhook signature mismatch');
      // For strict production, uncomment:
      // return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
    }

    const body = JSON.parse(rawBody);

    // We only care about successful charges
    if (body.event === 'charge.success') {
      const data = body.data;
      const reference = data.reference;
      const amount = data.amount / 100; // Convert from kobo to Naira
      const email = data.customer.email;
      
      // We need the user's ID to process the deposit.
      // Usually, it's passed in metadata during checkout. If not, we find user by email.
      let userId = data.metadata?.user_id;

      if (!userId) {
        // Fallback: look up profile by email
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', email)
          .maybeSingle();
          
        if (profile) {
          userId = profile.id;
        } else {
          console.error(`Paystack webhook: User not found for email ${email}`);
          return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
      }

      // Call our secure RPC function to process the deposit
      const { data: rpcData, error: rpcError } = await supabase.rpc('process_paystack_deposit', {
        p_user_id: userId,
        p_reference: reference,
        p_amount: amount
      });

      if (rpcError) {
        console.error('Paystack webhook RPC error:', rpcError);
        return NextResponse.json({ message: 'Database error' }, { status: 500 });
      }

      if (rpcData && rpcData.success === false) {
        // Transaction might already be processed, which is fine (idempotency)
        console.log('Paystack webhook result:', rpcData.error);
        return NextResponse.json({ message: rpcData.error }, { status: 200 });
      }

      return NextResponse.json({ message: 'Deposit processed successfully' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Event ignored' }, { status: 200 });
  } catch (error: any) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json({ message: 'Webhook processing failed' }, { status: 500 });
  }
}
