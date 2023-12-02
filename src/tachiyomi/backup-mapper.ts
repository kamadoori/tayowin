import { SourceMapper } from './source/source-mapper'
import { Manga, Category, Source, Preference, Chapter, History } from '~/models'
import { Backup } from '~/generated/schema'

export interface MangaData {
  manga: Manga[]
  categories: Category[]
  sources: Source[]
  preferences: Preference[]
}

export class BackupMapper {
  public static fromBackup(backup: Backup): MangaData {
    const logger = useNuxtApp().$logger
    logger.log({ backup })

    const manga = [] as Manga[]
    const categories = [] as Category[]
    const sources = [] as Source[]
    const preferences = [] as Preference[]

    backup.backupSources?.forEach((backupSource) => {
      if (!backupSource.name) {
        return
      }
      sources.push(
        SourceMapper.fromSource(
          new Source(backupSource.name, backupSource.sourceId),
        ),
      )
    })

    backup.backupPreferences?.forEach((backupPreference) => {
      if (!backupPreference.key || !backupPreference.value) {
        return
      }
      preferences.push(
        new Preference(backupPreference.key, backupPreference.value),
      )
    })

    backup.backupManga?.forEach((backupManga) => {
      if (
        !backupManga.author ||
        !backupManga.description ||
        !backupManga.source ||
        !backupManga.status ||
        !backupManga.thumbnailUrl ||
        !backupManga.title ||
        !backupManga.url
      ) {
        // TODO: Handle null values gracefully
        logger.log('Null value in manga')
        return
      }

      const chapters = backupManga.chapters.map(
        (backupChapter) =>
          new Chapter(
            backupChapter.url,
            backupChapter.name,
            backupChapter.scanlator,
            backupChapter.read,
            backupChapter.bookmark,
            backupChapter.lastPageRead
              ? Number(backupChapter.lastPageRead)
              : undefined,
            backupChapter.dateFetch
              ? new Date(Number(backupChapter.dateFetch))
              : new Date(0),
            backupChapter.dateUpload
              ? new Date(Number(backupChapter.dateUpload))
              : new Date(0),
            backupChapter.chapterNumber,
            backupChapter.sourceOrder ? Number(backupChapter.sourceOrder) : 0,
            backupChapter.lastModifiedAt
              ? new Date(Number(backupChapter.lastModifiedAt))
              : new Date(0),
          ),
      )
      chapters.sort((a, b) => {
        if (!a.chapterNumber || !b.chapterNumber) {
          return 0
        }
        return b.chapterNumber - a.chapterNumber
      })

      const history: History[] = []

      const source = sources.find((source) => source.id === backupManga.source)

      const tracking = {} as any

      const newManga = new Manga(
        backupManga.author,
        chapters,
        backupManga.dateAdded
          ? new Date(Number(backupManga.dateAdded))
          : new Date(0),
        backupManga.description,
        backupManga.genre,
        history,
        source,
        backupManga.status,
        backupManga.thumbnailUrl,
        backupManga.title,
        tracking,
        backupManga.url,
        backupManga.viewerFlags || 0,
      ) as any
      newManga.categories = backupManga.categories.map((category) => category)
      manga.push(newManga)
    })

    backup.backupCategories?.forEach((backupCategory, index) => {
      if (!backupCategory.name) {
        return
      }
      const category = new Category(
        backupCategory.name,
        [] as Manga[],
        backupCategory.order,
        backupCategory.flags,
      )
      const mangaInCategory = manga.filter((mangaItem: any) => {
        return mangaItem.categories.includes(index)
      })
      mangaInCategory.forEach((manga) => {
        category.manga.push(manga)
      })
      categories.push(category)
    })

    const result = {
      manga,
      categories,
      sources,
      preferences,
    }
    logger.log({ result })

    return result
  }

  public static toBackup(data: MangaData): Backup {
    // TODO: Implement so format can be used as Tachiyomi backup
    console.log({ data })
    return Backup.create()
  }
}
