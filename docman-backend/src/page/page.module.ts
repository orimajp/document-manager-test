import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { IdentityService } from '~/identity/identity.service';
import { NodeService } from '~/node/node.service';
import { IndexService } from '~/index/index.service';

@Module({
  controllers: [PageController],
  providers: [PageService, IdentityService, NodeService, IndexService]
})
export class PageModule {}
