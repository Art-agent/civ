import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  ssr: false,
  modules: ['@wagmi/vue/nuxt'],
  runtimeConfig: {
    public: {
      reown_project_id: process.env.NUXT_PUBLIC_REOWN_PROJECT_ID,
      supabaseUrl: process.env.SUPABASE_PROJECT_URL,
      supabaseKey: process.env.SUPABASE_PUBLISHABLE_API_KEY,
    },
    groq_api_key: process.env.NUXT_GROQ_API_KEY,
    groq_conversation_key: process.env.NUXT_GROQ_CONVERSATION_KEY
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: ['eventemitter3'],
      exclude: ['@wagmi/core']
    },
    resolve: {
      dedupe: ['eventemitter3']
    }
  },
})
