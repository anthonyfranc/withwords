<template>
  <UHeader>
    <template #logo>
      <NuxtLink to="/" class="flex items-center space-x-2">
        <UIcon name="i-heroicons-chat-bubble-left-right" class="text-primary-500 w-6 h-6" />
        <h1 class="font-bold text-xl">NuxtUI Chat</h1>
      </NuxtLink>
    </template>
  </UHeader>
  <div class="h-screen flex flex-col items-center justify-center">
    <UCard class="max-w-lg w-full">
      <UForm :validate="validate" :state="state" @submit="onSubmit">
        <div class="flex gap-x-2 !mt-6 w-full">
          <UFormGroup label="First name" name="firstName" class="w-1/2">
            <UInput name="firstName" v-model="state.firstName" placeholder="John" class="flex-1" />
          </UFormGroup>
          <UFormGroup label="Last name" name="lastName" class="w-1/2">
            <UInput name="lastName" v-model="state.lastName" placeholder="Doe" class="flex-1" />
          </UFormGroup>
        </div>
        <UFormGroup label="Email" name="email" class="pt-2">
          <UInput name="email" v-model="state.email" placeholder="you@example.com" />
        </UFormGroup>

        <div class="flex gap-x-2 !mt-6">
          <UFormGroup label="Password" name="password" class="w-1/2">
            <UInput 
              name="password" 
              v-model="state.password" 
              placeholder="••••••••" 
              type="password"
              class="flex-1" 
              @input="updatePasswordStrength" 
            />
          </UFormGroup>
          <UFormGroup label="Confirm Password" name="confirmPassword" class="w-1/2">
            <UInput 
              name="confirmPassword" 
              v-model="state.confirmPassword" 
              placeholder="••••••••"
              type="password" 
              class="flex-1" 
            />
          </UFormGroup>
        </div>

        <UMeterGroup :max="80">
          <template #indicator>
            <div class="flex gap-1.5 justify-between text-sm pt-2">
              <p>Password Strength</p>
              <p class="text-gray-500 dark:text-gray-400">
                {{ strengthLabel }}
              </p>
            </div>
          </template>
          <UMeter 
            :value="passwordStrength" 
            label="Strength" 
            icon="i-heroicons-lock-closed" 
            :max="80" 
            :color="strengthColor" 
          />
        </UMeterGroup>

        <p class="text-sm !mt-4 !mb-4 text-center">
          By signing up, you agree to our 
          <NuxtLink to="/terms" class="text-primary font-medium">
            Terms of Service
          </NuxtLink>
        </p>
        
        <UButton 
          type="submit" 
          class="!mt-4 !mb-4" 
          block 
          :loading="loading" 
          :disabled="!canSend"
        >
          Create an account
        </UButton>
        
        <div class="text-sm font-light text-gray-500 dark:text-gray-300">
          <div class="py-1 text-center">
            Already have an account? 
            <NuxtLink to="/auth/login" class="text-primary font-medium">
              Login
            </NuxtLink>
          </div>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent, MeterColor } from '#ui/types'

const client = useSupabaseClient()
const toast = useToast()
const router = useRouter()

const loading = ref(false)
const passwordStrength = ref(0)
const strengthLabel = ref('Weak')
const strengthColor = ref<MeterColor>('red')

const state = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const canSend = computed(() => {
  return Boolean(
    state.firstName &&
    state.lastName &&
    state.email &&
    state.password &&
    state.confirmPassword &&
    passwordStrength.value >= 60 &&
    state.password === state.confirmPassword
  )
})

const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.firstName) errors.push({ path: 'firstName', message: ' ' })
  if (!state.lastName) errors.push({ path: 'lastName', message: ' ' })
  if (!state.email) errors.push({ path: 'email', message: ' ' })
  if (!state.password) errors.push({ path: 'password', message: ' ' })
  if (!state.confirmPassword) errors.push({ path: 'confirmPassword', message: ' ' })
  if (state.password !== state.confirmPassword) errors.push({ path: 'confirmPassword', message: ' ' })
  return errors
}

const updatePasswordStrength = () => {
  const password = state.password.trim()

  let score = 0

  if (password.length >= 12) {
    score += 30
  } else if (password.length >= 8) {
    score += 10
  }

  if (/[A-Z]/.test(password)) score += 20
  if (/[a-z]/.test(password)) score += 10
  if (/[0-9]/.test(password)) score += 20
  if (/[\W]/.test(password)) score += 20

  const commonPasswords = ['password', '123456', 'qwerty', 'abc123', 'admin', 'letmein']
  if (commonPasswords.some(commonPassword => password.toLowerCase().includes(commonPassword))) {
    score -= 40
  }

  if (/([a-zA-Z0-9])\1{2,}/.test(password)) {
    score -= 20
  }

  passwordStrength.value = score

  if (score <= 30) {
    strengthLabel.value = 'Very Weak'
    strengthColor.value = 'red'
  } else if (score <= 50) {
    strengthLabel.value = 'Weak'
    strengthColor.value = 'orange'
  } else if (score <= 70) {
    strengthLabel.value = 'Moderate'
    strengthColor.value = 'yellow'
  } else if (score <= 90) {
    strengthLabel.value = 'Strong'
    strengthColor.value = 'green'
  } else {
    strengthLabel.value = 'Very Strong'
    strengthColor.value = 'green'
  }
}

watch(() => state.password, (newPassword) => {
  if (!newPassword || newPassword === "") {
    passwordStrength.value = 0
    strengthLabel.value = 'Weak'
    strengthColor.value = 'red'
  } else {
    updatePasswordStrength()
  }
})

async function onSubmit(event: FormSubmitEvent<any>) {
  if (loading.value || !canSend.value) return

  loading.value = true
  try {
    const { data, error } = await client.auth.signUp({
      email: state.email,
      password: state.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          first_name: state.firstName,
          last_name: state.lastName
        }
      }
    })

    if (error) throw error

    // Store email in localStorage for verification page
    localStorage.setItem('verificationEmail', state.email)

    // Always redirect to verify page after signup
    toast.add({
      title: 'Success',
      description: 'Please check your email to verify your account.',
      color: 'green'
    })
    
    await router.push('/auth/verify')
  } catch (err) {
    console.error('Registration error:', err)
    toast.add({
      title: 'Error',
      description: err instanceof Error ? err.message : 'Failed to create account',
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
      router.push('/auth/verify')
    } else {
      router.push('/dashboard')
    }
  }
})

definePageMeta({
  layout: false,
  middleware: ['guest']
})
</script>