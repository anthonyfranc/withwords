<template>
  <div class="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 relative">
    <div 
      ref="messagesContainer"
      class="flex-1 overflow-y-auto p-4 scroll-container"
    >
      <div class="max-w-4xl mx-auto space-y-6">
        <ChatMessage
          v-for="(message, index) in messages"
          :key="message.id"
          :message="message"
          :is-latest="isLatestAssistantMessage(index)"
          :regenerating="loading && isLatestAssistantMessage(index)"
          @use-suggestion="handleSuggestion"
          @regenerate="regenerateLastResponse"
        />
        <ChatMessageSkeleton v-if="loading" />
      </div>
    </div>

    <!-- New Message Indicator -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-8 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-8 opacity-0"
    >
      <div
        v-if="showNewMessage"
        class="absolute bottom-20 left-1/2 transform -translate-x-1/2"
      >
        <UButton
          color="primary"
          variant="solid"
          size="sm"
          :ui="{ rounded: 'rounded-full' }"
          @click="scrollToLatest"
        >
          <template #leading>
            <UIcon name="i-heroicons-arrow-down-circle" />
          </template>
          New message
        </UButton>
      </div>
    </Transition>

    <div class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <div class="max-w-3xl mx-auto">
        <div class="flex gap-2">
          <UTextarea
            v-model="input"
            placeholder="Ask about Nuxt UI components..."
            :rows="2"
            class="flex-1"
            autoresize
            :disabled="loading"
            @keyup.enter.exact.prevent="sendMessage"
          />
          <UButton
            color="primary"
            :loading="loading"
            :disabled="!input.trim()"
            @click="sendMessage"
            :ui="{ rounded: 'rounded-lg' }"
          >
            <template #leading>
              <UIcon name="i-heroicons-paper-airplane" />
            </template>
            Send
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const input = ref('')
const messagesContainer = ref(null)
const { scrollToBottom, initScrollListener, showNewMessage } = useSmooth()

const emit = defineEmits(['send'])

const sendMessage = () => {
  if (!input.value.trim() || props.loading) return
  emit('send', input.value)
  input.value = ''
}

const handleSuggestion = (suggestion) => {
  if (props.loading) return
  input.value = suggestion
  sendMessage()
}

const regenerateLastResponse = () => {
  const lastUserMessage = [...props.messages]
    .reverse()
    .find(msg => msg.role === 'user')
  
  if (lastUserMessage) {
    emit('send', lastUserMessage.content)
  }
}

const scrollToLatest = () => {
  if (messagesContainer.value) {
    scrollToBottom(messagesContainer.value, { force: true })
  }
}

const isLatestAssistantMessage = (index) => {
  // Find the last assistant message
  const lastAssistantIndex = [...props.messages].reverse()
    .findIndex(msg => msg.role === 'assistant')
  
  // Get the actual index from the end
  const actualIndex = props.messages.length - 1 - lastAssistantIndex
  
  return index === actualIndex
}

// Watch for new messages or loading state changes
watch([() => props.messages.length, () => props.loading], () => {
  nextTick(() => {
    if (messagesContainer.value) {
      scrollToBottom(messagesContainer.value)
    }
  })
})

// Initialize scroll listener and scroll to bottom on mount
onMounted(() => {
  if (messagesContainer.value) {
    initScrollListener(messagesContainer.value)
    scrollToBottom(messagesContainer.value, { smooth: false })
  }
})
</script>

<style scoped>
.scroll-container {
  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: theme('colors.gray.400') theme('colors.gray.100');
}

/* For Webkit browsers */
.scroll-container::-webkit-scrollbar {
  width: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: theme('colors.gray.100');
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: theme('colors.gray.400');
  border-radius: 4px;
  border: 2px solid theme('colors.gray.100');
}

/* Dark mode */
:deep(.dark) .scroll-container {
  scrollbar-color: theme('colors.gray.600') theme('colors.gray.800');
}

:deep(.dark) .scroll-container::-webkit-scrollbar-track {
  background: theme('colors.gray.800');
}

:deep(.dark) .scroll-container::-webkit-scrollbar-thumb {
  background-color: theme('colors.gray.600');
  border-color: theme('colors.gray.800');
}
</style>