import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NotificationsEnum } from './enums/enums';

@Entity('')
export class NotificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  info: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar', length: 1 })
  status: NotificationsEnum;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn({ nullable: true, comment: 'Silinme tarihi' })
  deletedAt: Date;
}
