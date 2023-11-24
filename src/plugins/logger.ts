import { ConsoleLogger } from '../logger/console-logger'

export default defineNuxtPlugin(() => {
  const logger = new ConsoleLogger()
  return {
    provide: {
      logger,
    },
  }
})
