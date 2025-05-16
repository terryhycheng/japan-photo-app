import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosClearCacheDto, UpdateSelectionDto } from './dto/photos.dto';

@Controller('/api/photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  async getPhotos() {
    try {
      return await this.photosService.getPhotos();
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('selected')
  async getSelectedPhotos() {
    try {
      return await this.photosService.getSelectedPhotos();
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('selected')
  async updateSelection(@Body() body: UpdateSelectionDto): Promise<void> {
    try {
      return await this.photosService.updateSelection(body.selection);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('clear-cache')
  async clearCache(@Body() body: PhotosClearCacheDto) {
    try {
      return await this.photosService.clearCache(body.key);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
