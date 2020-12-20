import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { IAsset } from './asset.interface';
import { Readable } from 'stream';

@Injectable()
export class AssetsService {
  constructor(private readonly dbService: DbService) {}

  async registerAsset(
    fileName: string,
    mimeType: string,
    buffer: any,
  ): Promise<string> {
    const asset: IAsset = {
      fileName: fileName,
      mimeType: mimeType,
      buffer: buffer,
    };
    return this.dbService.registerAsset(asset);
  }

  async getAsset(id: string): Promise<IAsset | null> {
    return this.dbService.getAsset(id);
  }

  // https://github.com/nestjs/nest/issues/1090
  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}
