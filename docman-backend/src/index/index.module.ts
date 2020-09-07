import { Module } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexController } from './index.controller';
import { DocumentService } from '~/document/document.service';

@Module({
  providers: [IndexService, DocumentService],
  controllers: [IndexController]
})
export class IndexModule {}
