import { Manga, Category, Source, Preference, Chapter, History } from '~/models'
import { Backup } from '~/generated/schema'

export interface MangaData {
  manga: Manga[]
  categories: Category[]
  sources: Source[]
  preferences: Preference[]
}

export class BackupMapper {
  public static from_backup(backup: Backup): MangaData {
    const manga = [] as Manga[]
    const categories = [] as Category[]
    const sources = [] as Source[]
    const preferences = [] as Preference[]

    backup.backupSources?.forEach((backupSource) => {
      if (!backupSource.name) {
        return
      }
      sources.push(new Source(backupSource.name))
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
        console.log('null value')
        return
      }

      const dateAdded = Date.now()

      const chapters: Chapter[] = []
      backupManga.chapters.forEach((backupChapter) => {
        chapters.push(
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
      })

      const history: History[] = []

      const source = {} as any

      const tracking = {} as any

      const newManga = new Manga(
        backupManga.author,
        chapters,
        dateAdded,
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
      newManga.categories = Object.assign([], backupManga.categories)
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

    return {
      manga,
      categories,
      sources,
      preferences,
    }
  }

  public static to_backup(data: MangaData): Backup {
    // TODO: Implement so format can be used as Tachiyomi backup
    console.log({ data })
    return Backup.create()
  }
}
