<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold">Sign in to your account</h2>
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

    if (error) throw error

    // Check email confirmation using email_confirmed_at
    if (data.user && !data.user.email_confirmed_at) {
      localStorage.setItem('verificationEmail', data.user.email)
      return navigateTo('/auth/verify')
    }

    // If email is confirmed, redirect to dashboard
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

// Only redirect if user is logged in AND email is confirmed
const user = useSupabaseUser()
watchEffect(() => {
  if (user.value?.email_confirmed_at) {
    navigateTo('/dashboard')
  }
})

definePageMeta({
  layout: 'default'
})
</script>