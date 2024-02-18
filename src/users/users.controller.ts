import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: number) {
    return this.usersService.findOne(uuid);
  }

  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.login(createUserDto);
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return await this.usersService.register(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
