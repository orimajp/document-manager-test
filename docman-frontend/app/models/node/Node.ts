import { INode } from '~/models/node/INode'

export class Node implements INode {
  nodes: Array<INode>
  pageId: string
  pateTitle: string

  constructor(nodes: Array<INode>, pageId: string, pateTitle: string) {
    this.nodes = nodes
    this.pageId = pageId
    this.pateTitle = pateTitle
  }
}
