export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  ssr: false,
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxtjs/google-fonts'],

  fontMetrics: {
    fonts: ['DM Sans']
  },
  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'DM+Sans': [400, 500, 600, 700]
    }
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
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
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/callback',
      exclude: ['/', '/pricing', '/terms', '/auth/register'],
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8, // 8 hours
      sameSite: 'lax',
      secure: true
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      },
      realtime: {
        params: {
          eventsPerSecond: 2,
        },
      },
    },
  },
});