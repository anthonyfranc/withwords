<template>
  <Header :user="user" @logout="handleLogout" />
  <slot />
  <Footer />
</template>

<script setup>

const user = useSupabaseUser()
const client = useSupabaseClient()

// Event handler for logout
const handleLogout = async () => {
  await client.auth.signOut()
  navigateTo('/auth/login')
}
</script>
