import Stripe from 'stripe'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const body = await readBody(event)
  const { priceId } = body

  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecret)

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${getRequestURL(event).origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getRequestURL(event).origin}/pricing`,
      metadata: {
        userId: user.id
      }
    })

    return { url: session.url }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Failed to create checkout session'
    })
  }
})