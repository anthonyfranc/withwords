export default defineNuxtConfig({
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxthub/core",
    "@nuxt/eslint",
  ],
  googleFonts: {
    display: "swap",
    download: true,
    families: {
      "DM+Sans": [400, 500, 600, 700],
    },
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
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-10-31",
  hub: {
    database: true,
    kv: true,
  },
  eslint: {
    config: {
      stylistic: {
        quotes: "single",
      },
    },
  },
});
