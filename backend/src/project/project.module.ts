import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schema';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    NotificationModule,
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
