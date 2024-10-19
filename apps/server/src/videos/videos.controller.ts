import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from './videos.service';

@Controller('videos')
@UseGuards(AuthGuard('jwt'))
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.videosService.create(file, req.user.userId);
  }

  @Get()
  async getAllVideos(@Request() req) {
    return this.videosService.findAll(req.user.userId);
  }
}
