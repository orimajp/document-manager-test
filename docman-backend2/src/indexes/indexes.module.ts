import { Module } from '@nestjs/common';
import { IndexesController } from './indexes.controller';
import { IndexesService } from './indexes.service';
import { DbModule } from '../db/db.module';
import { DocumentsService } from '../documents/documents.service';
import { DbService } from '../db/db.service';

@Module({
  imports: [DbModule],
  controllers: [IndexesController],
  providers: [IndexesService, DocumentsService, DbService],
})
export class IndexesModule {}
