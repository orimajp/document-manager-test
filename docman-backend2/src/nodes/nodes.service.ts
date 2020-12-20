import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { IPage } from '../pages/page.interface';

@Injectable()
export class NodesService {
  constructor(private readonly dbService: DbService) {}

  async postPageFirstNode(page: IPage): Promise<void> {
    return this.dbService.postPageFirstNode(page);
  }

  async postPagePreventChildTargetNode(
    targetPageId: string,
    page: IPage,
  ): Promise<void> {
    return this.dbService.postPagePreventChildTargetNode(targetPageId, page);
  }

  async postPageAppendNextTargetNode(
    targetPageId: string,
    page: IPage,
  ): Promise<void> {
    return this.dbService.postPageAppendNextTargetNode(targetPageId, page);
  }
}
