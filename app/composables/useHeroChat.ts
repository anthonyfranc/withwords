import { ref } from 'vue'

export const useHeroChat = () => {
  const messages = [
    {
      id: 1,
      isUser: true,
      text: "How do I create a responsive navbar with Nuxt UI?",
    },
    {
      id: 2,
      isUser: false,
      text: "Here's a responsive navbar using Nuxt UI components:",
      code: `<UHeader :links="links">
  <template #logo>
    <NuxtLink to="/">
      My App
    </NuxtLink>
  </template>
  
  <template #right>
    <UButton>
      Sign In
    </UButton>
  </template>
</UHeader>`
    },
    {
      id: 3,
      isUser: true,
      text: "Can you add a mobile menu to it?",
    },
    {
      id: 4,
      isUser: false,
      text: "Here's the navbar with a mobile menu:",
      code: `<UHeader :links="links">
  <template #panel>
    <UNavigationTree :links="links" />
  </template>
</UHeader>`
    }
  ]

  const visibleMessages = ref([])
  const chatContainer = ref(null)

  const scrollToBottom = (smooth = true) => {
    if (!chatContainer.value) return

    const container = chatContainer.value
    const scrollOptions = {
      top: container.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    }

    container.scrollTo(scrollOptions)
  }

  const simulateTyping = async (message: any, delay = 1000) => {
    visibleMessages.value.push({ ...message, isTyping: true })
    
    await new Promise(resolve => setTimeout(resolve, delay))
    
    const index = visibleMessages.value.length - 1
    visibleMessages.value[index] = message

    // Scroll after message is added
    nextTick(() => {
      scrollToBottom()
    })
  }

  const startChatAnimation = async () => {
    for (const message of messages) {
      await simulateTyping(message, message.isUser ? 800 : 1200)
    }
  }

  return {
    messages,
    visibleMessages,
    chatContainer,
    startChatAnimation,
    scrollToBottom
  }
}