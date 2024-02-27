import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { NotificationsController } from './notifications.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersEntity } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity, UsersEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [NotificationsService, JwtService, UsersService],
  controllers: [NotificationsController],
  exports: [PassportModule],
})
export class NotificationsModule {}
