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
const { signOut, loggedIn } = useAuth()
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
    await signOut()
    navigateTo('/auth/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>