import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo, PhotoDocument } from 'src/schemas/photo.schema';
import {
  CreatePhotoDto,
  DeletePhotoDto,
  GetPhotoByIdDto,
  PhotoDto,
  UpdatePhotoDto,
  UpdateSelectionDto,
} from './dto/photos.dto';
import { AuthorsService } from 'src/authors/authors.service';
import { AuthorDocument } from 'src/schemas/author.schema';
import { JudgeDto } from 'src/judge/dto/judge.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
    private readonly authorsService: AuthorsService,
  ) {}

  async getPhotos(): Promise<PhotoDto[]> {
    const photos = await this.photoModel
      .find()
      .populate<{ author: AuthorDocument }>('author')
      .populate<{ judge: JudgeDto }>('judge')
      .exec();
    return photos.map((photo) => ({
      id: photo._id.toString(),
      author: {
        id: photo.author._id.toString(),
        name: photo.author.name,
      },
      original_filename: photo.original_filename,
      photo_id: photo.photo_id,
      is_selected: photo.is_selected,
      url: photo.url,
      judge: photo.judge,
    }));
  }

  async getSelectedPhotos(): Promise<PhotoDto[]> {
    const photos = await this.photoModel
      .find()
      .where('is_selected', true)
      .populate<{ author: AuthorDocument }>('author')
      .exec();

    return photos.map((photo) => ({
      id: photo._id.toString(),
      author: {
        id: photo.author._id.toString(),
        name: photo.author.name,
      },
      original_filename: photo.original_filename,
      photo_id: photo.photo_id,
      is_selected: photo.is_selected,
      url: photo.url,
    }));
  }

  async getPhotoById({ id }: GetPhotoByIdDto): Promise<PhotoDto> {
    const photo = await this.photoModel
      .findById(id)
      .populate<{ author: AuthorDocument }>('author')
      .populate<{ judge: JudgeDto }>('judge')
      .exec();

    if (!photo) {
      throw new NotFoundException('Invalid photo id');
    }
    return {
      id: photo._id.toString(),
      author: {
        id: photo.author._id.toString(),
        name: photo.author.name,
      },
      original_filename: photo.original_filename,
      photo_id: photo.photo_id,
      is_selected: photo.is_selected,
      url: photo.url,
      judge: photo.judge,
    };
  }

  async createPhotosByBatch(
    createPhotoDtos: CreatePhotoDto[],
  ): Promise<PhotoDto[]> {
    const data = await Promise.all(
      createPhotoDtos.map(async (photo) => {
        const author = await this.authorsService.getAuthorById({
          id: photo.author.id,
        });
        return {
          ...photo,
          author,
        };
      }),
    );

    const photos = await this.photoModel.insertMany(data);
    return photos.map((photo) => ({
      ...photo,
      id: photo._id.toString(),
      author: {
        id: photo.author.id,
        name: photo.author.name,
      },
      original_filename: photo.original_filename,
    }));
  }

  async createPhoto(createPhotoDto: CreatePhotoDto): Promise<PhotoDto> {
    const author = await this.authorsService.getAuthorById({
      id: createPhotoDto.author.id,
    });

    const photo = new this.photoModel({
      ...createPhotoDto,
      author,
    });

    return photo.save().then((photo) => ({
      id: photo._id.toString(),
      author,
      original_filename: photo.original_filename,
      photo_id: photo.photo_id,
      is_selected: photo.is_selected,
      url: photo.url,
    }));
  }

  async updatePhoto(updatePhotoDto: UpdatePhotoDto): Promise<PhotoDto> {
    const photo = await this.photoModel
      .findByIdAndUpdate(updatePhotoDto.id, updatePhotoDto)
      .populate<{ author: AuthorDocument }>('author')
      .exec();

    if (!photo) {
      throw new NotFoundException('Invalid photo id');
    }
    return {
      id: photo._id.toString(),
      author: {
        id: photo.author._id.toString(),
        name: photo.author.name,
      },
      original_filename: photo.original_filename,
      photo_id: photo.photo_id,
      is_selected: photo.is_selected,
      url: photo.url,
    };
  }

  async updateSelection(selection: UpdateSelectionDto[]): Promise<void> {
    const selectedPhotos = await this.getSelectedPhotos();

    // check if the selection is in the selected photos, if not, set them to true
    const photosToSetTrue = selection.filter(
      (item) => !selectedPhotos.some((photo) => photo.id === item.id),
    );

    // check if selected photos are in the selection, if not, set them to false
    const photosToSetFalse = selectedPhotos
      .filter((photo) => !selection.some((item) => item.id === photo.id))
      .map((photo) => photo.id);

    await this.photoModel.updateMany(
      { _id: { $in: photosToSetTrue } },
      { $set: { is_selected: true } },
    );

    await this.photoModel.updateMany(
      { _id: { $in: photosToSetFalse } },
      { $set: { is_selected: false } },
    );
  }

  async deletePhoto({ id }: DeletePhotoDto): Promise<PhotoDto> {
    const photo = await this.photoModel
      .findByIdAndDelete(id)
      .populate<{ author: AuthorDocument }>('author');

    if (!photo) {
      throw new NotFoundException('Invalid photo id');
    }
    return {
      id: photo._id.toString(),
      author: {
        id: photo.author._id.toString(),
        name: photo.author.name,
      },
      original_filename: photo.original_filename,
      photo_id: photo.photo_id,
      is_selected: photo.is_selected,
      url: photo.url,
    };
  }
}
