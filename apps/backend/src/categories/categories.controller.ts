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
import { CategoriesService } from './categories.service';
import { Category } from 'src/schemas/categories.schema';
import {
  CategoryDto,
  CreateCategoryDto,
  GetCategoryByIdDto,
  UpdateCategoryDto,
} from './dto/category.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(200)
  async getCategories(): Promise<CategoryDto[]> {
    try {
      return this.categoriesService.getCategories();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String, required: true })
  async getCategoryById(
    @Param() { id }: GetCategoryByIdDto,
  ): Promise<CategoryDto> {
    try {
      return this.categoriesService.getCategoryById({ id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  @HttpCode(201)
  @ApiBody({
    type: CreateCategoryDto,
    required: true,
    examples: {
      'example 1': {
        value: {
          name: 'Category 1',
          description: 'Description 1',
          is_special: false,
        },
      },
    },
  })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      return this.categoriesService.createCategory(createCategoryDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put(':id')
  @HttpCode(202)
  async updateCategory(
    @Param() { id }: GetCategoryByIdDto,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      return this.categoriesService.updateCategory({
        id,
        ...updateCategoryDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  @HttpCode(202)
  async deleteCategory(@Param() { id }: GetCategoryByIdDto): Promise<Category> {
    try {
      return this.categoriesService.deleteCategory({ id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
