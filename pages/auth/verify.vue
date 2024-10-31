<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <UCard>
        <template #header>
          <div class="text-center">
            <UIcon
              name="i-heroicons-envelope"
              class="w-12 h-12 mx-auto text-primary-500"
            />
            <h2 class="mt-4 text-2xl font-bold">Check your email</h2>
          </div>
        </template>

        <div class="text-center space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            We've sent a verification link to:
          </p>
          <p class="font-medium text-lg">{{ verificationEmail }}</p>
          <p class="text-gray-600 dark:text-gray-400">
            Click the link in the email to verify your account.
          </p>
        </div>

        <template #footer>
          <div class="space-y-4">
            <div class="text-center">
              <p class="text-sm text-gray-500 mb-2">
                Didn't receive the email?
              </p>
              <UButton
                variant="ghost"
                :loading="resending"
                @click="resendVerification"
              >
                Resend verification email
              </UButton>
            </div>
            <div class="text-center">
              <UButton
                variant="link"
                to="/auth/login"
                class="text-sm"
              >
                Back to login
              </UButton>
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const toast = useToast()
const resending = ref(false)
const user = useSupabaseUser()

// Get email from user object first, fallback to localStorage
const verificationEmail = computed(() => {
  if (user.value?.email) {
    return user.value.email
  }
  return process.client ? localStorage.getItem('verificationEmail') : ''
})

const resendVerification = async () => {
  if (!verificationEmail.value) {
    toast.add({
      title: 'Error',
      description: 'No email address found. Please try logging in again.',
      color: 'red'
    })
    return navigateTo('/auth/login')
  }

  resending.value = true
  try {
    const { error } = await client.auth.resend({
      type: 'signup',
      email: verificationEmail.value,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) throw error

    toast.add({
      title: 'Success',
      description: 'Verification email has been resent. Please check your inbox.',
      color: 'green'
    })
  } catch (err) {
    console.error('Resend verification error:', err)
    toast.add({
      title: 'Error',
      description: err instanceof Error ? err.message : 'Failed to resend verification email',
      color: 'red'
    })
  } finally {
    resending.value = false
  }
}

// Redirect if user is already verified
watchEffect(() => {
  if (user.value?.email_confirmed_at) {
    navigateTo('/dashboard')
  }
})

definePageMeta({
  layout: 'default'
})
</script>