import fs from 'fs/promises'
import zlib from 'node:zlib'
import { dialog, shell, type IpcMainInvokeEvent } from 'electron'

/**
 * This module sets up types for both the main and rendering sides of the application.
 * It does it by type-mapping a shared interface to remove parameters depending on which side
 * needs, or doesn't need, these parameters.
 */

export interface ElectronAPI {
  // [key: string]: any
  loadBackupFromPath(
    event: IpcMainInvokeEvent,
  ): Promise<ArrayBufferLike | undefined>

  openExternalLink(event: IpcMainInvokeEvent, link: string): Promise<boolean>
}

type OmitInbetweenArgs<F> = F extends (
  x: IpcMainInvokeEvent,
  ...args: infer P
) => infer R
  ? (x: IpcMainInvokeEvent, ...args: any[]) => R
  : never

/**
 * Type that fits the signature for the api + definitions. Arguments are always
 * going to be passed in the `args` parameter; this is Electron's way of doing things.
 * By having this we can avoid typing as needed by `ElectronAPI` and just have a generic `args` parameter with everything.
 */
export type ElectronMainAPI = {
  [key in keyof ElectronAPI]: OmitInbetweenArgs<ElectronAPI[key]>
}

type OmitFirstArg<F> = F extends (
  x: IpcMainInvokeEvent,
  ...args: infer P
) => infer R
  ? (...args: P) => R
  : never

/**
 * Type that fits the signature for the exposed api on the rendering side. Since
 * electron injects the event when one of these functions is called, we don't
 * want to explicitly mention it or set it on the rendering side.
 */
export type ElectronRendererAPI = {
  [key in keyof ElectronAPI]: OmitFirstArg<ElectronAPI[key]>
}

declare global {
  interface Window {
    ElectronAPI: ElectronRendererAPI
  }
}

export const api: ElectronMainAPI = {
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

  openExternalLink: async (_event, args: any[]): Promise<boolean> => {
    const link = args[0]
    await shell.openExternal(link)
    return true
  },
}
