import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { DbModule } from '../db/db.module';
import { DbService } from '../db/db.service';

@Module({
  imports: [DbModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, DbService],
})
export class DocumentsModule {}
