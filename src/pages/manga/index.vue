<template>
  <div v-if="mangaDataStore.mangaData.manga">
    <MangaCard
      v-for="manga in mangaDataStore.mangaData.manga"
      :key="manga.id"
      class="m-12"
      :manga="manga"
    />
  </div>
  <div v-else>
    <BackupNotLoadedSection />
  </div>
</template>

<script setup lang="ts">
const mangaDataStore = useMangaDataStore()
</script>

<style scoped></style>
