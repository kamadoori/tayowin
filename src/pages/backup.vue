<template>
  <div class="flex flex-col w-auto overflow-y-scroll">
    <BackupLoadedSection v-if="Object.keys(mangaDataStore.data).length !== 0" />
    <BackupNotLoadedSection v-else />
    <h1 class="text-5xl font-light m-12 mb-4">Manga</h1>
    <MangaCard
      v-for="manga in mangaDataStore.data.manga"
      :key="manga.title"
      :manga="manga"
    />
  </div>
</template>

<script setup lang="ts">
const mangaDataStore = useMangaDataStore()
</script>

<style scoped></style>
