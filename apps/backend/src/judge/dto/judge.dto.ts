import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { OtherPhotoDto, PhotoDto } from 'src/photos/dto/photos.dto';
import { AuthorDto } from 'src/authors/dto/author.dto';
import { CategoryDto } from 'src/categories/dto/category.dto';

// ------------ Common ------------

export class JudgeDto {
  @IsObject()
  @IsOptional()
  @ApiProperty({
    example: {
      恰當角度: [10],
    },
  })
  scores?: Record<string, number[]>;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'This is a comment',
  })
  comment?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({
    example: '666000000000000000000000',
  })
  categoryId?: string;
}

export class JudgeParams {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The photo id',
  })
  photoId: string;
}

// ------------ Create Main Judge ------------

export class CreateMainJudgeBody {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The comment of the judge',
  })
  comment?: string;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    example: {
      恰當角度: [10],
    },
  })
  scores?: Record<string, number[]>;
}

export class CreateMainJudgeDto extends IntersectionType(
  JudgeParams,
  CreateMainJudgeBody,
) {}

// ------------ Create Other Judge ------------

export class CreateOtherJudgeBody {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The category id',
  })
  categoryId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The comment of the judge',
  })
  comment?: string;
}

export class CreateOtherJudgeDto extends IntersectionType(
  JudgeParams,
  CreateOtherJudgeBody,
) {}

// ------------ Assign Award ------------

export class AssignAwardBody {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The awards to be assigned',
    example: [
      {
        categoryId: '123-456-789',
        photoId: '123-456-789',
      },
    ],
  })
  awards: {
    categoryId: string;
    photoId: string;
  }[];
}

export class SpecialAwardDto {
  @ApiProperty({
    description: 'The photo',
    example: {
      id: '123',
      url: '/photos/000039590015.webp',
    },
  })
  photo: {
    id: string;
    url: string;
  };

  @ApiProperty({
    description: 'The author',
    example: {
      id: '123',
      name: 'John Doe',
    },
  })
  author: {
    id: string;
    name: string;
  };

  @ApiProperty({
    description: 'The category',
    example: {
      id: '123',
      name: 'Category 1',
    },
  })
  category: {
    id: string;
    name: string;
  };
}

export class RankingDto {
  @ApiProperty({
    description: 'The photo',
    example: {
      id: '123',
      total_score: 42.32,
      scores: {
        恰當角度: [10],
      },
      comment: 'This is a comment',
      url: '/photos/000039590015.webp',
    },
  })
  photo: {
    id: string;
    total_score: number;
    scores: Record<string, number[]>;
    comment?: string;
    url: string;
  };

  @ApiProperty({
    description: 'The author',
    example: {
      id: '123',
      name: 'John Doe',
    },
  })
  author: {
    id: string;
    name: string;
  };
}

export class ResultDto {
  @ApiProperty({
    description: 'The result',
    example: {
      'John Doe': 100,
      'Jane Doe': 90,
    },
  })
  result: Record<string, number>;
}

export class OtherPhotoResultDto {
  @ApiProperty({
    example: {
      可以鼓勵: {
        details: {
          name: 'category name',
          description: 'This is a description',
        },
        photos: [
          {
            id: 'photo id',
            author: {
              id: 'author id',
              name: 'author name',
            },
            original_filename: 'original filename',
            photo_id: 'photo id',
            is_selected: false,
            url: 'url',
            judge: {
              category: {
                name: 'category name',
                description: 'This is a description',
              },
              comment: 'This is a comment',
            },
          },
        ],
      },
    },
  })
  result: Record<
    string,
    {
      details: Pick<CategoryDto, 'name' | 'description'>;
      photos: OtherPhotoDto[];
    }
  >;
}
