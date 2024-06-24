import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/signInDto.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.findOne(req.user.email);
  }

  @Get('users')
  getUsers() {
    return this.authService.findAll();
  }

  @Patch('profile')
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(req.user.email, updateUserDto);
  }

  @Delete('profile')
  deleteProfile(@Request() req) {
    return this.authService.delete(req.user.email);
  }
}
