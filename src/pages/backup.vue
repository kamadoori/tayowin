<template>
  <div class="flex flex-col">
    <BackupLoadedSection v-if="Object.keys(mangaDataStore.data).length !== 0" />
    <BackupNotLoadedSection v-else />
    <h1 class="m-12 mb-4 text-5xl font-light">Manga</h1>
    <div class="manga-list">
      <BackupMangaCard
        v-for="manga in mangaDataStore.data.manga"
        :key="manga.title"
        :manga="manga"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const mangaDataStore = useMangaDataStore()
</script>

<style scoped></style>
