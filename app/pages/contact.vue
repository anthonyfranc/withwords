<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <div class="relative py-12 lg:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4">Get in Touch</h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div class="grid lg:grid-cols-3 gap-12">
        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Contact Cards -->
          <UCard v-for="item in contactInfo" :key="item.title">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <UIcon 
                  :name="item.icon" 
                  class="w-6 h-6 text-primary-500"
                />
              </div>
              <div>
                <h3 class="font-medium mb-1">{{ item.title }}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm">{{ item.description }}</p>
                <a 
                  v-if="item.link" 
                  :href="item.link" 
                  class="text-primary-500 hover:text-primary-600 text-sm mt-1 block"
                >
                  {{ item.linkText }}
                </a>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <UCard>
            <UForm :state="formState" class="space-y-6" @submit="onSubmit">
              <!-- Name Fields -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormGroup label="First name" name="firstName">
                  <UInput v-model="formState.firstName" />
                </UFormGroup>

                <UFormGroup label="Last name" name="lastName">
                  <UInput v-model="formState.lastName" />
                </UFormGroup>
              </div>

              <!-- Email -->
              <UFormGroup label="Email" name="email">
                <UInput v-model="formState.email" type="email" />
              </UFormGroup>

              <!-- Subject -->
              <UFormGroup label="Subject" name="subject">
                <USelect
                  v-model="formState.subject"
                  :options="subjects"
                />
              </UFormGroup>

              <!-- Message -->
              <UFormGroup label="Message" name="message">
                <UTextarea
                  v-model="formState.message"
                  :rows="6"
                  placeholder="How can we help you?"
                />
              </UFormGroup>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <UButton
                  type="submit"
                  color="primary"
                  :loading="loading"
                >
                  Send Message
                </UButton>
              </div>
            </UForm>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(false)
const toast = useToast()

const formState = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const subjects = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Technical Support', value: 'support' },
  { label: 'Billing Question', value: 'billing' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Other', value: 'other' }
]

const contactInfo = [
  {
    icon: 'i-heroicons-envelope',
    title: 'Email',
    description: 'Our team will respond within 24 hours.',
    link: 'mailto:support@example.com',
    linkText: 'support@example.com'
  },
  {
    icon: 'i-heroicons-document-text',
    title: 'Documentation',
    description: 'Find answers in our detailed documentation.',
    link: '/docs',
    linkText: 'Visit Documentation'
  }
]

const onSubmit = async () => {
  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.add({
      title: 'Success',
      description: 'Your message has been sent. We\'ll get back to you soon!',
      color: 'green'
    })

    // Reset form
    Object.keys(formState).forEach(key => {
      formState[key] = ''
    })
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to send message. Please try again.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'main',
  auth: false
})
</script>