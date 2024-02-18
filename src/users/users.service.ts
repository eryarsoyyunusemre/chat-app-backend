import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { userLoginDto } from './dto/user-login.dto';
import { addFriendsDto } from './dto/add-friends.dto';
import { JwtPayload } from '../core/jwtPayload';
import { NotificationsService } from '../notifications/notifications.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async makeToken(user: UsersEntity) {
    if (user.deletedAt !== null) {
      throw new UnauthorizedException('User is inactive!');
    }

    const payload = {
      uuid: user.uuid,
      username: user.username,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      level: user.level,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      ...payload,
    };
  }
  // Tüm kullanıcıları getirir
  async findAll() {
    try {
      const data = await this.usersRepository.find();
      data.forEach((user) => {
        delete user.password;
      });

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  // Id ye göre kullanıcıları getirir.
  async findOne(uuid: number) {
    try {
      const data = await this.usersRepository.findOneBy({ uuid });
      delete data.password;
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  // Friends code değerine göre kullanıcıyı getirir.
  async getUsersByFriendsCode(friendsCode: string) {
    try {
      const data = await this.usersRepository.findOneBy({ friendsCode });
      delete data.password;
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  // Kullanıcının arkadaşlarını getirir.
  async getUsersFriends(uuid: number) {
    try {
      const data = await this.usersRepository
        .createQueryBuilder('users')
        .select([
          'users.uuid',
          'friends.uuid',
          'friends.name',
          'friends.lastname',
        ])
        .leftJoin('users.friends', 'friends')
        .where('users.uuid = :uuid', { uuid })
        .getOne();

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  // Kullanıcı giriş yapma servisi
  async login(loginDto: userLoginDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          username: loginDto.username,
          deletedAt: null,
        },
      });
      const pass = await bcrypt.compare(loginDto.password, user.password);

      if (!pass) {
        throw new InternalServerErrorException(
          'Şifreniz hatalı!Lütfen şifrenizi kontrol ediniz!',
        );
      }

      return await this.makeToken(user);
    } catch (error) {
      throw new ForbiddenException(error.message || error);
    }
  }

  async friendsRequest(addFriends: addFriendsDto, user: JwtPayload) {
    try {
    } catch (error) {
      throw new ForbiddenException(error.message || error);
    }
  }

  // Kullanıcıya arkadaş ekleme
  async addFriends(addFriends: addFriendsDto, user: JwtPayload) {
    try {
      const getFriends = await this.getUsersByFriendsCode(
        addFriends.friendsCode,
      );

      await this.usersRepository
        .createQueryBuilder('users')
        .relation(UsersEntity, 'friends')
        .of(user.uuid)
        .add(getFriends.uuid);

      await this.usersRepository
        .createQueryBuilder('users')
        .relation(UsersEntity, 'friends')
        .of(getFriends.uuid)
        .add(user.uuid);

      return getFriends;
    } catch (error) {
      throw new ForbiddenException(error.message || error);
    }
  }

  // Kullanıcı oluşturma
  async register(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 5);
      const user = await this.usersRepository.save(createUserDto.toEntity());
      delete user.password;
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return `This action updates a #${id} user`;
    } catch (error) {}
  }

  async remove(uuid: number) {
    try {
      return `This action removes a #${uuid} user`;
    } catch (error) {}
  }
}
