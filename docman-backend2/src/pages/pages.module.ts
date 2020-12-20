import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { DbModule } from '../db/db.module';
import { NodesService } from '../nodes/nodes.service';
import { DbService } from '../db/db.service';

@Module({
  imports: [DbModule],
  controllers: [PagesController],
  providers: [PagesService, NodesService, DbService],
})
export class PagesModule {}
