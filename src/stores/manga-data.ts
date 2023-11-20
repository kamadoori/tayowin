import { defineStore } from 'pinia'
import { BackupReader, type MangaData } from '~/tachiyomi'

export const useMangaDataStore = defineStore('manga-data', {
  state: () => {
    const data = ref({} as MangaData)

    const forage = useLocalForage()
    forage.getItem('mangaData').then((forageItem: any) => {
      const nonJson = JSON.parse(forageItem)
      data.value = { ...nonJson }
    })
    return { data }
  },
  getters: {
    mangaData: (state) => state.data,
  },
  actions: {
    async loadMangaDataFromFile() {
      this.data = await BackupReader.loadFromPath()
      const forage = useLocalForage()
      forage.setItem('mangaData', JSON.stringify(this.data))
    },
  },
})
