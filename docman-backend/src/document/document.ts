import { IDocument } from './document.interface';
import { INode } from '~/node/node.interface';

export class Document implements IDocument {
  documentId: string;
  documentTile: string;
  createdAt: string;
  updatedAt: string;
  node: INode;

  constructor(
    documentId: string,
    documentTile: string,
    createdAt: string,
    updatedAt: string,
    node: INode
  ) {
    this.documentId = documentId
    this.documentTile = documentTile
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.node = node
  }
}
