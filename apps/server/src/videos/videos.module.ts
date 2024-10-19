import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { MinioModule } from 'src/minio/minio.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';

@Module({
  controllers: [VideosController],
  providers: [VideosService],
  imports: [MinioModule, TypeOrmModule.forFeature([Video])],
  exports: [VideosService],
})
export class VideosModule {}
