<template>
  <div class="flex flex-row w-full m-2 justify-evenly">
    <span>Backup loaded!</span>
    <UButton label="Load new backup" @click="loadBackup"></UButton>
  </div>
</template>

<script setup lang="ts">
const loadBackup = () => {
  const mangaDataStore = useMangaDataStore()
  mangaDataStore.loadMangaDataFromFile()
}
</script>

<style scoped></style>
