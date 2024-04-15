// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      script: [{ children: "window.global ||= window;" }],
    },
  },
  alias: {
    'crypto': 'crypto-browserify',
    // 'buffer': 'buffer/',
    'stream': 'readable-stream',
  },
})
