<template>
  <!--Hero-->
  <ULandingHero :ui="{
    title: 'sm:text-4xl lg:text-6xl md:text-5xl text-3xl',
    description: 'font-thin',
  }" class="m:text-md">
    <template #headline>
      <UBadge variant="subtle" size="md"
        class="hover:bg-primary-100 dark:bg-primary/10 dark:hover:bg-primary/20 transition-color relative font-medium rounded-full shadow-none">
        <UIcon class="mr-1 w-4 h-4 pointer-events-none" name="i-heroicons-rocket-launch" />
        <span class="flex items-center gap-1">Beta Launching 2024</span>
      </UBadge>
    </template>
    <template #title>
      <span
        class="dark:bg-gradient-to-b dark:from-white dark:via-slate-50 dark:to-slate-400 dark:bg-clip-text dark:text-transparent">
        Your new go-to for <span class="text-primary-500">UI framework</span> <br />
        coding answers
      </span>
    </template>
    <template #description>
      Empower your development with instant, reliable coding insights. No searching, no confusion—just clear,
      <br class="hidden lg:block" />developer-friendly solutions for mastering UI frameworks.
    </template>
    <template #links>
      <UTooltip text="Coming Soon" :popper="{ placement: 'top', arrow: true }">
        <UButton label="Get Started" to="/" size="xl" icon="i-heroicons-arrow-right-20-solid" :trailing="true"
          color="black" :ui="{ rounded: 'rounded-full' }" />
      </UTooltip>
    </template>
    <HeroHomeBg />
    <TransitionRoot appear :show="true" enter="transition ease-out duration-1000" enter-from="opacity-0"
      enter-to="opacity-100" leave="transition ease-in duration-1000" leave-from="opacity-100" leave-to="opacity-0">
      <Gradient class="absolute inset-x-0 top-[1px] w-full block opacity-80" />
    </TransitionRoot>
  </ULandingHero>
  <!--End of Hero-->
  <!-- Icon Grid-->
  <ULandingSection class="-mt-32" title="Supported Frameworks" description="Discover the frameworks we support to enhance productivity and streamline your development process.">
    <ULandingLogos>
      <div class="flex flex-row flex-wrap gap-10 relative justify-center items-center h-full w-full">
        <span v-for="(icon, index) in landingLogos" :key="index">
          <UTooltip :text="icon.longName" :popper="{ arrow: true, placement: 'top' }" :ui="{
            base: '[@media(pointer:coarse)]:!block h-6 px-1 py-1 text-xs font-normal truncate relative',
            middot: 'hidden'
          }" class="h-8">
            <NuxtImg :src="colorMode.value === 'dark' ? icon.iconURLDark : icon.iconURLLight"
              :class="['transition duration-300 ease-in-out hover:scale-110 text-xl', { 'grayscale': icon.longName === 'Coming Soon' }]" />
          </UTooltip>
        </span>
      </div>
    </ULandingLogos>
  </ULandingSection>
  <!--End of Icon Grid-->
  <!-- Feature Cards using ULandingCard -->
  <ULandingSection class="!pt-0">
    <UPageGrid>
      <ULandingCard title="Instant Answers" description="Receive quick, precise responses with the help of advanced AI."
        icon="i-heroicons-bolt" color="primary" />

      <ULandingCard title="Practical Code Snippets"
        description="Explore ready-to-use code examples that are practical and actionable."
        icon="i-heroicons-code-bracket" color="primary" />

      <ULandingCard title="Relevant Solutions"
        description="Find accurate, context-specific answers tailored to your coding needs." icon="i-heroicons-eye"
        color="primary" />
      <ULandingCard title="Detailed Explanations"
        description="Learn not just the 'how' but also the 'why' with in-depth solution insights."
        icon="i-heroicons-book-open" color="primary" />

      <ULandingCard title="Personalized Assistance"
        description="Get responses tailored to your unique coding challenges and framework preferences."
        icon="i-heroicons-user" color="primary" />

      <ULandingCard title="Error Troubleshooting"
        description="Quickly identify and resolve coding errors with targeted support."
        icon="i-heroicons-exclamation-circle" color="primary" />

    </UPageGrid>
  </ULandingSection>

  <!-- Pricing Section using UPricingGrid and UPricingCard -->
  <UPageHero align="center">
    <template #title>
      Get answers without <span class="font-bold text-primary-500">breaking</span> the bank
    </template>
    <template #description>
      We provide developer friendly solutions with pricing plans for all needs, <br class="hidden lg:block" /> and a
      free tier for all users.
    </template>
  </UPageHero>
  <ULandingSection class="!pt-0" id="pricing">
    <UPricingGrid compact>
      <UPricingCard title="Free" description="Perfect for getting started" price="$0" cycle="/month" :highlight="false"
        :features="[
          '25 messages per month',
          'Basic chat features',
          'Community support'
        ]" :button="{ label: 'Get Started', to: '/auth/register' }" />

      <UPricingCard title="Indie" description="Perfect for small developers" price="$10" cycle="/month"
        :highlight="true" :scale="true" :features="[
          '500 messages per month',
          'Advanced chat features',
          'Custom chat history',
          'Priority support',
        ]" :button="{ label: 'Coming Soon', color: 'primary' }" :badge="{ label: 'Popular' }" />

      <UPricingCard title="Expert" description="Enough power to help you build" price="$25" cycle="/month"
        :highlight="false" :features="[
          'Unlimited messages',
          'Advanced chat features',
          'Custom chat history',
          'Webcontainer support w/ live previews'
        ]" :button="{ label: 'Coming Soon' }" />
    </UPricingGrid>
  </ULandingSection>
</template>

<script setup lang="ts">
import { TransitionRoot } from '@headlessui/vue'

// Example landing logos with light and dark mode URLs
const landingLogos = [
  {
    iconURLLight: './assets/nuxt-ui-light.svg',
    iconURLDark: './assets/nuxt-ui-dark.svg', longName: 'Nuxt UI'
  },
  {
    iconURLLight: './assets/nuxt-ui-pro-light.svg',
    iconURLDark: './assets/nuxt-ui-pro-dark.svg', longName: 'Coming Soon'
  }
]

// Reactive state for dark mode detection
const colorMode = useColorMode()
</script>