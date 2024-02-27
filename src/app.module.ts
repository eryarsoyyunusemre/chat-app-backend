import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { typeOrmDatabase } from './config/database';
import { UsersService } from './users/users.service';
import { NotificationsService } from './notifications/notifications.service';

@Module({
  imports: [
    ...typeOrmDatabase,
    UsersModule,
    MessagesModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
