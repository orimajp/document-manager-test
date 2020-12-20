import { Module } from '@nestjs/common';
import { dbProviders } from './db.providers';
import { DbService } from './db.service';

// https://docs.nestjs.com/recipes/sql-typeorm
@Module({
  providers: [...dbProviders, DbService],
  exports: [...dbProviders],
})
export class DbModule {}
