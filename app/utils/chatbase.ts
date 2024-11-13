import { UseFetchOptions } from 'nuxt/app'

const CHATBASE_API_URL = 'https://www.chatbase.co/api/v1'

export class ChatbaseError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'ChatbaseError'
  }
}

export interface ChatbaseConfig {
  apiKey: string
  chatbotId: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatbaseResponse {
  text: string
  error?: string
}

export const useChatbase = () => {
  const config = useRuntimeConfig()
  
  if (!config.public.chatbaseApiKey || !config.public.chatbaseChatbotId) {
    console.error('Missing Chatbase API credentials')
    throw new ChatbaseError('Chatbase API credentials are not configured')
  }

  const chatbaseConfig: ChatbaseConfig = {
    apiKey: config.public.chatbaseApiKey,
    chatbotId: config.public.chatbaseChatbotId
  }

  const fetchOptions: UseFetchOptions<ChatbaseResponse> = {
    baseURL: CHATBASE_API_URL,
    headers: {
      'Authorization': `Bearer ${chatbaseConfig.apiKey}`,
      'Content-Type': 'application/json'
    }
  }

  const sendMessage = async (
    messages: ChatMessage[],
    conversationId?: string
  ): Promise<ChatbaseResponse> => {
    try {
      const { data, error } = await useFetch('/chat', {
        ...fetchOptions,
        method: 'POST',
        body: {
          messages,
          chatbotId: chatbaseConfig.chatbotId,
          stream: false,
          temperature: 0.1,
          conversationId,
          model: 'gpt-4o'
        }
      })

      if (error.value) {
        console.error('Chatbase API error:', error.value)
        throw new ChatbaseError(
          error.value.message || 'Failed to send message',
          error.value?.status
        )
      }

      if (!data.value) {
        throw new ChatbaseError('No response received from Chatbase')
      }

      return data.value
    } catch (err) {
      console.error('Chatbase request error:', err)
      if (err instanceof ChatbaseError) {
        throw err
      }
      throw new ChatbaseError(
        err instanceof Error ? err.message : 'Unknown error occurred'
      )
    }
  }

  return {
    sendMessage
  }
}