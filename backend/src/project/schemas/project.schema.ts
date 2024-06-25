// title, description, owner(user ID),
// members(array of user IDs), tags(array of strings)
// resources(array of objects), created_at, updated_at

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: MongooseSchema.Types.ObjectId;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  members: [MongooseSchema.Types.ObjectId];

  @Prop()
  tags: string[];

  @Prop()
  resources: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

// Pre-save middleware to update the timestamps
ProjectSchema.pre('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  this.updatedAt = new Date();
  next();
});
