import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './document/document.module';
import { PageModule } from './page/page.module';
import { NodeModule } from './node/node.module';

@Module({
  imports: [DocumentModule, PageModule, NodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
