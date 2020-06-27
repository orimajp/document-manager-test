import { INode } from '~/models/node/INode'

export interface IDocument {
  documentId: string
  documentTile: string
  createdAt: string
  updatedAt: string
  node: INode
}
