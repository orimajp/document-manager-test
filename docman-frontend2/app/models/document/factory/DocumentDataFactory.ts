import { DocumentData } from '~/models/document/DocumentData'
import { IDocument } from '~/models/document/IDocument'
import { createNodeData } from '~/models/node/NodeDataFactory'

export function createDocumentData(iDocument: IDocument): DocumentData {
  const nodeData = createNodeData(iDocument.node)
  return new DocumentData(
    iDocument.documentId,
    iDocument.documentTitle,
    iDocument.createdAt,
    iDocument.updatedAt,
    nodeData
  )
}
