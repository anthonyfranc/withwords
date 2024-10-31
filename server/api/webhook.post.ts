import Stripe from 'stripe'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecret)
  const signature = getHeader(event, 'stripe-signature')

  if (!signature) {
    throw createError({
      statusCode: 400,
      message: 'Missing stripe-signature header'
    })
  }

  try {
    const body = await readRawBody(event)
    const stripeEvent = stripe.webhooks.constructEvent(
      body!,
      signature,
      config.stripeWebhookSecret
    )

    const client = await serverSupabaseClient(event)

    switch (stripeEvent.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object
        const userId = subscription.metadata.userId

        await client
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000),
            cancel_at_period_end: subscription.cancel_at_period_end
          })

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object
        const userId = subscription.metadata.userId

        await client
          .from('subscriptions')
          .delete()
          .eq('stripe_subscription_id', subscription.id)

        break
      }
    }

    return { received: true }
  } catch (err) {
    throw createError({
      statusCode: 400,
      message: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`
    })
  }
})