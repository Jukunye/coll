export class UpdateProjectDto {
  readonly name?: string;
  readonly description?: string;
  readonly owner?: string;
  readonly members?: string | string[];
  readonly image?: string;
  readonly language?: string;
  readonly level?: string;
  readonly start?: string;
}
