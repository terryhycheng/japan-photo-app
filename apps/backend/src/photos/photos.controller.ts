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
import {
  CreatePhotoDto,
  DeletePhotoDto,
  GetPhotoByIdDto,
  PhotoDto,
  UpdatePhotoDto,
  UpdateSelectionDto,
} from './dto/photos.dto';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  @ApiOkResponse({ type: [PhotoDto] })
  async getPhotos(): Promise<PhotoDto[]> {
    try {
      return await this.photosService.getPhotos();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('selected')
  @ApiOkResponse({ type: [PhotoDto] })
  async getSelectedPhotos(): Promise<PhotoDto[]> {
    try {
      return await this.photosService.getSelectedPhotos();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: PhotoDto })
  async getPhotoById(
    @Param() getPhotoByIdDto: GetPhotoByIdDto,
  ): Promise<PhotoDto> {
    try {
      const photo = await this.photosService.getPhotoById(getPhotoByIdDto);
      return photo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  @HttpCode(201)
  @ApiOkResponse({ type: PhotoDto })
  async createPhoto(@Body() createPhotoDto: CreatePhotoDto): Promise<PhotoDto> {
    try {
      return await this.photosService.createPhoto(createPhotoDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('selection')
  @HttpCode(201)
  async updateSelection(
    @Body() updateSelectionDto: UpdateSelectionDto[],
  ): Promise<void> {
    try {
      return await this.photosService.updateSelection(updateSelectionDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('batch')
  @HttpCode(201)
  async createPhotosByBatch(
    @Body() createPhotoDtos: CreatePhotoDto[],
  ): Promise<PhotoDto[]> {
    try {
      return await this.photosService.createPhotosByBatch(createPhotoDtos);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put(':id')
  async updatePhoto(
    @Body() updatePhotoDto: UpdatePhotoDto,
    @Param() photoId: GetPhotoByIdDto,
  ): Promise<PhotoDto> {
    try {
      return await this.photosService.updatePhoto({
        id: photoId.id,
        ...updatePhotoDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async deletePhoto(
    @Param() deletePhotoDto: DeletePhotoDto,
  ): Promise<PhotoDto> {
    try {
      return await this.photosService.deletePhoto(deletePhotoDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
