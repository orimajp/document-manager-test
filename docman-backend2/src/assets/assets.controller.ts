import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IAsset } from './asset.interface';
import { UploadResponse } from './upload-response';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  // https://docs.nestjs.com/techniques/file-upload
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    const id = await this.assetsService.registerAsset(
      file.originalname,
      file.mimetype,
      file.buffer,
    );
    return new UploadResponse(file.originalname, this.createLocation(id));
  }

  // https://github.com/nestjs/nest/issues/1090
  @Get(':assetId')
  async getAsset(@Param('assetId') assetId: string, @Res() res) {
    const asset = await this.assetsService.getAsset(assetId);
    if (!asset.buffer) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `アセットが見つかりません。(assetId=${assetId})`,
        },
        404,
      );
    }
    const stream = this.assetsService.getReadableStream(asset.buffer);
    this.setHeaders(res, asset);
    stream.pipe(res);
  }

  private createLocation(id: string) {
    return `/api/assets/${id}`;
  }

  private setHeaders(res, asset: IAsset) {
    res.set({
      'Content-Type': asset.mimeType,
      'Content-Length': asset.buffer.length,
    });
  }
}
