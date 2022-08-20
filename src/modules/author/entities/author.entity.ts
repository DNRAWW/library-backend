import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('author')
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;
}
