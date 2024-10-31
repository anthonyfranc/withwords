<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>
      
      <UCard>
        <UForm :state="formState" @submit="handleLogin">
          <div class="space-y-4">
            <UFormGroup label="Email" name="email">
              <UInput
                v-model="formState.email"
                type="email"
                autocomplete="email"
                required
              />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput
                v-model="formState.password"
                type="password"
                autocomplete="current-password"
                required
              />
            </UFormGroup>

            <div class="flex items-center justify-between">
              <UCheckbox v-model="rememberMe" label="Remember me" name="remember" />
              <NuxtLink
                to="/auth/reset-password"
                class="text-sm text-primary-600 hover:text-primary-500"
              >
                Forgot your password?
              </NuxtLink>
            </div>

            <UButton
              type="submit"
              block
              :loading="loading"
            >
              Sign in
            </UButton>
          </div>
        </UForm>

        <template #footer>
          <p class="text-center text-sm">
            Don't have an account?
            <NuxtLink
              to="/auth/register"
              class="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign up
            </NuxtLink>
          </p>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
const formState = ref({
  email: '',
  password: ''
})

const rememberMe = ref(false)
const loading = ref(false)
const client = useSupabaseClient()
const toast = useToast()

const handleLogin = async () => {
  try {
    loading.value = true
    const { data, error } = await client.auth.signInWithPassword({
      email: formState.value.email,
      password: formState.value.password
    })

    if (error) {
      // Check if the error is due to unverified email
      if (error.message.toLowerCase().includes('email not confirmed')) {
        localStorage.setItem('verificationEmail', formState.value.email)
        return navigateTo('/auth/verify')
      }
      throw error
    }

    // Store email in localStorage and redirect if not verified
    if (data.user && !data.user.email_verified) {
      localStorage.setItem('verificationEmail', data.user.email)
      toast.add({
        title: 'Email Not Verified',
        description: 'Please verify your email to continue.',
        color: 'orange'
      })
      return navigateTo('/auth/verify')
    }

    navigateTo('/dashboard')
  } catch (error) {
    toast.add({
      title: 'Error',
      description: error.message,
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

// Redirect if already logged in
const user = useSupabaseUser()
watchEffect(() => {
  if (user.value) {
    if (!user.value.email_verified) {
      localStorage.setItem('verificationEmail', user.value.email || '')
      navigateTo('/auth/verify')
    } else {
      navigateTo('/dashboard')
    }
  }
})

definePageMeta({
  layout: false
})
</script>