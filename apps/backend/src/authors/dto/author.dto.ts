import { OmitType, PickType, PartialType, ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AuthorDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class CreateAuthorDto extends OmitType(AuthorDto, ['id'] as const) {}
export class UpdateAuthorDto extends PartialType(AuthorDto) {}
export class GetAuthorByIdDto extends PickType(AuthorDto, ['id'] as const) {}
export class DeleteAuthorDto extends PickType(AuthorDto, ['id'] as const) {}
