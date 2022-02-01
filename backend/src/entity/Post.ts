/** TypeORM */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Topic } from './Topic';
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  created!: string;

  @Column()
  message!: string;

  @Column()
  votes!: number;

  @ManyToOne(() => Topic, (topic) => topic.posts, { onDelete: 'CASCADE' })
  topic!: Topic;

  @OneToMany(() => User, (user) => user.posts)
  user!: User;
}
