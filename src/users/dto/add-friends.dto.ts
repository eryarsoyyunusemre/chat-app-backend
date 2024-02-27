import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class addFriendsDto {
  @IsOptional()
  @IsString()
  friendsCode: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  notifications_id: number;
}
