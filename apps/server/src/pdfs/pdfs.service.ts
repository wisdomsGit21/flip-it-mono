import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinioService } from '../minio/minio.service';
import { PDF } from './entity/pdf.entity';

@Injectable()
export class PDFsService {
  constructor(
    @InjectRepository(PDF)
    private pdfsRepository: Repository<PDF>,
    private minioService: MinioService,
  ) {}

  async create(file: Express.Multer.File, userId: number): Promise<PDF> {
    const url = await this.minioService.uploadFile(
      'flip-it-pdfs',
      file.originalname,
      file.buffer,
    );
    const pdf = this.pdfsRepository.create({
      name: file.originalname,
      url,
      user: { id: userId },
    });
    return this.pdfsRepository.save(pdf);
  }

  async findAll(userId: number): Promise<PDF[]> {
    return this.pdfsRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number): Promise<PDF> {
    return this.pdfsRepository.findOne({ where: { id } });
  }
}
