import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './schemas/project.schema';
import { SkipAuth } from 'src/auth/constants';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.createProject(createProjectDto);
  }

  @SkipAuth()
  @Get()
  async getProjects() {
    return this.projectService.getProjects();
  }

  @SkipAuth()
  @Get(':id')
  async getProject(@Param('id') id: string) {
    return this.projectService.getProject(id);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Patch(':projectId/add-member/:userId')
  async addMember(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string
  ): Promise<Project> {
    return this.projectService.addMember(projectId, userId);
  }

  @Patch(':projectId/remove-member/:userId')
  async removeMember(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string
  ): Promise<Project> {
    return this.projectService.removeMember(projectId, userId);
  }
}
