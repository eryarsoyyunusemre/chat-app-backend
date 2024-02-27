import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { NotificationsEnum, NotificationsInfo } from '../enums/enums';
import { NotificationEntity } from '../notification.entity';
import { UsersEntity } from '../../users/user.entity';

export class CreateNotificationDto {
  @IsString()
  content: string;

  @IsString()
  @IsEnum(NotificationsInfo)
  info: NotificationsInfo;

  @IsOptional()
  @IsEnum(NotificationsEnum)
  @IsString()
  status: NotificationsEnum;

  @IsNumber()
  sender: UsersEntity;

  @IsNumber()
  buyer: UsersEntity;

  @IsOptional()
  @IsString()
  friendsCode: string;

  toEntity() {
    const entity = new NotificationEntity();
    entity.content = this.content;
    entity.info = this.info;
    entity.status = this.status;
    entity.sender = this.sender;
    entity.buyer = this.buyer;
    entity.friendsCode = this.friendsCode;
    return entity;
  }
}
