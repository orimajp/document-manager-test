import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PageService } from '~/page/page.service';
import { IPage } from '~/page/page.interface';
import { NewPage } from '~/page/new-page.interface';
import { IdentityService } from '~/identity/identity.service';
import * as dayjs from 'dayjs'
import 'dayjs/locale/ja';
import { NodeService } from '~/node/node.service';
import { NewPositionPage } from '~/page/new-position-page.interface';
import { IndexService } from '~/index/index.service';

@Controller('api/pages')
export class PageController {
  constructor(private readonly pageService: PageService,
              private readonly nodeServer: NodeService,
              private readonly identityService: IdentityService,
              private readonly indexService: IndexService) {
  }

  @Get(':pageId')
  getPage(@Param('pageId') pageId: string) {
    const page = this.pageService.getPage(pageId)
    if (!page) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `ページが見つかりません。(pageId=${pageId})`
      },404)
    }
    return page
  }

  @Post()
  postPage(@Body() newPage: NewPage) {
    const page = this.registerPage(newPage.documentId, newPage.pageTitle, newPage.pageData)
    this.pageService.postPageFirstNode(page)
    this.indexService.registerIndex(page)
    return page
  }

  @Post('prevend')
  postPagePrevendChild(@Body() newPositionPage: NewPositionPage) {
    const page = this.registerPage(newPositionPage.documentId, newPositionPage.pageTitle, newPositionPage.pageData)
    const node = this.nodeServer.createNodeFromPage(page)
    try {
      this.nodeServer.prevendNewDocumentNode(newPositionPage.targetPageId, newPositionPage.documentId, node)
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'ノード追加に失敗しました。'
      },500)
    }
    this.indexService.registerIndex(page)

    return page
  }

  @Post('append')
  postPageAppendNext(@Body() newPositionPage: NewPositionPage) {
    const page = this.registerPage(newPositionPage.documentId, newPositionPage.pageTitle, newPositionPage.pageData)
    const node = this.nodeServer.createNodeFromPage(page)
    try {
      this.nodeServer.appendNewDocumentNode(newPositionPage.targetPageId, newPositionPage.documentId, node)
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'ノード追加に失敗しました。'
      },500)
    }
    this.indexService.registerIndex(page)

    return page
  }

  @Put()
  putPage(@Body() updatePage: IPage) {
    const page = this.pageService.getPage(updatePage.pageId)
    if (!page) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `ページが見つかりません。(pageId=${updatePage.pageId})`
      },404)
    }

    try {
      this.pageService.putPage(updatePage)
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `更新対象ページが見つかりません。(pageId=${updatePage.pageId})`
      },500)
    }

    try {
      this.indexService.updateIndex(page)
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `更新対象インデックスが見つかりません。(pageId=${updatePage.pageId})`
      },500)
    }
  }

  private registerPage(
    documentId: string,
    pageTitle: string,
    pageData: string
  ): IPage {
    const id = this.identityService.generateId()
    const date = dayjs().format()
    this.pageService.registerPage(documentId, id, date, pageTitle, pageData)
    const page = this.pageService.getPage(id)
    if (!page) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `登録したページが見つかりません。(pageId=${id})`
      },500)
    }
    return page
  }
}
