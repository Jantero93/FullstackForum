/** TypeORM */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Topic } from './Topic';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ unique: true })
  board!: string;

  @Column()
  adjective!: string;

  @OneToMany(() => Topic, (topic) => topic.board, { cascade: true })
  topics!: Topic[];
}
