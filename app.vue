<template>
  <UMain>
    <NuxtLoadingIndicator color="#00d266" :throttle="0" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications :ui="{ strategy: 'override', position: 'top-0 right-0' }" />
    <UModals />
  </UMain>
</template>

<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()

const headerLinks = [
  {
    label: 'Chat',
    to: '/chat',
    icon: 'i-heroicons-chat-bubble-left-right'
  },
  {
    label: 'Pricing',
    to: '/pricing',
    icon: 'i-heroicons-currency-dollar'
  }
]

const handleLogout = async () => {
  try {
    await client.auth.signOut()
    navigateTo('/auth/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Initialize auth state
onMounted(async () => {
  try {
    const { data: { session }, error } = await client.auth.getSession()
    if (error) throw error
    
    // Update user state if session exists
    if (session?.user) {
      user.value = session.user
    }
  } catch (error) {
    console.error('Session initialization error:', error)
  }
})
</script>