import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { IndexService } from '~/index/index.service';
import { DocumentService } from '~/document/document.service';

@Controller('api/indexes')
export class IndexController {
  constructor(private readonly indexService: IndexService,
              private readonly documentService: DocumentService) {
  }

  @Get(':documentId')
  getIndexList(@Param('documentId') documentId: string) {
    const document = this.documentService.getDocument(documentId)
    if (!document) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `ドキュメントが見つかりません。(documentId=${documentId})`
      },404)
    }
    return this.indexService.getIndexList(document)
  }

}
