import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { IndexesService } from './indexes.service';
import { DocumentsService } from '../documents/documents.service';

@Controller('api/indexes')
export class IndexesController {
  constructor(
    private readonly documentService: DocumentsService,
    private readonly indexesService: IndexesService,
  ) {}

  @Get(':documentId')
  async getIndexList(@Param('documentId') documentId: string) {
    const document = await this.documentService.getDocumentByDocumentId(
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
    return this.indexesService.getIndexList(documentId);
  }
}
