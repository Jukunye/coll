export class CreateProjectDto {
  readonly name: string;
  readonly description: string;
  readonly owner: string;
  readonly members?: string | string[];
  readonly tags?: string[];
  readonly resources?: string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}
