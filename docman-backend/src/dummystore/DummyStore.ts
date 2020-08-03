import { IDocument } from '~/document/document.interface';
import { IPage } from '~/page/page.interface';
import { Node } from '~/node/node';
import { getMarkdownDummyDocument, getMarkdownDummyPages } from '~/dummydata/MarkdownDummyDataFactory';
import { getTreeDummyDocument, getTreeDummyPages } from '~/dummydata/TreeDummyDataFactory';

export class DummyStore {
  private readonly documents: Array<IDocument>
  private readonly pages: Array<IPage>
  constructor() {
    console.log('DummyStore initialize.')
    this.documents = []
    this.pages = []
    this.createDummyDocumentData()
    this.createDummyPageData()
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

  private createDummyDocumentData() {
    this.documents.push(getTreeDummyDocument())
    this.documents.push(getMarkdownDummyDocument())
  }

  private createDummyPageData() {
    for (const page of getTreeDummyPages()) {
      this.pages.push(page)
    }
    for (const page of getMarkdownDummyPages()) {
      this.pages.push(page)
    }
  }

}

export const dummyStore = new DummyStore()
