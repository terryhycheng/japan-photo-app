import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;
}

export class SignUpDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  confirmPassword: string;
}

export class SignUpResponseDto extends PickType(SignUpDto, ['username']) {
  @ApiProperty()
  message: string;
}
