import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { DbModule } from '../db/db.module';
import { DbService } from '../db/db.service';

@Module({
  imports: [DbModule],
  controllers: [AssetsController],
  providers: [AssetsService, DbService],
})
export class AssetsModule {}
