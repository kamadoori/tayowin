<template>
  <header>
    <UVerticalNavigation :links="links"></UVerticalNavigation>
  </header>
</template>

<script setup lang="ts">
const links = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Backup inspector',
    to: '/backup',
  },
]
</script>

<style scoped></style>
