export class CreateProjectDto {
  readonly name: string;
  readonly description: string;
  readonly owner: string;
  readonly members?: string | string[];
  readonly image: string;
  readonly language?: string;
  readonly level?: string;
  readonly start: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
