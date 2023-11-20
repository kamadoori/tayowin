import type { Manga } from './manga'

export class Category {
  constructor(
    public name: string,
    public manga: Manga[],
    public order?: bigint,
    public flags?: bigint,
  ) {}
}
