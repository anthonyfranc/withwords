<template>
  <div class="container mx-auto px-4 py-16">
    <UCard class="max-w-2xl mx-auto backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
      <template #header>
        <div class="text-center space-y-4">
          <UIcon
            name="i-heroicons-chat-bubble-left-right"
            class="w-16 h-16 mx-auto text-primary-500"
          />
          <h2 class="text-3xl font-bold">Welcome to NuxtUI Chat</h2>
          <p class="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Your AI assistant specialized in Nuxt and UI components. Ask anything about implementation, best practices, and modern design patterns.
          </p>
        </div>
      </template>

      <div class="space-y-6 mt-8">
        <UTextarea
          v-model="prompt"
          placeholder="Ask anything about Nuxt UI components..."
          :rows="4"
          class="w-full"
          autoresize
          :ui="{
            wrapper: 'relative flex ring-1 ring-gray-200 dark:ring-gray-800 focus-within:ring-2 focus-within:ring-primary-500 rounded-lg',
            input: 'block w-full rounded-lg placeholder-gray-400 dark:placeholder-gray-500'
          }"
        />
        <UButton
          size="xl"
          block
          color="primary"
          :loading="loading"
          @click="$emit('start', prompt)"
        >
          Start the Conversation
        </UButton>
      </div>

      <template #footer>
        <div class="flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <span class="flex items-center">
            <UIcon name="i-heroicons-bolt" class="w-4 h-4 mr-1" />
            Fast Responses
          </span>
          <span class="flex items-center">
            <UIcon name="i-heroicons-code-bracket" class="w-4 h-4 mr-1" />
            Code Examples
          </span>
          <span class="flex items-center">
            <UIcon name="i-heroicons-eye" class="w-4 h-4 mr-1" />
            Live Preview
          </span>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
const prompt = ref('')
const loading = ref(false)

defineEmits(['start'])
</script>