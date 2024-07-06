import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './schemas/notification.schema';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>
  ) {}

  // CREATE
  async createNotification(
    createNotificationDto: CreateNotificationDto
  ): Promise<Notification> {
    const createdNotification = new this.notificationModel(
      createNotificationDto
    );
    return createdNotification.save();
  }
}
