<template>
  <div
    :class="[
      'p-4 rounded-lg transition-all',
      message.role === 'user'
        ? 'bg-white dark:bg-gray-700 border dark:border-none shadow-sm'
        : 'bg-gray-200 dark:bg-gray-800 border dark:border-none shadow-sm'
    ]"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <UAvatar
          :icon="message.role === 'user' ? 'solar:user-bold' : 'solar:bolt-bold'"
          :class="{
            'ring-2': true,
            'ring-gray-300 dark:ring-gray-100': message.role === 'user' || message.role !== 'user'
          }"
        />
        <div>
          <span class="font-medium">
            {{ message.role === 'user' ? 'You' : 'Assistant' }}
          </span>
          <p class="text-xs text-gray-500">
            {{ formatTime(message.timestamp) }}
          </p>
        </div>
      </div>

      <!-- Message Actions -->
      <div v-if="message.role === 'assistant'" class="flex items-center space-x-2">
        <UButton
          v-if="isLatest"
          color="gray"
          variant="ghost"
          size="xs"
          icon="i-heroicons-arrow-path"
          :loading="regenerating"
          @click="$emit('regenerate')"
        >
          Regenerate
        </UButton>
      </div>
    </div>

    <!-- Main content -->
    <div 
      class="prose dark:prose-invert max-w-none [&_code:not(pre_code)]:text-primary-600 dark:[&_code:not(pre_code)]:text-primary-400 [&_code:not(pre_code)]:bg-gray-100 dark:[&_code:not(pre_code)]:bg-gray-700 [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded-md [&_code:not(pre_code)]:text-sm"
    >
      <VueMarkdown
        :source="processedContent"
        :options="{
          highlight: highlightCode
        }"
      />
    </div>

    <!-- Code Preview Section -->
    <div v-if="message.preview?.code" class="mt-4">
      <div class="relative">
        <div class="absolute right-2 top-2 z-10">
          <UButton
            size="xs"
            color="gray"
            variant="ghost"
            icon="i-heroicons-clipboard"
            @click="copyCode"
          />
        </div>
        <pre class="language-xml rounded-lg p-4 bg-gray-900 dark:bg-gray-950 text-sm overflow-x-auto"><code v-html="highlightedCode"></code></pre>
      </div>
    </div>

    <!-- Suggestions Section -->
    <div 
      v-if="message.suggestions?.length && message.role === 'assistant' && isLatest"
      class="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
    >
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Follow-Up Questions</h4>
      <div class="flex flex-col gap-2">
        <UButton
          v-for="suggestion in message.suggestions"
          :key="suggestion"
          color="gray"
          variant="soft"
          size="sm"
          class="justify-start text-left"
          @click="$emit('use-suggestion', suggestion)"
        >
          <template #leading>
            <UIcon name="i-heroicons-arrow-right-circle" class="flex-shrink-0" />
          </template>
          {{ suggestion }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueMarkdown from 'vue-markdown-render'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import 'highlight.js/styles/github-dark.css'

// Register the languages
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('css', css)

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  isLatest: {
    type: Boolean,
    default: false
  },
  regenerating: {
    type: Boolean,
    default: false
  }
})

const toast = useToast()

defineEmits(['use-suggestion', 'regenerate'])

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString()
}

const highlightCode = (code, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    return hljs.highlight(code, { language: lang }).value
  }
  return hljs.highlightAuto(code).value
}

const processedContent = computed(() => {
  let content = props.message.content
    .replace(/```(?:vue|template|html)\n[\s\S]*?\n```/g, '')
    // Remove the follow-up questions section completely
    .replace(/(?:Follow-Up Questions:?|Here are some follow-up questions:?|Suggested follow-up questions:?)[\s\S]*?(?=\n\n|$)/gi, '')
    // Clean up any double newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  
  // Remove any remaining "Here are some questions you might consider:" or similar phrases
  content = content.replace(/(?:Here are some|Some|Here are a few|Consider these)(?:\s+follow-?up)?(?:\s+questions?)(?:\s+(?:you|to|that|which|you might|you may|you could|you can|to))?(?:\s+consider)?:?(?=\n|$)/gi, '')
  
  return content.trim()
})

const highlightedCode = computed(() => {
  if (!props.message.preview?.code) return ''
  // Use XML highlighting for Vue templates
  return hljs.highlight(props.message.preview.code, { language: 'xml' }).value
})

const copyCode = () => {
  if (props.message.preview?.code) {
    navigator.clipboard.writeText(props.message.preview.code)
    toast.add({
      title: 'Code copied to clipboard',
      color: 'green'
    })
  }
}
</script>