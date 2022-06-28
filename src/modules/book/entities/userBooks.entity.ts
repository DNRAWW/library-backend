import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from './book.entity';

@Entity('user_books')
export class UserBookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  userId: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
  })
  user: UserEntity;

  @Column({
    type: 'int',
    nullable: false,
  })
  bookId: number;

  @OneToOne(() => BookEntity, {
    onDelete: 'CASCADE',
  })
  book: BookEntity;

  @CreateDateColumn()
  givenAt: number;
}
