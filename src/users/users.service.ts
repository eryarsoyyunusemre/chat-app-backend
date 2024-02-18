import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll() {
    const data = await this.usersRepository.find();
    data.forEach((user) => {
      delete user.password;
    });

    return data;
  }

  async findOne(uuid: number) {
    const data = await this.usersRepository.findOneBy({ uuid });
    delete data.password;
    return data;
  }

  async login(createUserDto: CreateUserDto) {
    const payload = {
      name: createUserDto.name,
    };
    return this.jwtService.sign(payload);
  }

  async register(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 5);
    console.log(createUserDto.password);

    return await this.usersRepository.save(createUserDto.toEntity());
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
