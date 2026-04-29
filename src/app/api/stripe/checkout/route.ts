import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    // Verify session exists
    const { data: session, error } = await supabase
      .from('sessions')
      .select('id, email')
      .eq('id', sessionId)
      .single();

    if (error || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Check if Stripe price is configured
    const priceId = process.env.STRIPE_PRICE_BASIC;
    if (!priceId) {
      // Dev mode: skip payment, mark as paid directly
      await supabase
        .from('sessions')
        .update({ paid: true, paid_at: new Date().toISOString() })
        .eq('id', sessionId);
      return NextResponse.json({ url: null, devMode: true });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: session.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        sessionId,
      },
      success_url: `${appUrl}/results/${sessionId}?paid=true`,
      cancel_url: `${appUrl}/start`,
    });

    // Store Stripe session ID
    await supabase
      .from('sessions')
      .update({ stripe_session_id: checkoutSession.id })
      .eq('id', sessionId);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
