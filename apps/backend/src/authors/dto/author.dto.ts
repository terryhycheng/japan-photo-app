import { OmitType, PickType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AuthorDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateAuthorDto extends OmitType(AuthorDto, ['id']) {}
export class UpdateAuthorDto extends PartialType(AuthorDto) {}
export class GetAuthorByIdDto extends PickType(AuthorDto, ['id']) {}
export class DeleteAuthorDto extends PickType(AuthorDto, ['id']) {}
