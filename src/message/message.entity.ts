import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  msg_id: string;

  @Column()
  room_id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar' })
  text: string;
}
