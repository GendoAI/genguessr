import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { ImagesModule } from './images/images.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [GameModule, ImagesModule],
  controllers: [AppController],
  providers: [AppGateway, AppService],
})
export class AppModule {}
