// src/flipbooks/flipbooks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flipbook } from './entities/flipbook.entity';
import { PDFsService } from '../pdfs/pdfs.service';
import { VideosService } from '../videos/videos.service';
import { CreateFlipbookDto } from './dto/create-flipbook.dto';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class FlipbooksService {
  constructor(
    @InjectRepository(Flipbook)
    private flipbooksRepository: Repository<Flipbook>,
    private pdfsService: PDFsService,
    private videosService: VideosService,
  ) {}

  async create(
    createFlipbookDto: CreateFlipbookDto & {
      pdf: Express.Multer.File;
      video: Express.Multer.File;
    },
    userId: number,
  ): Promise<Flipbook> {
    const { title, pdf, video, videoPosition } = createFlipbookDto;

    const pdfEntity = await this.pdfsService.create(pdf, userId);
    const videoEntity = await this.videosService.create(video, userId);

    const flipbook = new Flipbook();
    flipbook.title = title;
    flipbook.pdf = pdfEntity;
    flipbook.video = videoEntity;
    flipbook.videoPosition = videoPosition;
    flipbook.user = { id: userId } as User;

    return this.flipbooksRepository.save(flipbook);
  }

  async findAll(userId: number): Promise<Flipbook[]> {
    return this.flipbooksRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number): Promise<Flipbook> {
    return this.flipbooksRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateFlipbookDto: Partial<
      CreateFlipbookDto & {
        pdf?: Express.Multer.File;
        video?: Express.Multer.File;
      }
    >,
    userId: number,
  ): Promise<Flipbook> {
    const flipbook = await this.flipbooksRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!flipbook) {
      throw new Error('Flipbook not found');
    }

    if (updateFlipbookDto.title) {
      flipbook.title = updateFlipbookDto.title;
    }

    if (updateFlipbookDto.pdf) {
      const newPdf = await this.pdfsService.create(
        updateFlipbookDto.pdf,
        userId,
      );
      flipbook.pdf = newPdf;
    }

    if (updateFlipbookDto.video) {
      const newVideo = await this.videosService.create(
        updateFlipbookDto.video,
        userId,
      );
      flipbook.video = newVideo;
    }

    if (updateFlipbookDto.videoPosition) {
      flipbook.videoPosition = updateFlipbookDto.videoPosition;
    }

    return this.flipbooksRepository.save(flipbook);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.flipbooksRepository.delete({ id, user: { id: userId } });
  }
}
