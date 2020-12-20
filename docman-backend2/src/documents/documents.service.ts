import { Injectable } from '@nestjs/common';
import { IDocumentList } from './document-list.interface';
import { IDocument } from './document.interface';
import { DbService } from '../db/db.service';
import { NewDocument } from './new-document.interface';
import { UpdateDocumentNodes } from './update-document-nodes.interface';

@Injectable()
export class DocumentsService {
  constructor(private readonly dbService: DbService) {}

  async getDocumentList(): Promise<Array<IDocumentList>> {
    return this.dbService.getAllDocumentList();
  }

  async getDocumentByDocumentId(documentId: string): Promise<IDocument | null> {
    return this.dbService.getDocumentByDocumentId(documentId);
  }

  async registerDocument(document: NewDocument): Promise<string> {
    return this.dbService.registerDocument(document);
  }
  async updateDocumentNodes(
    documentId: string,
    updateDocumentNodes: UpdateDocumentNodes,
  ): Promise<IDocument | null> {
    return this.dbService.updateDocumentNodes(documentId, updateDocumentNodes);
  }
}
