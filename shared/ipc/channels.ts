import fs from 'fs/promises'
import zlib from 'node:zlib'
import { dialog, shell, type IpcMainInvokeEvent } from 'electron'

export interface ElectronAPI {
  loadBackupFromPath(
    event: IpcMainInvokeEvent,
  ): Promise<ArrayBufferLike | undefined>

  openExternalLink(event: IpcMainInvokeEvent, link: string): Promise<boolean>
}

type OmitFirstArg<F> = F extends (
  x: IpcMainInvokeEvent,
  ...args: infer P
) => infer R
  ? (...args: P) => R
  : never

export interface ElectronRendererAPI {
  loadBackupFromPath: OmitFirstArg<ElectronAPI['loadBackupFromPath']>
  openExternalLink: OmitFirstArg<ElectronAPI['openExternalLink']>
}

declare global {
  interface Window {
    ElectronAPI: ElectronRendererAPI
  }
}

export const api: ElectronAPI = {
  loadBackupFromPath: async (_event) => {
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

  openExternalLink: async (_event, args): Promise<boolean> => {
    const link = args[0]
    await shell.openExternal(link)
    return true
  },
}
