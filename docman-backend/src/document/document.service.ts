import { Injectable } from '@nestjs/common'
import { IDocumentList } from '~/document/document-list.interface'
// import { DocumentList } from '~/document/document-list'
// import * as dayjs from 'dayjs'
// import 'dayjs/locale/ja'
import { IDocument } from '~/document/document.interface';
// import { IPage } from '~/page/page.interface';
// import { getTreeDummyDocument, getTreeDummyDocumentList, getTreeDummyPages } from '~/dummydata/TreeDummyDataFactory';
import { getTreeDummyDocument, getTreeDummyDocumentList } from '~/dummydata/TreeDummyDataFactory';

@Injectable()
export class DocumentService {
  private readonly documents: Array<IDocument>
  private readonly documentLists: Array<IDocumentList>

  constructor() {
    this.documentLists = []
    this.documents = []
    this.createDummyData()
  }

  getDocumentList(): Array<IDocumentList> {
    /*
    const document1 = new DocumentList("a", "ドキュメント1", dayjs().format(), dayjs().format())
    const documentList = [] as Array<IDocumentList>
    documentList.push(document1)
    return documentList
     */
    return this.documentLists
  }

  getDocument(documentId: string): IDocument | null {
    for (const document of this.documents) {
      if (document.documentId === documentId) {
        return  document
      }
    }
    return null
  }

  private createDummyData() {
    this.documents.push(getTreeDummyDocument())
    this.documentLists.push(getTreeDummyDocumentList())
  }

}
