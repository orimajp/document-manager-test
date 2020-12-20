import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { IIndex } from './index.interface';

@Injectable()
export class IndexesService {
  constructor(private readonly dbService: DbService) {}

  async getIndexList(documentId: string): Promise<Array<IIndex>> {
    return this.dbService.getIndexList(documentId);
  }
}
