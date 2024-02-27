import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsEnum, NotificationsInfo } from './enums/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { Repository } from 'typeorm';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationsRepository: Repository<NotificationEntity>,
  ) {}
  async findAll() {
    return `This action returns all notifications`;
  }

  async getNotificationsById(id: number) {
    try {
      const data = await this.notificationsRepository
        .createQueryBuilder('notifi')
        .select(['notifi', 'buyer.uuid', 'sender.uuid'])
        .innerJoin('notifi.buyer', 'buyer')
        .innerJoin('notifi.sender', 'sender')
        .where('notifi.id = :id', { id })
        .getOne();

      if (!data) {
        throw new InternalServerErrorException(
          'Bu idye sahip bir bildirim yoktur!',
        );
      }

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  async getNotificationsByUserId(id: number) {
    try {
      return await this.notificationsRepository
        .createQueryBuilder('notifi')
        .innerJoin('notifi.buyer', 'buyer')
        .where('notifi.buyer =: id', { id })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  async sentNotifications(sender: number, buyer: number) {
    try {
      return await this.notificationsRepository
        .createQueryBuilder('notifi')
        .innerJoin('notifi.buyer', 'buyer')
        .innerJoin('notifi.sender', 'sender')
        .where('notifi.buyer = :buyer', { buyer })
        .andWhere('notifi.sender = :sender', { sender })
        .andWhere('notifi.status = :status1 OR notifi.status = :status2', {
          status1: NotificationsEnum.GONDERILDI,
          status2: NotificationsEnum.GORULDU,
        })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  async create(createNotificationDto: NotificationEntity) {
    try {
      return await this.notificationsRepository.save(createNotificationDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  async updateStatus(id: number, updateNotifications: UpdateNotificationDto) {
    try {
      const update = await this.notificationsRepository.update(
        { id },
        updateNotifications,
      );

      return update;
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }

  async remove(id: number) {
    try {
      return await this.notificationsRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }
}
