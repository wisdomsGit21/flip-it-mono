import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log(req.user, 'req.user');
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth(@Request() req) {}

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    console.log(req.user);
    return req.user;
  }
}
