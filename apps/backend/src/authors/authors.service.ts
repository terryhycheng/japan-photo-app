import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from 'src/schemas/author.schema';
import { Model } from 'mongoose';
import { CreateAuthorDto, GetAuthorByIdDto } from './dto/author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async getAuthors(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async getAuthorById({ id }: GetAuthorByIdDto): Promise<Author> {
    const author = await this.authorModel.findById(id).exec();

    if (!author) {
      throw new NotFoundException('Invalid author id');
    }
    return author;
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new this.authorModel(createAuthorDto);
    return author.save();
  }
}
