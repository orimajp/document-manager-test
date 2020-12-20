import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NewDocument } from './new-document.interface';
import { UpdateDocumentNodes } from './update-document-nodes.interface';
import { DocumentsService } from './documents.service';

@Controller('api/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  async getDocumentList() {
    return this.documentsService.getDocumentList();
  }

  @Get(':documentId')
  async getDocument(@Param('documentId') documentId: string) {
    const document = await this.documentsService.getDocumentByDocumentId(
      documentId,
    );
    if (!document) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `ドキュメントが見つかりません。(documentId=${documentId})`,
        },
        404,
      );
    }
    return document;
  }

  @Post()
  postDocument(@Body() newDocument: NewDocument) {
    return this.documentsService.registerDocument(newDocument);
  }

  @Put(':documentId/nodes')
  putDocumentNodes(
    @Param('documentId') documentId: string,
    @Body() updateDocumentNodes: UpdateDocumentNodes,
  ) {
    const document = this.documentsService.updateDocumentNodes(
      documentId,
      updateDocumentNodes,
    );
    if (!document) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `更新対象のドキュメントが見つかりません。(documentId=${documentId})`,
        },
        404,
      );
    }
  }
}
