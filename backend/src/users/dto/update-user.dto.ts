import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  firstName?: string;

  @IsString()
  headline?: string;

  @IsString()
  bio?: string;

  @IsString()
  image?: string;

  @IsString()
  lastName?: string;

  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(8)
  password?: string;
}
