import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PageService } from '~/page/page.service';
import { IPage } from '~/page/page.interface';
import { NewPage } from '~/page/new-page.interface';
import { IdentityService } from '~/identity/identity.service';
import * as dayjs from 'dayjs'
import 'dayjs/locale/ja';

@Controller('api/pages')
export class PageController {
  constructor(private readonly pageService: PageService,
              private readonly  identityService: IdentityService) {
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
    const id = this.identityService.generateId()
    const date = dayjs().format()
    this.pageService.registerPage(newPage.documentId, id, date, newPage.pageTitle, newPage.pageData)
    const page = this.pageService.getPage(id)
    if (!page) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `登録したページが見つかりません。(pageId=${id})`
      },500)
    }
    this.pageService.postPageFirstNode(page)
    return page
  }

  @Put()
  putPage(@Body() newPage: IPage) {
    const page = this.pageService.getPage(newPage.pageId)
    if (!page) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `ページが見つかりません。(pageId=${newPage.pageId})`
      },404)
    }

    try {
      this.pageService.putPage(newPage)
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `更新対象ページが見つかりません。(pageId=${newPage.pageId})`
      },500)
    }
  }
}
