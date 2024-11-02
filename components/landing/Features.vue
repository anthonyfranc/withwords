<template>
  <section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <UBadge color="primary" class="mb-4" :ui="{'rounded': 'rounded-full'}">Features</UBadge>
        <h2 class="text-4xl font-bold mb-4">Everything you need</h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We provide powerful features to help you build faster
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        <!-- Main Feature - AI Code Generation -->
        <div class="lg:col-span-2 lg:row-span-2">
          <div class="group h-full">
            <UCard class="h-full transition-all duration-300 hover:shadow-none relative overflow-hidden">              
              <div class="h-full flex flex-col">
                <div class="flex items-center gap-3 mb-4">
                  <UIcon name="i-heroicons-code-bracket" class="w-6 h-6 text-primary-500" />
                  <h3 class="text-xl font-semibold">AI Code Generation</h3>
                </div>

                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  Get instant, production-ready code for your UI components. Our AI understands context and follows best practices.
                </p>

                <div class="flex-grow relative mt-6">
                  <!-- Chat Interface -->
                  <div class="border dark:border-gray-800 rounded-lg overflow-hidden">
                    <!-- Chat Header -->
                    <div class="bg-gray-50 dark:bg-gray-800 p-3 border-b dark:border-gray-700 flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-bolt" class="w-5 h-5 text-primary-500" />
                        <span class="font-medium">AI Assistant</span>
                      </div>
                      <UBadge color="primary" variant="subtle" size="sm">Active</UBadge>
                    </div>

                    <!-- Chat Messages -->
                    <div class="p-4 space-y-4">
                      <!-- User Message -->
                      <div class="flex gap-3 items-start">
                        <UAvatar
                          icon="i-heroicons-user-circle"
                          size="sm"
                          class="flex-shrink-0 mt-1"
                        />
                        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm">
                          Create a responsive navbar with a logo, navigation links, and a sign-in button
                        </div>
                      </div>

                      <!-- AI Response -->
                      <div class="flex gap-3 items-start">
                        <UAvatar
                          icon="i-heroicons-bolt"
                          size="sm"
                          class="flex-shrink-0 mt-1 bg-primary-50 dark:bg-primary-900"
                        />
                        <div class="space-y-3 flex-grow">
                          <div class="bg-primary-50 dark:bg-gray-800 rounded-lg p-3 text-sm">
                            Here's a responsive navbar using Nuxt UI components with all the features you requested:
                          </div>
                          <!-- Code Preview -->
                          <UCard class="!border-primary-100 dark:!border-primary-900 !shadow-none">
                            <div class="flex items-center justify-between mb-2">
                              <div class="flex space-x-1.5">
                                <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                              </div>
                              <div class="flex items-center gap-2">
                                <UBadge color="primary" variant="subtle" size="xs">Vue</UBadge>
                                <span class="text-xs text-gray-500">Navbar.vue</span>
                              </div>
                            </div>
                            <pre class="text-xs"><code class="language-vue">&lt;template&gt;
  &lt;UHeader :links="links"&gt;
    &lt;template #logo&gt;
      &lt;Logo /&gt;
    &lt;/template&gt;
    &lt;template #right&gt;
      &lt;UButton&gt;
        Sign In
      &lt;/UButton&gt;
    &lt;/template&gt;
  &lt;/UHeader&gt;
