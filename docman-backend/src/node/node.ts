import { INode } from './node.interface';

export class Node implements INode {
  nodes: Array<INode>;
  pageId: string;
  pageTitle: string;
}
