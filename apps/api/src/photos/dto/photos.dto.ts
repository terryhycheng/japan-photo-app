import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class AuthorDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

export class PhotosDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  author: AuthorDto;
}

export class UpdateSelectionDto {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  selection: string[];
}

export class PhotosClearCacheDto {
  @ApiProperty()
  @IsString()
  key: 'photos' | 'photos-selected';
}
