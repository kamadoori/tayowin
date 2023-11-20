<template>
  <header>
    <div class="h-screen flex">
      <UContainer class="flex items-center flex-col m-auto">
        <h1 class="text-5xl font-light m-4">Tayowin</h1>
        <h2 class="text-2xl font-light m-1 text-center">
          Tachiyomi-compatible desktop manga reader, beta. <br />
          Not affiliated with Tachiyomi.
        </h2>
        <UButton class="m-6 text-lg" label="Initialize" @click="init" />
      </UContainer>
    </div>
  </header>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'splash',
})

function init() {
  useInit().setInitialized(true)
  useRouter().push('/')
}
</script>
