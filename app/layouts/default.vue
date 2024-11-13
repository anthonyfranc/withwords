<template>
  <Header :user="loggedIn" @logout="signOut" />
  <slot />
  <Footer />
</template>

<script setup lang="ts">
const { signOut, loggedIn } = useAuth()
</script>
