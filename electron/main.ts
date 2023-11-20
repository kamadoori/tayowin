import fs from 'fs/promises'
import path from 'path'
import zlib from 'node:zlib'
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import type {
  AllowedChannels,
  ElectronApiFunction,
} from '~~/shared/ipc/channels'

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, 'public')
  : path.join(process.env.ROOT, '.output/public')
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let win: BrowserWindow
const preload = path.join(process.env.DIST, 'preload.js')

function addIpcMainHandler(
  channel: AllowedChannels,
  func: ElectronApiFunction,
) {
  ipcMain.handle(channel, func)
}

function bootstrap() {
  addIpcMainHandler('loadBackupFromPath', async () => {
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
  })

  addIpcMainHandler('openExternalLink', async (_event, args) => {
    const link = args[0]
    await shell.openExternal(link)
    return true
  })

  // Window
  win = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegrationInWorker: true,
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: false,
    },
  })

  win.setBackgroundColor('#111111')

  // Get proper URL
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))
  }
}
app.whenReady().then(bootstrap)
