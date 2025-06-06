import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PhotoDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsMongoId()
  @IsNotEmpty()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  original_filename: string;

  @IsString()
  @IsNotEmpty()
  photo_id: string;

  @IsBoolean()
  @IsOptional()
  is_selected: boolean;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreatePhotoDto extends OmitType(PhotoDto, ['id']) {}
export class UpdatePhotoDto extends PartialType(PhotoDto) {}
export class GetPhotoByIdDto extends PickType(PhotoDto, ['id']) {}
export class DeletePhotoDto extends PickType(PhotoDto, ['id']) {}
