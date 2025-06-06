import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from 'src/schemas/photo.schema';
import {
  CreatePhotoDto,
  DeletePhotoDto,
  GetPhotoByIdDto,
  UpdatePhotoDto,
} from './dto/photos.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  async getPhotos(): Promise<Photo[]> {
    try {
      return await this.photosService.getPhotos();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('selected')
  async getSelectedPhotos(): Promise<Photo[]> {
    try {
      return await this.photosService.getSelectedPhotos();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  async getPhotoById(
    @Param() getPhotoByIdDto: GetPhotoByIdDto,
  ): Promise<Photo> {
    try {
      return await this.photosService.getPhotoById(getPhotoByIdDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  @HttpCode(201)
  async createPhoto(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
    try {
      return await this.photosService.createPhoto(createPhotoDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('batch')
  @HttpCode(201)
  async createPhotosByBatch(
    @Body() createPhotoDtos: CreatePhotoDto[],
  ): Promise<Photo[]> {
    try {
      return await this.photosService.createPhotosByBatch(createPhotoDtos);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put(':id')
  async updatePhoto(@Param() updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
    try {
      return await this.photosService.updatePhoto(updatePhotoDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async deletePhoto(@Param() deletePhotoDto: DeletePhotoDto): Promise<Photo> {
    try {
      return await this.photosService.deletePhoto(deletePhotoDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
