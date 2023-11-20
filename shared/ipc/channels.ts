export type AllowedChannels = 'loadBackupFromPath' | 'openExternalLink'

export interface ElectronApiFunction {
  (...args: any[]): Promise<any>
}

declare global {
  interface Window {
    ElectronAPI: {
      [key in AllowedChannels]: ElectronApiFunction
    }
  }
}
