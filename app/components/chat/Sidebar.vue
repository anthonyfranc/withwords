<template>
  <div class="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-gray-50 dark:bg-gray-900">
    <div class="p-4 space-y-4">
      <div class="flex-1 overflow-y-auto space-y-2">
        <template v-for="(msg, i) in messages" :key="i">
          <UButton
            block
            variant="ghost"
            :ui="{
              rounded: 'rounded-lg',
              padding: 'p-3',
              font: 'font-normal'
            }"
            :class="[
              'text-left truncate',
              selectedChat === i ? 'bg-gray-100 dark:bg-gray-800' : ''
            ]"
            @click="$emit('select-chat', i)"
          >
            <template #leading>
              <UIcon
                :name="msg.role === 'user' ? 'i-heroicons-user' : 'i-heroicons-cpu-chip'"
                class="w-4 h-4"
              />
            </template>
            {{ msg.content.substring(0, 30) }}...
          </UButton>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  selectedChat: {
    type: Number,
    default: -1
  }
})

defineEmits(['select-chat'])
</script>