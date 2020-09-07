import { IDocument } from '~/document/document.interface';
import { IPage } from '~/page/page.interface';
import { Node } from '~/node/node';
import { getMarkdownDummyDocument, getMarkdownDummyPages } from '~/dummydata/MarkdownDummyDataFactory';
import { getTreeDummyDocument, getTreeDummyPages } from '~/dummydata/TreeDummyDataFactory';
import { getFileDummyDocument, getFileDummyPages, getFileDummyAssetMap ,existFileData } from '~/dummydata/FileDummyDtaFactory'
import { Asset } from '~/asset/asset';
import { Index } from '~/index';
import { createIndex } from '~/index/IndexFactory';

export class DummyStore {
  private readonly documents: Array<IDocument>
  private readonly pages: Array<IPage>
  private readonly assetMap: Map<string, Asset>
  private readonly indexMap: Map<string, Index>
  constructor() {
    console.log('DummyStore initialize.')
    this.documents = []
    this.pages = []
    this.assetMap = new Map<string, Asset>()
    this.indexMap = new Map<string, Index>()
    this.createDummyDocumentData()
    this.createDummyPageData()
    this.createDummyAssetData()
  }

  getAllDocuments(): Array<IDocument> {
    return this.documents
  }

  getDocument(documentId: string): IDocument | null {
    for (const document of this.documents) {
      if (document.documentId === documentId) {
        return  document
      }
    }
    return null
  }

  registerDocument(document: IDocument): void {
    this.documents.push(document)
  }

  getPage(pageId: string): IPage | null {
    for (const page of this.pages) {
      if (page.pageId === pageId) {
        return page
      }
    }
    return null
  }

  putPage(newPage: IPage): void {
    for (const page of this.pages) {
      if (page.pageId === newPage.pageId) {
        page.pageTitle = newPage.pageTitle
        page.pageData = newPage.pageData
        return
      }
    }
    throw new Error('ページ未発見')
  }

  registerPage(page: IPage): void {
    this.pages.push(page)
  }

  postPageFirstNode(page: IPage): void {
    const document = this.getDocument(page.documentId)
    if (!document){
      throw new Error('ドキュメント未発見')
    }
    const node = new Node(page.pageId, page.pageTitle, [])
    document.node.nodes.unshift(node)
  }

  registerAsset(id: string, asset: Asset): void {
    this.assetMap.set(id, asset)
  }

  getAsset(id: string): Asset {
    return this.assetMap.get(id)
  }

  getIndexList(pageIds: Array<string>): Array<Index> {
    const indexes = [] as Array<Index>

    for (const pageId of pageIds) {
      const page = this.pages.find(page => page.pageId === pageId)
      if (!page) {
        throw new Error(`ページが見つかりません。 pageId=${pageId}`)
      }
      indexes.push(createIndex(page))
    }

    return indexes
  }

  registerIndex(pageId: string, index: Index) {
    const oldIndex = this.indexMap.get(pageId)
    if (oldIndex) {
      throw new Error(`インデックスが重複しています。pageId=${pageId}`)
    }
    this.indexMap.set(pageId, index)
  }

  updateIndex(pageId: string, index: Index) {
    const oldIndex = this.indexMap.get(pageId)
    if (!oldIndex) {
      throw new Error(`インデックスが見つかりません。pageId=${pageId}`)
    }
    oldIndex.title = index.title
    oldIndex.body = index.body
  }

  private createDummyDocumentData() {
    this.documents.push(getTreeDummyDocument())
    this.documents.push(getMarkdownDummyDocument())
    if (existFileData()) {
      this.documents.push(getFileDummyDocument())
    }
  }

  private createDummyPageData() {
    for (const page of getTreeDummyPages()) {
      this.pages.push(page)
      this.indexMap.set(page.pageId, createIndex(page))
    }
    for (const page of getMarkdownDummyPages()) {
      this.pages.push(page)
      this.indexMap.set(page.pageId, createIndex(page))
    }
    if (existFileData()) {
      for (const page of getFileDummyPages()) {
        this.pages.push(page)
        this.indexMap.set(page.pageId, createIndex(page))
      }
    }
  }

  private createDummyAssetData() {
    getFileDummyAssetMap().forEach((value, key, map) => {
      this.assetMap.set(key, value)
    })
  }
}

export const dummyStore = new DummyStore()
