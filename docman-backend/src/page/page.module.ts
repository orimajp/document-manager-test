import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { IdentityService } from '~/identity/identity.service';

@Module({
  controllers: [PageController],
  providers: [PageService, IdentityService]
})
export class PageModule {}
