<template>
  <div class="m-2 flex flex-row justify-evenly">
    <span>Backup loaded!</span>
    <UButton variant="link" label="Load new backup" @click="loadBackup" />
  </div>
</template>

<script setup lang="ts">
const loadBackup = () => {
  const mangaDataStore = useMangaDataStore()
  mangaDataStore.loadMangaDataFromFile()
}
</script>

<style scoped></style>
