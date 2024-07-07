import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './schemas/notification.schema';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':id')
  async getNotification(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.getNotification(id);
  }

  @Get('/user/:id')
  async getAllNotification(@Param('id') id: string): Promise<Notification[]> {
    return this.notificationService.getAllNotifications(id);
  }

  @Patch(':id/mark-as-read')
  async markAsRead(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.markAsRead(id);
  }
}
