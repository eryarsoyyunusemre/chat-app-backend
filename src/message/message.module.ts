import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationEntity } from '../notifications/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, NotificationEntity])],
  providers: [MessageGateway, MessageService, NotificationsService],
})
export class MessageModule {}
