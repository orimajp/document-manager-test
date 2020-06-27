import { NodeData } from '~/models/node/NodeData'

export class DocumentData {
  documentId: string
  documentTitle: string
  createdAt: string
  updatedAt: string
  node: NodeData

  constructor(
    documentId: string,
    documentTitle: string,
    createdAt: string,
    updatedAt: string,
    node: NodeData
  ) {
    this.documentId = documentId
    this.documentTitle = documentTitle
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.node = node
  }

  openChildren(list: Array<string>): void {
    this.node.expand = false
    this.node.select = false
    this.openNode(this.node, list)
  }

  getNestedIdArray(pageId: string): Array<string> {
    const ids: Array<string> = []
    return this.getNestedIds(pageId, ids, this.node)
  }

  private openNode(targetNode: NodeData, list: Array<string>): void {
    targetNode.select = targetNode.pageId === list[list.length - 1]

    if (!targetNode.nodes || targetNode.nodes.length === 0) {
      return
    }

    targetNode.expand = list.includes(targetNode.pageId)
    if (!targetNode.expand) {
      return
    }

    for (let i = 0; i < targetNode.nodes.length; i++) {
      this.openNode(targetNode.nodes[i], list)
    }
  }

  private getNestedIds(
    searchPageId: string,
    keys: Array<string>,
    targetNode: NodeData
  ): Array<string> {
    const nodePageKey = targetNode.pageId
    const appendPageKeys = keys.concat(nodePageKey)
    if (nodePageKey === searchPageId) {
      return appendPageKeys
    }

    for (const node of targetNode.nodes) {
      const returnKeys = this.getNestedIds(searchPageId, appendPageKeys, node)
      if (returnKeys.length !== 0) {
        return returnKeys
      }
    }

    return []
  }
}
