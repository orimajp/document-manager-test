import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { PageService } from '~/page/page.service';

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

}
