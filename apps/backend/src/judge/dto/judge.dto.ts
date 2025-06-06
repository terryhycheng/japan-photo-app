import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';

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
