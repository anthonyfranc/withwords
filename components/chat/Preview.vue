<template>
  <div class="w-96 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <div class="p-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">Code Preview</h3>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-arrows-pointing-out"
          @click="toggleFullscreen"
        />
      </div>
      <div
        class="border border-gray-200 dark:border-gray-800 rounded-lg p-4 overflow-auto"
        :class="{ 'h-[calc(100vh-8rem)]': isFullscreen, 'h-[calc(100vh-10rem)]': !isFullscreen }"
      >
        <ClientOnly>
          <div v-if="preview" class="space-y-4">
            <div class="flex justify-between items-center">
              <h4 class="font-medium">{{ preview.title }}</h4>
              <UButton
                size="xs"
                color="gray"
                variant="soft"
                @click="copyCode"
              >
                Copy Code
              </UButton>
            </div>
            <div class="relative">
              <pre class="language-vue rounded-lg"><code v-html="highlightedCode"></code></pre>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github-dark.css'

hljs.registerLanguage('xml', xml)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('vue', xml)

const isFullscreen = ref(false)
const preview = ref(null)

const props = defineProps({
  currentPreview: {
    type: Object,
    default: null
  }
})

watch(() => props.currentPreview, (newPreview) => {
  preview.value = newPreview
}, { immediate: true })

const highlightedCode = computed(() => {
  if (!preview.value?.code) return ''
  return hljs.highlight(preview.value.code, { language: 'vue' }).value
})

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const copyCode = () => {
  if (preview.value?.code) {
    navigator.clipboard.writeText(preview.value.code)
    useToast().add({
      title: 'Code copied to clipboard',
      color: 'green'
    })
  }
}
</script>