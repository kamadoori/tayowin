import type { Logger } from './logger'

export class ConsoleLogger implements Logger {
  log(message: string | object): void {
    console.log(message)
  }

  warn(message: string | object): void {
    console.warn(message)
  }

  error(message: string | object): void {
    console.error(message)
  }
}
