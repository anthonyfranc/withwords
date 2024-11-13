import type { ChatMessage, ChatbaseResponse } from '~/utils/chatbase'
import { useChatbase } from '~/utils/chatbase'
import { markRaw } from 'vue'

export interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  preview?: {
    title?: string
    code?: string
  }
  suggestions?: string[]
}

const MIN_RESPONSE_DELAY = 1500

export const useChat = () => {
  const messages = ref<Message[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const conversationId = ref<string | undefined>(undefined)
  
  const chatbase = useChatbase()
  const config = useRuntimeConfig()
  const toast = useToast()

  const extractSuggestions = (content: string): string[] => {
    // Extract bullet points and numbered lists
    const bulletRegex = /^[•\-*]\s*(.+?)(?:\?|$)/gm
    const numberedRegex = /^\d+\.\s*(.+?)(?:\?|$)/gm
    
    const bulletMatches = Array.from(content.matchAll(bulletRegex) || [])
    const numberedMatches = Array.from(content.matchAll(numberedRegex) || [])
    
    const questions = [
      ...bulletMatches.map(match => match[1].trim()),
      ...numberedMatches.map(match => match[1].trim())
    ]

    return formatQuestions(questions)
  }

  const formatQuestions = (questions: string[]): string[] => {
    return questions
      .map(q => {
        // Clean up the question
        q = q.trim()
          .replace(/^["']|["']$/g, '') // Remove quotes
          .replace(/\s+/g, ' ') // Fix spacing
          .replace(/\*\*/g, '') // Remove markdown bold
          .replace(/\s*\?+/g, '?') // Fix question marks
          .trim()

        // Ensure it ends with a question mark
        if (!q.endsWith('?')) {
          q += '?'
        }

        // Ensure proper capitalization
        return q.charAt(0).toUpperCase() + q.slice(1)
      })
      .filter(q => {
        // Filter out invalid questions
        if (q.length < 5 || q.length > 150) return false
        if (q.includes('```') || q.includes('`')) return false
        if (q.includes('*')) return false
        
        // Filter out non-questions and meta-statements
        const invalidStarts = [
          'here are', 'these are', 'following are',
          'consider', 'you can', 'you may',
          'let me', 'please', 'note that',
          'customization', 'slots'
        ]
        return !invalidStarts.some(start => 
          q.toLowerCase().startsWith(start)
        )
      })
      // Remove duplicates (case-insensitive)
      .filter((q, i, arr) => 
        arr.findIndex(item => 
          item.toLowerCase() === q.toLowerCase()
        ) === i
      )
      // Limit to 5 questions
      .slice(0, 5)
  }

  const extractComponentPreview = (content: string) => {
    const codeBlockMatch = content.match(/```(?:vue|template|html)\n([\s\S]*?)\n```/)
    
    if (codeBlockMatch) {
      const code = codeBlockMatch[1].trim()
      return {
        title: 'Component Code',
        code
      }
    }
    return undefined
  }

  const cleanContent = (content: string): string => {
    return content
      // Remove code blocks that will be shown in preview
      .replace(/```(?:vue|template|html)\n[\s\S]*?\n```/g, '')
      // Remove the follow-up questions section and any variations
      .replace(/(?:Follow-Up Questions:|Questions:|Suggested Questions:)[\s\S]*?(?=\n\n|$)/gi, '')
      .replace(/(?:Here are|Consider|Some).*questions?.*:?[\s\S]*?(?=\n\n|$)/gi, '')
      // Remove any remaining bullet points at the end
      .replace(/\n\s*[•\-*]\s*.*$/gm, '')
      // Remove any remaining numbered points at the end
      .replace(/\n\s*\d+\.\s*.*$/gm, '')
      // Clean up extra newlines
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    if (!config.public.chatbaseApiKey || !config.public.chatbaseChatbotId) {
      error.value = 'Chatbase API credentials are not configured'
      toast.add({
        title: 'Configuration Error',
        description: 'Please check your Chatbase API credentials in .env file',
        color: 'red'
      })
      return
    }

    try {
      loading.value = true
      error.value = null

      const userMessage: Message = {
        id: Date.now(),
        role: 'user',
        content,
        timestamp: new Date()
      }
      messages.value.push(userMessage)

      const chatHistory: ChatMessage[] = messages.value.map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      if (!conversationId.value) {
        conversationId.value = `conv_${Date.now()}`
      }

      const [response] = await Promise.all([
        chatbase.sendMessage(chatHistory, conversationId.value),
        delay(MIN_RESPONSE_DELAY)
      ])
      
      if (response.error) {
        throw new Error(response.error)
      }

      const preview = extractComponentPreview(response.text)
      const suggestions = extractSuggestions(response.text)
      const cleanedContent = cleanContent(response.text)

      messages.value.push({
        id: Date.now(),
        role: 'assistant',
        content: cleanedContent,
        timestamp: new Date(),
        preview,
        suggestions
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to send message'
      toast.add({
        title: 'Error',
        description: error.value,
        color: 'red'
      })
      console.error('Chat error:', err)
    } finally {
      loading.value = false
    }
  }

  const resetChat = () => {
    messages.value = []
    conversationId.value = undefined
    error.value = null
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
    resetChat
  }
}