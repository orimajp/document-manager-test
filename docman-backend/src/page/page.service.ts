import { Injectable } from '@nestjs/common';
import { IPage } from '~/page/page.interface';
import { DummyStore, dummyStore } from '~/dummystore/DummyStore';

@Injectable()
export class PageService {
  private readonly dummyStore: DummyStore

  constructor() {
    this.dummyStore = dummyStore
  }

  getPage(pageId: string): IPage | null {
    return this.dummyStore.getPage(pageId)
  }

  putPage(newPage: IPage): void {
    dummyStore.putPage(newPage)
  }

}
