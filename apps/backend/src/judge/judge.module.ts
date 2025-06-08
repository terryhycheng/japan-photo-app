import { Module } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { PhotosModule } from 'src/photos/photos.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { JudgeController } from './judge.controller';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [PhotosModule, CategoriesModule, AuthorsModule],
  providers: [JudgeService],
  controllers: [JudgeController],
})
export class JudgeModule {}
