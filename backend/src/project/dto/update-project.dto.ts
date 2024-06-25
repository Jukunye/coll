export class UpdateProjectDto {
  readonly name?: string;
  readonly description?: string;
  readonly owner?: string;
  readonly members?: string[];
  readonly tags?: string[];
  readonly resources?: string[];
}
