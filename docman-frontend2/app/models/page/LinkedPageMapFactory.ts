import { DocumentData } from '~/models/document/DocumentData'
import { serializeNode } from '~/models/node/NodeSerializer'
import { LinkedPageMap } from '~/models/page/LinkedPageMap'

export function createLinkedPageMap(document: DocumentData) {
  const nodeList = serializeNode(document.node)
  const pageMap = new LinkedPageMap()

  for (const node of nodeList) {
    pageMap.appendPage(node.pageId, node.pageTitle)
  }

  return pageMap
}
