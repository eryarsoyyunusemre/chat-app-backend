import { IsOptional, IsString } from 'class-validator';
import { UsersEntity } from '../user.entity';
import { randomBytes } from 'crypto';
import { UserLevel } from '../enums/enums';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  level: UserLevel;

  friendCode: string;

  toEntity() {
    const entity = new UsersEntity();
    entity.name = this.name;
    entity.lastname = this.lastname;
    entity.email = this.email;
    entity.username = this.username;
    entity.password = this.password;
    entity.friendsCode = this.generateUniqueCode(20);
    return entity;
  }

  generateUniqueCode(length: number): string {
    const randomBytesBuffer = randomBytes(length);
    const uniqueCode = randomBytesBuffer.toString('hex').toUpperCase();
    return uniqueCode;
  }
}
