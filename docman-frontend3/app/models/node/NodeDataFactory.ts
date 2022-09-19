import { INode } from '~/models/node/INode'
import { NodeData } from '~/models/node/NodeData'

export function createNodeData(iNode: INode): NodeData {
  const nodeData = createSinglNodeData(iNode)
  for (const node of iNode.nodes) {
    nodeData.nodes.push(createNodeData(node))
  }
  return nodeData
}

function createSinglNodeData(iNode: INode): NodeData {
  return new NodeData(iNode.pageId, iNode.pageTitle)
}
