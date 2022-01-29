/** TypeORM */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';

/** Entities */
import { Board } from './Board';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  topicId!: number;

  @Column()
  created!: string;

  @Column()
  topic!: string;

  @ManyToOne(() => Board, (board) => board.topics)
  @JoinColumn()
  board!: Board;
}
