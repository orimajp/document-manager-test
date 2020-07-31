import { IDocument } from './document.interface';
import { INode } from '~/node/node.interface';

export class Document implements IDocument {
  documentId: string;
  documentTitle: string;
  createdAt: string;
  updatedAt: string;
  node: INode;

  constructor(
    documentId: string,
    documentTitle: string,
    createdAt: string,
    updatedAt: string,
    node: INode
  ) {
    this.documentId = documentId
    this.documentTitle = documentTitle
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.node = node
  }
}
