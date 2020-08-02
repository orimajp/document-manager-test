import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DocumentService } from '~/document/document.service';
import { IdentityService } from '~/identity/identity.service';
import { PageService } from '~/page/page.service';
import { NewDocument } from '~/document/new-document.interface';
import { UpdateDocumentNodes } from '~/document/update-document-nodes.interface';
import * as dayjs from 'dayjs'
import 'dayjs/locale/ja';

@Controller('api/documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService,
              private readonly identityService: IdentityService,
              private readonly pageService: PageService) {}

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

  @Post()
  postDocument(@Body() newDocument: NewDocument) {
    const id = this.identityService.generateId()
    const date = dayjs().format()
    this.documentService.registerDocument(id, date, newDocument.documentTitle)
    this.pageService.registerPage(id, id, date, newDocument.documentTitle, newDocument.documentData)
    const document = this.documentService.getDocument(id)
    if (!document) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `登録したドキュメントが見つかりません。(documentId=${id})`
      },500)
    }
    return document
  }

  @Put(':documentId/nodes')
  postDocumentNodes(@Param('documentId') documentId: string,
                    @Body() updateDocumentNodes: UpdateDocumentNodes) {
    const document = this.documentService.updateDocumentNodes(documentId, updateDocumentNodes)
    if (!document) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `更新対象のドキュメントが見つかりません。(documentId=${documentId})`
      },404)
    }
  }
}
