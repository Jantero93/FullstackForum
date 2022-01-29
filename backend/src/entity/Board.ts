/** TypeORM */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

/** Entities */
import { Topic } from './Topic';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  board!: string;

  @Column()
  adjective!: string;

  @OneToMany(() => Topic, (topic) => topic.board)
  topics!: Topic[];
}
