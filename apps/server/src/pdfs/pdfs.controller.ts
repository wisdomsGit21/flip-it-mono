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
import { PDFsService } from './pdfs.service';

@Controller('pdfs')
@UseGuards(AuthGuard('jwt'))
export class PDFsController {
  constructor(private pdfsService: PDFsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPDF(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.pdfsService.create(file, req.user.userId);
  }

  @Get()
  async getAllPDFs(@Request() req) {
    return this.pdfsService.findAll(req.user.userId);
  }
}
