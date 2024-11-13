<template>
  <UFooter :links="links" class="border-t dark:border-t-gray-800">
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-x-2">
        <UIcon name="solar:bolt-bold" class="w-5 h-5 mt-1 -mr-0.5 grayscale" />
        <span class="font-base text-xl grayscale">with</span><span class="font-medium text-xl -ml-2 grayscale">words</span>
      </NuxtLink>
    </template>

    <template #right>
      <UButton
        v-for="(url, platform) in socials"
        :key="platform"
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        icon="i-simple-icons-github"
        color="gray"
        variant="ghost"
        :icon="`i-simple-icons-${platform}`"
      />
    </template>
  </UFooter>
</template>

<script setup>
const links = [
  {
    label: 'Terms',
    to: '/terms'
  },
  {
    label: 'Privacy',
    to: '/privacy'
  },
  {
    label: 'Contact',
    to: '/contact'
  }
]

const socials = {
  github: 'https://github.com',
  twitter: 'https://twitter.com',
  discord: 'https://discord.com'
}
</script>