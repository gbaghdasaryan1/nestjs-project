import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    console.log('asdf');

    const oldUser = await this.authService.findUer(dto.login);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return this.authService.createUer(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() { login, password }: AuthDto) {
    console.log('asdf');
    const user = await this.authService.validteUser(login, password);

    return this.authService.login(user.email);
  }
}
