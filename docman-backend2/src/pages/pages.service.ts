import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { IPage } from './page.interface';
import { NewPage } from './new-page.interface';

@Injectable()
export class PagesService {
  constructor(private readonly dbService: DbService) {}

  async getPage(pageId: string): Promise<IPage | null> {
    return this.dbService.getPage(pageId);
  }

  async registerPage(newPage: NewPage): Promise<IPage> {
    return this.dbService.registerPage(newPage);
  }

  async putPage(updatePage: IPage): Promise<void> {
    return this.dbService.putPage(updatePage);
  }
}
