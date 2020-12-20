export interface INode {
  pageId: string;
  pageTitle: string;
  nodes: Array<INode>;
}
