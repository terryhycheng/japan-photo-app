import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from './schemas/photo.schema';
import { Author, AuthorSchema } from './schemas/author.schema';
import { Category, CategorySchema } from './schemas/categories.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/jp-photos'),
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
