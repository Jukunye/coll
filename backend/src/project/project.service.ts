import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model, Schema, Types } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { NotificationService } from 'src/notification/notification.service';
import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private notificationService: NotificationService
  ) {}

  // CREATE
  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    const savedProject = createdProject.save();
    const projectId = (await savedProject)._id;

    // create a notification for the user
    const ownerId = (await savedProject).owner._id;
    const user = new Types.ObjectId(ownerId);
    const notificationData: CreateNotificationDto = {
      user: user,
      type: 'new_project',
      message: 'Project Created!',
      link: `/project/${projectId}`
    };
    this.notificationService.createNotification(notificationData);
    return this.projectModel
      .findById(projectId)
      .populate('owner', '-password')
      .populate('members', '-password')
      .exec();
  }

  // READ
  async getProjects(): Promise<Project[]> {
    return this.projectModel
      .find()
      .populate('owner', '-password')
      .populate('members', '-password')
      .exec();
  }

  async getProject(id: string): Promise<Project> {
    return this.projectModel
      .findById(id)
      .populate('owner', '-password')
      .populate('members', '-password')
      .exec();
  }

  // UPDATE
  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
    if (!updatedProject) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return updatedProject;
  }

  // Delete
  async deleteProject(id: string): Promise<void> {
    const result = await this.projectModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
  }

  // Add member to a project
  async addMember(projectId: string, userId: string): Promise<Project> {
    const project = await this.projectModel.findById(projectId).exec();
    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }
    const userObjectId = new Types.ObjectId(userId);
    if (project.members.includes(userObjectId)) {
      throw new BadRequestException(
        `User with id ${userId} is already a member`
      );
    }
    project.members.push(userObjectId);
    const savedProject = project.save();

    // send notifications to all members
    for (const member of project.members) {
      const notificationData: CreateNotificationDto = {
        user: new Types.ObjectId(member._id),
        type: 'new_member',
        message: 'New member has joined the project!',
        link: `/project/${projectId}`
      };
      await this.notificationService.createNotification(notificationData);
    }
    return savedProject;
  }

  // Remove member from project
  async removeMember(projectId: string, userId: string): Promise<Project> {
    const project = await this.projectModel.findById(projectId).exec();
    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }
    const userObjectId = new Types.ObjectId(userId);
    const index = project.members.indexOf(userObjectId);
    if (index === -1) {
      throw new NotFoundException(`User with id ${userId} is not a member`);
    }
    project.members.splice(index, 1);
    return project.save();
  }
}
