/** TypeORM 
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


import { Topic } from './Topic';
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId!: string;

  @Column()
  created!: string;

  @Column()
  message!: string;

  @Column()
  votes!: number;

  @Column()
  topic!: Topic;


  @Column()
  user!: User;
}
*/
