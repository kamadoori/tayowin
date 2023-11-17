import * as fs from 'node:fs'
import zlib from 'zlib'
import { BackupMapper } from './backup-mapper'
import { Backup } from '~/generated/schema'

export default class BackupReader {
  public constructor() {}

  public get_backup(): Backup {
    const file = fs.readFileSync('src/assets/schema/tachi.proto.gz')
      .buffer as Uint8Array
    const inflated = zlib.unzipSync(file) as Uint8Array
    const backupData = Backup.fromBinary(inflated)
    console.log({ backupData })

    console.log(BackupMapper.from_backup(backupData))
    return backupData
  }
}
