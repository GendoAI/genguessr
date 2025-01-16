import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ImagesController],
})
export class ImagesModule {}
