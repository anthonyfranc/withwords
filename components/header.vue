<template>
  <UHeader :links="links">
    <template #logo>
      <NuxtLink to="/" class="flex items-center gap-x-2">
        <UIcon name="solar:bolt-bold" class="w-6 h-6 mt-1 -mr-1 text-primary-500" />
        <span class="font-thin text-2xl">with</span><span class="font-bold text-2xl -ml-2">words</span>
      </NuxtLink>
    </template>

    <template #right>
      <template v-if="user">
        <UDropdown
          :items="userMenuItems"
          :popper="{ placement: 'bottom-end' }"
        >
          <UButton
            variant="ghost"
            trailing-icon="i-heroicons-chevron-down"
          >
            {{ user.email }}
          </UButton>

          <template #item="{ item }">
            <div class="flex items-center gap-x-2">
              <UIcon :name="item.icon" class="flex-shrink-0 w-4 h-4" />
              <span>{{ item.label }}</span>
            </div>
          </template>
        </UDropdown>
      </template>
      <template v-else>
        <UButton to="/auth/login" variant="solid" color="black" :ui="{ rounded: 'rounded-full' }">Get Started</UButton>
      </template>
      <UColorModeButton />
    </template>

    <template #panel>
      <UNavigationTree :links="links" />
    </template>
  </UHeader>
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

const userMenuItems = [
  [
    {
      label: 'Dashboard',
      icon: 'i-heroicons-squares-2x2',
      to: '/dashboard'
    },
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-6-tooth',
      to: '/settings'
    }
  ],
  [
    {
      label: 'Sign Out',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      click: () => logout()
    }
  ]
]

async function logout() {
  try {
    const { error } = await useSupabaseClient().auth.signOut()
    const toast = useToast()
    toast.add({
      title: 'Notification',
      description: error ? 'Unable to log you out. Try again.' : 'You have been logged out.',
      color: error ? 'red' : 'green'
    })
  } catch {
    useToast().add({
      title: 'Notification',
      description: 'An unexpected error occurred. Please try again.',
      color: 'red'
    })
  }
}
</script>
