export class Chapter {
  constructor(
    public url: string,
    public name: string,
    public scanlator?: string,
    public read: boolean = false,
    public bookmark: boolean = false,
    public lastPageRead?: number,
    public dateFetch?: Date,
    public dateUpload?: Date,
    public chapterNumber?: number,
    public sourceOrder?: number,
    public lastModifiedAt?: Date,
  ) {}
}
