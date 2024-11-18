<template>
  <div class="min-h-[calc(100vh)] flex dark:bg-gray-950">
    <!-- Left Panel -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden order-last border-l dark:border-gray-900 bg-gray-50 dark:bg-gray-900/20">
      <div class="absolute inset-0 z-0 opacity-50 dark:opacity-100">
        <HeroHomeBg />
      </div>
      
      <div class="relative z-10 flex flex-col space-y-32 w-full p-12">
        <!-- Brand Section -->
        <div>
          <NuxtLink to="/">
          <div class="flex items-center gap-3 mb-12">
            <UIcon name="solar:bolt-bold" class="w-10 h-10 text-primary-500" />
            <span class="text-2xl font-bold">withwords</span>
          </div>
        </NuxtLink>
          <h1 class="text-4xl font-bold mb-4">Welcome to your AI development companion</h1>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Build better UI components faster with AI assistance
          </p>
        </div>

        <!-- Features List -->
        <div class="space-y-5">
          <div v-for="feature in features" :key="feature.title" class="flex items-start gap-3">
            <UIcon :name="feature.icon" class="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
            <div>
              <h3 class="font-medium mb-1">{{ feature.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
            </div>
          </div>
        </div>

        <!-- Trust Section -->
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Trusted by developers at
          </p>
          <div class="flex items-center gap-6">
            <img src="https://raw.githubusercontent.com/nuxt/modules/main/icons/nuxt.svg" class="h-6 grayscale opacity-75" />
            <img src="https://raw.githubusercontent.com/nuxt/modules/main/icons/tailwindcss.png" class="h-6 grayscale opacity-75" />
            <img src="https://raw.githubusercontent.com/nuxt/modules/main/icons/vue.svg" class="h-6 grayscale opacity-75" />
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel - Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <div class="text-center lg:text-left mb-8">
          <h2 class="text-2xl font-bold mb-2">Welcome</h2>
          <p class="text-gray-600 dark:text-gray-400">
            Sign in to continue building and learning with AI assistance.
          </p>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-1 gap-3 mb-6">
          <UButton
            color="white"
            variant="solid"
            class="relative flex items-center justify-center space-x-2"
            @click="() => {}"
          >
            <template #leading>
              <UIcon name="i-simple-icons-github" class="w-5 h-5" />
            </template>
            GitHub
          </UButton>
        </div>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white dark:bg-gray-950 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <!-- Login Form -->
        <UForm :state="formState" @submit="handleLogin" class="space-y-4">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="formState.email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              icon="i-heroicons-envelope"
              required
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="formState.password"
              type="password"
              autocomplete="current-password"
              placeholder="••••••••"
              icon="i-heroicons-lock-closed"
              required
            />
          </UFormGroup>

          <div class="flex items-center justify-between">
            <NuxtLink
              to="/auth/reset-password"
              class="text-sm text-primary-600 hover:text-primary-500 font-medium"
            >
              Forgot password?
            </NuxtLink>
          </div>

          <UButton
            type="submit"
            block
            :loading="loading"
          >
            Sign in
            <template #trailing>
              <UIcon name="i-heroicons-arrow-right" />
            </template>
          </UButton>
        </UForm>

        <p class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?
          <NuxtLink
            to="/auth/register"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign up for free
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    icon: 'i-heroicons-bolt',
    title: 'Lightning Fast Development',
    description: 'Get instant, production-ready code suggestions for your UI components.'
  },
  {
    icon: 'i-heroicons-code-bracket',
    title: 'Framework Agnostic',
    description: 'Works seamlessly with Nuxt, Vue, React, and other modern frameworks.'
  },
  {
    icon: 'i-heroicons-sparkles',
    title: 'AI-Powered Assistance',
    description: 'Smart suggestions and optimizations based on best practices.'
  }
]

const formState = ref({
  email: '',
  password: ''
})

const rememberMe = ref(false)
const loading = ref(false)
const auth = useAuth()
const toast = useToast()

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await auth.signIn.email({
      email: formState.value.email,
      password: formState.value.password
    })

    if (error) throw error
    
    // Store remember me preference
    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true')
      localStorage.setItem('userEmail', formState.value.email)
    } else {
      localStorage.removeItem('rememberMe')
      localStorage.removeItem('userEmail')
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

// Restore remembered email if exists
onMounted(() => {
  if (localStorage.getItem('rememberMe') === 'true') {
    rememberMe.value = true
    formState.value.email = localStorage.getItem('userEmail') || ''
  }
})

definePageMeta({
  auth: {
    only: "guest",
    redirectUserTo: "/dashboard",
  },
})
</script>