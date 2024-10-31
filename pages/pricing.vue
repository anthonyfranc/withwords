<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-4xl font-extrabold">Pricing Plans</h1>
      <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">
        Choose the perfect plan for your needs
      </p>
    </div>

    <div class="mt-16 max-w-7xl mx-auto grid gap-8 lg:grid-cols-3">
      <!-- Free Plan -->
      <UCard>
        <template #header>
          <h3 class="text-2xl font-bold">Free</h3>
          <p class="mt-2 text-gray-500">Perfect for getting started</p>
        </template>

        <div class="mt-4">
          <p class="text-4xl font-bold">$0</p>
          <p class="text-gray-500">/month</p>
        </div>

        <ul class="mt-6 space-y-4">
          <li class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="text-primary-500 mr-2" />
            <span>100 messages per month</span>
          </li>
          <li class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="text-primary-500 mr-2" />
            <span>Basic chat features</span>
          </li>
          <li class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="text-primary-500 mr-2" />
            <span>Community support</span>
          </li>
        </ul>

        <template #footer>
          <UButton
            v-if="!user"
            to="/auth/register"
            block
          >
            Get Started
          </UButton>
          <UButton
            v-else-if="subscription?.status !== 'active'"
            to="/chat"
            block
          >
            Start Chatting
          </UButton>
          <p
            v-else
            class="text-center text-sm text-gray-500"
          >
            Your current plan
          </p>
        </template>
      </UCard>

      <!-- Pro Plan -->
      <UCard class="border-primary-500 dark:border-primary-400">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold">Pro</h3>
              <p class="mt-2 text-gray-500">For power users</p>
            </div>
            <UBadge color="primary">Popular</UBadge>
          </div>
        </template>

        <div class="mt-4">
          <p class="text-4xl font-bold">$10</p>
          <p class="text-gray-500">/month</p>
        </div>

        <ul class="mt-6 space-y-4">
          <li class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="text-primary-500 mr-2" />
            <span>Unlimited messages</span>
          </li>
          <li class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="text-primary-500 mr-2" />
            <span>Advanced chat features</span>
          </li>
          <li class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="text-primary-500 mr-2" />
            <span>Priority support</span>
          </li>
          <li class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="text-primary-500 mr-2" />
            <span>Custom chat history</span>
          </li>
        </ul>

        <template #footer>
          <UButton
            v-if="!user"
            to="/auth/register"
            color="primary"
            block
          >
            Get Started
          </UButton>
          <UButton
            v-else-if="subscription?.status !== 'active'"
            color="primary"
            block
            :loading="loading"
            @click="subscribe('pro_monthly')"
          >
            Upgrade Now
          </UButton>
          <p
            v-else
            class="text-center text-sm text-gray-500"
          >
            Your current plan
          </p>
        </template>
      </UCard>

      <!-- Enterprise Plan -->
      <UCard>
        <template #header>
          <h3 class="text-2xl font-bold">Enterprise</h3>
          <p class="mt-2 text-gray-500">For large teams</p>
        </template>

        <div class="mt-4">
          <p class="text-4xl font-bold">Custom</p>
          <p class="text-gray-500">Contact us for pricing</p>
        </div>

        <ul class="mt-6 space-y-4">
          <li class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="text-primary-500 mr-2" />
            <span>Everything in Pro</span>
          </li>
          <li class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="text-primary-500 mr-2" />
            <span>Custom integrations</span>
          </li>
          <li class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="text-primary-500 mr-2" />
            <span>Dedicated support</span>
          </li>
          <li class="flex items-center">
            <UIcon name="i-heroicons-check-circle" class="text-primary-500 mr-2" />
            <span>SLA guarantee</span>
          </li>
        </ul>

        <template #footer>
          <UButton
            variant="outline"
            block
            to="mailto:sales@example.com"
          >
            Contact Sales
          </UButton>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const { subscription, loading, createCheckoutSession } = useSubscription()

const subscribe = async (priceId: string) => {
  if (!user.value) {
    return navigateTo('/auth/login')
  }
  await createCheckoutSession(priceId)
}
</script>