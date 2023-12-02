<template>
  <UCard>
    <template #header>
      <NuxtLink :to="`/manga/${manga.id}`">
        <span>{{ manga.title }}</span>
      </NuxtLink>
    </template>
    <template #default>
      {{ manga.chapters[0].name }}
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { Manga } from '~/models'
defineProps<{
  manga: Manga
}>()
</script>

<style scoped></style>
