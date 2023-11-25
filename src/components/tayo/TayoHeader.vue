<template>
  <div>
    <UButton
      icon="i-heroicons-bars-3-solid"
      size="sm"
      color="primary"
      square
      variant="ghost"
      class="m-2"
      @click="isOpen = true"
    />
    <USlideover v-model="isOpen" :transition="true" side="left">
      <header>
        <UButton
          icon="i-heroicons-bars-3-solid"
          size="sm"
          color="primary"
          square
          variant="ghost"
          class="m-2"
          @click="isOpen = false"
        />
        <UVerticalNavigation
          :links="links"
          @click="isOpen = false"
          class="m-2"
        />
      </header>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
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
