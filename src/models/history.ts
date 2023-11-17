export class History {
  constructor(
    public url: string,
    public lastRead: Date,
    public readDuration: number,
  ) {}
}
