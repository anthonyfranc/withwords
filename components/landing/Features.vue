<template>
  <section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <UBadge color="primary" class="mb-4">Features</UBadge>
        <h2 class="text-4xl font-bold mb-4">Everything you need</h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Powerful features to help you build better UI components faster
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        <!-- Main Feature -->
        <div class="lg:col-span-2 lg:row-span-2">
          <div class="group h-full">
            <UCard class="h-full transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary-900/10 relative overflow-hidden">
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-600/5 dark:from-primary-500/10 dark:to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div class="h-full flex flex-col">
                <div class="flex items-center gap-3 mb-4">
                  <UIcon name="i-heroicons-code-bracket" class="w-6 h-6 text-primary-500" />
                  <h3 class="text-xl font-semibold">AI Code Generation</h3>
                </div>

                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  Get instant, production-ready code for your UI components. Our AI understands context and follows best practices.
                </p>

                <div class="flex-grow relative mt-6">
                  <UCard class="!border-primary-100 dark:!border-primary-900 !shadow-none">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex space-x-2">
                        <div class="w-3 h-3 rounded-full bg-red-500" />
                        <div class="w-3 h-3 rounded-full bg-yellow-500" />
                        <div class="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <span class="text-xs text-gray-500">component.vue</span>
                    </div>
                    <pre class="text-sm"><code class="language-vue">&lt;template&gt;
  &lt;UButton
    color="primary"
    :loading="loading"
    @click="handleAction"
  &gt;
    {{ text }}
  &lt;/UButton&gt;
&lt;/template&gt;</code></pre>
                  </UCard>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Secondary Features -->
        <template v-for="feature in features" :key="feature.title">
          <div class="group">
            <UCard class="h-full transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary-900/10">
              <div class="flex flex-col h-full">
                <div class="flex items-center gap-3 mb-4">
                  <UIcon :name="feature.icon" class="w-5 h-5 text-primary-500" />
                  <h3 class="text-lg font-medium">{{ feature.title }}</h3>
                </div>

                <p class="text-gray-600 dark:text-gray-400 mb-4">{{ feature.description }}</p>

                <div class="mt-auto">
                  <component :is="feature.visual" />
                </div>
              </div>
            </UCard>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: 'i-heroicons-sparkles',
    title: 'Smart Suggestions',
    description: 'Get intelligent recommendations based on your coding patterns and best practices.',
    visual: defineComponent({
      template: `
        <div class="flex gap-2">
          <UBadge color="gray" variant="subtle">Tailwind</UBadge>
          <UBadge color="gray" variant="subtle">Vue</UBadge>
          <UBadge color="gray" variant="subtle">React</UBadge>
        </div>
      `
    })
  },
  {
    icon: 'i-heroicons-arrow-path',
    title: 'Real-time Preview',
    description: 'See your components come to life instantly with live preview and hot reloading.',
    visual: defineComponent({
      template: `
        <div class="flex justify-end">
          <UIcon name="i-heroicons-play-circle" class="w-8 h-8 text-primary-500" />
        </div>
      `
    })
  },
  {
    icon: 'i-heroicons-document-duplicate',
    title: 'Component Library',
    description: 'Access a vast library of pre-built components and customize them to your needs.',
    visual: defineComponent({
      template: `
        <div class="grid grid-cols-3 gap-2">
          <div class="h-8 rounded bg-gray-100 dark:bg-gray-800"></div>
          <div class="h-8 rounded bg-gray-100 dark:bg-gray-800"></div>
          <div class="h-8 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
      `
    })
  },
  {
    icon: 'i-heroicons-cpu-chip',
    title: 'Performance Optimization',
    description: 'Get suggestions for improving your component\'s performance and accessibility.',
    visual: defineComponent({
      template: `
        <div class="flex items-center justify-end gap-2">
          <div class="w-16 h-2 rounded-full bg-primary-500/20"></div>
          <div class="w-8 h-2 rounded-full bg-primary-500/40"></div>
          <div class="w-4 h-2 rounded-full bg-primary-500"></div>
        </div>
      `
    })
  }
]
</script>

<style scoped>
:deep(pre) {
  margin: 0;
  padding: 0;
}

:deep(code) {
  @apply text-gray-800 dark:text-gray-200;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>