/** TypeORM */
import { MaxLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Topic } from './Topic';
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  created!: string;

  @Column()
  @MaxLength(1000, {
    message: 'Message length can be max 1000 characters long'
  })
  message!: string;

  @Column()
  votes!: number;

  @ManyToOne(() => Topic, (topic) => topic.posts, { onDelete: 'CASCADE' })
  topic!: Topic;

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;
}
