import { Source } from '~/models'

export type SearchFormat = 'snakeCase'

export class SourceMapper {
  private static mappings = {
    Mangakakalot: {
      url: 'https://mangakakalot.com',
      searchQueryUrl: 'https://mangakakalot.com/search/story/{query}',
      searchFormatQuery: (query: string) => `${query}`,
      searchFormat: 'snakeCase' as SearchFormat,
      lang: 'en',
    },
  }

  static fromSource(source: Source): Source {
    if (!(source.name in SourceMapper.mappings)) {
      useNuxtApp().$logger.error(
        `Tried to map '${source.name}' to a source, but no such mapping was found`,
      )
      return new Source('', 0n)
    }
    const sourceData =
      SourceMapper.mappings[source.name as keyof typeof SourceMapper.mappings]
    return new Source(
      source.name,
      source.id,
      sourceData.url,
      sourceData.searchQueryUrl,
      sourceData.searchFormatQuery,
      sourceData.searchFormat,
      sourceData.lang,
    )
  }
}
