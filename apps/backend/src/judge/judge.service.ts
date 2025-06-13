import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PhotosService } from 'src/photos/photos.service';
import {
  AssignAwardBody,
  CreateMainJudgeDto,
  CreateOtherJudgeDto,
  OtherPhotoResultDto,
  RankingDto,
  ResultDto,
  SpecialAwardDto,
} from './dto/judge.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { AuthorsService } from 'src/authors/authors.service';
import { markingScheme } from './utils/markings';
import * as _ from 'lodash';

@Injectable()
export class JudgeService {
  constructor(
    private readonly photosService: PhotosService,
    private readonly categoryService: CategoriesService,
    private readonly authorsService: AuthorsService,
  ) {}

  async calculateResult(): Promise<ResultDto> {
    let photoRanking: {
      photoId: string;
      author: string;
      score: number;
    }[] = [];
    const result: Record<string, number> = {};
    const authors = await this.authorsService.getAuthors();

    for (const author of authors) {
      result[author.name] = 0;
    }

    const selectedPhotos = await this.photosService.getSelectedPhotos();
    const specialCategories = (
      await this.categoryService.getCategories()
    ).filter((c) => c.is_special);

    for (const photo of selectedPhotos) {
      if (!photo.judge || !photo.judge.scores) {
        continue;
      }

      const score = this.calculateScore(photo.judge.scores);

      photoRanking.push({
        photoId: photo.id,
        author: photo.author.name,
        score: Number(((score / 130) * 100).toFixed(2)),
      });
    }

    try {
      photoRanking = _.orderBy(photoRanking, ['score'], ['desc']).slice(0, 15);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    photoRanking.forEach((photo, index) => {
      result[photo.author] += markingScheme.ranking[index];
    });

    for (const category of specialCategories) {
      const photo = await this.photosService.getPhotoById({
        id: category.awardPhoto,
      });

      result[photo.author.name] = result[photo.author.name] || 0;
      result[photo.author.name] += markingScheme.special_award.score;
    }

    return {
      result,
    };
  }

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

  async getSpecialAwards(): Promise<SpecialAwardDto[]> {
    const categories = await this.categoryService.getCategories();
    const specialCategories = categories.filter((c) => c.is_special);
    const specialAwards = await Promise.all(
      specialCategories.map(async (c) => {
        const photo = await this.photosService.getPhotoById({
          id: c.awardPhoto,
        });
        return {
          photo,
          category: c,
        };
      }),
    );

    return specialAwards.map((award) => ({
      photo: {
        id: award.photo.id,
        url: award.photo.url,
      },
      category: {
        id: award.category.id,
        name: award.category.name,
      },
      author: {
        id: award.photo.author.id,
        name: award.photo.author.name,
      },
    }));
  }

  async getRanking(): Promise<RankingDto[]> {
    const selectedPhotos = await this.photosService.getSelectedPhotos();
    const ranking: RankingDto[] = [];
    for (const photo of selectedPhotos) {
      if (!photo.judge || !photo.judge.scores) {
        continue;
      }

      const totalScore = this.calculateScore(photo.judge.scores);

      ranking.push({
        photo: {
          id: photo.id,
          total_score: Number(((totalScore / 130) * 100).toFixed(2)),
          scores: photo.judge.scores,
          comment: photo.judge.comment,
          url: photo.url,
        },
        author: {
          id: photo.author.id,
          name: photo.author.name,
        },
      });
    }

    try {
      const result = _.orderBy(ranking, ['photo.total_score'], ['desc']);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOtherPhotoResult(): Promise<OtherPhotoResultDto> {
    const otherPhotos = await this.photosService.getOtherPhotos();
    const result: OtherPhotoResultDto = {
      result: {},
    };

    for (const photo of otherPhotos) {
      if (!photo.judge) {
        continue;
      }

      if (!result.result[photo.judge.category.name]) {
        result.result[photo.judge.category.name] = {
          details: {
            name: photo.judge.category.name,
            description: photo.judge.category.description,
          },
          photos: [],
        };
      }

      result.result[photo.judge.category.name].photos.push(photo);
    }

    return result;
  }

  private calculateScore(scores: Record<string, number[]>) {
    return Object.entries(scores).reduce((acc, [_, score]) => {
      acc += score[0];
      return acc;
    }, 0);
  }
}
