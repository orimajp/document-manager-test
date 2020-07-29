import { Body, Controller, Get, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
import { PageService } from '~/page/page.service';
import { IPage } from '~/page/page.interface';

@Controller('api/pages')
export class PageController {
  constructor(private readonly pageService: PageService) {
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
