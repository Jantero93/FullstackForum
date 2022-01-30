/** TypeORM */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  board!: string;

  @Column()
  adjective!: string;
}
