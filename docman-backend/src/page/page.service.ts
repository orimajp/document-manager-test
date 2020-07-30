import { Injectable } from '@nestjs/common';
import { IPage } from '~/page/page.interface';
import { DummyStore, dummyStore } from '~/dummystore/DummyStore';
import { Page } from '~/page/page';

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

  registerPage(documentId: string, pageId: string, date: string, pageTitle: string, pageData: string) {
    const page = new Page(documentId, pageId, pageData, pageTitle, date, date)
    dummyStore.registerPage(page)
  }
}
