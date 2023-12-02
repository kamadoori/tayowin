import type { SearchFormat } from '~/tachiyomi/source/source-mapper'

export class Source {
  constructor(
    public name: string,
    public id: bigint,
    public url?: string,
    public searchQueryUrl?: string,
    public searchFormatQuery?: (query: string) => string,
    public searchFormat?: SearchFormat,
    public lang?: string,
  ) {}
}
