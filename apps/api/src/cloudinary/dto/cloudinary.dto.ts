import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetPhotosByAssetFolderDto {
  @IsString()
  @IsNotEmpty()
  assetFolderName: string;

  @IsNumber()
  @IsNotEmpty()
  limit: number;
}
