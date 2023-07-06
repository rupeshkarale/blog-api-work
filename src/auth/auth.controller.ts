/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @Post('/signup')
  async signUp(@Body() body: SignupDto) {
    return await this.authService.signup(body);
  }

  @Post('/login')
  async LoginUser(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }
}
