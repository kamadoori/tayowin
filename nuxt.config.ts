export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: [
    'nuxt-electron',
    '@nuxtjs/eslint-module',
    '@nuxt/ui',
    'nuxt3-localforage',
    '@pinia/nuxt',
    '@nuxt/image',
    'vue3-carousel-nuxt',
  ],
  vite: {
    optimizeDeps: {
      include: [
        'localforage',
        '@protobuf-ts/runtime',
        'uuid',
        'vue3-carousel/dist/carousel',
      ],
    },
  },
  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
      {
        entry: 'electron/preload.ts',
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
          // instead of restarting the entire Electron App.
          options.reload()
        },
      },
    ],
    renderer: {},
  },
  srcDir: 'src/',
  components: [
    {
      global: true,
      path: '~/components',
      pathPrefix: false,
    },
  ],
  image: {},
})
