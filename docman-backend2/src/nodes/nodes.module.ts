import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { DbModule } from '../db/db.module';
import { DbService } from '../db/db.service';

@Module({
  imports: [DbModule],
  providers: [NodesService, DbService],
})
export class NodesModule {}
