import { IDocument } from '~/models/document/IDocument'
import { INode } from '~/models/node/INode'

export class Document implements IDocument {
  createdAt: string
  documentId: string
  documentTitle: string
  node: INode
  updatedAt: string

  constructor(
    createdAt: string,
    documentId: string,
    documentTitle: string,
    node: INode,
    updatedAt: string
  ) {
    this.createdAt = createdAt
    this.documentId = documentId
    this.documentTitle = documentTitle
    this.node = node
    this.updatedAt = updatedAt
  }
}
