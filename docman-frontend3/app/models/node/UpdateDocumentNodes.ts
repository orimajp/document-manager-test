import { Node } from '~/models/node/Node'

export class UpdateDocumentNodes {
  nodes: Array<Node>

  constructor(nodes: Array<Node>) {
    this.nodes = nodes
  }
}
