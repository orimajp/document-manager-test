import { Controller, Get } from '@nestjs/common';
import { DocumentService } from '~/document/document.service';

@Controller('api/documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  getDocumentList() {
    return this.documentService.getDocumentList()
  }



}
