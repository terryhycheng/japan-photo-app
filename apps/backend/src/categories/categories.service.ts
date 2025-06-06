import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/categories.schema';
import {
  CategoryDto,
  CreateCategoryDto,
  DeleteCategoryDto,
  GetCategoryByIdDto,
  UpdateCategoryDto,
} from './dto/category.dto';
import { PhotoDocument } from 'src/schemas/photo.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryModel
      .find()
      .populate<{ awardPhoto: PhotoDocument }>({
        path: 'awardPhoto',
        populate: {
          path: 'author',
        },
      })
      .exec();

    return categories.map((category) => ({
      id: category._id.toString(),
      name: category.name,
      description: category.description,
      awardPhoto: category.awardPhoto?._id.toString(),
      is_special: category.is_special,
    }));
  }

  async getCategoryById({ id }: GetCategoryByIdDto): Promise<CategoryDto> {
    const category = await this.categoryModel
      .findById(id)
      .populate<{ awardPhoto: PhotoDocument }>({
        path: 'awardPhoto',
        populate: {
          path: 'author',
        },
      })
      .exec();

    if (!category) {
      throw new NotFoundException('Invalid category id');
    }
    return {
      id: category._id.toString(),
      name: category.name,
      description: category.description,
      awardPhoto: category.awardPhoto?._id.toString(),
      is_special: category.is_special,
    };
  }

  async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(categoryDto);
    return category.save();
  }

  async updateCategory(categoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(
      categoryDto.id,
      {
        awardPhoto: categoryDto.awardPhoto,
      },
    );

    if (!category) {
      throw new NotFoundException('Invalid category id');
    }
    return category;
  }

  async deleteCategory(categoryDto: DeleteCategoryDto): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(categoryDto.id);

    if (!category) {
      throw new NotFoundException('Invalid category id');
    }
    return category;
  }
}
