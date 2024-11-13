<template>{{ useAuth }}
  <UHeader :links="links">
    <template #logo>
      <NuxtLink to="/" class="flex items-center gap-x-2">
        <UIcon 
          name="solar:bolt-bold" 
          class="w-6 h-6 mt-1 -mr-3 text-primary-500 transition-transform duration-500"
          :class="{ 'translate-x-0': !wordsHidden, '-translate-x-2': wordsHidden }"
        />
        <div 
          class="relative h-7 overflow-hidden transition-all duration-500"
          :class="{ 'w-0 opacity-0': wordsHidden, 'w-20 -mr-[19px] mt-[0.5px] opacity-100': !wordsHidden }"
        >
          <div class="words font-bold text-2xl">
            <span class="word">code.</span>
            <span class="word">learn.</span>
            <span class="word">build.</span>
          </div>
        </div>
        <span class="font-thin mt-[3.5px] text-2xl transition-all duration-500"
          :class="{ '-ml-1 mt-[3.5px]': wordsHidden }">
          with
        </span>
        <span class="font-bold text-2xl -ml-2 mt-[3px]">
          words
        </span>
      </NuxtLink>
    </template>

    <template #right>
      <template v-if="loggedIn">
        <UDropdown
          :items="userMenuItems"
          :popper="{ placement: 'bottom-end' }"
        >
          <UButton
            variant="ghost"
            trailing-icon="i-heroicons-chevron-down"
          >
            {{ user.email }}
          </UButton>

          <template #item="{ item }">
            <div class="flex items-center gap-x-2">
              <UIcon :name="item.icon" class="flex-shrink-0 w-4 h-4" />
              <span>{{ item.label }}</span>
            </div>
          </template>
        </UDropdown>
      </template>
      <template v-else>
        <UButton to="/" variant="solid" color="black" :ui="{ rounded: 'rounded-full' }">Get Started</UButton>
      </template>
      <UColorModeButton />
    </template>

    <template #panel>
      <UNavigationTree :links="links" />
    </template>
  </UHeader>
</template>

<script setup>
const { signOut, loggedIn } = useAuth()

const props = defineProps({
  links: {
    type: Array,
    default: () => []
  },
  user: {
    type: Boolean,
    default: null
  }
});

const wordsHidden = ref(true); // Start hidden

onMounted(() => {
  setTimeout(() => {
    wordsHidden.value = false; // Reveal after a short delay
  }, 300); // Adjust delay as needed
  
  // Reset the animation to hide words after cycle duration
  const cycleDuration = 5000; // Match with cycle-words duration
  setTimeout(() => {
    wordsHidden.value = true;
  }, cycleDuration + 300);
});

const userMenuItems = [
  [
    {
      label: 'Dashboard',
      icon: 'i-heroicons-squares-2x2',
      to: '/'
    },
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-6-tooth',
      to: '/'
    }
  ],
  [
    {
      label: 'Sign Out',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      click: () => logout()
    }
  ]
];

async function logout() {
  try {
    const { error } = await await signOut()
    const toast = useToast();
    toast.add({
      title: 'Notification',
      description: error ? 'Unable to log you out. Try again.' : 'You have been logged out.',
      color: error ? 'red' : 'green'
    });
  } catch {
    useToast().add({
      title: 'Notification',
      description: 'An unexpected error occurred. Please try again.',
      color: 'red'
    });
  }
}
</script>

<style scoped>
.words {
  display: flex;
  flex-direction: column;
  animation: cycle-words 8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.word {
  display: block;
  height: 2rem;
  line-height: 2rem;
  font-weight: bold;
  text-align: left;
  padding-left: 0.25rem;
}

.words-hidden {
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

@keyframes cycle-words {
  0%, 20% { transform: translateY(0); }
  25%, 45% { transform: translateY(-2rem); }
  50%, 70% { transform: translateY(-4rem); }
  75%, 95% { transform: translateY(-6rem); }
  100% { transform: translateY(-8rem); }
}

/* Ensure smooth font rendering */
.word {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
</style>
