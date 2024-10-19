// src/flipbooks/flipbooks.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FlipbooksService } from './flipbooks.service';
import { CreateFlipbookDto } from './dto/create-flipbook.dto';

@Controller('flipbooks')
@UseGuards(AuthGuard('jwt'))
export class FlipbooksController {
  constructor(private readonly flipbooksService: FlipbooksService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'pdf', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: { pdf?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() createFlipbookDto: CreateFlipbookDto,
    @Request() req,
  ) {
    const dto = {
      ...createFlipbookDto,
      pdf: files.pdf[0],
      video: files.video[0],
    };
    return this.flipbooksService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.flipbooksService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.flipbooksService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'pdf', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ]),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles()
    files: { pdf?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() updateFlipbookDto: Partial<CreateFlipbookDto>,
    @Request() req,
  ) {
    const videoPosition =
      updateFlipbookDto.videoPosition &&
      typeof updateFlipbookDto.videoPosition === 'string'
        ? JSON.parse(updateFlipbookDto.videoPosition)
        : updateFlipbookDto.videoPosition;

    const dto = {
      ...updateFlipbookDto,
      pdf: files?.pdf?.[0],
      video: files?.video?.[0],
      videoPosition: videoPosition
        ? {
            x: Number(videoPosition.x),
            y: Number(videoPosition.y),
            width: Number(videoPosition.width),
            height: Number(videoPosition.height),
            page: Number(videoPosition.page),
          }
        : undefined,
    };
    return this.flipbooksService.update(+id, dto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.flipbooksService.remove(+id, req.user.userId);
  }
}
