/** TypeORM */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';

/** Entities */
import { Board } from './Board';
import { Post } from './Post';
import { User } from './User';

/** Class validation */
import { MaxLength } from 'class-validator';
@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  created!: string;

  @Column()
  @MaxLength(200, { message: 'Topic max length is 200 characters' })
  topicName!: string;

  @ManyToOne(() => Board, (board) => board.topics, { onDelete: 'CASCADE' })
  board!: Board;

  @OneToMany(() => Post, (post) => post.topic)
  posts!: Post[];

  @ManyToOne(() => Topic, (topic) => topic.user)
  user!: User;
}
