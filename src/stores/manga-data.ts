import { defineStore } from 'pinia'
import { validate as uuidValidate } from 'uuid'
import { BackupReader, type MangaData } from '~/tachiyomi'

export const useMangaDataStore = defineStore('manga-data', {
  state: () => {
    const data = ref({} as MangaData)

    const forage = useLocalForage()
    forage.getItem('mangaData').then((forageItem: any) => {
      data.value = { ...forageItem }
    })
    return { data }
  },
  getters: {
    mangaData: (state) => state.data,
  },
  actions: {
    async loadMangaDataFromFile() {
      this.data = await BackupReader.loadFromPath()
      const pojo = JSON.parse(
        JSON.stringify(this.data, (_key, value) => {
          return typeof value === 'bigint' ? value.toString() : value
        }),
      )
      const forage = useLocalForage()
      forage.setItem('mangaData', pojo)
    },
    findManga(id: string) {
      const isValid = uuidValidate(id)
      if (!isValid) {
        useNuxtApp().$logger.warn(`Invalid ID passed to query: ${id}`)
      }
      return this.data.manga.find((manga) => manga.id === id)
    },
  },
})
