import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  author: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;
}
