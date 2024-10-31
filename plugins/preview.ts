// plugins/preview.client.ts
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  // Log available components on startup
  /*console.log('Available components:', 
    Object.keys(nuxtApp.vueApp._context.components || {})
      .filter(name => name.startsWith('U'))
  )*/
});
