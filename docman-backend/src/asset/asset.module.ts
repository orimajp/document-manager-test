import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { IdentityService } from '~/identity/identity.service';

@Module({
  controllers: [AssetController],
  providers: [AssetService, IdentityService]
})
export class AssetModule {}
