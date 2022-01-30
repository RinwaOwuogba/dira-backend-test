import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { UserType } from '../types';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  userType: UserType;

  @Column()
  lastname: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  assetDescription: string;
}
