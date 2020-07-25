import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { DocumentService } from '~/document/document.service';

@Controller('api/documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  getDocumentList() {
    return this.documentService.getDocumentList()
  }

  @Get(':documentId')
  getDocument(@Param('documentId') documentId: string) {
    const document = this.documentService.getDocument(documentId)
    if (!document) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `ドキュメントが見つかりません。(documentId=${documentId})`
      },404)
    }
    return document
  }
}
