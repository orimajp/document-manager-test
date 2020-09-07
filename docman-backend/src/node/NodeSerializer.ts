import { INode } from '~/node/node.interface';

export function serializeNode(node: INode): Array<INode> {
  const dest = [] as Array<INode>
  internalSerializeNode(node, dest)
  return dest
}

function internalSerializeNode(source: INode, destination: Array<INode>) {
  destination.push(source)
  for (const node of source.nodes) {
    internalSerializeNode(node, destination)
  }
}
