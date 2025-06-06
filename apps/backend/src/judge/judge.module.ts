import { Module } from '@nestjs/common';
import { JudgeService } from './judge.service';
import { PhotosModule } from 'src/photos/photos.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { JudgeController } from './judge.controller';

@Module({
  imports: [PhotosModule, CategoriesModule],
  providers: [JudgeService],
  controllers: [JudgeController],
})
export class JudgeModule {}
