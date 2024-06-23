import { SetMetadata } from '@nestjs/common';
import { config } from 'dotenv';

config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET
};

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
