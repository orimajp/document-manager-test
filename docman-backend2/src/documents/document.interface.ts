import { INode } from '../nodes/node.interface';

export interface IDocument {
  documentId: string;
  documentTitle: string;
  node: INode;
  createdAt: string;
  updatedAt: string;
}
