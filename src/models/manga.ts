import { v4 as uuidv4 } from 'uuid'

import type { Chapter } from './chapter'
import type { Source } from './source'
import type { Tracking } from './tracking'
import type { History } from './history'

export class Manga {
  public id: string
  constructor(
    public author: string,
    public chapters: Chapter[],
    public dateAdded: Date,
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
  ) {
    this.id = uuidv4()
  }
}
