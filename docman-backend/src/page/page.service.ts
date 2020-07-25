import { Injectable } from '@nestjs/common';
import { IPage } from '~/page/page.interface';
import { getTreeDummyPages } from '~/dummydata/TreeDummyDataFactory';

@Injectable()
export class PageService {
  private readonly pages: Array<IPage>

  constructor() {
    this.pages = []
    this.createDummyData()
  }

  getPage(pageId: string): IPage | null {
    for (const page of this.pages) {
      if (page.pageId === pageId) {
        return page
      }
    }
    return null
  }

  private createDummyData() {
    for (const page of getTreeDummyPages()) {
      this.pages.push(page)
    }
  }
}
