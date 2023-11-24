export interface Logger {
  log(message: string | object): void
  warn(message: string | object): void
  error(message: string | object): void
}
