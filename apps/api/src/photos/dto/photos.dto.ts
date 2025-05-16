import { IsArray, IsString } from 'class-validator';
export class PhotosDto {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export class UpdateSelectionDto {
  @IsArray()
  @IsString({ each: true })
  selection: string[];
}

export class PhotosClearCacheDto {
  @IsString()
  key: 'photos' | 'photos-selected';
}
