import { contextBridge, ipcRenderer } from 'electron'
import type { AllowedChannels } from '~~/shared/ipc/channels'

// TODO: Rather not edit both main.js and preload.js whenever an IPC channel gets added..
// find a way to get IPC channels from a single source
function addIpcRendererHandler(api: any, channel: AllowedChannels) {
  api[channel] = (...args: any[]) => ipcRenderer.invoke(channel, args)
}
const api = {}

addIpcRendererHandler(api, 'loadBackupFromPath')
addIpcRendererHandler(api, 'openExternalLink')

contextBridge.exposeInMainWorld('ElectronAPI', api)
