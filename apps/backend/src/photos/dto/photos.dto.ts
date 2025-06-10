import { ApiProperty, PickType, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { AuthorDto } from 'src/authors/dto/author.dto';
import { CategoryDto } from 'src/categories/dto/category.dto';
import { JudgeDto } from 'src/judge/dto/judge.dto';

export class PhotoDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsObject()
  @IsOptional()
  @ApiProperty()
  judge?: JudgeDto;

  @IsObject()
  @ApiProperty({
    type: OmitType(AuthorDto, ['code']),
    example: {
      id: '123',
      name: 'John Doe',
    },
  })
  author: Omit<AuthorDto, 'code'>;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  original_filename: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  photo_id: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  is_selected: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  url: string;
}

export class CreatePhotoDto extends OmitType(PhotoDto, ['id', 'author']) {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  author: string;
}
export class UpdatePhotoDto extends PartialType(PhotoDto) {}
export class GetPhotoByIdDto extends PickType(PhotoDto, ['id']) {}
export class DeletePhotoDto extends PickType(PhotoDto, ['id']) {}
export class UpdateSelectionDto extends PickType(PhotoDto, ['id']) {}

export class OtherPhotoDto extends OmitType(PhotoDto, ['judge']) {
  @IsObject()
  @IsOptional()
  @ApiProperty({
    example: {
      category: {
        id: '123',
        name: 'Category 1',
      },
      comment: 'This is a comment',
    },
  })
  judge?: {
    category: Pick<CategoryDto, 'name' | 'description'>;
    comment: string;
  };
}
