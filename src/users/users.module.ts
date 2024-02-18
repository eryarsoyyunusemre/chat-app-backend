import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../core/jwtStrategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { NotificationsService } from '../notifications/notifications.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'asdfsdaf',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, NotificationsService],
  exports: [PassportModule, JwtStrategy],
})
export class UsersModule {}
