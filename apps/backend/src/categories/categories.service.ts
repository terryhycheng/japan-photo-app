import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/categories.schema';
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  GetCategoryByIdDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async getCategoryById({ id }: GetCategoryByIdDto): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();

    if (!category) {
      throw new NotFoundException('Invalid category id');
    }
    return category;
  }

  async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(categoryDto);
    return category.save();
  }

  async updateCategory(categoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(
      categoryDto.id,
      categoryDto,
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
