// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  ssr: false,
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],

  experimental: {
    inlineSSRStyles: false,
  },
  ui: {
    global: true,
    icons: ['heroicons'],
    safelistColors: ['primary', 'gray'],
    components: {
      global: true,
      dirs: [
        '@nuxt/ui-pro/dist/runtime/components',
        '@nuxt/ui/dist/runtime/components',
      ],
    },
  },

  components: {
    global: true,
    dirs: [
      '@nuxt/ui-pro/dist/runtime/components',
      '@nuxt/ui/dist/runtime/components',
      '~/components',
    ],
  },

  runtimeConfig: {
    stripeSecret: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    public: {
      chatbaseApiKey: process.env.NUXT_PUBLIC_CHATBASE_API_KEY,
      chatbaseChatbotId: process.env.NUXT_PUBLIC_CHATBASE_CHATBOT_ID,
      stripeKey: process.env.NUXT_PUBLIC_STRIPE_KEY,
    },
  },

  supabase: {
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2aHllcWRnbmJ1dWdnbGNlcmlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzMDU1MjMsImV4cCI6MjA0NTg4MTUyM30.1DaLP7a2s4o-RWsvB9RZbjOstSS0DakUUtiCyV_Ir_o',
    url: 'https://avhyeqdgnbuugglcerig.supabase.co',
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 2,
        },
      },
    },
    redirect: false,
  },

  compatibilityDate: '2024-10-30',
});