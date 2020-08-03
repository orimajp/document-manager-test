import { Injectable } from '@nestjs/common';
import { IPage } from '~/page/page.interface';
import { dummyStore } from '~/dummystore/DummyStore';
import { Page } from '~/page/page';

@Injectable()
export class PageService {
  getPage(pageId: string): IPage | null {
    return dummyStore.getPage(pageId)
  }

  putPage(newPage: IPage): void {
    dummyStore.putPage(newPage)
  }

  registerPage(documentId: string, pageId: string, date: string, pageTitle: string, pageData: string) {
    const page = new Page(documentId, pageId, pageData, pageTitle, date, date)
    dummyStore.registerPage(page)
  }

  postPageFirstNode(page: IPage) {
    dummyStore.postPageFirstNode(page)
  }
}
