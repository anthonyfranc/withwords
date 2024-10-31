<template>
  <div>
    <ChatHeader
      :show-menu-button="chatStarted"
      @toggle-sidebar="toggleSidebar"
      @new-chat="newChat"
    />

    <ChatWelcome
      v-if="!chatStarted"
      @start="startChat"
    />

    <div v-else class="h-[calc(100vh-64px)] flex">
      <ChatSidebar
        v-show="showSidebar"
        :messages="messages"
        :selected-chat="selectedChat"
        @select-chat="selectChat"
      />

      <ChatMessages
        :messages="messages"
        :loading="loading"
        @send="sendMessage"
        @preview="updatePreview"
      />

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <ChatPreview
          v-if="currentPreview?.code"
          :current-preview="currentPreview"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup>
const showSidebar = ref(true)
const selectedChat = ref(-1)
const currentPreview = ref(null)
const chatStarted = ref(false)

const {
  messages,
  loading,
  error,
  sendMessage,
  resetChat
} = useChat()

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const startChat = async (prompt) => {
  if (!prompt.trim()) return
  chatStarted.value = true
  await sendMessage(prompt)
}

const selectChat = (index) => {
  selectedChat.value = index
  currentPreview.value = null
}

const updatePreview = (preview) => {
  currentPreview.value = preview
}

const newChat = () => {
  resetChat()
  chatStarted.value = false
  selectedChat.value = -1
  currentPreview.value = null
}

// Watch for errors and show notifications
watch(() => error.value, (newError) => {
  if (newError) {
    useToast().add({
      title: 'Error',
      description: newError,
      color: 'red'
    })
  }
})
</script>