&lt;/template&gt;</code></pre>
                          </UCard>
                        </div>
                      </div>

                      <!-- Typing Indicator -->
                      <div class="flex gap-3 items-start">
                        <UAvatar
                          icon="i-heroicons-bolt"
                          size="sm"
                          class="flex-shrink-0 mt-1 bg-primary-50 dark:bg-primary-900"
                        />
                        <div class="flex items-center gap-2">
                          <div class="flex space-x-1">
                            <div class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style="animation-delay: 0ms"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style="animation-delay: 150ms"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style="animation-delay: 300ms"></div>
                          </div>
                          <span class="text-xs text-gray-500">Generating additional suggestions...</span>
                        </div>
                      </div>
                    </div>

                    <!-- Chat Input -->
                    <div class="p-3 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
                      <div class="flex gap-2">
                        <UInput
                          placeholder="Ask anything about UI components..."
                          size="sm"
                          class="flex-grow"
                          :ui="{
                            icon: { trailing: { pointer: true } }
                          }"
                        >
                          <template #trailing>
                            <UButton
                              color="primary"
                              variant="solid"
                              size="xs"
                              icon="i-heroicons-paper-airplane"
                            />
                          </template>
                        </UInput>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Rest of the features remain exactly the same -->
        <!-- Smart Suggestions -->
        <div class="group h">
          <UCard class="h-full transition-all duration-300 hover:shadow-none">
            <div class="flex flex-col h-full">
              <div class="flex items-center gap-3 mb-4">
                <UIcon name="i-heroicons-sparkles" class="w-5 h-5 text-primary-500" />
                <h3 class="text-lg font-medium">Smart Suggestions</h3>
              </div>

              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Get intelligent recommendations based on your coding patterns and best practices.
              </p>

              <div class="mt-auto">
                <!-- New Suggestion Interface -->
                <div class="space-y-2">
                  <!-- Active Suggestion -->
                  <div class="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-3">
                    <div class="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm mb-2">
                      <UIcon name="i-heroicons-sparkles" class="w-4 h-4" />
                      <span class="font-medium">Suggested Improvement</span>
                    </div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">
                      Consider using a computed property for better performance
                    </div>
                  </div>

                  <!-- Pending Suggestions -->
                  <div class="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <UIcon name="i-heroicons-code-bracket" class="w-4 h-4 text-gray-400" />
                    <span class="text-xs text-gray-600 dark:text-gray-400">Extract component logic</span>
                  </div>

                  <div class="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 text-gray-400" />
                    <span class="text-xs text-gray-600 dark:text-gray-400">Optimize reactive dependencies</span>
                  </div>

                  <!-- Typing Indicator -->
                  <div class="flex items-center gap-2 mt-3">
                    <div class="flex space-x-1">
                      <div class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style="animation-delay: 0ms"></div>
                      <div class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style="animation-delay: 150ms"></div>
                      <div class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style="animation-delay: 300ms"></div>
                    </div>
                    <span class="text-xs text-gray-500">AI analyzing code...</span>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Real-time Preview -->
        <div class="group">
          <UCard class="h-full transition-all duration-300 hover:shadow-none">
            <div class="flex flex-col h-full">
              <div class="flex items-center gap-3 mb-4">
                <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 text-primary-500" />
                <h3 class="text-lg font-medium">Real-time Preview</h3>
              </div>

              <p class="text-gray-600 dark:text-gray-400 mb-4">
                See your components come to life instantly with live preview and hot reloading.
              </p>

              <div class="mt-auto">
                <!-- Split View Layout -->
                <div class="border dark:border-gray-800 rounded-lg overflow-hidden">
                  <!-- Editor Header -->
                  <div class="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 p-2 flex items-center justify-between">
                    <div class="flex space-x-1.5">
                      <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <div class="flex items-center gap-2">
                      <UBadge color="primary" variant="subtle" size="xs">Button.vue</UBadge>
                      <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin text-primary-500" />
                    </div>
                  </div>

                  <!-- Split View Content -->
                  <div class="grid grid-cols-2 divide-x dark:divide-gray-800">
                    <!-- Code Editor -->
                    <div class="p-3 bg-gray-50 dark:bg-gray-900 text-xs font-mono">
                      <div class="space-y-1 text-gray-800 dark:text-gray-200">
                        <div>&lt;<span class="text-primary-500">template</span>&gt;</div>
                        <div class="pl-4">&lt;<span class="text-primary-500">UButton</span></div>
                        <div class="pl-6 text-primary-400">:loading="loading"</div>
                        <div class="pl-6 text-primary-400">@click="submit"</div>
                        <div class="pl-4">&gt;</div>
                        <div class="pl-6 relative">
                          <span class="absolute left-0 w-2 h-full bg-primary-500/10 rounded"></span>
                          Submit Form
                        </div>
                        <div class="pl-4">&lt;/<span class="text-primary-500">UButton</span>&gt;</div>
                        <div>&lt;/<span class="text-primary-500">template</span>&gt;</div>
                      </div>
                    </div>

                    <!-- Live Preview -->
                    <div class="p-3 flex items-center justify-center bg-white dark:bg-gray-900">
                      <div class="relative">
                        <UButton size="sm" loading>
                          Submit Form
                        </UButton>
                        <!-- Update Indicator -->
                        <div class="absolute -top-1 -right-1 w-2 h-2">
                          <div class="absolute w-2 h-2 bg-primary-500 rounded-full"></div>
                          <div class="absolute w-2 h-2 bg-primary-500 rounded-full animate-ping"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Status Bar -->
                  <div class="bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 p-1.5">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="flex items-center gap-1">
                          <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span class="text-xs text-gray-500">Connected</span>
                        </div>
                      </div>
                      <div class="text-xs text-gray-500">HMR Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Component Library -->
        <div class="group">
  <UCard class="h-full transition-all duration-300 hover:shadow-none">
    <div class="flex flex-col h-full">
      <div class="flex items-center gap-3 mb-4">
        <UIcon name="i-heroicons-document-duplicate" class="w-5 h-5 text-primary-500" />
        <h3 class="text-lg font-medium">Component Library</h3>
      </div>

      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Access a vast library of pre-built components and customize them to your needs.
      </p>

      <div class="mt-auto">
        <!-- Component Browser Interface -->
        <div class="border dark:border-gray-800 rounded-lg overflow-hidden">
          <!-- Browser Header -->
          <div class="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 p-2">
            <div class="flex items-center gap-2">
              <UInput
                size="xs"
                placeholder="Search components..."
                icon="i-heroicons-magnifying-glass"
                class="flex-grow"
              />
              <UButton
                color="gray"
                variant="ghost"
                size="xs"
                icon="i-heroicons-adjustments-horizontal"
              />
            </div>
          </div>

          <!-- Component Categories -->
          <div class="p-2 border-b dark:border-gray-700 flex items-center gap-1.5">
            <UBadge color="primary" variant="solid" size="xs">All</UBadge>
            <UBadge color="gray" variant="subtle" size="xs">Layout</UBadge>
            <UBadge color="gray" variant="subtle" size="xs">Forms</UBadge>
            <UBadge color="gray" variant="subtle" size="xs">Navigation</UBadge>
          </div>

          <!-- Component Grid -->
          <div class="grid grid-cols-2 gap-2 p-2">
            <!-- Button Component -->
            <div class="group/item relative border dark:border-gray-800 rounded-lg p-2 hover:border-primary-500 transition-colors cursor-pointer">
              <div class="flex items-center justify-center h-12 bg-gray-50 dark:bg-gray-800 rounded mb-1">
                <UButton size="sm" color="primary">
                  Button
                </UButton>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-600 dark:text-gray-400">UButton</span>
                <UBadge color="primary" variant="subtle" size="xs">New</UBadge>
              </div>
              <!-- Hover Preview -->
              <div class="absolute inset-0 bg-gray-950/80 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                <UButton
                  size="xs"
                  color="white"
                  variant="solid"
                  icon="i-heroicons-plus"
                >
                  Add
                </UButton>
              </div>
            </div>

            <!-- Input Component -->
            <div class="group/item relative border dark:border-gray-800 rounded-lg p-2 hover:border-primary-500 transition-colors cursor-pointer">
              <div class="flex items-center justify-center h-12 bg-gray-50 dark:bg-gray-800 rounded mb-1">
                <UInput size="sm" placeholder="Input" class="w-24" />
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-600 dark:text-gray-400">UInput</span>
                <UIcon name="i-heroicons-star" class="w-3 h-3 text-yellow-400" />
              </div>
              <!-- Hover Preview -->
              <div class="absolute inset-0 bg-gray-950/80 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                <UButton
                  size="xs"
                  color="white"
                  variant="solid"
                  icon="i-heroicons-plus"
                >
                  Add
                </UButton>
              </div>
            </div>

            <!-- Card Component -->
            <div class="group/item relative border dark:border-gray-800 rounded-lg p-2 hover:border-primary-500 transition-colors cursor-pointer">
              <div class="flex items-center justify-center h-12 bg-gray-50 dark:bg-gray-800 rounded mb-1">
                <div class="w-16 h-8 bg-white dark:bg-gray-700 rounded border dark:border-gray-600 shadow-sm"></div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-600 dark:text-gray-400">UCard</span>
                <UBadge color="gray" variant="subtle" size="xs">Popular</UBadge>
              </div>
              <!-- Hover Preview -->
              <div class="absolute inset-0 bg-gray-950/80 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                <UButton
                  size="xs"
                  color="white"
                  variant="solid"
                  icon="i-heroicons-plus"
                >
                  Add
                </UButton>
              </div>
            </div>

            <!-- Modal Component -->
            <div class="group/item relative border dark:border-gray-800 rounded-lg p-2 hover:border-primary-500 transition-colors cursor-pointer">
              <div class="flex items-center justify-center h-12 bg-gray-50 dark:bg-gray-800 rounded mb-1">
                <div class="w-12 h-8 bg-white dark:bg-gray-700 rounded border dark:border-gray-600 shadow-sm flex items-center justify-center">
                  <div class="w-8 h-4 bg-gray-100 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-600 dark:text-gray-400">UModal</span>
                <UIcon name="i-heroicons-star" class="w-3 h-3 text-yellow-400" />
              </div>
              <!-- Hover Preview -->
              <div class="absolute inset-0 bg-gray-950/80 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                <UButton
                  size="xs"
                  color="white"
                  variant="solid"
                  icon="i-heroicons-plus"
                >
                  Add
                </UButton>
              </div>
            </div>
          </div>

          <!-- Status Bar -->
          <div class="bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 p-1.5">
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">4 of 50+ components</span>
              <UButton
                size="xs"
                color="gray"
                variant="ghost"
                icon="i-heroicons-arrow-right"
              >
                View All
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</div>

        <!-- Performance Optimization -->
        <div class="group">
    <UCard class="h-full transition-all duration-300 hover:shadow-none">
      <div class="flex flex-col h-full">
        <div class="flex items-center gap-3 mb-4">
          <UIcon name="i-heroicons-cpu-chip" class="w-5 h-5 text-primary-500" />
          <h3 class="text-lg font-medium">Performance Optimization</h3>
        </div>

        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Get suggestions for improving your component's performance and accessibility.
        </p>

        <div class="mt-auto">
          <!-- Performance Analysis Interface -->
          <div class="border dark:border-gray-800 rounded-lg overflow-hidden">
            <!-- Header -->
            <div class="bg-gray-50 dark:bg-gray-800 p-3 border-b dark:border-gray-700 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-chart-bar" class="w-4 h-4 text-primary-500" />
                <span class="text-sm font-medium">Performance Report</span>
              </div>
              <UBadge color="green" variant="subtle" size="sm">Optimized</UBadge>
            </div>

            <!-- Main Content -->
            <div class="p-3 space-y-4">
              <!-- Score Overview -->
              <div class="flex items-center justify-center gap-4">
                <div class="relative w-16 h-16">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-xl font-bold text-green-500">98</span>
                  </div>
                  <svg class="transform -rotate-90 w-16 h-16">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      stroke-width="4"
                      fill="none"
                      class="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      stroke-width="4"
                      fill="none"
                      stroke-dasharray="175.9"
                      stroke-dashoffset="3.5"
                      class="text-green-500"
                    />
                  </svg>
                </div>
                <div class="text-center">
                  <div class="text-sm font-medium">Performance Score</div>
                  <div class="text-xs text-gray-500">Last checked 2m ago</div>
                </div>
              </div>

              <!-- Metrics -->
              <div class="space-y-3">
                <!-- First Contentful Paint -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center gap-1.5">
                      <UIcon name="i-heroicons-bolt" class="w-4 h-4 text-green-500" />
                      <span class="text-xs">First Contentful Paint</span>
                    </div>
                    <span class="text-xs font-medium text-green-500">0.8s</span>
                  </div>
                  <div class="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div class="h-1.5 bg-green-500 rounded-full" style="width: 95%"></div>
                  </div>
                </div>

                <!-- Time to Interactive -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center gap-1.5">
                      <UIcon name="i-heroicons-cursor-arrow-rays" class="w-4 h-4 text-primary-500" />
                      <span class="text-xs">Time to Interactive</span>
                    </div>
                    <span class="text-xs font-medium text-primary-500">1.2s</span>
                  </div>
                  <div class="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div class="h-1.5 bg-primary-500 rounded-full" style="width: 90%"></div>
                  </div>
                </div>

                <!-- Bundle Size -->
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center gap-1.5">
                      <UIcon name="i-heroicons-archive-box" class="w-4 h-4 text-yellow-500" />
                      <span class="text-xs">Bundle Size</span>
                    </div>
                    <span class="text-xs font-medium text-yellow-500">76KB</span>
                  </div>
                  <div class="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div class="h-1.5 bg-yellow-500 rounded-full" style="width: 85%"></div>
                  </div>
                </div>
              </div>

              <!-- Optimization Tips -->
              <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-2">
                <div class="flex items-start gap-2">
                  <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div class="text-xs font-medium text-green-700 dark:text-green-300">All optimizations applied</div>
                    <div class="text-xs text-green-600 dark:text-green-400">Your component meets all performance benchmarks</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 p-2 flex justify-between items-center">
              <span class="text-xs text-gray-500">Updated automatically</span>
              <UButton
                color="primary"
                variant="ghost"
                size="xs"
                icon="i-heroicons-arrow-path"
              >
                Run Analysis
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>

        <!-- Saved Snippets - New Card -->
        <div class="group">
          <UCard class="h-full transition-all duration-300 hover:shadow-none">
            <div class="flex flex-col h-full">
              <div class="flex items-center gap-3 mb-4">
                <UIcon name="i-heroicons-bookmark" class="w-5 h-5 text-primary-500" />
                <h3 class="text-lg font-medium">Saved Snippets</h3>
              </div>

              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Save and organize your frequently used code snippets for quick access.
              </p>

              <div class="mt-auto">
                <!-- Snippets Interface -->
                <div class="space-y-3">
                  <!-- Search Bar -->
                  <div class="relative">
                    <UInput
                      size="sm"
                      placeholder="Search snippets..."
                      :ui="{
                        icon: {
                          leading: { pointer: false }
                        }
                      }"
                    >
                      <template #leading>
                        <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 text-gray-500" />
                      </template>
                    </UInput>
                  </div>

                  <!-- Snippet List -->
                  <div class="space-y-2">
                    <!-- Active Snippet -->
                    <div class="border-2 border-primary-500 dark:border-primary-400 rounded-lg p-3 bg-primary-50 dark:bg-primary-900/20">
                      <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2">
                          <UIcon name="i-heroicons-code-bracket" class="w-4 h-4 text-primary-500" />
                          <span class="text-sm font-medium">Navigation Menu</span>
                        </div>
                        <UBadge color="primary" variant="subtle" size="xs">Vue</UBadge>
                      </div>
                      <div class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 font-mono bg-white dark:bg-gray-800 p-2 rounded">
                        &lt;UHeader :links="links"&gt;...&lt;/UHeader&gt;
                      </div>
                    </div>

                    <!-- Other Snippets -->
                    <div class="border dark:border-gray-800 rounded-lg p-3 hover:border-primary-500 transition-colors cursor-pointer">
                      <div class="flex items-center justify-between mb-1">
                        <div class="flex items-center gap-2">
                          <UIcon name="i-heroicons-squares-2x2" class="w-4 h-4 text-gray-500" />
                          <span class="text-sm">Grid Layout</span>
                        </div>
                        <UBadge color="gray" variant="subtle" size="xs">CSS</UBadge>
                      </div>
                      <p class="text-xs text-gray-500">Updated 2 days ago</p>
                    </div>

                    <div class="border dark:border-gray-800 rounded-lg p-3 hover:border-primary-500 transition-colors cursor-pointer">
                      <div class="flex items-center justify-between mb-1">
                        <div class="flex items-center gap-2">
                          <UIcon name="i-heroicons-bell" class="w-4 h-4 text-gray-500" />
                          <span class="text-sm">Toast Notification</span>
                        </div>
                        <UBadge color="gray" variant="subtle" size="xs">Vue</UBadge>
                      </div>
                      <p class="text-xs text-gray-500">Updated 5 days ago</p>
                    </div>

                    <!-- Add New Snippet Button -->
                    <UButton
                      variant="ghost"
                      color="gray"
                      class="w-full justify-start"
                      :ui="{
                        padding: 'p-3',
                        rounded: 'rounded-lg',
                        font: 'font-normal'
                      }"
                    >
                      <template #leading>
                        <UIcon name="i-heroicons-plus-circle" class="w-4 h-4" />
                      </template>
                      <span class="text-sm">Add new snippet</span>
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(pre) {
  margin: 0;
  padding: 0;
}

:deep(code) {
  @apply text-gray-800 dark:text-gray-200;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>