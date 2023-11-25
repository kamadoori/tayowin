<template>
  <UCard class="m-8">
    <template #header>
      <h1 class="text-2xl font-light">{{ manga.title }}</h1>
    </template>
    <div class="flex flex-col justify-between">
      <div class="flex w-full flex-row">
        <div class="m-4 flex flex-col">
          <div v-for="field in fields" :key="field.name" class="p-1">
            {{ field.name }}
          </div>
        </div>
        <div class="m-4 flex flex-col">
          <div v-for="field in fields" :key="field.name" class="p-1">
            {{ resolvePath(manga, field.key, null) }}
          </div>
        </div>
      </div>
      <div class="flex-end m-4">
        <a @click="openLink">Go to manga site</a>
      </div>
    </div>
  </UCard>
</template>
<script setup lang="ts">
import type { Manga } from '~/models'
import { resolvePath } from '~~/shared/utils'

const props = defineProps<{
  manga: Manga
}>()

const fields: { name: string; key: string }[] = [
  { name: 'Author', key: 'author' },
  { name: 'Chapters', key: 'chapters.length' },
]

async function openLink() {
  const success = await window.ElectronAPI.openExternalLink(props.manga.url)
  if (!success) {
    // TODO: Handle error gracefully (find out way to get errors from electron IPC? custom error interface?)
    console.error('Something went wrong')
  }
}
</script>
