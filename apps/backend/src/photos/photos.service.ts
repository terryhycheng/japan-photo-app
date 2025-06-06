import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo, PhotoDocument } from 'src/schemas/photo.schema';
import {
  CreatePhotoDto,
  DeletePhotoDto,
  GetPhotoByIdDto,
  UpdatePhotoDto,
} from './dto/photos.dto';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
    private readonly authorsService: AuthorsService,
  ) {}

  async getPhotos(): Promise<Photo[]> {
    return this.photoModel.find().populate('author').exec();
  }

  async getSelectedPhotos(): Promise<Photo[]> {
    const photos = await this.photoModel
      .find()
      .where('is_selected', true)
      .populate('author')
      .exec();

    return photos;
  }

  async getPhotoById({ id }: GetPhotoByIdDto): Promise<Photo> {
    const photo = await this.photoModel.findById(id).populate('author').exec();

    if (!photo) {
      throw new NotFoundException('Invalid photo id');
    }
    return photo;
  }

  async createPhotosByBatch(
    createPhotoDtos: CreatePhotoDto[],
  ): Promise<Photo[]> {
    const data = await Promise.all(
      createPhotoDtos.map(async (photo) => {
        const author = await this.authorsService.getAuthorById({
          id: photo.authorId,
        });
        return {
          ...photo,
          author,
        };
      }),
    );

    const photos = await this.photoModel.insertMany(data);
    return photos;
  }

  async createPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const author = await this.authorsService.getAuthorById({
      id: createPhotoDto.authorId,
    });

    const photo = new this.photoModel({
      ...createPhotoDto,
      author,
    });
    return photo.save();
  }

  async updatePhoto(updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
    const photo = await this.photoModel.findByIdAndUpdate(
      updatePhotoDto.id,
      updatePhotoDto,
    );

    if (!photo) {
      throw new NotFoundException('Invalid photo id');
    }
    return photo;
  }

  async deletePhoto({ id }: DeletePhotoDto): Promise<Photo> {
    const photo = await this.photoModel.findByIdAndDelete(id);

    if (!photo) {
      throw new NotFoundException('Invalid photo id');
    }
    return photo;
  }
}
