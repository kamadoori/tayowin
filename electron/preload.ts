import { contextBridge, ipcRenderer } from 'electron'
import { api, type ElectronAPI } from '../shared/ipc/channels'

const exposed = {} as ElectronAPI
Object.keys(api).forEach((key) => {
  exposed[key] = (...args: any[]) => ipcRenderer.invoke(key.toString(), args)
})

contextBridge.exposeInMainWorld('ElectronAPI', exposed)
