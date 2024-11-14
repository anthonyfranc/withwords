<template>
  <Header :user="user" @logout="signOut" :key="1" />
  <slot />
  <Footer />
</template>

<script setup lang="ts">
const { signOut, user } = useAuth()
</script>
