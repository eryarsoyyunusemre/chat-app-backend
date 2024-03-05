import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly notificationsService: NotificationsService,
  ) {}

  clientToUser = {};

  async identify(name: string, cliendId: string) {
    this.clientToUser[cliendId] = name;

    return Object.values(this.clientToUser);
  }

  async getClientName(cliendId: string) {
    return this.clientToUser[cliendId];
  }

  async create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    await this.messageRepository.save(message);

    return message;
  }

  async findAll() {
    return await this.messageRepository.find();
  }

  async findOne(room_id: string) {
    return await this.messageRepository.findOne({
      where: {
        room_id,
      },
    });
  }
}
