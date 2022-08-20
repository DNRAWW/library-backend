import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Для того чтобы закончить задание немного быстрее я
// использовал такой способ разделения ролей,
// но лучше было бы сделать две дополнительные
// таблицы roles и permissoions
export enum Roles {
  ADMIN = 'ADMIN',
  REGULAR = 'REGULAR',
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  surName: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  dateOfBirth: Date;

  @Column({
    type: 'bigint',
    nullable: false,
  })
  passport: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    enum: Roles,
  })
  role: Roles;
}
