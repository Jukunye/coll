import { Types } from 'mongoose';

export class CreateNotificationDto {
  readonly user: Types.ObjectId;
  readonly type: string;
  readonly message: string;
  readonly link: string;
}
