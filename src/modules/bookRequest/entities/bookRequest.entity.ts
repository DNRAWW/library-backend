import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from '../../book/entities/book.entity';

@Entity('book_requests')
export class BookRequestEntity {
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

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  approvedAt?: Date | null;

  @DeleteDateColumn()
  deletedAt: number;
}
