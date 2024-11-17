<template>
  <UContainer>
    <div class="py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <UButton
          to="/chat"
          color="primary"
        >
          Start Chatting
        </UButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Usage Stats -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">Usage</h3>
          </template>
          
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Messages This Month</p>
              <p class="text-2xl font-bold">{{ messageCount }} / {{ messageLimit }}</p>
              <UProgress
                :value="(messageCount / messageLimit) * 100"
                :color="messageCount > messageLimit * 0.9 ? 'red' : 'primary'"
                class="mt-2"
              />
            </div>
          </div>
        </UCard>

        <!-- Subscription Status -->
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-medium">Subscription</h3>
              <UBadge
                :color="subscriptionColor"
                :variant="subscription?.status === 'active' ? 'solid' : 'subtle'"
              >
                {{ subscriptionStatus }}
              </UBadge>
            </div>
          </template>
          
          <div class="space-y-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ subscriptionMessage }}
            </p>
            
            <UButton
              v-if="showManageButton"
              :to="subscription?.status === 'active' ? '/dashboard/billing' : '/pricing'"
              block
            >
              {{ subscription?.status === 'active' ? 'Manage Subscription' : 'Upgrade Plan' }}
            </UButton>
          </div>
        </UCard>

        <!-- Recent Chats -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium">Recent Chats</h3>
          </template>
          
          <div class="space-y-4">
            <div v-if="recentChats.length === 0" class="text-center py-4">
              <p class="text-gray-500 dark:text-gray-400">No recent chats</p>
              <UButton
                to="/chat"
                color="primary"
                variant="ghost"
                class="mt-2"
              >
                Start a new chat
              </UButton>
            </div>
            
            <div v-else class="space-y-2">
              <div
                v-for="chat in recentChats"
                :key="chat.id"
                class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              >
                <div class="flex items-center space-x-3">
                  <UIcon name="i-heroicons-chat-bubble-left-right" />
                  <div>
                    <p class="text-sm font-medium">{{ chat.title }}</p>
                    <p class="text-xs text-gray-500">
                      {{ new Date(chat.lastMessage).toLocaleDateString() }}
                    </p>
                  </div>
                </div>
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-arrow-right"
                  :to="`/chat/${chat.id}`"
                />
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
definePageMeta({
  auth: {
    only: "user",
    redirectGuestTo: "/",
  }
})

const messageCount = ref(0)
const messageLimit = ref(100)
const recentChats = ref([])

const { subscription } = useSubscription()

// Computed properties for subscription display
const subscriptionStatus = computed(() => {
  if (!subscription.value) return 'Free Plan'
  return subscription.value.status.charAt(0).toUpperCase() + subscription.value.status.slice(1)
})

const subscriptionColor = computed(() => {
  if (!subscription.value) return 'gray'
  switch (subscription.value.status) {
    case 'active':
      return 'primary'
    case 'trialing':
      return 'yellow'
    case 'past_due':
      return 'orange'
    case 'canceled':
      return 'red'
    default:
      return 'gray'
  }
})

const subscriptionMessage = computed(() => {
  if (!subscription.value) return 'You are currently on the free plan'
  
  if (subscription.value.status === 'active') {
    if (subscription.value.cancelAtPeriodEnd) {
      return `Your subscription will end on ${new Date(subscription.value.currentPeriodEnd).toLocaleDateString()}`
    }
    return `Your next billing date is ${new Date(subscription.value.currentPeriodEnd).toLocaleDateString()}`
  }
  
  return 'Upgrade to unlock premium features'
})

const showManageButton = computed(() => {
  return !subscription.value || ['active', 'trialing'].includes(subscription.value.status)
})

// Fetch dashboard data
const fetchDashboardData = async () => {
  try {
    const { data: usageData } = await useFetch('/api/usage')
    messageCount.value = usageData.value.messageCount
    messageLimit.value = usageData.value.messageLimit

    const { data: chatsData } = await useFetch('/api/chats/recent')
    recentChats.value = chatsData.value
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>