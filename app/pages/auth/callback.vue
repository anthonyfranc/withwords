<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <UCard>
      <div class="text-center">
        <UIcon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 mx-auto animate-spin text-primary-500"
        />
        <p class="mt-4">Verifying your account...</p>
      </div>
    </UCard>
  </div>
</template>

<script setup>
const client = useSupabaseClient()

onMounted(async () => {
  try {
    const { error } = await client.auth.getSession()
    if (error) throw error
    
    // Redirect to dashboard after successful verification
    navigateTo('/dashboard')
  } catch (error) {
    console.error('Auth callback error:', error)
    navigateTo('/auth/login')
  }
})
</script>