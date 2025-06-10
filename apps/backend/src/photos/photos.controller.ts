import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { AuthGuard } from 'src/auth/decorators/auth.decorator';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [PhotoDto] })
  async getPhotos(): Promise<PhotoDto[]> {
    try {
      return await this.photosService.getPhotos();
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  @Get('selected')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [PhotoDto] })
  async getSelectedPhotos(): Promise<PhotoDto[]> {
    try {
      return await this.photosService.getSelectedPhotos();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
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

  @Post('selection')
  @AuthGuard()
  @HttpCode(HttpStatus.CREATED)
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
  @AuthGuard()
  @HttpCode(HttpStatus.CREATED)
  async createPhotosByBatch(@Body() createPhotoDtos: CreatePhotoDto[]) {
    try {
      return await this.photosService.createPhotosByBatch(createPhotoDtos);
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error);
    }
  }

  @Put(':id')
  @AuthGuard()
  @HttpCode(HttpStatus.ACCEPTED)
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
}
