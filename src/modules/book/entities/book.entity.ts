import { AuthorEntity } from '../../author/entities/author.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GanreEntity } from '../../ganre/entities/ganre.entity';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  authorId: number;

  @ManyToOne(() => AuthorEntity, {
    onDelete: 'CASCADE',
  })
  author: AuthorEntity;

  @Column({
    type: 'int',
    nullable: false,
  })
  ganreId: number;

  @ManyToOne(() => GanreEntity, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  ganre: GanreEntity;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;
}
