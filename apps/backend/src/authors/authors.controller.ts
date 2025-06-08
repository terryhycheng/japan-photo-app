import {
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorDto, CreateAuthorDto, GetAuthorByIdDto } from './dto/author.dto';
import { Author } from 'src/schemas/author.schema';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @HttpCode(200)
  async getAuthors(): Promise<AuthorDto[]> {
    try {
      return await this.authorsService.getAuthors();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String, required: true })
  async getAuthorById(
    @Param() getAuthorByIdDto: GetAuthorByIdDto,
  ): Promise<AuthorDto> {
    try {
      return await this.authorsService.getAuthorById(getAuthorByIdDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post()
  @HttpCode(201)
  @ApiBody({
    type: CreateAuthorDto,
    required: true,
    examples: {
      'example 1': {
        value: {
          code: '1234',
          name: 'John Doe',
        },
      },
    },
  })
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    try {
      return await this.authorsService.createAuthor(createAuthorDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
