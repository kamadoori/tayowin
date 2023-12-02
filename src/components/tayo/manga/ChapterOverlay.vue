<template>
  <UModal class="flex" fullscreen :model-value="modelValue">
    <UButton
      class="fixed z-50 m-2"
      icon="i-heroicons-arrow-uturn-left"
      square
      variant="ghost"
      @click="$emit('update:modelValue', false)"
    />
    <Carousel v-if="pages?.length > 0" class="m-auto flex h-full w-full">
      <Slide v-for="page in pages" :key="page" class="h-full w-full">
        <NuxtImg
          v-if="page"
          class="max-h-full max-w-full"
          fit="contain"
          :src="page"
        />
        <Spinner v-else />
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </UModal>
</template>

<script setup lang="ts">
import { Manga, type Chapter } from '~/models'
import { Scraper } from '~/tachiyomi/scraper/scraper'

// const page = ref(1)

const props = defineProps<{
  manga?: Manga
  chapter: Chapter
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const chapterUrl = computed(() => {
  if (props.chapter.url.startsWith('/')) {
    // Incomplete url, add base url
    if (!props.manga?.url) {
      return ''
    }
    return props.manga.source.url + props.chapter.url
  }
  return props.chapter.url
})

const pages = ref([] as string[])

const updatePage = async () => {
  console.log('updating page')
  pages.value = []
  pages.value = await Scraper.scrape(chapterUrl.value)
}

watch(() => props.chapter, updatePage, {
  immediate: true,
  deep: true,
})
</script>

<style>
/* vue3-carousel flows over screen, prevent this */
.carousel__track {
  height: 100%;
}
</style>
