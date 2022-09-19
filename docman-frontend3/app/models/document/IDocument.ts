import { INode } from '~/models/node/INode'

export interface IDocument {
  documentId: string
  documentTitle: string
  createdAt: string
  updatedAt: string
  node: INode
}
