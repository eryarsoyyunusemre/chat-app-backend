import { IsString } from 'class-validator';

export class addFriendsDto {
  @IsString()
  friendsCode: string;
}
