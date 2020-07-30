import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { PageService } from '~/page/page.service';
import { IdentityService } from '~/identity/identity.service';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, PageService, IdentityService]
})
export class DocumentModule {}
