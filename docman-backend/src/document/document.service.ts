import { Injectable } from '@nestjs/common'
import { IDocumentList } from '~/document/document-list.interface'
import { IDocument } from '~/document/document.interface';
import { getTreeDummyDocument } from '~/dummydata/TreeDummyDataFactory';
import { DocumentList } from '~/document/document-list';
import { getMarkdownDummyDocument } from '~/dummydata/MarkdownDummyDataFactory';

@Injectable()
export class DocumentService {
  private readonly documents: Array<IDocument>

  constructor() {
    this.documents = []
    this.createDummyData()
  }

  getDocumentList(): Array<IDocumentList> {
    const documentList = [] as Array<IDocumentList>
    for (const document of this.documents) {
      documentList.push(
        new DocumentList(document.documentId, document.documentTile, document.createdAt, document.updatedAt)
      )
    }
    return documentList
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
    this.documents.push(getMarkdownDummyDocument())
  }
}
