import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ required: true })
  type: string; // e.g., 'comment', 'join', 'new_project'

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  link: string; // URL to the relevant page

  @Prop({ default: false })
  read: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
