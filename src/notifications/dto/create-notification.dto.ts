import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  name: string;
}
