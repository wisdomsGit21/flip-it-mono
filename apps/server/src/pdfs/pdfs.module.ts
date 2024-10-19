import { Module } from '@nestjs/common';
import { PDFsController } from './pdfs.controller';
import { PDFsService } from './pdfs.service';
import { MinioService } from 'src/minio/minio.service';
import { MinioModule } from 'src/minio/minio.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PDF } from './entity/pdf.entity';

@Module({
  providers: [PDFsService],
  imports: [MinioModule, TypeOrmModule.forFeature([PDF])],
  controllers: [PDFsController],
  exports: [PDFsService],
})
export class PdfsModule {}
