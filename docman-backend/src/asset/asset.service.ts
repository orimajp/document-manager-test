import { Injectable } from '@nestjs/common';
import { Asset } from '~/asset/asset';
import { dummyStore } from '~/dummystore/DummyStore';
import { Readable } from 'stream';

@Injectable()
export class AssetService {
  registerAsset(id: string, fileName: string, mimeType: string, buffer: any) {
    const asset = new Asset(fileName, mimeType, buffer)
    dummyStore.registerAsset(id, asset)
  }

  getAsset(id: string): Asset {
    return dummyStore.getAsset(id)
  }

  // https://github.com/nestjs/nest/issues/1090
  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable()
    stream.push(buffer)
    stream.push(null)
    return stream
  }
}
