<template>
  <div class="manga">
    <UButton
      class="absolute left-16 top-4"
      icon="i-heroicons-arrow-uturn-left"
      size="xl"
      square
      variant="ghost"
      @click="$router.back()"
    />
    <div v-if="manga" class="m-12 mt-20">
      <UCard>
        <template #header>
          <div>{{ manga.title }}</div>
        </template>
        <template #default>
          <ul class="chapters">
            <li
              v-for="chapter in pageChapters"
              :key="chapter.name"
              class="bg-stone-900 p-4 odd:brightness-125 hover:cursor-pointer hover:brightness-150"
              :class="{ 'opacity-50': chapter.read }"
              @click="setSelectedChapter(chapter)"
            >
              <UChip
                class="flex flex-col text-left"
                position="top-left"
                :show="!chapter.read"
              >
                <span class="m-1">
                  {{ chapter.name }}
                </span>
                <span class="m-1">
                  {{ chapter.chapterNumber }}
                </span>
                <span class="text-sm">
                  {{ chapter.dateUpload }} •
                  {{ manga.source.name }}
                </span>
              </UChip>
            </li>
          </ul>
        </template>
        <template #footer>
          <UPagination
            v-model="page"
            :page-count="maxChaptersPerPage"
            :total="manga.chapters.length"
          >
          </UPagination>
        </template>
      </UCard>
    </div>
    <ChapterOverlay
      v-model="isChapterOverlayOpen"
      :chapter="selectedChapter"
      :manga="manga"
    />
  </div>
</template>

<script setup lang="ts">
import type { Chapter } from '~/models'

const isChapterOverlayOpen = ref(false)
const selectedChapter = ref({} as Chapter)

const setSelectedChapter = (chapter: Chapter) => {
  selectedChapter.value = chapter
  isChapterOverlayOpen.value = true
}

watch(selectedChapter, () => {
  console.log('changed chapter, should update child')
})

const id = useRoute().params.id as string
const mangaDataStore = useMangaDataStore()

const page = ref(1)
const maxChaptersPerPage = 5

const pageChapters = computed(() => {
  const first = (page.value - 1) * maxChaptersPerPage
  const last = Math.min(manga!.chapters.length, page.value * maxChaptersPerPage)
  return manga?.chapters.slice(first, last)
})
const pageCount = computed(() =>
  Math.round(manga!.chapters.length / maxChaptersPerPage + 1),
)
console.log(pageCount)

const manga = mangaDataStore.findManga(id)
if (!manga) {
  useNuxtApp().$logger.error('No manga')
}
</script>

<style scoped></style>
