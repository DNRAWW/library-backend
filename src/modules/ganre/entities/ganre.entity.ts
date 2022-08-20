import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ganres')
export class GanreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;
}
