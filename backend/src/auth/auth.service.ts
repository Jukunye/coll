import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/users.schema';
import { SignInDto } from './dto/signInDto.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    signInDto: SignInDto
  ): Promise<{ access_token: string; user: User }> {
    const user = await this.usersService.findByEmail(signInDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    // Generate a JWT and return
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;
    return await this.usersService.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersService.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  async delete(id: string): Promise<void> {
    return await this.usersService.delete(id);
  }
}
