export class NodeData {
  pageId: string
  pageTitle: string
  expand: boolean
  select: boolean
  nodes: Array<NodeData>

  constructor(pageId: string, pageTitle: string) {
    this.pageId = pageId
    this.pageTitle = pageTitle
    this.expand = false
    this.select = false
    this.nodes = []
  }
}
