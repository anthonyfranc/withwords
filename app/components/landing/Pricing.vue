<template>
  <ULandingSection
    title="Simple, Transparent Pricing"
    description="Choose the perfect plan for your development needs"
  >
    <UPricingGrid compact>
      <UPricingCard
        v-for="plan in plans"
        :key="plan.name"
        v-bind="plan"
        @click="selectPlan(plan)"
      />
    </UPricingGrid>

    <!-- FAQ Section -->
    <template #extra>
      <div class="mt-24 max-w-3xl mx-auto">
        <h3 class="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
        <UAccordion
          :items="faqs"
          :ui="{
            item: {
              padding: 'py-4',
              rounded: 'rounded-none',
              gap: 'gap-4'
            },
            default: {
              class: 'divide-y divide-gray-200 dark:divide-gray-800'
            }
          }"
        />
      </div>
    </template>
  </ULandingSection>
</template>

<script setup>
const plans = [
  {
    title: 'Free',
    description: 'Perfect for getting started',
    price: '$0',
    cycle: '/month',
    button: {
     color: 'white',
     label: 'Get Started'
    },
    features: [
      '100 messages per month',
      'Basic code generation',
      'Community support',
      'Standard response time'
    ]
  },
  {
    title: 'Pro',
    description: 'For serious developers',
    price: '$29',
    cycle: '/month',
    badge: {
      label: 'Most Popular'
    },
    button: {
      label: 'Coming Soon'
    },
    scale: true,
    highlight: true,
    features: [
      'Unlimited messages',
      'Advanced code generation',
      'Priority support',
      'Custom components',
      'API access'
    ]
  },
  {
    title: 'Enterprise',
    description: 'For large teams',
    price: 'Contact Us',
    button:{
      color: 'white',
      label: 'Contact Sales'
    },
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom integrations',
      'Advanced analytics',
      'Enterprise support',
      'SLA guarantee'
    ]
  }
]

const faqs = [
  {
    label: 'What happens when I reach my monthly message limit?',
    content: 'On the Free plan, you\'ll be notified when you reach your limit. You can upgrade to the Pro plan for unlimited messages or wait until your limit resets next month.',
    icon: 'i-heroicons-question-mark-circle'
  },
  {
    label: 'Can I switch between plans?',
    content: 'Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.',
    icon: 'i-heroicons-arrows-right-left'
  },
  {
    label: 'Do you offer a free trial of the Pro plan?',
    content: 'Yes, we offer a 14-day free trial of the Pro plan. No credit card required. You can try all Pro features without any commitment.',
    icon: 'i-heroicons-clock'
  },
  {
    label: 'What payment methods do you accept?',
    content: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay by invoice.',
    icon: 'i-heroicons-credit-card'
  },
  {
    label: 'Is there a long-term contract?',
    content: 'No, all our plans are month-to-month. You can cancel at any time without any cancellation fees or penalties.',
    icon: 'i-heroicons-document-text'
  }
]

const selectPlan = (plan) => {
  if (plan.name === 'Enterprise') {
    navigateTo('/contact')
  } else {
    navigateTo('/auth/login')
  }
}
</script>