import { IsString } from 'class-validator';

export class userLoginDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
