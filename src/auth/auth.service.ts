import { USER_NOT_FOUND, WRONG_PASSWORD } from './auth.constants';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthDto } from './dto/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}
  async createUer(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }
  async findUer(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validteUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUer(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD);
    }
    return { email: user.email };
  }

  async login(email: string) {
    const paylod = { email };

    return {
      access_token: await this.jwtService.signAsync(paylod),
    };
  }
}
