import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import {
  PhotosClearCacheDto,
  PhotosDto,
  UpdateSelectionDto,
} from './dto/photos.dto';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
@Controller('/api/photos')
@ApiInternalServerErrorResponse({
  description: 'Internal server error from unknown issue',
})
@ApiTooManyRequestsResponse({
  description: 'Too many requests',
})
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all photos',
    description: 'Get all photos from the database',
  })
  @ApiOkResponse({
    description: 'All photos from the database',
    type: [PhotosDto],
  })
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
  @ApiOperation({
    summary: 'Get the selected photos',
    description: 'Get the selected photos from the database',
  })
  @ApiOkResponse({
    description: 'The selected photos from the database',
    type: [PhotosDto],
  })
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
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update if the photos are selected',
    description:
      'Update if the photos are selected for the 2nd round of judging',
  })
  @ApiBody({
    description: 'The selection of photos',
    type: UpdateSelectionDto,
  })
  @ApiOkResponse({
    description: 'The selection of photos updated successfully',
  })
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
  @HttpCode(200)
  @ApiOperation({
    summary: 'Clear the cache for the photos',
    description: 'Helper function to clear the cache for the photos on Redis',
  })
  @ApiOkResponse({
    description: 'Cache cleared successfully',
  })
  @ApiBody({
    description: 'The key to clear the cache for',
    type: PhotosClearCacheDto,
  })
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
