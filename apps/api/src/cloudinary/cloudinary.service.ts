import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { GetPhotosByAssetFolderDto } from './dto/cloudinary.dto';

@Injectable()
export class CloudinaryService {
  constructor() {}

  async getPhotosByAssetFolder({
    assetFolderName,
    limit,
  }: GetPhotosByAssetFolderDto) {
    const data = await cloudinary.api.resources_by_asset_folder(
      assetFolderName,
      {
        max_results: limit,
      },
    );

    return data.resources;
  }
}
