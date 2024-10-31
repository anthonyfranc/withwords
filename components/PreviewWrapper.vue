<!-- components/VirtualPreview.vue -->
<template>
  <ClientOnly>
    <div class="virtual-preview">
      <Suspense>
        <component 
          v-if="virtualComponent" 
          :is="virtualComponent" 
        />
        <template #fallback>
          <div class="p-4 animate-pulse">
            Loading component...
          </div>
        </template>
      </Suspense>
    </div>
  </ClientOnly>
</template>

<script setup>
import { computed, defineAsyncComponent, h } from 'vue'
import { compileScript, parse } from '@vue/compiler-sfc'

const props = defineProps({
  code: {
    type: String,
    required: true
  }
})

const createVirtualComponent = (code) => {
  try {
    // Parse SFC
    const { descriptor } = parse(code)
    
    // Compile script
    const scriptContent = descriptor.script || descriptor.scriptSetup
    const compiledScript = compileScript(descriptor, {
      id: 'virtual-component',
      inlineTemplate: true
    })

    // Create component code
    const componentCode = `
      ${compiledScript.content}
      const _sfc_main = {
        name: 'VirtualComponent',
        setup() {
          ${scriptContent?.content || ''}
          return { ${Object.keys(compiledScript.bindings || {}).join(',')} }
        },
        template: ${JSON.stringify(descriptor.template?.content || '')}
      }
      export default _sfc_main
    `

    // Create blob URL for the component
    const blob = new Blob([componentCode], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)

    // Return async component
    return defineAsyncComponent(() => import(/* @vite-ignore */ url))
  } catch (error) {
    console.error('Failed to create virtual component:', error)
    return null
  }
}

const virtualComponent = computed(() => {
  if (!props.code) return null
  return createVirtualComponent(props.code)
})

// Clean up blob URLs when component is unmounted
onUnmounted(() => {
  if (virtualComponent.value?.url) {
    URL.revokeObjectURL(virtualComponent.value.url)
  }
})
</script>