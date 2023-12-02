<template>
  <div>
    <UButton
      class="m-2"
      color="primary"
      icon="i-heroicons-bars-3-solid"
      size="sm"
      square
      variant="ghost"
      @click="isOpen = true"
    />
    <USlideover
      v-model="isOpen"
      class="flex"
      side="left"
      :transition="true"
      :ui="slideoverUI"
    >
      <header class="flex-grow">
        <UButton
          class="m-2"
          color="primary"
          icon="i-heroicons-bars-3-solid"
          size="sm"
          square
          variant="ghost"
          @click="isOpen = false"
        />
        <UVerticalNavigation
          class="m-2"
          :links="upperLinks"
          @click="isOpen = false"
        >
          <template #icon="{ link }">
            <UIcon class="text-2xl" :name="link.icon" />
          </template>
          <template #default="{ link }">
            <span class="group-hover:text-primary relative m-1 text-lg">
              {{ link.label }}
            </span>
          </template>
        </UVerticalNavigation>
      </header>

      <UVerticalNavigation
        class="flex-end m-2"
        :links="lowerLinks"
        @click="isOpen = false"
      >
        <template #icon="{ link }">
          <UIcon class="text-2xl" :name="link.icon" />
        </template>
        <template #default="{ link }">
          <span class="group-hover:text-primary relative m-1 text-lg">
            {{ link.label }}
          </span>
        </template>
      </UVerticalNavigation>
      <div class="flex-end m-2">
        <UButton
          class="w-full text-lg"
          color="rose"
          icon="i-heroicons-trash"
          @click="showModal = true"
        >
          Clear app data
        </UButton>
      </div>
    </USlideover>

    <UModal v-model="showModal" class="absolute">
      <UContainer class="m-8 flex flex-col">
        <p class="m-auto mb-4 text-center">
          Are you sure you want to delete <em>ALL</em> application data? You
          cannot recover this data once it's deleted!
        </p>
        <div class="m-auto flex flex-row">
          <UButton class="m-2" icon="i-heroicons-trash">Delete</UButton>
          <UButton class="m-2" icon="i-heroicons-x-mark">Cancel</UButton>
        </div>
      </UContainer>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const showModal = ref(false)
const upperLinks = [
  {
    icon: 'i-heroicons-home',
    label: 'Home',
    to: '/',
  },
  // {
  //   icon: 'i-heroicons-archive-box',
  //   label: 'Backup inspector',
  //   to: '/backup',
  // },
  {
    icon: 'i-heroicons-book-open',
    label: 'Manga list',
    to: '/manga',
  },
]
const lowerLinks = [
  {
    icon: 'i-heroicons-cog-8-tooth',
    label: 'Settings',
    to: '/settings',
  },
]

const slideoverUI = /*ui*/ {
  width: 'w-screen max-w-[16rem]',
}
</script>

<style scoped></style>
