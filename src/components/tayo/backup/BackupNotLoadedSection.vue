<template>
  <div class="flex flex-row w-full p-4 justify-evenly">
    <span class="align-middle m-auto">No backup loaded.</span>
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
