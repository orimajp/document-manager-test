import { NodeData } from '~/models/node/NodeData'

// FIXME serializeという名前は実体を表していないように思える
export function serializeNode(node: NodeData): Array<NodeData> {
  console.log(node)
  const destination = [] as Array<NodeData>
  internalSerializeNode(node, destination)
  return destination
}

function internalSerializeNode(source: NodeData, destination: Array<NodeData>) {
  destination.push(source)
  for (const node of source.nodes) {
    internalSerializeNode(node, destination)
  }
}
