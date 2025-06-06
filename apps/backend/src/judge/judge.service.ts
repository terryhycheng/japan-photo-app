import { Injectable } from '@nestjs/common';
import { PhotosService } from 'src/photos/photos.service';
import {
  AssignAwardBody,
  CreateMainJudgeDto,
  CreateOtherJudgeDto,
} from './dto/judge.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class JudgeService {
  constructor(
    private readonly photosService: PhotosService,
    private readonly categoryService: CategoriesService,
  ) {}

  async createMainJudge({ photoId, comment, scores }: CreateMainJudgeDto) {
    const photoData = await this.photosService.getPhotoById({ id: photoId }); // already checked if the id is valid

    await this.photosService.updatePhoto({
      id: photoData.id,
      judge: {
        comment,
        scores,
      },
    });
  }

  async createOtherJudge({
    photoId,
    categoryId,
    comment,
  }: CreateOtherJudgeDto) {
    const photoData = await this.photosService.getPhotoById({ id: photoId }); // already checked if the id is valid
    const categoryData = await this.categoryService.getCategoryById({
      id: categoryId,
    }); // already checked if the id is valid

    await this.photosService.updatePhoto({
      id: photoData.id,
      judge: {
        categoryId: categoryData.id,
        comment,
      },
    });
  }

  async assignAward({ awards }: AssignAwardBody) {
    await Promise.all(
      awards.map(async (award) => {
        await this.categoryService.updateCategory({
          id: award.categoryId,
          awardPhoto: award.photoId,
        });
      }),
    );
  }
}
