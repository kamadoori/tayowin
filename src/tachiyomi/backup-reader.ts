import { BackupMapper, type MangaData } from './backup-mapper'
import { Backup } from '~/generated/schema'

export class BackupReader {
  public static async loadFromPath(): Promise<MangaData> {
    const backupString = new Uint8Array(
      (await window.ElectronAPI.loadBackupFromPath()) as ArrayBufferLike,
    )
    const backup = Backup.fromBinary(backupString)
    const appData = BackupMapper.from_backup(backup)

    return appData
  }
}
