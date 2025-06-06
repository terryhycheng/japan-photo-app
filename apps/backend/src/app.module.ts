import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotosModule } from './photos/photos.module';
import { JudgeModule } from './judge/judge.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27017/jp-photos?authSource=admin',
    ),
    PhotosModule,
    JudgeModule,
    CategoriesModule,
    AuthorsModule,
  ],
})
export class AppModule {}
