/** TypeORM */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  board!: string;

  @Column()
  adjective!: string;
}
