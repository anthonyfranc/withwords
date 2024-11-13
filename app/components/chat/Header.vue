<template>
  <header class="h-16 border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto h-full px-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <UButton
          v-if="showMenuButton"
          variant="ghost"
          icon="i-heroicons-bars-3"
          @click="$emit('toggle-sidebar')"
        />
        <NuxtLink to="/" class="flex items-center space-x-2">
          <UIcon name="i-heroicons-chat-bubble-left-right" class="text-primary-500 w-6 h-6" />
          <h1 class="font-bold text-xl">NuxtUI Chat</h1>
        </NuxtLink>
      </div>

      <div class="flex items-center space-x-2">
        <UButton
          variant="ghost"
          icon="i-heroicons-plus"
          @click="$emit('new-chat')"
        >
          New Chat
        </UButton>
          <UColorModeButton />
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  showMenuButton: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-sidebar', 'new-chat'])
</script>