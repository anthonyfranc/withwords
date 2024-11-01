<template>
  <section class="py-24 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <UBadge color="primary" class="mb-4">Pricing</UBadge>
        <h2 class="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose the perfect plan for your development needs.
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div v-for="plan in plans" :key="plan.name"
          class="relative">
          <UCard
            :class="[
              'h-full transition-all duration-300 hover:scale-[1.02]',
              plan.popular ? 'border-primary-500 dark:border-primary-400' : ''
            ]"
          >
            <template #header>
              <div class="text-center">
                <h3 class="text-2xl font-bold">{{ plan.name }}</h3>
                <div class="mt-2 text-gray-600 dark:text-gray-400">{{ plan.description }}</div>
              </div>
            </template>

            <div class="text-center my-8">
              <span class="text-4xl font-bold">{{ plan.price }}</span>
              <span class="text-gray-600 dark:text-gray-400">/month</span>
            </div>

            <ul class="space-y-4 mb-8">
              <li v-for="feature in plan.features" :key="feature"
                class="flex items-center gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-primary-500" />
                <span>{{ feature }}</span>
              </li>
            </ul>

            <template #footer>
              <UButton
                :color="plan.popular ? 'primary' : 'gray'"
                block
                :ui="{ rounded: 'rounded-full' }"
              >
                {{ plan.buttonText }}
              </UButton>
            </template>
          </UCard>
          <UBadge
            v-if="plan.popular"
            color="primary"
            class="absolute -top-3 left-1/2 transform -translate-x-1/2"
          >
            Most Popular
          </UBadge>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const plans = [
  {
    name: 'Starter',
    description: 'Perfect for getting started',
    price: '$0',
    buttonText: 'Get Started',
    features: [
      '100 messages per month',
      'Basic code generation',
      'Community support',
      'Standard response time'
    ]
  },
  {
    name: 'Pro',
    description: 'For serious developers',
    price: '$29',
    buttonText: 'Start Free Trial',
    popular: true,
    features: [
      'Unlimited messages',
      'Advanced code generation',
      'Priority support',
      'Custom components',
      'API access'
    ]
  },
  {
    name: 'Team',
    description: 'For development teams',
    price: '$99',
    buttonText: 'Contact Sales',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom integrations',
      'Advanced analytics',
      'Enterprise support'
    ]
  }
]
</script>