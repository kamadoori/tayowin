import type { Chapter } from './chapter'
import type { Source } from './source'
import type { Tracking } from './tracking'
import type { History } from './history'

export class Manga {
  constructor(
    public author: string,
    public chapters: Chapter[],
    public dateAdded: number,
    public description: string,
    public genre: string[],
    public history: History[],
    public source: Source,
    public status: number,
    public thumbnailUrl: string,
    public title: string,
    public tracking: Tracking[],
    public url: string,
    public viewerFlags: number,
  ) {}
}
