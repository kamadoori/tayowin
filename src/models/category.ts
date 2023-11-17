import type { Manga } from './manga'

export class Category {
  constructor(
    public name: string,
    public manga: Manga[],
    public order?: number,
    public flags?: number,
  ) {}
}
