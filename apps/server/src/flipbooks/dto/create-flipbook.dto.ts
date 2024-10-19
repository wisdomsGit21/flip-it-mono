// import { IsString, IsObject, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';

// class VideoPosition {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   page: number;
// }

// export class CreateFlipbookDto {
//   @IsString()
//   title: string;

//   pdf: Express.Multer.File;

//   video: Express.Multer.File;

//   @IsObject()
//   @ValidateNested()
//   @Type(() => VideoPosition)
//   videoPosition: VideoPosition;
// }

// src/flipbooks/dto/create-flipbook.dto.ts
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsObject,
  ValidateNested,
  IsOptional,
} from 'class-validator';
// import { Type } from 'class-transformer';

// class VideoPosition {
//   @IsNumber()
//   x: number;

//   @IsNumber()
//   y: number;

//   @IsNumber()
//   width: number;

//   @IsNumber()
//   height: number;

//   @IsNumber()
//   page: number;
// }

export class CreateFlipbookDto {
  @IsString()
  title: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  })
  videoPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
    page: number;
  };
}
