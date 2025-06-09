import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Auth, AuthGuard } from './decorators/auth.decorator';
import { UserDocument } from 'src/schemas/user.schema';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginDto, SignUpDto, SignUpResponseDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto, description: 'Login credentials' })
  async login(@Auth() user: UserDocument) {
    return this.authService.login(user);
  }

  @Post('signup')
  @ApiBody({ type: SignUpDto, description: 'Sign up credentials' })
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    try {
      return this.authService.signUp(signUpDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @AuthGuard()
  @Post('verify')
  async verify(@Auth() user: UserDocument) {
    return {
      message: 'User verified',
      user,
    };
  }
}
