<template>
  <section class="relative py-24 overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main CTA Content -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <UBadge color="primary" class="mb-4">Join the Community</UBadge>
        <h2 class="text-4xl sm:text-5xl font-bold mb-6">
          Trusted by Leading Development Teams
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Join thousands of developers who are building better UIs faster with AI assistance.
        </p>
        <UButton
          size="xl"
          color="black"
          :ui="{ rounded: 'rounded-full' }"
          class="group"
        >
          <span class="flex items-center gap-2">
            Start Building Today
            <UIcon
              name="i-heroicons-arrow-right"
              class="w-5 h-5 transition-transform group-hover:translate-x-1"
            />
          </span>
        </UButton>
      </div>

      <!-- Logo Carousel -->
      <div class="relative max-w-2xl mx-auto overflow-hidden">
        <!-- Gradient Masks -->
        <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 dark:from-gray-900 via-gray-900 to-transparent z-10" />
        <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 dark:from-gray-900 via-gray-900 to-transparent z-10" />

        <!-- Logo Row for Infinite Loop -->
        <div class="flex animate-scroll" style="width: calc(200%);">
          <!-- Original set of logos -->
          <div v-for="logo in logos" :key="logo.id" class="flex-none w-32 h-12 transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-110 mx-4">
            <UIcon
              :name="logo.icon"
              class="w-full h-full text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-100"
            />
          </div>
          <!-- Duplicate set of logos to create the loop -->
          <div v-for="logo in logos" :key="`duplicate-${logo.id}`" class="flex-none w-32 h-12 transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-110 mx-4">
            <UIcon
              :name="logo.icon"
              class="w-full h-full text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const logos = [
  { id: 1, icon: 'i-simple-icons-nuxt' },
  { id: 2, icon: 'i-simple-icons-vuedotjs' },
  { id: 3, icon: 'i-simple-icons-tailwindcss' },
  { id: 4, icon: 'i-simple-icons-react' },
  { id: 5, icon: 'i-simple-icons-svelte' }
]
</script>

<style scoped>
.animate-scroll {
  animation: scroll 20s linear infinite;
  display: flex;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Pause animation on hover */
.animate-scroll:hover {
  animation-play-state: paused;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .animate-scroll {
    animation-duration: 10s;
  }
}
</style>
