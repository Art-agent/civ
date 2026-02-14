import tailwindcss from "@tailwindcss/vite";


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  runtimeConfig: {
    groq_api_key: process.env.NUXT_GROQ_API_KEY
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
