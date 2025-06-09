import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorDto, CreateAuthorDto, GetAuthorByIdDto } from './dto/author.dto';
import { Author } from 'src/schemas/author.schema';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/decorators/auth.decorator';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAuthors(): Promise<AuthorDto[]> {
    try {
      return await this.authorsService.getAuthors();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
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
  @AuthGuard()
  @HttpCode(HttpStatus.CREATED)
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
