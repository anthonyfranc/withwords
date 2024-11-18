<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gray-50/50 dark:bg-gray-900/50">
    <div class="w-full max-w-2xl">
      <!-- Progress Steps -->
      <div class="mb-8">
        <div class="flex justify-between">
          <div v-for="(step, index) in steps" :key="step.title" 
            class="flex-1 relative">
            <div class="flex flex-col items-center">
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors',
                currentStep > index ? 'bg-primary-500 text-white' : 
                currentStep === index ? 'bg-primary-100 dark:bg-primary-900 text-primary-500' : 
                'bg-gray-100 dark:bg-gray-800 text-gray-400'
              ]">
                {{ index + 1 }}
              </div>
              <div class="text-xs mt-2 text-center">{{ step.title }}</div>
            </div>
            <div v-if="index < steps.length - 1" :class="[
              'absolute top-4 -right-1/2 w-full h-[2px] transition-colors',
              currentStep > index ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
            ]" />
          </div>
        </div>
      </div>

      <UCard class="relative overflow-hidden">
        <!-- Step Content -->
        <div class="relative min-h-[300px]">
          <TransitionGroup 
            name="fade-scale" 
            mode="out-in"
            class="relative"
            tag="div"
          >
            <!-- Account Details -->
            <div v-if="currentStep === 0" key="account" class="space-y-4 absolute inset-0">
              <div class="text-center mb-6">
                <h2 class="text-2xl font-bold">Create your account</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                  Let's get started with your journey
                </p>
              </div>

              <UFormGroup label="Email" name="email">
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="you@example.com"
                  icon="i-heroicons-envelope"
                />
              </UFormGroup>

              <div class="grid grid-cols-2 gap-4">
                <UFormGroup label="First name" name="firstName">
                  <UInput
                    v-model="state.firstName"
                    placeholder="John"
                    icon="i-heroicons-user"
                  />
                </UFormGroup>

                <UFormGroup label="Last name" name="lastName">
                  <UInput
                    v-model="state.lastName"
                    placeholder="Doe"
                    icon="i-heroicons-user"
                  />
                </UFormGroup>
              </div>
            </div>

            <!-- Password Setup -->
            <div v-if="currentStep === 1" key="password" class="space-y-4 absolute inset-0">
              <div class="text-center mb-6">
                <h2 class="text-2xl font-bold">Secure your account</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                  Create a strong password to protect your account
                </p>
              </div>

              <UFormGroup label="Password" name="password">
                <UInput
                  v-model="state.password"
                  type="password"
                  placeholder="••••••••"
                  icon="i-heroicons-lock-closed"
                  @input="updatePasswordStrength"
                />
              </UFormGroup>

              <UFormGroup label="Confirm Password" name="confirmPassword">
                <UInput
                  v-model="state.confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  icon="i-heroicons-lock-closed"
                />
              </UFormGroup>

              <UMeterGroup :max="80">
                <template #indicator>
                  <div class="flex gap-1.5 justify-between text-sm">
                    <p>Password Strength</p>
                    <p class="text-gray-500 dark:text-gray-400">{{ strengthLabel }}</p>
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
            </div>

            <!-- Final Step -->
            <div v-if="currentStep === 2" key="complete" class="space-y-4 absolute inset-0">
              <div class="text-center mb-6">
                <h2 class="text-2xl font-bold">Ready to go!</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-2">
                  Review your information and complete registration
                </p>
              </div>

              <div class="space-y-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Email</span>
                  <span class="font-medium">{{ state.email }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Name</span>
                  <span class="font-medium">{{ state.firstName }} {{ state.lastName }}</span>
                </div>
              </div>

              <p class="text-sm text-center text-gray-600 dark:text-gray-400">
                By clicking complete, you agree to our
                <NuxtLink to="/terms" class="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </NuxtLink>
              </p>
            </div>
          </TransitionGroup>
        </div>

        <!-- Navigation -->
        <div class="mt-6 flex justify-between">
          <UButton
            v-if="currentStep > 0"
            variant="ghost"
            @click="currentStep--"
          >
            Back
          </UButton>
          <UButton
            v-if="currentStep < 2"
            :disabled="!canProceed"
            @click="currentStep++"
            class="ml-auto"
          >
            Continue
          </UButton>
          <UButton
            v-else
            :loading="loading"
            :disabled="!canSend"
            @click="onSubmit"
            color="primary"
            class="ml-auto"
          >
            Complete Registration
          </UButton>
        </div>

        <!-- Footer -->
        <template #footer>
          <p class="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <NuxtLink to="/auth/login" class="text-primary-600 hover:text-primary-500 font-medium">
              Sign in
            </NuxtLink>
          </p>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent, MeterColor } from "#ui/types"

const steps = [
  { title: 'Account' },
  { title: 'Password' },
  { title: 'Complete' }
]

const currentStep = ref(0)
const auth = useAuth()
const toast = useToast()
const router = useRouter()

const loading = ref(false)
const passwordStrength = ref(0)
const strengthLabel = ref("Weak")
const strengthColor = ref<MeterColor>("red")

const state = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
})

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return state.firstName && state.lastName && state.email
  }
  if (currentStep.value === 1) {
    return state.password && 
           state.confirmPassword && 
           state.password === state.confirmPassword &&
           passwordStrength.value >= 60
  }
  return true
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

  const commonPasswords = [
    "password",
    "123456",
    "qwerty",
    "abc123",
    "admin",
    "letmein",
  ]
  if (commonPasswords.some((commonPassword) =>
    password.toLowerCase().includes(commonPassword)
  )) {
    score -= 40
  }

  if (/([a-zA-Z0-9])\1{2,}/.test(password)) {
    score -= 20
  }

  passwordStrength.value = Math.max(0, Math.min(100, score))

  if (score <= 30) {
    strengthLabel.value = "Very Weak"
    strengthColor.value = "red"
  } else if (score <= 50) {
    strengthLabel.value = "Weak"
    strengthColor.value = "orange"
  } else if (score <= 70) {
    strengthLabel.value = "Moderate"
    strengthColor.value = "yellow"
  } else if (score <= 90) {
    strengthLabel.value = "Strong"
    strengthColor.value = "green"
  } else {
    strengthLabel.value = "Very Strong"
    strengthColor.value = "green"
  }
}

watch(
  () => state.password,
  (newPassword) => {
    if (!newPassword || newPassword === "") {
      passwordStrength.value = 0
      strengthLabel.value = "Weak"
      strengthColor.value = "red"
    } else {
      updatePasswordStrength()
    }
  }
)

async function onSubmit(event: FormSubmitEvent<any>) {
  if (loading.value || !canSend.value) return

  loading.value = true
  try {
    const { error } = await auth.signUp.email({
      email: state.email,
      password: state.password,
      name: `${state.firstName} ${state.lastName}`,
    })

    if (error) throw error

    await router.push("/dashboard")
    
  } catch (err) {
    console.error("Registration error:", err)
    toast.add({
      title: "Error",
      description: err instanceof Error ? err.message : "Failed to create account",
      color: "red",
    })
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: "main",
  auth: {
    only: "guest",
    redirectUserTo: "/dashboard",
  },
})
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>