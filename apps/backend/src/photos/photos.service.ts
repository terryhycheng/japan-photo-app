import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo, PhotoDocument } from 'src/schemas/photo.schema';
import {
  CreatePhotoDto,
  DeletePhotoDto,
  GetPhotoByIdDto,
  OtherPhotoDto,
  PhotoDto,
  UpdatePhotoDto,
  UpdateSelectionDto,
} from './dto/photos.dto';
import { AuthorsService } from 'src/authors/authors.service';
import { AuthorDocument } from 'src/schemas/author.schema';
import { JudgeDto } from 'src/judge/dto/judge.dto';
import { CategoryDocument } from 'src/schemas/categories.schema';

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

  async createPhotosByBatch(createPhotoDtos: CreatePhotoDto[]) {
    const authors = await this.authorsService.getAuthors();

    const authorMap = new Map(authors.map((author) => [author.id, author]));

    const data = createPhotoDtos.map((photo) => {
      const author = authorMap.get(photo.author);

      return {
        ...photo,
        author: author?.id,
      };
    });

    const photos = await this.photoModel.create(data);
    return photos;
  }

  async createPhoto(createPhotoDto: CreatePhotoDto): Promise<PhotoDto> {
    const author = await this.authorsService.getAuthorById({
      id: createPhotoDto.author,
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
    const selectedPhotoIds = selectedPhotos.map((photo) => photo.id);

    await this.photoModel.updateMany(
      { _id: { $nin: selection, $in: selectedPhotoIds } },
      { $set: { is_selected: false } },
    );

    await this.photoModel.updateMany(
      { _id: { $in: selection, $nin: selectedPhotoIds } },
      { $set: { is_selected: true } },
    );
  }

  async getOtherPhotos(): Promise<OtherPhotoDto[]> {
    const categorisedOtherPhotos = await this.photoModel
      .find()
      .where({ is_selected: false, judge: { $exists: true } })
      .populate<{ author: AuthorDocument }>('author')
      .populate<{ judge: { categoryId: CategoryDocument; comment: string } }>({
        path: 'judge.categoryId',
        model: 'Category',
      })
      .exec();

    const result: OtherPhotoDto[] = categorisedOtherPhotos.map((photo) => {
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
        judge: {
          category: {
            name: photo.judge.categoryId.name,
            description: photo.judge.categoryId.description,
          },
          comment: photo.judge.comment,
        },
      };
    });

    return result;
  }
}
