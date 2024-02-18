import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserLevel } from './enums/enums';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column({ type: 'varchar', length: 75 })
  name: string;

  @Column({ type: 'varchar', length: 75 })
  lastname: string;

  @Column({ type: 'varchar', length: 75, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 75, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'arkadaş olarak eklemek için gerekli kod',
  })
  friendsCode: string;

  @ManyToMany(() => UsersEntity, (user) => user.friends, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({ name: 'friends_table' })
  friends: UsersEntity[];

  @Column({
    type: 'varchar',
    length: '50',
    comment: 'kullanıcı yetkisi',
    default: UserLevel.USER,
  })
  level: UserLevel;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn({ nullable: true, comment: 'Silinme tarihi' })
  deletedAt: Date;
}
