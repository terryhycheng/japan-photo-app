import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from 'src/schemas/author.schema';
import { Model } from 'mongoose';
import { AuthorDto, CreateAuthorDto, GetAuthorByIdDto } from './dto/author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async getAuthors(): Promise<AuthorDto[]> {
    return this.authorModel
      .find()
      .exec()
      .then((authors) =>
        authors.map((author) => ({
          id: author._id.toString(),
          code: author.code,
          name: author.name,
        })),
      );
  }

  async getAuthorById({ id }: GetAuthorByIdDto): Promise<AuthorDto> {
    const author = await this.authorModel.findById(id).exec();

    if (!author) {
      throw new NotFoundException('Invalid author id');
    }
    return {
      id: author._id.toString(),
      code: author.code,
      name: author.name,
    };
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new this.authorModel(createAuthorDto);
    return author.save();
  }
}
