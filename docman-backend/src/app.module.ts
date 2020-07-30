import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './document/document.module';
import { PageModule } from './page/page.module';
import { NodeModule } from './node/node.module';
import { IdentityModule } from './identity/identity.module';

@Module({
  imports: [DocumentModule, PageModule, NodeModule, IdentityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
