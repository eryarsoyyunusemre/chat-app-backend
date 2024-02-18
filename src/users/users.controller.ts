import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { userLoginDto } from './dto/user-login.dto';
import { RolesGuard } from '../core/guards';
import { GetUser, Level } from '../core/decorators';
import { UserLevel } from './enums/enums';
import { addFriendsDto } from './dto/add-friends.dto';
import { JwtPayload } from '../core/jwtPayload';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @Level(UserLevel.ADMIN)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Level(UserLevel.ADMIN)
  @Get('getone/:uuid')
  async findOne(@Param('uuid') uuid: number) {
    return await this.usersService.findOne(uuid);
  }

  @UseGuards(AuthGuard())
  @Get('/friends')
  async getFriends(@GetUser() user: JwtPayload) {
    return await this.usersService.getUsersFriends(user.uuid);
  }

  @Post('/login')
  async login(@Body() loginDto: userLoginDto) {
    return await this.usersService.login(loginDto);
  }

  @UseGuards(AuthGuard())
  @Post('/friends')
  async addFriends(
    @Body() addFriends: addFriendsDto,
    @GetUser() user: JwtPayload,
  ) {
    return await this.usersService.addFriends(addFriends, user);
  }

  @UseGuards(AuthGuard())
  @Post('/friends')
  async addFriendsRequest(
    @Body() addFriends: addFriendsDto,
    @GetUser() user: JwtPayload,
  ) {
    return await this.usersService.friendsRequest(addFriends, user);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Level(UserLevel.ADMIN)
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.register(createUserDto);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Level(UserLevel.ADMIN)
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: number) {
    return await this.usersService.remove(uuid);
  }
}
