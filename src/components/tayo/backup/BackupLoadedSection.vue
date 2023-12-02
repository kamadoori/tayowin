<template>
  <div class="m-2 flex flex-row justify-evenly">
    <span>Backup loaded!</span>
    <UButton label="Load new backup" variant="link" @click="loadBackup" />
  </div>
</template>

<script setup lang="ts">
const loadBackup = () => {
  const mangaDataStore = useMangaDataStore()
  mangaDataStore.loadMangaDataFromFile()
}
</script>

<style scoped></style>
