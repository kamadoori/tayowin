// Generated by Nuxt'
import type { Plugin } from '#app'

type Decorate<T extends Record<string, any>> = { [K in keyof T as K extends string ? `$${K}` : never]: T[K] }

type InjectionType<A extends Plugin> = A extends Plugin<infer T> ? Decorate<T> : unknown

type NuxtAppInjections = 
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.8.1_eslint@8.53.0_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/app/plugins/revive-payload.server").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.8.1_eslint@8.53.0_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/app/plugins/revive-payload.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.8.1_eslint@8.53.0_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/head/runtime/plugins/unhead").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.8.1_eslint@8.53.0_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/pages/runtime/plugins/router").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.8.1_eslint@8.53.0_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/pages/runtime/plugins/prefetch.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxt+devtools@1.0.0_nuxt@3.8.1_vite@4.5.0/node_modules/@nuxt/devtools/dist/runtime/plugins/devtools.server").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxt+devtools@1.0.0_nuxt@3.8.1_vite@4.5.0/node_modules/@nuxt/devtools/dist/runtime/plugins/devtools.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt3-localforage@0.1.1_localforage@1.10.0/node_modules/nuxt3-localforage/dist/runtime/plugin").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxt+ui@2.10.0_vue@3.3.8_webpack@5.89.0/node_modules/@nuxt/ui/dist/runtime/plugins/colors").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxtjs+color-mode@3.3.0/node_modules/@nuxtjs/color-mode/dist/runtime/plugin.server").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxtjs+color-mode@3.3.0/node_modules/@nuxtjs/color-mode/dist/runtime/plugin.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.8.1_eslint@8.53.0_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/app/plugins/chunk-reload.client").default> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.8.1_eslint@8.53.0_typescript@5.2.2_vite@4.5.0/node_modules/nuxt/dist/app/plugins/check-outdated-build.client").default>

declare module '#app' {
  interface NuxtApp extends NuxtAppInjections { }
}

declare module 'vue' {
  interface ComponentCustomProperties extends NuxtAppInjections { }
}

export { }
