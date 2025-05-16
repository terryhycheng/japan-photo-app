import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { JudgeMainBody } from 'src/judge/dto/judge.dto';

export class AuthorDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

export class GetSinglePhotoParams {
  @ApiProperty({
    description: 'The ID of the photo to be retrieved',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  photoId: string;
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
  @ApiProperty()
  judge: JudgeMainBody;
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
  @IsOptional()
  key?: string;
}
