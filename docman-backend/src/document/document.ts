import { IDocument } from './document.interface';
import { INode } from '~/node/node.interface';

export class Document implements IDocument {
  readonly documentId: string;
  readonly documentTile: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly node: INode;
}
