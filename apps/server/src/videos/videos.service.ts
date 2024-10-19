import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinioService } from '../minio/minio.service';
import { Video } from './entity/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
    private minioService: MinioService,
  ) {}

  async create(file: Express.Multer.File, userId: number): Promise<Video> {
    const url = await this.minioService.uploadFile(
      'flip-it-videos',
      file.originalname,
      file.buffer,
    );
    const video = this.videosRepository.create({
      name: file.originalname,
      url,
      user: { id: userId },
    });
    return this.videosRepository.save(video);
  }

  async findAll(userId: number): Promise<Video[]> {
    return this.videosRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number): Promise<Video> {
    return this.videosRepository.findOne({ where: { id } });
  }
}
