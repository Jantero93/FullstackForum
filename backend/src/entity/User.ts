import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './Post';
import { Topic } from './Topic';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @ManyToOne(() => Post, (post) => post.user, { onDelete: 'NO ACTION' })
  posts!: Post[];

  @ManyToOne(() => Topic, (topic) => topic.user, { onDelete: 'NO ACTION' })
  topics!: Topic[];
}
