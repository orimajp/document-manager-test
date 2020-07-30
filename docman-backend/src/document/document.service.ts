import { Injectable } from '@nestjs/common'
import { IDocumentList } from '~/document/document-list.interface'
import { IDocument } from '~/document/document.interface';
import { DocumentList } from '~/document/document-list';
import { DummyStore, dummyStore } from '~/dummystore/DummyStore';
import { INode } from '~/node/node.interface';
import { Node } from '~/node/node'
import { Document } from '~/document/document';

@Injectable()
export class DocumentService {
  private readonly dummyStore: DummyStore

  constructor() {
    this.dummyStore = dummyStore
  }

  getDocumentList(): Array<IDocumentList> {
    const documentList = [] as Array<IDocumentList>
    for (const document of this.dummyStore.getAllDocuments()) {
      documentList.push(
        new DocumentList(document.documentId, document.documentTile, document.createdAt, document.updatedAt)
      )
    }
    return documentList
  }

  getDocument(documentId: string): IDocument | null {
    return dummyStore.getDocument(documentId)
  }

  registerDocument(documentId: string, date: string, documentTile: string) {
    const node = new Node(documentId, documentTile, [] as Array<INode>)
    const document = new Document(documentId, documentTile, date, date, node)
    dummyStore.registerDocument(document)
  }
}
