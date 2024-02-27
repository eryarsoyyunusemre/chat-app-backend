import { IsEnum, IsOptional } from 'class-validator';
import { NotificationsEnum } from '../enums/enums';

export class UpdateNotificationDto {
  @IsOptional()
  @IsEnum(NotificationsEnum)
  status: NotificationsEnum;
}
