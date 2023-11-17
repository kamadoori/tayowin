<template>
  <header>
    <div class="h-screen flex">
      <UContainer class="flex items-center flex-col m-auto">
        <h1 class="text-5xl font-light m-4">Hello</h1>
      </UContainer>
    </div>
  </header>
</template>

<script setup lang="ts">
import BackupReader from '~/tachiyomi/backup-reader'

definePageMeta({
  middleware: defineNuxtRouteMiddleware(async (to) => {
    if (to.path === '/') {
      const init = useInit()
      const isInitialized = await init.getInitialized()
      if (!isInitialized) {
        console.log('not initialized')
        return navigateTo('/splash')
      }
      console.log('initialized')
    }
  }),
})

const reader = new BackupReader()
const backup = reader.get_backup()
const localForage = useLocalForage()
localForage.setItem('backup', backup)
</script>
