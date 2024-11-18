<template>
  <!-- Hero Section -->
  <div class="relative  flex flex-col">
    <!-- Background Elements -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <!-- Base gradient -->
      <div class="absolute inset-0" />

      <!-- Radial blur effect -->
      <div class="absolute inset-0 flex items-left justify-left">
        <div
          class="w-4/6 h-full bg-gradient-radial from-primary-500/50 via-transparent to-transparent dark:from-primary-400/20 gpu dark:blur-[125px] blur-[125px]"
          style="mask-image: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%);">
        </div>
        <!-- Add bottom fade overlay -->
        <div
          class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t dark:from-gray-900 dark:from-gray-900 to-transparent">
        </div>
      </div>

      <!-- Accent gradients -->
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 dark:opacity-10">
        <div class="aspect-square h-96 rounded-full bg-gradient-to-br from-primary-500 to-purple-600" />
      </div>
      <div class="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20 dark:opacity-10">
        <div class="aspect-square h-96 rounded-full bg-gradient-to-br from-purple-600 to-primary-500" />
      </div>
    </div>
    <!-- Hero Content -->
    <div class="flex-1 flex items-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              class="inline-flex items-center rounded-full px-4 py-1 text-sm bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mb-6 border border-primary-200 dark:border-primary-800">
              <UIcon name="i-heroicons-sparkles" class="w-4 h-4 mr-2" />
              <span>AI-Powered Assistant</span>
            </div>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Your AI expert for
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-500">
                UI frameworks
              </span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Get instant, reliable answers for Nuxt UI, Tailwind, and other modern frameworks. Stop searching, start
              building.
            </p>
            <div class="flex flex-wrap gap-4">
              <UButton size="xl" color="black" :ui="{ rounded: 'rounded-full' }">
                Try it Free
                <UIcon name="i-heroicons-arrow-right" class="ml-2" />
              </UButton>
              <UButton size="xl" variant="solid" color="white" :ui="{ rounded: 'rounded-full' }">
                <UIcon name="i-heroicons-play-circle" class="mr-2" />
                See How It Works
              </UButton>
            </div>
            <div class="mt-8 flex items-center gap-6">
              <div class="flex items-center space-x-4">
                <div class="flex space-x-3 grayscale">
                  <NuxtImg src="https://raw.githubusercontent.com/nuxt/modules/main/icons/nuxt.svg" class="w-8 h-8" />
                  <NuxtImg src="https://raw.githubusercontent.com/nuxt/modules/main/icons/radix-vue.svg"
                    class="w-8 h-8" />
                  <NuxtImg src="https://ipx.nuxt.com/s_80,f_auto/gh/nuxt/modules/main/icons/tailwindcss.png"
                    class="w-9 h-9" />
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Supports popular UI frameworks
                </div>
              </div>
            </div>
          </div>
          <div class="relative lg:block hidden">
            <div
              class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-purple-600/5 dark:from-primary-500/10 dark:to-purple-600/10" />
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
                <!-- Chat Container -->
                <div class="relative">
                  <!-- Top Fade -->
                  <div
                    class="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white dark:from-gray-900 to-transparent z-10" />

                  <!-- Chat Messages -->
                  <div ref="chatContainer" class="h-[400px] overflow-y-auto hide-scrollbar">
                    <TransitionGroup name="chat" tag="div" class="space-y-4 px-2 pt-5 pb-5">
                      <div v-for="message in visibleMessages" :key="message.id" class="flex items-start gap-3">
                        <div class="flex-shrink-0">
                          <UAvatar :icon="message.isUser ? 'ooui:user-avatar' : 'mingcute:sparkles-2-fill'" size="sm"
                            :class="message.isUser ? '' : 'bg-gray-200'" :alt="message.isUser ? 'User' : 'AI'" />
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
                  <div
                    class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10" />
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- New Sections -->
  <LandingFeatures />
  <LandingShowcase />
  <LandingPricing />
</template>

<script setup>
const {
  visibleMessages,
  chatContainer,
  startChatAnimation
} = useHeroChat()

// Start chat animation on mount
onMounted(() => {
  startChatAnimation()
})

definePageMeta({
  layout: 'main'
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

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>