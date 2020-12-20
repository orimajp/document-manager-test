import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { DbModule } from './db/db.module';
import { NodesModule } from './nodes/nodes.module';
import { PagesModule } from './pages/pages.module';
import { IndexesModule } from './indexes/indexes.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [DocumentsModule, DbModule, NodesModule, PagesModule, IndexesModule, AssetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
