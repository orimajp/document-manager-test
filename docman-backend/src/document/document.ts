import { IDocument } from './document.interface';
import { INode } from '~/node/node.interface';

export class Document implements IDocument {
  documentId: string;
  documentTitle: string;
  createdAt: string;
  updatedAt: string;
  node: INode;
  version: number;

  constructor(
    documentId: string,
    documentTitle: string,
    createdAt: string,
    updatedAt: string,
    node: INode,
    version = 0
  ) {
    this.documentId = documentId
    this.documentTitle = documentTitle
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.node = node
    this.version = version
  }
}
