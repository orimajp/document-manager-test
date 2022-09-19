import { INode } from '~/models/node/INode'

export class Node implements INode {
  nodes: Array<INode>
  pageId: string
  pageTitle: string

  constructor(nodes: Array<INode>, pageId: string, pageTitle: string) {
    this.nodes = nodes
    this.pageId = pageId
    this.pageTitle = pageTitle
  }
}
