import { contextBridge, ipcRenderer } from 'electron'
import { api, type ElectronRendererAPI } from '../shared/ipc/channels'

const exposed = {} as ElectronRendererAPI
Object.keys(api).forEach((key) => {
  exposed[key as keyof ElectronRendererAPI] = (...args: any[]) =>
    ipcRenderer.invoke(key.toString(), args)
})

contextBridge.exposeInMainWorld('ElectronAPI', exposed)
