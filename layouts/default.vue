<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
    <UHeader
      :links="headerLinks"
      :user="user"
      @logout="handleLogout"
    />
    <slot />
    <UFooter />
  </div>
</template>

<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()

const headerLinks = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Chat',
    to: '/chat'
  },
  {
    label: 'Pricing',
    to: '/pricing'
  }
]

const handleLogout = async () => {
  await client.auth.signOut()
  navigateTo('/auth/login')
}
</script>