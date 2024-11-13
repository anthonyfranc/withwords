<template>
  <Header :user="user" @logout="signOut" />
  <slot />
  <Footer />
</template>

<script setup lang="ts">
const { signOut, loggedIn, user } = useAuth()
</script>
