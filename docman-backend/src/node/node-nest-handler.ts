import { INode } from '~/node/node.interface';

export const MATCH = Symbol('match')
export const COMPLETE = Symbol('complete')
export const UNMATCH = Symbol('unmatch')

export type MatchState = typeof MATCH | typeof COMPLETE | typeof UNMATCH

export class NodeNestHandler {
  prevendChileTargetNode(
    targetPageId: string,
    documentNode: INode,
    newDocumentNode: INode
  ): boolean {
    if(documentNode.pageId === targetPageId) {
      documentNode.nodes.unshift(newDocumentNode)
      return true
    }

    for (const node of documentNode.nodes) {
      const result = this.prevendChileTargetNode(
        targetPageId,
        node,
        newDocumentNode
      )

      if (result) {
        return  true
      }
    }

    return false
  }

  appendNextTargetNode(
    targetPageId: string,
    documentNode: INode,
    newDocumentNode: INode
  ): MatchState {
    if (documentNode.pageId === targetPageId) {
      return MATCH
    }

    for (const node of documentNode.nodes) {
      const result = this.appendNextTargetNode(
        targetPageId,
        node,
        newDocumentNode
      )

      if (result === COMPLETE) {
        return COMPLETE
      }

      if (result === MATCH) {
        this.appendTargetNode(
          documentNode,
          node,
          newDocumentNode)
        return COMPLETE
      }
    }

    return UNMATCH
  }

  private appendTargetNode(
    documentNode: INode,
    matchNode: INode,
    newDocumentNode: INode
  ): void {
    const newNodes = []

    for (const node of documentNode.nodes) {
      newNodes.push(node)
      if (node === matchNode) {
        newNodes.push(newDocumentNode)
      }
    }

    documentNode.nodes = newNodes
  }
}

export const nodeNestHandler = new NodeNestHandler()
