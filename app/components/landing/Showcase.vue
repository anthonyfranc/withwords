<template>
  <section class="relative pb-24 overflow-hidden">
    <!-- Improved radial blur effect with responsive positioning -->
    <div class="absolute inset-0 w-full h-full pointer-events-none">
      <Gradient/>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-36">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Dashboard Preview -->
        <div class="relative order-2 lg:order-1">
          <div class="absolute inset-0 rounded-2xl" />
          <UCard class="relative border-0 shadow-sm dark:shadow-primary-900/10">
            <div class="space-y-4">
              <!-- Dashboard Header -->
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center space-x-3">
                  <UIcon name="i-heroicons-squares-2x2" class="w-6 h-6 text-primary-500" />
                  <h3 class="font-semibold">Dashboard</h3>
                </div>
                <UBadge color="primary">Pro</UBadge>
              </div>

              <!-- Usage Stats -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div class="text-sm text-gray-500 mb-1">Messages</div>
                  <div class="text-2xl font-bold">2,451</div>
                  <UProgress :value="70" color="primary" class="mt-2" />
                </div>
                <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div class="text-sm text-gray-500 mb-1">Saved Time</div>
                  <div class="text-2xl font-bold">12hrs</div>
                  <div class="text-sm text-primary-500 mt-2">↑ 24% this month</div>
                </div>
              </div>

              <!-- Recent Chats -->
              <div>
                <div class="text-sm text-gray-500 mb-3">Recent Conversations</div>
                <div class="space-y-2">
                  <div v-for="chat in recentChats" :key="chat.title"
                    class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div class="flex items-center space-x-3">
                      <UIcon :name="chat.icon" class="w-5 h-5 text-primary-500" />
                      <span class="text-sm">{{ chat.title }}</span>
                    </div>
                    <UBadge color="gray" variant="solid">
                      {{ chat.status }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Content -->
        <div class="order-1 lg:order-2">
          <UBadge color="primary" class="mb-4">Smart Dashboard</UBadge>
          <h2 class="text-3xl font-bold mb-6">Your AI Development Hub</h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Track your development progress, manage conversations, and access your code history all in one place.
          </p>
          <ul class="space-y-4">
            <li v-for="feature in features" :key="feature.title" class="flex items-center gap-3">
              <UIcon :name="feature.icon" class="w-6 h-6 text-primary-500" />
              <div>
                <div class="font-medium">{{ feature.title }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ feature.description }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const recentChats = [
  {
    title: 'Nuxt UI Navigation Setup',
    icon: 'i-heroicons-code-bracket',
    status: '1 day ago'
  },
  {
    title: 'Tailwind Animation Help',
    icon: 'i-heroicons-paint-brush',
    status: '2 weeks ago'
  },
  {
    title: 'Vue Component Optimization',
    icon: 'i-heroicons-cpu-chip',
    status: '1 month ago'
  }
]

const features = [
  {
    icon: 'i-heroicons-chart-bar',
    title: 'Usage Analytics',
    description: 'Track your development metrics and productivity improvements'
  },
  {
    icon: 'i-heroicons-clock',
    title: 'Chat History',
    description: 'Access and continue your previous conversations anytime'
  },
  {
    icon: 'i-heroicons-document-text',
    title: 'Code Library',
    description: 'Save and organize your frequently used code snippets'
  },
  {
    icon: 'i-heroicons-sparkles',
    title: 'Smart Suggestions',
    description: 'Get AI-powered recommendations based on your coding patterns'
  }
]
</script>

<style scoped>
/* Add responsive styles for the gradient positioning */
@media (max-width: 768px) {
  .bg-gradient-radial {
    mask-image: radial-gradient(circle at 50% 25%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 70%) !important;
    -webkit-mask-image: radial-gradient(circle at 50% 25%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 70%) !important;
  }
}
</style>