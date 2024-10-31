<template>
  <header class="h-16 border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto h-full px-4 flex items-center justify-between">
      <div class="flex items-center space-x-6">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <UIcon name="i-heroicons-chat-bubble-left-right" class="text-primary-500 w-6 h-6" />
          <h1 class="font-bold text-xl">NuxtUI Chat</h1>
        </NuxtLink>
        <nav class="hidden md:flex items-center space-x-4">
          <UButton
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            variant="ghost"
          >
            {{ link.label }}
          </UButton>
        </nav>
      </div>

      <div class="flex items-center space-x-4">
        <template v-if="user">
          <UDropdown :items="userMenuItems">
            <UButton
              variant="ghost"
              trailing-icon="i-heroicons-chevron-down"
            >
              {{ user.email }}
            </UButton>
          </UDropdown>
        </template>
        <template v-else>
          <UButton
            to="/auth/login"
            variant="ghost"
          >
            Sign In
          </UButton>
          <UButton
            to="/auth/register"
            color="primary"
          >
            Sign Up
          </UButton>
        </template>
        <UColorModeButton />
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  links: {
    type: Array,
    default: () => []
  },
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['logout'])

const userMenuItems = computed(() => [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-squares-2x2',
    to: '/dashboard'
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/settings'
  },
  {
    label: 'Sign Out',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    click: () => emit('logout')
  }
])
</script>