/** TypeORM */
import { Entity } from 'typeorm';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

/** Entities */
import { Board } from './Board';
import { Post } from './Post';
import { User } from './User';

/** Class validation */
import { Length } from 'class-validator';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** Autogenerated timestamp when topic has created */
  @Column('timestamptz')
  @CreateDateColumn()
  created!: Date;

  /** Topic's name */
  @Column({ nullable: false })
  @Length(1, 200, { message: 'Topic max length is 200 characters' })
  topicName!: string;

  /** Board where topic belongs to */
  @ManyToOne(() => Board, (board) => board.topics, { onDelete: 'CASCADE' })
  board!: Board;

  /** Posts which are related to topic */
  @OneToMany(() => Post, (post) => post.topic)
  posts!: Post[];

  /** User who has created topic */
  @ManyToOne(() => Topic, (topic) => topic.user)
  user!: User;
}
