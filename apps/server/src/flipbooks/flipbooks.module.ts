// src/flipbooks/flipbooks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlipbooksController } from './flipbooks.controller';
import { FlipbooksService } from './flipbooks.service';
import { Flipbook } from './entities/flipbook.entity';
import { PdfsModule } from '../pdfs/pdfs.module';
import { VideosModule } from '../videos/videos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Flipbook]), PdfsModule, VideosModule],
  controllers: [FlipbooksController],
  providers: [FlipbooksService],
})
export class FlipbooksModule {}
