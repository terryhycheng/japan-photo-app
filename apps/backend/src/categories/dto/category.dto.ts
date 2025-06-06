import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CategoryDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_special: boolean;
}

export class CreateCategoryDto extends OmitType(CategoryDto, ['id']) {}
export class UpdateCategoryDto extends PartialType(CategoryDto) {}
export class GetCategoryByIdDto extends PickType(CategoryDto, ['id']) {}
export class DeleteCategoryDto extends PickType(CategoryDto, ['id']) {}
