import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from 'src/schemas/photo.schema';
import { PhotosController } from './photos.controller';
import { Author, AuthorSchema } from 'src/schemas/author.schema';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Photo.name, schema: PhotoSchema },
      { name: Author.name, schema: AuthorSchema },
    ]),
    AuthorsModule,
  ],
  providers: [PhotosService],
  controllers: [PhotosController],
  exports: [PhotosService],
})
export class PhotosModule {}
