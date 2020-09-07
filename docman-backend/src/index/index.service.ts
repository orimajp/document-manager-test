import { Injectable } from '@nestjs/common';
import { Index } from '~/index/index';
import { DummyStore, dummyStore } from '~/dummystore/DummyStore';
import { IPage } from '~/page/page.interface';
import { createIndex } from '~/index/IndexFactory';
import { IDocument } from '~/document/document.interface';
import { serializeNode } from '~/node/NodeSerializer';

@Injectable()
export class IndexService {
  private readonly dummyStore: DummyStore

  constructor() {
    this.dummyStore = dummyStore
  }

  getIndexList(document: IDocument): Array<Index> {
    const pageIds = this.generatePageIdList(document)
    return this.dummyStore.getIndexList(pageIds)
  }

  registerIndex(page: IPage) {
    const index = this.stripPage(page)
    this.dummyStore.registerIndex(page.pageId, index)
  }

  updateIndex(page: IPage) {
    const index = this.stripPage(page)
    this.dummyStore.updateIndex(page.pageId, index)
  }

  private stripPage(page: IPage): Index {
    return createIndex(page)
  }

  private generatePageIdList(document: IDocument): Array<string> {
    const nodes = serializeNode(document.node)
    const pageIds = [] as Array<string>
    for (const node of nodes) {
      pageIds.push(node.pageId)
    }
    return pageIds
  }

}
