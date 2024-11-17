import { z } from 'zod'

export const SubscriptionStatus = z.enum([
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'trialing',
  'unpaid'
])

export type SubscriptionStatus = z.infer<typeof SubscriptionStatus>

export interface Subscription {
  id: string
  status: SubscriptionStatus
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
}

export const useSubscription = () => {
  const subscription = ref<Subscription | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchSubscription = async () => {
    try {
      loading.value = true
      const { data, error: apiError } = await useFetch('/api/subscription')
      
      if (apiError.value) throw new Error(apiError.value.message)
      
      subscription.value = data.value as unknown as Subscription
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch subscription'
      console.error('Subscription error:', err)
    } finally {
      loading.value = false
    }
  }

  const createCheckoutSession = async (priceId: string) => {
    try {
      loading.value = true
      const { data, error: apiError } = await useFetch('/api/checkout', {
        method: 'POST',
        body: { priceId }
      })

      if (apiError.value) throw new Error(apiError.value.message)

      // Redirect to Stripe Checkout
      window.location.href = data.value.url
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create checkout session'
      console.error('Checkout error:', err)
    } finally {
      loading.value = false
    }
  }

  const cancelSubscription = async () => {
    try {
      loading.value = true
      const { error: apiError } = await useFetch('/api/subscription/cancel', {
        method: 'POST'
      })

      if (apiError.value) throw new Error(apiError.value.message)

      await fetchSubscription()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel subscription'
      console.error('Cancel subscription error:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch subscription on mount if user is authenticated
  const user = useAuth()
  watch(user, (newUser) => {
    if (newUser) {
      fetchSubscription()
    } else {
      subscription.value = null
    }
  }, { immediate: true })

  return {
    subscription,
    loading,
    error,
    fetchSubscription,
    createCheckoutSession,
    cancelSubscription
  }
}