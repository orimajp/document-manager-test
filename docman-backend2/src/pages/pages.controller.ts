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
import { NewPage } from './new-page.interface';
import { NewPositionPage } from './new-position-page.interface';
import { IPage } from './page.interface';
import { PagesService } from './pages.service';
import { NodesService } from '../nodes/nodes.service';

@Controller('api/pages')
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
    private readonly nodesService: NodesService,
  ) {}

  @Get(':pageId')
  async getPage(@Param('pageId') pageId: string) {
    const page = await this.pagesService.getPage(pageId);
    if (!page) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `ページが見つかりません。(pageId=${pageId})`,
        },
        404,
      );
    }
    return page;
  }

  @Post()
  async postPage(@Body() newPage: NewPage) {
    const page = await this.pagesService.registerPage(newPage);
    await this.nodesService.postPageFirstNode(page);
    return page;
  }

  @Post('prevend')
  async postPagePreventChild(@Body() newPositionPage: NewPositionPage) {
    const newPage = newPositionPage as NewPage;
    const page = await this.pagesService.registerPage(newPage);
    await this.nodesService.postPagePreventChildTargetNode(
      newPositionPage.targetPageId,
      page,
    );
    return page;
  }

  @Post('append')
  async postPageAppendNext(@Body() newPositionPage: NewPositionPage) {
    const newPage = newPositionPage as NewPage;
    const page = await this.pagesService.registerPage(newPage);
    await this.nodesService.postPageAppendNextTargetNode(
      newPositionPage.targetPageId,
      page,
    );
    return page;
  }

  @Put()
  async putPage(@Body() updatePage: IPage) {
    const page = await this.pagesService.getPage(updatePage.pageId);
    if (!page) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `ページが見つかりません。(pageId=${updatePage.pageId})`,
        },
        404,
      );
    }
    await this.pagesService.putPage(updatePage);
  }
}
