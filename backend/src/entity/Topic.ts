/** TypeORM */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Board } from './Board';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  created!: string;

  @Column()
  topicName!: string;

  @ManyToOne(() => Board, (board) => board.topics, { onDelete: 'CASCADE' })
  board!: Board;

  @OneToMany(() => Post, (post) => post.topic)
  posts!: Post[];

  @OneToMany(() => Topic, (topic) => topic.user)
  user!: User;
}
