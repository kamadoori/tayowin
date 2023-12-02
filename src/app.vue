<template>
  <NuxtLayout />
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: 'bg-gray-900',
  },
  script: [
    {
      src: 'http://localhost:8098',
    },
  ],
})
</script>

<style></style>
