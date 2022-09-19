export class NodeData {
  pageId: string
  pageTitle: string
  expand: boolean
  select: boolean
  // eslint-disable-next-line
  nodes: Array<NodeData>

  constructor(pageId: string, pageTitle: string) {
    this.pageId = pageId
    this.pageTitle = pageTitle
    this.expand = false
    this.select = false
    this.nodes = []
  }
}
