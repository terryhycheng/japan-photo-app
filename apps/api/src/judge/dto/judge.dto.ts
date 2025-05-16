import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

import { IsNotEmpty } from 'class-validator';

export class JudgeParams {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the photo to be judged',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  photoId: string;
}

export class JudgeMainBody {
  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The scores of the photo',
    example: {
      恰當角度: [10],
    },
  })
  scores: {
    [key: string]: number[];
  };
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The comment of the photo',
    example: 'This is a good photo',
  })
  comment: string;
}

export class JudgeMainDto extends JudgeMainBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the photo to be judged',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}
