import { Injectable, NotFoundException } from '@nestjs/common';
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

  // READ
  async getNotification(userId: string): Promise<Notification> {
    return await this.notificationModel
      .findOne({ user: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  // Mark notification as read
  async markAsRead(notificationId: string) {
    const updatedNotification = await this.notificationModel
      .findByIdAndUpdate(notificationId, { read: true })
      .exec();
    if (!updatedNotification) {
      throw new NotFoundException(
        `Notification with id ${notificationId} not found`
      );
    }
    return updatedNotification;
  }
}
