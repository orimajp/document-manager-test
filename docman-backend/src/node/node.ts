import { INode } from './node.interface';

export class Node implements INode {
  pageId: string;
  pageTitle: string;
  nodes: Array<INode>;
  constructor(pageId: string, pageTitle: string, nodes: Array<INode>) {
    this.pageId = pageId
    this.pageTitle = pageTitle
    this.nodes = nodes
  }
}
