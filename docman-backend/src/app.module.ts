import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './document/document.module';
import { PageModule } from './page/page.module';
import { NodeModule } from './node/node.module';
import { IdentityModule } from './identity/identity.module';
import { AssetModule } from './asset/asset.module';
import { IndexModule } from './index/index.module';

@Module({
  imports: [DocumentModule, PageModule, NodeModule, IdentityModule, AssetModule, IndexModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
