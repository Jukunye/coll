import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>
  ) {}

  // CREATE
  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  // READ
  async getProjects(): Promise<Project[]> {
    return this.projectModel.find().populate(['owner', 'members']).exec();
  }

  async getProject(id: string): Promise<Project> {
    return this.projectModel.findById(id).exec();
  }

  // UPDATE
  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    return this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
  }
}
