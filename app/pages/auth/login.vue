<template>
  <div class="min-h-[calc(100vh)] flex flex-col lg:flex-row">
    <!-- Left Panel - Login Form -->
    <div class="w-full lg:w-[580px] flex flex-col p-8 lg:p-12 border-r dark:border-gray-800">
      <div class="flex-1">
        <!-- Logo -->
        <NuxtLink to="/" class="inline-block mb-16">
          <div class="flex items-center gap-2">
            <UIcon name="solar:bolt-bold" class="w-8 h-8 text-primary-500" />
            <span class="font-semibold text-2xl">withwords</span>
          </div>
        </NuxtLink>

        <!-- Login Form -->
        <div class="mb-8">
          <h1 class="text-2xl font-semibold mb-2">Welcome back</h1>
          <p class="text-gray-500 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <UForm :state="formState" @submit="handleLogin" class="space-y-4">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="formState.email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              size="lg"
              required
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="formState.password"
              type="password"
              autocomplete="current-password"
              placeholder="••••••••"
              size="lg"
              required
            />
          </UFormGroup>

          <div class="flex pt-2">
            <NuxtLink
              to="/auth/reset-password"
              class="text-sm text-gray-500 hover:text-primary-500 transition-colors"
            >
              Forgot password?
            </NuxtLink>
          </div>

          <div class="pt-4">
            <UButton
              type="submit"
              size="lg"
              block
              :loading="loading"
            >
              Sign in to your account
            </UButton>
          </div>
        </UForm>

        <!-- Social Login -->
        <div class="mt-8">
          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-950 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <UButton
            color="white"
            variant="solid"
            size="lg"
            block
            class="mb-4"
          >
            <template #leading>
              <UIcon name="i-simple-icons-github" class="w-5 h-5" />
            </template>
            Continue with GitHub
          </UButton>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="pt-8 mt-auto text-center lg:text-start">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <NuxtLink
            to="/auth/register"
            class="text-primary-500 hover:text-primary-600 font-medium"
          >
            Create a free account
          </NuxtLink>
        </p>
      </div>
    </div>

    <!-- Right Panel - Feature Showcase -->
    <div class="hidden lg:flex flex-1 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-40 dark:opacity-100">
        <HeroHomeBg />
      </div>

      <div class="relative z-10 flex flex-col justify-center p-12 max-w-2xl mx-auto">
        <!-- Main Headline -->
        <div class="mb-12">
          <h2 class="text-3xl font-bold mb-4">Build faster with AI assistance</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Join thousands of developers using WithWords to accelerate their development workflow.
          </p>
        </div>

        <!-- Features List -->
        <div class="space-y-8">
          <div v-for="feature in features" :key="feature.title" 
            class="flex items-start gap-4 group">
            <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
              <UIcon :name="feature.icon" class="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <h3 class="font-medium mb-1 group-hover:text-primary-500 transition-colors">{{ feature.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
            </div>
          </div>
        </div>

        <!-- Social Proof -->
        <div class="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div class="flex items-center gap-4">
            <UAvatar
              src="https://i.pravatar.cc/64"
              size="lg"
              class="ring-4 ring-white dark:ring-gray-900"
            />
            <div>
              <p class="text-sm font-medium mb-1">"WithWords has transformed how we build UI components. The AI assistance is like having an expert developer by your side."</p>
              <div class="text-sm text-gray-500">Sarah Chen • Senior Frontend Developer at TechCorp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    icon: 'i-heroicons-cpu-chip',
    title: 'AI-Powered Development',
    description: 'Get intelligent code suggestions and real-time optimization recommendations as you build.'
  },
  {
    icon: 'i-heroicons-bolt',
    title: 'Lightning Fast Results',
    description: 'Transform your ideas into production-ready code in seconds, not hours.'
  },
  {
    icon: 'i-heroicons-academic-cap',
    title: 'Learn Best Practices',
    description: 'Understand modern development patterns and improve your coding skills as you work.'
  },
  {
    icon: 'i-heroicons-code-bracket',
    title: 'Framework Agnostic',
    description: 'Works seamlessly with your favorite frontend frameworks and development tools.'
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