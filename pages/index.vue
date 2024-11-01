<template>
  <!-- Hero Section -->
  <div class="relative min-h-screen flex flex-col">
    <!-- Background Elements -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 dark:opacity-10">
        <div class="aspect-square h-96 rounded-full bg-gradient-to-br from-primary-500 to-purple-600" />
      </div>
      <div class="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20 dark:opacity-10">
        <div class="aspect-square h-96 rounded-full bg-gradient-to-br from-purple-600 to-primary-500" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="relative border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <UIcon name="i-heroicons-bolt" class="w-8 h-8 text-primary-500" />
            <span class="ml-2 text-xl font-bold">withwords</span>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a v-for="link in navLinks" :key="link.text" :href="link.href" 
              class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition">
              {{ link.text }}
            </a>
            <UColorModeButton />
            <UButton color="black" :ui="{ rounded: 'rounded-full' }">Get Started</UButton>
          </div>
        </div>
      </div>
    </nav>
    <!-- Hero Content -->
    <div class="flex-1 flex items-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center rounded-full px-4 py-1 text-sm bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-6 border border-primary-100 dark:border-primary-800">
              <UIcon name="i-heroicons-sparkles" class="w-4 h-4 mr-2" />
              <span>AI-Powered Assistance</span>
            </div>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Your AI expert for
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">
                UI frameworks
              </span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Get instant, reliable answers for Nuxt UI, Tailwind, and other modern frameworks. Stop searching, start building.
            </p>
            <div class="flex flex-wrap gap-4">
              <UButton size="xl" color="black" :ui="{ rounded: 'rounded-full' }">
                Try it Free
                <UIcon name="i-heroicons-arrow-right" class="ml-2" />
              </UButton>
              <UButton size="xl" variant="ghost" :ui="{ rounded: 'rounded-full' }">
                <UIcon name="i-heroicons-play-circle" class="mr-2" />
                See How It Works
              </UButton>
            </div>
            <div class="mt-8 flex items-center gap-6">
              <div class="flex items-center space-x-4">
                <div class="flex space-x-3 grayscale">
                  <NuxtImg src="https://raw.githubusercontent.com/nuxt/modules/main/icons/nuxt.svg" class="w-8 h-8"/>   
                  <NuxtImg src="https://raw.githubusercontent.com/nuxt/modules/main/icons/radix-vue.svg" class="w-8 h-8"/>  
                  <NuxtImg src="https://ipx.nuxt.com/s_80,f_auto/gh/nuxt/modules/main/icons/tailwindcss.png" class="w-9 h-9" />
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Supports popular UI frameworks
                </div>
              </div>
            </div>
          </div>
          <div class="relative lg:block hidden">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-purple-600/5 dark:from-primary-500/10 dark:to-purple-600/10" />
            <UCard class="relative border-0 shadow dark:shadow-primary-900/10">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 rounded-full bg-red-500" />
                    <div class="w-3 h-3 rounded-full bg-yellow-500" />
                    <div class="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div class="text-sm text-gray-500">AI Chat</div>
                </div>
                <div class="space-y-4">
                  <!-- Animated Chat Messages -->
                  <TransitionGroup 
                    name="chat"
                    tag="div"
                    class="space-y-4"
                  >
                    <div v-for="message in visibleMessages" 
                      :key="message.id"
                      class="flex items-start gap-3"
                    >
                      <div class="flex-shrink-0">
                        <UAvatar
                          :icon="message.isUser ? 'ooui:user-avatar' : 'mingcute:sparkles-2-fill'"
                          size="sm"
                          :class="message.isUser ? '' : 'bg-gray-200'"
                          :alt="message.isUser ? 'User' : 'AI'"
                        />
                      </div>
                      <div :class="[
                        'rounded-lg p-3 text-sm',
                        message.isUser ? 'bg-gray-100 dark:bg-gray-800' : 'bg-primary-50 dark:bg-primary-900/50'
                      ]">
                        <span v-if="message.isTyping" class="typing-animation">
                          <span class="dot"></span>
                          <span class="dot"></span>
                          <span class="dot"></span>
                        </span>
                        <template v-else>
                          <div v-if="message.code" class="space-y-2">
                            {{ message.text }}
                            <UCard class="!mt-2 !mb-0 text-xs border border-primary-100 dark:border-primary-800">
                              <pre class="!mt-0 !mb-0"><code>{{ message.code }}</code></pre>
                            </UCard>
                          </div>
                          <div v-else>{{ message.text }}</div>
                        </template>
                      </div>
                    </div>
                  </TransitionGroup>
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- New Sections -->
  <Gradient class="-mb-28"/>
  <LandingFeatures/>
  <LandingShowcase />
  <LandingPricing />
</template>

<script setup>
const navLinks = [
  { text: 'Features', href: '#features' },
  { text: 'Pricing', href: '#pricing' },
  { text: 'Documentation', href: '#docs' },
  { text: 'Blog', href: '#blog' }
]

// Chat simulation data
const messages = [
  {
    id: 1,
    isUser: true,
    text: "How do I create a responsive navbar with Nuxt UI?",
  },
  {
    id: 2,
    isUser: false,
    text: "Here's a responsive navbar using Nuxt UI components:",
    code: `<UHeader :links="links">
  <template #logo>
    <NuxtLink to="/">
      My App
    </NuxtLink>
  </template>
  
  <template #right>
    <UButton>
      Sign In
    </UButton>
  </template>
</UHeader>`
  },
]

// Control visible messages for animation
const visibleMessages = ref([])
const currentIndex = ref(0)

// Function to simulate typing
const simulateTyping = async (message, delay = 1000) => {
  // Show typing indicator
  visibleMessages.value.push({ ...message, isTyping: true })
  
  // Wait for typing animation
  await new Promise(resolve => setTimeout(resolve, delay))
  
  // Replace typing indicator with actual message
  const index = visibleMessages.value.length - 1
  visibleMessages.value[index] = message
}

// Start chat animation on mount
onMounted(async () => {
  for (const message of messages) {
    await simulateTyping(message, message.isUser ? 800 : 1200)
  }
})

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.chat-enter-active,
.chat-leave-active {
  transition: all 0.3s ease;
}

.chat-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.chat-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.typing-animation {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.dot {
  width: 4px;
  height: 4px;
  background-color: currentColor;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
</style>