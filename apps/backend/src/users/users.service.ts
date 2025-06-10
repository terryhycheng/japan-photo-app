import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/auth/dto/auth.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(signUpDto: SignUpDto): Promise<UserDocument> {
    if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await argon2.hash(signUpDto.password);

    const user = new this.userModel({
      email: signUpDto.username,
      password: hashedPassword,
    });

    return user.save();
  }

  async findUserByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });

    return user;
  }
}
