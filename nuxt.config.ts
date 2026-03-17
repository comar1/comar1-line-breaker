// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Lyrics Formatter",
      meta: [
        { name: "description", content: "Format lyrics for ProPresenter easily" }
      ]
    }
  },
  css: [],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
