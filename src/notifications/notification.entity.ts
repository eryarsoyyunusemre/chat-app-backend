import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NotificationsEnum, NotificationsInfo } from './enums/enums';
import { UsersEntity } from '../users/user.entity';

@Entity('notifications')
export class NotificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  info: NotificationsInfo;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  status: NotificationsEnum;

  @ManyToOne(() => UsersEntity, (user) => user.friends, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'sender_uuid' })
  sender: UsersEntity;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'arkadaş olarak eklemek için gerekli kod',
    nullable: true,
  })
  friendsCode: string;

  @ManyToOne(() => UsersEntity, (user) => user.friends, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'buyer_uuid' })
  buyer: UsersEntity;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn({ nullable: true, comment: 'Silinme tarihi' })
  deletedAt: Date;
}
