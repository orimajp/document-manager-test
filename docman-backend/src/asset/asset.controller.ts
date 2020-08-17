import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IdentityService } from '~/identity/identity.service';
import { AssetService } from '~/asset/asset.service';
import { UploadResponse } from '~/asset/upload-response';
import { Asset } from '~/asset/asset';

@Controller('api/assets')
export class AssetController {
  constructor(private readonly assetService: AssetService,
              private readonly identityService: IdentityService) {
  }

  // https://docs.nestjs.com/techniques/file-upload
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file)
    const id = this.identityService.generateId()
    this.assetService.registerAsset(id, file.originalname, file.mimetype, file.buffer)
    return new UploadResponse(file.originalname, this.createLocation(id))
  }

  // https://github.com/nestjs/nest/issues/1090
  @Get(':assetId')
  async getAsset(@Param('assetId') assetId: string, @Res() res) {
    const asset = this.assetService.getAsset(assetId)
    const stream = this.assetService.getReadableStream(asset.buffer)
    this.setHeaders(res, asset)
    stream.pipe(res)
  }

  private createLocation(id: string) {
    return `/api/assets/${id}`
  }

  private setHeaders(res, asset: Asset) {
    res.set({
      'Content-Type': asset.mimeType,
      'Content-Length': asset.buffer.length
    })
  }
}
