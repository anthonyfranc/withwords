<template>
  <div class="container mx-auto px-4 py-16">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl font-bold mb-6">
        Welcome to NuxtUI Chat
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Your AI assistant for Nuxt and UI components
      </p>
      <div class="flex justify-center gap-4">
        <UButton
          to="/chat"
          size="xl"
        >
          Start Chatting
        </UButton>
        <UButton
          to="/pricing"
          variant="outline"
          size="xl"
        >
          View Plans
        </UButton>
      </div>
    </div>
  </div>
</template>