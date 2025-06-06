import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
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
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  awardPhoto: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  is_special: boolean;
}

export class CreateCategoryDto extends OmitType(CategoryDto, ['id']) {}
export class UpdateCategoryDto extends PartialType(CategoryDto) {}
export class GetCategoryByIdDto extends PickType(CategoryDto, ['id']) {}
export class DeleteCategoryDto extends PickType(CategoryDto, ['id']) {}
