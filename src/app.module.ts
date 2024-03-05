import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { typeOrmDatabase } from './config/database';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ...typeOrmDatabase,
    UsersModule,
    NotificationsModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
