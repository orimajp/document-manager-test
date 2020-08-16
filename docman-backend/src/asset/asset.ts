export class Asset {
  fileName: string
  mimeType: string
  buffer: Buffer

  constructor(fileName: string, mimeType: string, buffer: Buffer) {
    this.fileName = fileName
    this.mimeType = mimeType
    this.buffer = buffer
  }
}
