import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);
    this.server.to(message.room_id).emit('message', message);

    return message;
  }

  @SubscribeMessage('findAllMessage')
  async findAll() {
    return this.messageService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  async findOne(@MessageBody() data: { room_id: string }) {
    return await this.messageService.findOne(data.room_id);
  }

  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    return await this.messageService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.messageService.getClientName(client.id);

    client.broadcast.emit('typing', { name, isTyping });
  }
}
