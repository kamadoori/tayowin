import fs from 'fs/promises'
import zlib from 'node:zlib'
import { dialog, shell } from 'electron'

export interface ElectronAPI {
  [key: string]: (...args: any[]) => Promise<any>

  /**
   * Opens a file dialog and returns the ungzipped contents of the file selected.
   */
  loadBackupFromPath(): Promise<ArrayBufferLike | undefined>

  /**
   * Opens the given link in the default browser.
   * @param link The link to open
   */
  openExternalLink(link: string): Promise<boolean>
}

declare global {
  interface Window {
    ElectronAPI: ElectronAPI
  }
}

export const api: ElectronAPI = {
  loadBackupFromPath: async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
    })
    if (canceled) {
      return undefined
    }
    const filePath = filePaths[0]
    const zippedData = (await fs.readFile(filePath)).buffer as Uint8Array
    const fileData = await new Promise<Uint8Array>((resolve, reject) => {
      zlib.unzip(zippedData, (e, data) => {
        if (e) {
          reject(e)
        }
        resolve(data as Uint8Array)
      })
    })
    return fileData.buffer
  },

  openExternalLink: async (...args: any[]): Promise<boolean> => {
    const link = args[0]
    await shell.openExternal(link)
    return true
  },
}
