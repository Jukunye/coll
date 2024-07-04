import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

  @SkipAuth()
  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Get('users')
  getUsers() {
    return this.authService.findAll();
  }

  @Patch('profile/:id')
  updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(id, updateUserDto);
  }

  @Delete('profile/:id')
  deleteProfile(@Param('id') id: string) {
    return this.authService.delete(id);
  }
}
