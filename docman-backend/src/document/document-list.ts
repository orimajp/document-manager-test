import { IDocumentList } from './document-list.interface';

export class DocumentList implements IDocumentList {
  readonly id: string;
  readonly title: string;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(id: string, title: string, createdAt: string, updatedAt: string) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

}
