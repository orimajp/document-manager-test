export class NodeData {
  pageId: string
  pateTitle: string
  expand: boolean
  select: boolean
  nodes: Array<NodeData>

  constructor(pageId: string, pateTitle: string) {
    this.pageId = pageId
    this.pateTitle = pateTitle
    this.expand = false
    this.select = false
    this.nodes = []
  }
}
