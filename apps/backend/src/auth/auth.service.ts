import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { SignUpDto, SignUpResponseDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.usersService.findUserByEmail(username);

    if (!user) return null;

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: UserDocument): Promise<{ access_token: string }> {
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET') ?? 'random_secret',
        expiresIn: '1h',
      }),
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const user = await this.usersService.createUser(signUpDto);
    return {
      username: user.email,
      message: 'User created successfully',
    };
  }
}
