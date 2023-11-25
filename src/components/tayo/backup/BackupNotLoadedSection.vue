<template>
  <div class="flex flex-row justify-evenly p-4">
    <span class="m-auto align-middle">No backup loaded.</span>
    <UButton class="m-auto" label="Load backup" @click="loadBackup" />
  </div>
</template>

<script setup lang="ts">
const loadBackup = () => {
  const mangaDataStore = useMangaDataStore()
  mangaDataStore.loadMangaDataFromFile()
}
</script>

<style scoped></style>
