import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ProjectModule } from './project/project.module';

config();

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ProjectModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
