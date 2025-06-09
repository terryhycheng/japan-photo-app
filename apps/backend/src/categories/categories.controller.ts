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
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from 'src/schemas/categories.schema';
import {
  CategoryDto,
  CreateCategoryDto,
  GetCategoryByIdDto,
  UpdateCategoryDto,
} from './dto/category.dto';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthGuard } from 'src/auth/decorators/auth.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCategories(): Promise<CategoryDto[]> {
    try {
      return this.categoriesService.getCategories();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
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
  @AuthGuard()
  @HttpCode(HttpStatus.CREATED)
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
  @AuthGuard()
  @HttpCode(HttpStatus.ACCEPTED)
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
  @AuthGuard()
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteCategory(@Param() { id }: GetCategoryByIdDto): Promise<Category> {
    try {
      return this.categoriesService.deleteCategory({ id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
